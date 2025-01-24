import '../pages/index.css';
import { createCard } from './card'
import { initialCards } from './cards'
import { openPopup, closePopup } from './modal'

const placesList = document.querySelector('.places__list');

initialCards.forEach(function (item) {
    placesList.append(createCard(item.name, item.link, openImage))
})

const popupImage = document.querySelector('.popup_type_image');
function openImage(cardImage) {
    const bigImage = popupImage.querySelector('.popup__image')
    const bigImageCaption = popupImage.querySelector('.popup__caption')
    bigImage.src = cardImage.src
    bigImage.alt = cardImage.alt
    bigImageCaption.textContent = cardImage.alt
    openPopup(popupImage)
}

const profileEditButton = document.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

profileEditButton.addEventListener('click', function () {
    openPopup(document.querySelector('.popup_type_edit'))
    formEditingElements.name.value = editProfileName.textContent;
    formEditingElements.description.value = editProfileDescription.textContent;
})

profileAddButton.addEventListener('click', function () {
    openPopup(document.querySelector('.popup_type_new-card'))
})

const popups = document.querySelectorAll('.popup');

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

const popupEdit = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms.editProfile;
const formEditingElements = formEditProfile.elements;
const editProfileName = document.querySelector('.profile__title');
const editProfileDescription = document.querySelector('.profile__description');

formEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('popup__form')) {
        editProfileName.textContent = formEditingElements.name.value;
        editProfileDescription.textContent = formEditingElements.description.value;
        closePopup(popupEdit)
    }
})

const popupNewCard = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms.newPlace;
const formNewPlaceElements = formNewPlace.elements;

formNewPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('popup__form')) {
        placesList.prepend(createCard(formNewPlaceElements.placeName.value, formNewPlaceElements.link.value, openImage))
        popupNewCard.classList.remove('popup_is-opened');
        closePopup(popupNewCard)
    }
    formNewPlace.reset();
})