export {createCard, placesList}

import '../pages/index.css';
import {initialCards} from './cards'
import {profileSection, openImage} from './popup'
import {formEditProfile, formNewPlace} from './form'
import {switchLike} from './like'


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cityName, cityLink) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    cardImage.src = cityLink;
    cardImage.alt = cityName;
    cardElement.querySelector('.card__title').textContent = cityName;

    cardElement.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('card__delete-button')) {
            deleteCard(cardElement);
          } else if (evt.target.classList.contains('card__image')) {
            openImage(evt.target)
          } else if (evt.target.classList.contains('card__like-button')) {
            switchLike(evt.target)
          }
    });

    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove()  
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placesList.append(createCard(item.name, item.link))
})


