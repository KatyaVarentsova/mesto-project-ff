const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: 'c310cc05-9bfe-4706-9faa-1ec28ad96a9b',
        'Content-Type': 'application/json'
    }
}

const gettingResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

//Эта проверка на картинку не работает для изображений из Пинтерест. Можно ли это обойти? 
//Ошибка CORS не пропускает ещё какие-то изображения 
function isValidImageUrl(url) {
    return fetch(url, {
        method: 'HEAD'
    })
        .then(response => {
            const contentType = response.headers.get('Content-Type');
            return response.ok && contentType && contentType.startsWith('image/');
        })
        .catch(() => false);
}

//Получаем информацию о пользователе 
function userInformation() {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => gettingResponse(res))
}

//загрузка всех карточек 
function loadingCards() {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: {
            authorization: config.headers.authorization
        }
    })
        .then(res => gettingResponse(res))
}

//сохранения изменения профиля 
function editingProfile(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(res => gettingResponse(res))
}

//сохранение новой карточки 
function addingNewCards(name, link) {
    return isValidImageUrl(link).then(isValid => {
        if (!isValid) {
            console.log('Ошибка: указанная ссылка не является изображением.');
        } else {
            return fetch(`${config.baseUrl}/cards`, {
                method: 'POST',
                headers: config.headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
                .then(res => gettingResponse(res))
        }
    })
}

//удаление карточки
function deleteMyCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => gettingResponse(res))
}

//сохранение лайка
function putLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => gettingResponse(res))
}

//удаление лайка
function deleteLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => gettingResponse(res))
}

//изменения Аватара
function changeAvatar(avatar) {
    return isValidImageUrl(avatar).then(isValid => {
        if (!isValid) {
            console.log('Ошибка: указанная ссылка не является изображением.');
        } else {
            return fetch(`${config.baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: config.headers,
                body: JSON.stringify({
                    avatar: avatar
                })
            })
                .then(res => gettingResponse(res))
        }
    })
}

export { userInformation, loadingCards, editingProfile, addingNewCards, deleteMyCard, putLike, deleteLike, changeAvatar }