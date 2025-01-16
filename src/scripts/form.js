export { formEditProfile, formNewPlace }

import { popupEdit, popupNewCard } from './popup'
import { createCard, placesList } from './index'

const formEditProfile = document.forms.editProfile;
const formEditingElements = formEditProfile.elements;
const editProfileName = document.querySelector('.profile__title');
const editProfileDescription = document.querySelector('.profile__description');
formEditingElements.name.value = editProfileName.textContent;
formEditingElements.description.value = editProfileDescription.textContent;

const formNewPlace = document.forms.newPlace;
const formNewPlaceElements = formNewPlace.elements;

function saveForm(evt, action) {
    evt.preventDefault();
    if (evt.target.classList.contains('popup__form')) {
        if (action === 'saveProfile') {
            editProfileName.textContent = formEditingElements.name.value;
            editProfileDescription.textContent = formEditingElements.description.value;
            popupEdit.classList.remove('popup_is-opened');
        } else if (action === 'savePlace') {
            placesList.prepend(createCard(formNewPlaceElements.placeName.value, formNewPlaceElements.link.value))
            popupNewCard.classList.remove('popup_is-opened');
        }
    }
}

formEditProfile.addEventListener('submit', (evt) => saveForm(evt, 'saveProfile'));
formNewPlace.addEventListener('submit', (evt) => saveForm(evt, 'savePlace'));

