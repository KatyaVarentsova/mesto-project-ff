import '../pages/index.css';
import { createCard } from './card'
import { openPopup, closePopup } from './modal'
import { enableValidation, clearValidation } from './validation'
import { userInformation, loadingCards, editingProfile, addingNewCards, deleteMyCard, putLike, deleteLike, changeAvatar } from './api'

let myID = ''
const placesList = document.querySelector('.places__list');

//состояние кнопки во время загрузки
const buttonLoadingState = (isLoading, button) => {
    if (isLoading) {
        button.textContent = 'Сохранение...'
    } else {
        button.textContent = 'Сохраненить'
    }
}
//функция для открытие большой картинки
const popupImage = document.querySelector('.popup_type_image');
function openImage(cardImage) {
    const bigImage = popupImage.querySelector('.popup__image')
    const bigImageCaption = popupImage.querySelector('.popup__caption')
    bigImage.src = cardImage.src
    bigImage.alt = cardImage.alt
    bigImageCaption.textContent = cardImage.alt
    openPopup(popupImage)
}

//кнопки для открытия попапов
const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')
const editProfileImage = document.querySelector('.profile__image')
//попапы, открывающиеся по кнопкам
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewAvatar = document.querySelector('.popup_type_new-avatar');

//функция для открытия попапа редоктирования профиля на карандаш 
profileEditButton.addEventListener('click', function () {
    popupEdit.querySelector('.popup__form').reset();
    clearValidation(popupEdit)
    openPopup(popupEdit)
    formEditingElements.name.value = editProfileName.textContent;
    formEditingElements.description.value = editProfileDescription.textContent;

})

//функция для открытие попапа для добавления новой картинки на +
profileAddButton.addEventListener('click', function () {
    popupNewCard.querySelector('.popup__form').reset();
    clearValidation(popupNewCard)
    openPopup(popupNewCard)
})

//функция для обновления картинки в профили 
editProfileImage.addEventListener('click', function () {
    popupNewAvatar.querySelector('.popup__form').reset();
    clearValidation(popupNewAvatar)
    openPopup(popupNewAvatar)
})

// вешаем обрабочики клика на все попапы для закрытия 
const popups = document.querySelectorAll('.popup');
enableValidation();

popups.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close")
    closeButton.addEventListener("click", () => {
        closePopup(popup);
    });
})

popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup")) {
            closePopup(popup);
        }
    });
});

const formEditProfile = document.forms.editProfile;
const formEditingElements = formEditProfile.elements;
const editProfileName = document.querySelector('.profile__title');
const editProfileDescription = document.querySelector('.profile__description');
//форма для редактирования профиля 
formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('popup__form')) {
        buttonLoadingState(true, formEditProfile.querySelector('.popup__button'))
        editingProfile(formEditingElements.name.value, formEditingElements.description.value)
            .then((result) => {
                editProfileName.textContent = result.name;
                editProfileDescription.textContent = result.about;
                closePopup(popupEdit)
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
                alert("Ошибка: потеряли связь с сервером. Попробуйте позже.");
            })
            .finally(() => {
                buttonLoadingState(false, formEditProfile.querySelector('.popup__button'))
            })
    }
})

const formNewPlace = document.forms.newPlace;
const formNewPlaceElements = formNewPlace.elements;
//форма для добавления новой картинки 
formNewPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('popup__form')) {
        buttonLoadingState(true, formNewPlace.querySelector('.popup__button'))
        addingNewCards(formNewPlaceElements.placeName.value, formNewPlaceElements.link.value)
            .then(result => {
                if (!result) {
                    alert('Ошибка: по указанной ссылке нет доступного изображения. Попробуйте, пожалуйста, другую ссылку загрузить');
                    return;
                }
                placesList.prepend(
                    createCard(
                        formNewPlaceElements.placeName.value,
                        formNewPlaceElements.link.value,
                        openPopup,
                        closePopup,
                        openImage,
                        myID,
                        result.owner._id,
                        deleteMyCard,
                        result._id,
                        result.likes,
                        putLike,
                        deleteLike
                    )
                );
                closePopup(popupNewCard)
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
                alert("Ошибка: потеряли связь с сервером. Попробуйте позже.")
            })
            .finally(() => {
                popupNewCard.classList.remove('popup_is-opened');
                buttonLoadingState(false, formNewPlace.querySelector('.popup__button'))
            })
    }
})


const formNewAvatar = document.forms.newAvatar;
const formNewAvatarElements = formNewAvatar.elements;
//форма для обновления автара 
formNewAvatar.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('popup__form')) {
        buttonLoadingState(true, formNewAvatar.querySelector('.popup__button'))
        changeAvatar(formNewAvatarElements.linkAvatar.value)
            .then(result => {
                if (!result) {
                    alert('Ошибка: по указанной ссылке нет доступного изображения. Попробуйте, пожалуйста, другую ссылку загрузить');
                    return;
                }
                editProfileImage.style.backgroundImage = `url(${result.avatar})`;
                closePopup(popupNewAvatar)
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен: ', err);
                alert('Ошибка: потеряли связь с сервером. Попробуйте позже.')
            })
            .finally(() => {
                popupNewAvatar.classList.remove('popup_is-opened');
                buttonLoadingState(false, formNewAvatar.querySelector('.popup__button'))
            })
    }
})

//ждём ответа от сервера об информации о пользователе и о всех карточках
Promise.all([userInformation(), loadingCards()])
    .then(([user, cards]) => {
        editProfileName.textContent = user.name;
        editProfileDescription.textContent = user.about;
        editProfileImage.style.backgroundImage = `url(${user.avatar})`;
        myID = user._id;
        cards.forEach(function (item) {
            placesList.append(
                createCard(
                    item.name,
                    item.link,
                    openPopup,
                    closePopup,
                    openImage,
                    myID,
                    item.owner._id,
                    deleteMyCard,
                    item._id,
                    item.likes,
                    putLike,
                    deleteLike))
        })
    })
    .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
        alert("Ошибка: потеряли связь с сервером. Попробуйте позже.");
    });

