/*----- Объекты решил объединить по блокам --------------------------------------------------------- */

const popupProfile = document.querySelector('.popup_type_profile');//попап профиля
const popupProfileForm = document.querySelector('.popup__form-profile');
const popupProfileTitle = document.querySelector('.profile__title');
const popupProfileSubtitle = document.querySelector('.profile__subtitle');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupProfileClose = document.querySelector('.popup__close_profile');
const popupProfileInputName = document.querySelector('.popup__input_place_name');
const popupProfileInputAbout = document.querySelector('.popup__input_place_about');

const popupAddCardImage = document.querySelector('.popup_type_add-card');//попап добавления карточек
const popupOpenImage = document.querySelector('.profile__add-button');
const popupCloseImage = document.querySelector('.popup__close_image');
const popupFormImage = document.querySelector('.popup__form-image');
const popupInputNameImage = document.querySelector('.popup__input_place_place');
const popupInputLinkImage = document.querySelector('.popup__input_place_link');

const popupFigure = document.querySelector('.popup_type_figure');//попап увеличения изображений
const popupFigureImage = document.querySelector('.popup__image');
const popupFigureFigcaption = document.querySelector('.popup__figcaption');
const popupFigureClose = document.querySelector('.popup__close_figure');

const sectionForElements = document.querySelector('.elements');
const elementTitle = document.querySelector('.element__title');
const template = document.querySelector('.template__item').content;



/*---  Кнопки ----------------------------------------------------------*/

popupProfileOpen.addEventListener('click', openPopupEditProfile);//кнопка открытия попапа редактирования профиля
popupProfileClose.addEventListener('click', () => closePopup(popupProfile));//кнопка закрытия попапа редактирования профиля
popupProfileForm.addEventListener('submit', handleProfilePopupSubmit);//кнопка сохранения формы попапа редактирования профиля
popupOpenImage.addEventListener('click', () => openPopup(popupAddCardImage));//кнопка открытия попапа добавления фото
popupCloseImage.addEventListener('click', () => closePopup(popupAddCardImage));//кнопка закрытия попапа добавления фото
popupFormImage.addEventListener('submit', handleCardFormSubmit);//кнопка сохранения формы попапа добавления фото
popupFigureClose.addEventListener('click', () => closePopup(popupFigure));//Кнопка закрытия 3 попапа


/* Универсальная функция открытие попапов */ //У меня к Вам вопрос а можно ли использовать toggle - не станет ли она универсальной еще и на закрытие?
function openPopup(element){
    element.classList.add('popup_opened');
}
/* Универсальная функция закрытия попапов */ 
function closePopup(element){
    element.classList.remove('popup_opened');
}
/* Фуккция открытие попапа редактирования профиля - решил вывести в отдельную функцию так каесть доп параметры - универсальную функцию встроил внутрь */
function openPopupEditProfile() {
    popupProfileInputName.value = popupProfileTitle.textContent;
    popupProfileInputAbout.value = popupProfileSubtitle.textContent;
    openPopup(popupProfile);
}
/* Фуккция сохранения данных профиля */
function handleProfilePopupSubmit(event) {
    event.preventDefault();
    popupProfileTitle.textContent = `${popupProfileInputName.value}`;
    popupProfileSubtitle.textContent = `${popupProfileInputAbout.value}`;
    closePopup(popupProfile);
    popupProfileTitle.value = '';
    popupProfileSubtitle.value = '';
}
/* Функция добавления карточек из массива и добавление карточек пользователем */
function handleCardFormSubmit(evt) {// буду вешать эту функцию на сабмит формы
    evt.preventDefault();
    const cardElement = createCard(popupInputNameImage.value, popupInputLinkImage.value);//Подаем на вход значение с инпутов
    renderCard(sectionForElements, cardElement, true);//Функция добавления элемента в начало списка где 1 куда подаем 2 что подаем 
    closePopup(popupAddCardImage);//закрытие попапа 
    popupInputNameImage.value = '';
    popupInputLinkImage.value = '';
}
/* Функция клонирования и наполнения карточек */
function createCard(nameImage, linkImage) {//принимаем на вход 2параметра имя и ссылку
    const cardElement = template.cloneNode(true);//клонируем со всем содержимым и записывваем в переменную
    const cardImage = cardElement.querySelector('.element__image');
    cardImage.src = linkImage;//берем значения инпута для линка
    cardImage.alt = nameImage;//берем значение импута для текста
    cardElement.querySelector('.element__title').textContent = nameImage;//альт для картинки равен имени картинки
    //решил добавить слушатели элементов в саму функцию, пробовал отдельно, но тогда удаление элементов и лайки не срабатывали на новых карточках
    cardElement.querySelector('.element__button').addEventListener('click', likeCard);//кнопка лайк
    cardImage.addEventListener('click', () => handlePreviewPicture(nameImage, linkImage));//элемент изображения для открытия 3 попапа
    cardElement.querySelector('.element__trash').addEventListener('click', removeCard);//корзина 
    return cardElement;
}
/* Функция рендера кард в начало или в конец списка */
function renderCard(container, card, prepend){
    if (prepend){
        container.prepend(card);
    } else {
        container.append(card);
    }
}
/* Загрузка карточек из массива initialCards при открыитие страницы */
initialCards.forEach((card) => {//перебор массива и добавление элементов массива 
    const cardElement = createCard(card.name, card.link);
    renderCard(sectionForElements, cardElement, false);
});
/* Функция лайков карточек */
function likeCard(event) {
    event.target.classList.toggle('element__button_active');//активирую и убираю класс по нажатию при наведении 
}
/* Функция удаления карточек */
function removeCard(event) {
    event.target.closest('.element').remove();//Закрываю элемент и сразу удаляю 
}
/*Реализация увеличения изображения на весь экран до 75 процентов*/
function handlePreviewPicture(nameImage, linkImage){
    popupFigureFigcaption.textContent = nameImage;//меняю подпись к картинке в зависимости от кликнутого
    popupFigureImage.alt = nameImage;//меняю альт в зависимости от кликнутого
    popupFigureImage.src = linkImage;//меняю изображение в зависимости от кликнутого
    openPopup(popupFigure);
}
/* ------- Реализация функционала оверлея и кнопки ESC ------------------- */

