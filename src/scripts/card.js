export { createCard }
const cardTemplate = document.querySelector('#card-template').content;


function createCard(cityName, cityLink, openPopup, closePopup, openImage, myID, ownerID, deleteMyCard, cardId, likes, putLike, deleteLike) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = cityLink;
  cardImage.alt = cityName;
  cardElement.querySelector('.card__title').textContent = cityName;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (myID !== ownerID) {
    deleteButton.style.display = "none"
  } else {
    deleteButton.addEventListener('click', function () {
      deleteCard(openPopup, closePopup, cardElement, deleteMyCard, cardId)
    });
  }

  const likeButton = cardElement.querySelector('.card__like-button');
  const quantityLikes = cardElement.querySelector('.card__like-quantity');

  quantityLikes.textContent = likes.length
  if (likes.length !== 0) {
    if (Object.values(likes).some(item => item._id === myID)) {
      likeButton.classList.add('card__like-button_is-active')
    }
  }

  likeButton.addEventListener('click', function () {
    switchLike(likeButton, quantityLikes, putLike, deleteLike, cardId)
  });

  cardImage.addEventListener('click', function () {
    openImage(cardImage)
  })

  return cardElement;
}


const popupDeleteCard = document.querySelector(".popup_type_delete_card")
const buttonDeleteCard = popupDeleteCard.querySelector(".popup__button")
function deleteCard(openPopup, closePopup, cardElement, deleteMyCard, cardId) {
  console.log('nnn')
  openPopup(popupDeleteCard)
  buttonDeleteCard.addEventListener('click', function () {
    cardElement.remove()
    deleteMyCard(cardId)
      .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
        alert("Ошибка: потеряли связь с сервером. Попробуйте позже.");
      });
      closePopup(popupDeleteCard)
  })
}

function switchLike(likeButton, quantityLikes, putLike, deleteLike, cardId) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteLike(cardId)
      .then(({ likes }) => {
        quantityLikes.textContent = likes.length
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
        alert("Ошибка: потеряли связь с сервером. Попробуйте позже.");
      });
    likeButton.classList.remove('card__like-button_is-active')
  } else {
    putLike(cardId)
      .then(({ likes }) => {
        quantityLikes.textContent = likes.length
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
        alert("Ошибка: потеряли связь с сервером. Попробуйте позже.");
      });
    likeButton.classList.add('card__like-button_is-active')
  }

}