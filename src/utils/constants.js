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
export const popupFormAvatar = document.querySelector('.popup__form-avatar');
export const popupOpenAvatar = document.querySelector('.profile__avatar-button');
export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_line_error',
    errorClass: 'error-message_visible',
    sectionSelector: '.section'
    };
export const openPopup = (element) => {
    element.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupKeyup);
    document.addEventListener('mousedown', closePopupOverlay);
};
