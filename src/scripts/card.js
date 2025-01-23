export {createCard}
const cardTemplate = document.querySelector('#card-template').content;


function createCard(cityName, cityLink, openImage) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = cityLink;
  cardImage.alt = cityName;
  cardElement.querySelector('.card__title').textContent = cityName;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function() { 
    deleteCard(cardElement)
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', function() {
    switchLike(likeButton)
  });

  cardImage.addEventListener('click', function () {
    openImage(cardImage)
  })

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove()  
}

function switchLike(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active')
  }