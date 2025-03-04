export { enableValidation, clearValidation }

//показывает ошибку ввода
const showInputError = (element, span, errorMessage) => {
    element.classList.add('popup__input-type-erorr');
    span.textContent = errorMessage;
    span.classList.add('form__input-error_active');
};

//скрывает ошибку ввода
const hideInputError = (element, span) => {
    element.classList.remove('popup__input-type-erorr');
    span.classList.remove('form__input-error_active');
}

const clearValidation = (popup) => {
    const inputs = popup.querySelectorAll(".popup__input")
    inputs.forEach((input) => {
        const spanErorr = popup.querySelector(`.${input.id}-error`);
        hideInputError(input, spanErorr)
    })
    toggleButtonState(Array.from(inputs), popup.querySelector('.popup__button'))
    
}

// проверка валидности 
const isValid = (inputElement, spanErorr) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(inputElement, spanErorr, inputElement.validationMessage)
    } else {
        hideInputError(inputElement, spanErorr)
    }
}

//имеет неверный ввод
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

//переключает состояние кнопки 
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}

//устанавливает прослушиватели событий 
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function(){
            const spanErorr = formElement.querySelector(`.${inputElement.id}-error`);
            isValid(inputElement, spanErorr)
            toggleButtonState(inputList, buttonElement);
        });
    })
  };

//включает проверку
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((form) => {
        setEventListeners(form)
    });
};