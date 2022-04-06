
export const popupFigureFigcaption = document.querySelector('.popup__figcaption');
export const popupFigureImage = document.querySelector('.popup__image');
export const popupFigure = document.querySelector('.popup_type_figure');
export const ESC_CODE = 'Escape';

/* Фуккция открытие попапа идобавления слушателей */
export const openPopup = (element) => {
    element.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupKeyup);
    document.addEventListener('mousedown', closePopupOverlay);
};
