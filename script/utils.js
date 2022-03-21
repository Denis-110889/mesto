/*------- Общие константы -------------------------------------------------------------------------------*/

export const popupFigureFigcaption = document.querySelector('.popup__figcaption');
export const popupFigureImage = document.querySelector('.popup__image');
export const popupFigure = document.querySelector('.popup_type_figure');
export const ESC_CODE = 'Escape';

/*------- Общие функции -------------------------------------------------------------------------------*/

/* Фуккция открытие попапа идобавления слушателей */
export const openPopup = (element) => {
    element.classList.add('popup_opened');
    document.addEventListener('keyup', closePopupKeyup);
    document.addEventListener('mousedown', closePopupOverlay);
};
/* Фуккция закрытия поппапа по ЕСК */
export const closePopupKeyup = (evt) => {
    if (evt.key === ESC_CODE) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup); 
    };
};
/* Фуккция закрытия поппапа по оверлею */
export const closePopupOverlay = (evt) => {
    if (evt.target.classList.contains('popup')){
        closePopup(evt.target);
};
};
/* Фуккция закрытия поппапа и снятие слушателей */
export function closePopup (element){
    element.classList.remove('popup_opened');
    document.removeEventListener('mousedown', closePopupOverlay);
    document.removeEventListener('keyup', closePopupKeyup);
};