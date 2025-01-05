// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(cityName, cityLink) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardDelete = cardElement.querySelector('.card__delete-button')

    cardImage.src = cityLink;
    cardImage.alt = cityName;
    cardElement.querySelector('.card__title').textContent = cityName;

    cardElement.querySelector('.card__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('card__like-button_is-active')
    })

    cardDelete.addEventListener('click', function (evt) {
        deleteCards(evt.target)
    });

    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCards(cartButton) {
    cartButton.parentElement.remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
    placesList.append(addCard(item.name, item.link))
})