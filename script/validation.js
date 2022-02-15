
//Функция валидности полей обоих форм
const checkInputValidity = (object, formElement, inputElement) => {//функция валидации инпута
    if (!inputElement.validity.valid) {//если инпут не валиден, то...
        showInputError(object, formElement, inputElement, inputElement.validationMessage);//показываем фенкцию с ошибками
        console.log('novalid');//вывожу для проверки и для себя валидно поле или нет
    } else {//если инпут валиден то...
        hideInputError(object, formElement, inputElement);//вывожу функцию где скрываю все ошибки
        console.log('valid');//вывожу для проверки и для себя валидно поле или нет
    }
};

//Функция демонстрации ошибок при невалидности поля
const showInputError = (object, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);//сделана как в вэбинаре переменная куда подставляются стандартные браузерные ошибки
    errorElement.textContent = errorMessage;//добавление класслистов с ошибками и стандартных ошибок
    inputElement.classList.add(object.inputErrorClass);
    errorElement.classList.add(object.errorClass);
    };

//Функция скрытия ошибок при валидности поля 
const hideInputError = (object, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);//сделана как в вэбинаре переменная куда подставляются стандартные браузерные ошибки
    errorElement.textContent = '';//удаление класслистов с ошибками и стандартных ошибок
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
    };

//Основная функция валидации
const enableValidation = (object) => {//ищем массив с формами - секции и перебираем его
    const formList = Array.from(document.querySelectorAll(object.formSelector));//записываем массив в переменную, нахожу все формы
    console.log(object.formSelector);
    formList.forEach((formElement) => {//проходим по массиву
        formElement.addEventListener('submit', (event) =>{//присваиваем каждому элементу сабмит и сбрасываем настройки
            event.preventDefault();//Сброс настроек
            console.log('submitOK');//Вывожу в консоль для проверки работоспособности, для себя
        });
    });
    const fieldsetList = Array.from(document.querySelectorAll(object.sectionSelector));//нахожу все секции изаписываю в переменную
    fieldsetList.forEach((fieldSet) => {//прохожу по массиву
    setEventListeners(object, fieldSet);//на каждом элементе вызываю функцию 
    });
};

//функция проверки валидности списка, необходима для активации-дефктивации кнопки
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
    return !inputElement.validity.valid;
    })
}

//общая функция работы с инпутами
const setEventListeners = (object, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));//находим все инпуты
    const buttonElement = formElement.querySelector(object.submitButtonSelector);  // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(object, inputList, buttonElement);//функция активации или деактивации кнопки 
    inputList.forEach((inputElement) => {//проходим по массиву
        inputElement.addEventListener('input', function () {//присваиваем каждому найденному инпуту
        checkInputValidity(object, formElement, inputElement);//Проверяем валидность формы
        toggleButtonState(object, inputList, buttonElement);//Включаем или отключаем кнопку
        });
    });
};

//Функция активации - деактивации кнопки
function toggleButtonState(object, inputList, buttonElement) {//подаем два аргумента
    if (hasInvalidInput(inputList)) {//если сама форма валидна, то...
        buttonElement.classList.add(object.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);//деактивирую кнопку атрибутом
    } else {
        buttonElement.classList.remove(object.inactiveButtonClass);//если сама форма валидна, то...
        buttonElement.removeAttribute('disabled');//активирую кнопку удалением атрибута
    }
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_line_error',
    errorClass: 'error-message_visible',
    sectionSelector: '.popup__section'
});

/*--------------------------*/

/*
//Функция валидности полей обоих форм
const checkInputValidity = (object, formElement, inputElement) => {//функция валидации инпута
    if (!inputElement.validity.valid) {//если инпут не валиден, то...
        showInputError(object, formElement, inputElement, inputElement.validationMessage);//показываем фенкцию с ошибками
        console.log('novalid');//вывожу для проверки и для себя валидно поле или нет
    } else {//если инпут валиден то...
        hideInputError(object, formElement, inputElement);//вывожу функцию где скрываю все ошибки
        console.log('valid');//вывожу для проверки и для себя валидно поле или нет
    }
};

//Функция демонстрации ошибок при невалидности поля
const showInputError = (object, formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);//сделана как в вэбинаре переменная куда подставляются стандартные браузерные ошибки
    errorElement.textContent = errorMessage;//добавление класслистов с ошибками и стандартных ошибок
    inputElement.classList.add(object.inputErrorClass);
    errorElement.classList.add(object.errorClass);
    };

//Функция скрытия ошибок при валидности поля 
const hideInputError = (object, formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);//сделана как в вэбинаре переменная куда подставляются стандартные браузерные ошибки
    errorElement.textContent = '';//удаление класслистов с ошибками и стандартных ошибок
    inputElement.classList.remove(object.inputErrorClass);
    errorElement.classList.remove(object.errorClass);
    };

//Основная функция валидации
const enableValidation = (object) => {//ищем массив с формами - секции и перебираем его
    const formList = Array.from(document.querySelectorAll(object.formSelector));//записываем массив в переменную, нахожу все формы
    console.log(object.formSelector);
    formList.forEach((formElement) => {//проходим по массиву
        formElement.addEventListener('submit', (event) =>{//присваиваем каждому элементу сабмит и сбрасываем настройки
            event.preventDefault();//Сброс настроек
            console.log('submitOK');//Вывожу в консоль для проверки работоспособности, для себя
        });
    });
    const fieldsetList = Array.from(document.querySelectorAll(object.sectionSelector));//нахожу все секции изаписываю в переменную
    fieldsetList.forEach((fieldSet) => {//прохожу по массиву
    setEventListeners(object, fieldSet);//на каждом элементе вызываю функцию 
    });
};

//функция проверки валидности списка, необходима для активации-дефктивации кнопки
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
    return !inputElement.validity.valid
    })
}

//общая функция работы с инпутами
const setEventListeners = (object, formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));//находим все инпуты
    const buttonElement = formElement.querySelector(object.submitButtonSelector);  // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(object, inputList, buttonElement);//функция активации или деактивации кнопки 
    inputList.forEach((inputElement) => {//проходим по массиву
        inputElement.addEventListener('input', function () {//присваиваем каждому найденному инпуту
        checkInputValidity(object, formElement, inputElement);//Проверяем валидность формы
        toggleButtonState(object, inputList, buttonElement);//Включаем или отключаем кнопку
        });
    });
};

//Функция активации - деактивации кнопки
function toggleButtonState(object, inputList, buttonElement) {//подаем два аргумента
    if (hasInvalidInput(inputList)) {//если сама форма валидна, то...
        buttonElement.classList.add(object.inactiveButtonClass)
        buttonElement.setAttribute('disabled', true);//деактивирую кнопку атрибутом
    } else {
        buttonElement.classList.remove(object.inactiveButtonClass)//если сама форма валидна, то...
        buttonElement.removeAttribute('disabled');//активирую кнопку удалением атрибута
    }
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_line_error',
    errorClass: 'error-message_visible',
    sectionSelector: '.popup__section'
});*/