popupProfile.addEventListener('click', closePopupOverlay);
popupAddCardImage.addEventListener('click', closePopupOverlay);
popupFigure.addEventListener('click', closePopupOverlay);
document.addEventListener('keyup', closePopupKeyup);

function closePopupKeyup (evt) {
    if (evt.key == 'Escape'){
        closePopup(popupProfile);
        closePopup(popupAddCardImage);
        closePopup(popupFigure);
    }
}

function closePopupOverlay (evt) {
    if (evt.target == popupProfile){
        closePopup(popupProfile);
    } else if (evt.target == popupAddCardImage){
        closePopup(popupAddCardImage);
    } else if (evt.target == popupFigure){
        closePopup(popupFigure);
    }
}

/* -------------------- резервная рабочая копия валидации формы ------------------- */
/*
//Функция валидности полей обоих форм
const checkInputValidity = (formElement, inputElement) => {//функция валидации инпута
    if (!inputElement.validity.valid) {//если инпут не валиден, то...
        showInputError(formElement, inputElement, inputElement.validationMessage);//показываем фенкцию с ошибками
        console.log('novalid');//вывожу для проверки и для себя валидно поле или нет
    } else {//если инпут валиден то...
        hideInputError(formElement, inputElement);//вывожу функцию где скрываю все ошибки
        console.log('valid');//вывожу для проверки и для себя валидно поле или нет
    }
};

//Функция демонстрации ошибок при невалидности поля
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);//сделана как в вэбинаре переменная куда подставляются стандартные браузерные ошибки
    errorElement.textContent = errorMessage;//добавление класслистов с ошибками и стандартных ошибок
    inputElement.classList.add('popup__input_line_error');
    errorElement.classList.add('error-message_visible');
    };

//Функция скрытия ошибок при валидности поля 
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);//сделана как в вэбинаре переменная куда подставляются стандартные браузерные ошибки
    errorElement.textContent = '';//удаление класслистов с ошибками и стандартных ошибок
    inputElement.classList.remove('popup__input_line_error');
    errorElement.classList.remove('error-message_visible');
    };

//Основная функция валидации
const enableValidation = () => {//ищем массив с формами - секции и перебираем его
    const formList = Array.from(document.querySelectorAll('.popup__form'));//записываем массив в переменную, нахожу все формы
    formList.forEach((formElement) => {//проходим по массиву
        formElement.addEventListener('submit', (event) =>{//присваиваем каждому элементу сабмит и сбрасываем настройки
            event.preventDefault();//Сброс настроек
            console.log('submitOK');//Вывожу в консоль для проверки работоспособности, для себя
            formElement.reset();//делаю очистку формы в конце
        });
    });
    const fieldsetList = Array.from(document.querySelectorAll('.popup__section'));//нахожу все секции изаписываю в переменную
    fieldsetList.forEach((fieldSet) => {//прохожу по массиву
    setEventListeners(fieldSet);//на каждом элементе вызываю функцию 
    });
};

//функция проверки валидности списка, необходима для активации-дефктивации кнопки
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
    return !inputElement.validity.valid
    })
}

//общая функция работы с инпутами
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));//находим все инпуты
    const buttonElement = formElement.querySelector('.popup__save');  // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement);//функция активации или деактивации кнопки 
    inputList.forEach((inputElement) => {//проходим по массиву
        inputElement.addEventListener('input', function () {//присваиваем каждому найденному инпуту
        checkInputValidity(formElement, inputElement);//Проверяем валидность формы
        toggleButtonState(inputList, buttonElement);//Включаем или отключаем кнопку
        });
    });
};

//Функция активации - деактивации кнопки
function toggleButtonState(inputList, buttonElement) {//подаем два аргумента
    if (hasInvalidInput(inputList)) {//если сама форма валидна, то...
        buttonElement.classList.add('popup__save_disabled')
        buttonElement.setAttribute('disabled', true);//деактивирую кнопку атрибутом
    } else {
        buttonElement.classList.remove('popup__save_disabled')//если сама форма валидна, то...
        buttonElement.removeAttribute('disabled');//активирую кнопку удалением атрибута
    }
}

enableValidation();
/*
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#error-${input.id}`);
    inputElement.classList.add('popup__save_disabled');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input_line_error');
};
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#error-${input.id}`);
    inputElement.classList.remove('popup__save_disabled');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input_line_error');
};
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid){
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        });
    });
};
function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid
    })
}
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save_disabled');
    } else { 
        buttonElement.classList.remove('popup__save_disabled');
    }
}
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) =>{
            event.preventDefault();
        });
    });
};
enableValidation ();

/*-----------------копия резерва от 16 00-----------------------------*/

