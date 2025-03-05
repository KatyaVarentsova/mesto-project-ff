export { enableValidation, clearValidation }

//показывает ошибку ввода
const showInputError = (element, span, errorMessage, validationConfig) => {
    element.classList.add(validationConfig.inputErrorClass);
    span.textContent = errorMessage;
    span.classList.add(validationConfig.errorClass);
};

//скрывает ошибку ввода
const hideInputError = (element, span, validationConfig) => {
    element.classList.remove(validationConfig.inputErrorClass);
    span.classList.remove(validationConfig.errorClass);
}

const clearValidation = (popup, validationConfig) => {
    const inputs = popup.querySelectorAll(validationConfig.inputSelector)
    inputs.forEach((input) => {
        const spanErorr = popup.querySelector(`.${input.id}-error`);
        hideInputError(input, spanErorr, validationConfig)
        input.setCustomValidity("");
    })
    toggleButtonState(Array.from(inputs), popup.querySelector(validationConfig.submitButtonSelector))
    
}

// проверка валидности 
const isValid = (inputElement, spanErorr, validationConfig) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(inputElement, spanErorr, inputElement.validationMessage, validationConfig)
    } else {
        hideInputError(inputElement, spanErorr, validationConfig)
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
const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function(){
            const spanErorr = formElement.querySelector(`.${inputElement.id}-error`);
            isValid(inputElement, spanErorr, validationConfig)
            toggleButtonState(inputList, buttonElement);
        });
    })
  };

//включает проверку
const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((form) => {
        setEventListeners(form, validationConfig)
    });
};