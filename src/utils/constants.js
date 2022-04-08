export const popupFigureFigcaption = document.querySelector('.popup__figcaption');
export const popupFigureImage = document.querySelector('.popup__image');
export const popupFigure = document.querySelector('.popup_type_figure');
export const ESC_CODE = 'Escape';
export const popupProfileForm = document.querySelector('.popup__form-profile');
export const popupFormImage = document.querySelector('.popup__form-image');
export const popupProfileInputName = document.querySelector('.popup__input_place_name');
export const popupProfileInputAbout = document.querySelector('.popup__input_place_about');
export const popupProfileOpen = document.querySelector('.profile__edit-button');
export const popupOpenImage = document.querySelector('.profile__add-button');
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_line_error',
    errorClass: 'error-message_visible',
    sectionSelector: '.section'
    };
//Подключение проекта к серверу
export const optionsAPI = {
    baseURL: 'https://mesto.nomoreparties.co/v1/cohort-39/',
    headers: {
        authorization: 'a4e71077-2ead-4b23-b808-4b2822c2c13e',
        'Content-Type': 'application/json'
    }
}
export const openPopup = (element) => {
    element.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupKeyup);
    document.addEventListener('mousedown', closePopupOverlay);
};
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
    
];