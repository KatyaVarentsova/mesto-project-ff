export { profileSection, popupEdit, popupNewCard, openImage }

let clickProcessing;

const profileSection = document.querySelector('.profile');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

function openPopup(evt) {
    if (evt.target.classList.contains('profile__edit-button')) {
        popupEdit.classList.add('popup_is-opened');
        clickProcessing = (evt) => closePopup(evt, 'popupEdit');
        document.addEventListener("keydown", clickProcessing);
        document.addEventListener("click", clickProcessing);
    } else if (evt.target.classList.contains('profile__add-button')) {
        popupNewCard.classList.add('popup_is-opened');
        clickProcessing = (evt) => closePopup(evt, 'popupNewCard');
        document.addEventListener("keydown", clickProcessing);
        document.addEventListener("click", clickProcessing);
    }
};

function openImage(image) {
    const bigImage = popupImage.querySelector('.popup__image')
    const bigImageCaption = popupImage.querySelector('.popup__caption')
    bigImage.src = image.src
    bigImage.alt = image.alt
    bigImageCaption.textContent = image.alt
    popupImage.classList.add('popup_is-opened');
    clickProcessing = (evt) => closePopup(evt, 'popupImage');
    document.addEventListener("keydown", clickProcessing);
    document.addEventListener("click", clickProcessing);
}

function closePopup(evt, popup) {
    if ((evt.type === 'click') && (evt.target.classList.contains('popup'))) {
        evt.target.classList.remove('popup_is-opened');
        document.removeEventListener("keydown", clickProcessing);
        document.removeEventListener("click", clickProcessing);
    } else if (((evt.type === 'click') && evt.target.classList.contains('popup__close')) || (evt.type === 'keydown' && evt.key === 'Escape')) {
        if (popup === 'popupEdit') {
            popupEdit.classList.remove('popup_is-opened');
        } else if (popup === 'popupNewCard') {
            popupNewCard.classList.remove('popup_is-opened');
        } else if (popup === 'popupImage') {
            popupImage.classList.remove('popup_is-opened');
        }
        document.removeEventListener("keydown", clickProcessing);
        document.removeEventListener("click", clickProcessing);
    }

}

profileSection.addEventListener("click", openPopup);