/*function formSubmit (event) {//фуекция сброса настроек только одного сабмита
    event.preventDefault();//сбрасываем настройки по дефолту
}*/
/*
const checkInputValidity = (form, input) => {//валидация самой формы красная линия и сообщение об ошибке проверка инпута на валидность
    const errorMessage = form.querySelector(`#error-${input.id}`);//сообщение об ошибке в переменную    
    if (input.validity.valid) {//если поле валидное, то ...
        input.classList.remove('popup__input_line_error');//удаляем класс красной линии
        errorMessage.textContent = input.validationMessage;//нет ошибок - пустое поле
    } else {
        input.classList.add('popup__input_line_error');//добавляем класс красной линии
        errorMessage.textContent = input.validationMessage;//показываем ошибки
    }
}
const checkButtonValidity = (form, button) => {//форма активации кнопки при прохождении валидации инпутов
    if (form.checkValidity()) {//если форма валидна то....
        button.removeAttribute('disabled');//активирую кнопку удалением атрибута
        button.classList.remove('popup__save_disabled');//меняю стиль на активную кнопку
    } else {//условия если не валидна форма
        button.setAttribute('disabled', true);//деактивирую кнопку атрибутом
        button.classList.add('popup__save_disabled');//меня стили кнопки на неактивные
    }
}
function enableValidation (config) {//общая функция валидации
    const form = Array.from(document.querySelectorAll('.popup__form'));
    form.forEach((formElement) => {
        formElement.addEventListener('submit', (event) =>{
            event.preventDefault();
        });
    });
    checkButtonValidity(form, button);
    const inputs = form.querySelectorAll(config.InputSelector);//соберем все инпуты обоих форм
    inputs.forEach(input => {//переберем массив инпутов и назначим каждому слушатель
        input.addEventListener('input', (event) => {
        checkInputValidity(form, input);
        checkButtonValidity(form, button);
    });
    });
}
/*const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (event) =>{
            event.preventDefault();
        });
    });
};*/
/*
enableValidation({
    formSelector: '.popup__form',
    InputSelector: '.popup__input',
    buttonSelector: '.popup__save'
});

/*------------------------------------------------------------------------------------------------*/

/*function formSubmit (event) {//фуекция сброса настроек только одного сабмита
    event.preventDefault();//сбрасываем настройки по дефолту
}
const checkInputValidity = (form, input) => {//валидация самой формы красная линия и сообщение об ошибке проверка инпута на валидность
    const errorMessage = form.querySelector(`#error-${input.id}`);//сообщение об ошибке в переменную    
    if (input.validity.valid) {//если поле валидное, то ...
        input.classList.remove('popup__input_line_error');//удаляем класс красной линии
        errorMessage.textContent = input.validationMessage;//нет ошибок - пустое поле
    } else {
        input.classList.add('popup__input_line_error');//добавляем класс красной линии
        errorMessage.textContent = input.validationMessage;//показываем ошибки
    }
}
const checkButtonValidity = (form, button) => {//форма активации кнопки при прохождении валидации инпутов
    if (form.checkValidity()) {//если форма валидна то....
        button.removeAttribute('disabled');//активирую кнопку удалением атрибута
        button.classList.remove('popup__save_disabled');//меняю стиль на активную кнопку
    } else {//условия если не валидна форма
        button.setAttribute('disabled', true);//деактивирую кнопку атрибутом
        button.classList.add('popup__save_disabled');//меня стили кнопки на неактивные
    }
}
function enableValidation (config) {//общая функция валидации
    const form = document.querySelector(config.formSelector);
    const button = form.querySelector(config.buttonSelector)//достаем кнопку первого попапа
    checkButtonValidity(form, button);
    form.addEventListener('submit', formSubmit);//проверочный консоль лог
    const inputs = form.querySelectorAll(config.InputSelector);//соберем все инпуты обоих форм
    inputs.forEach(input => {//переберем массив инпутов и назначим каждому слушатель
        input.addEventListener('input', (event) => {
        checkInputValidity(form, input);
        checkButtonValidity(form, button);
    });
    });
}
enableValidation({
    formSelector: '.popup__form',
    InputSelector: '.popup__input',
    buttonSelector: '.popup__save'
});
*/