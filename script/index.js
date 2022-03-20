/*----- Импорты с других файлов -------------------------------------------------------------------- */

import {initialCards} from "./cards.js"
import {FormValidator} from "./FormValidator.js"
import {popupFigure, openPopup, closePopupKeyup, closePopupOverlay} from './utils.js'
import Card from './Card.js'

/*----- Все константы проекта ---------------------------------------------------------------------- */

const popupProfile = document.querySelector('.popup_type_profile');
const popupProfileForm = document.querySelector('.popup__form-profile');
const popupProfileTitle = document.querySelector('.profile__title');
const popupProfileSubtitle = document.querySelector('.profile__subtitle');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupProfileClose = document.querySelector('.popup__close_profile');
const popupProfileInputName = document.querySelector('.popup__input_place_name');
const popupProfileInputAbout = document.querySelector('.popup__input_place_about');
const popupAddCardImage = document.querySelector('.popup_type_add-card');
const popupOpenImage = document.querySelector('.profile__add-button');
const popupCloseImage = document.querySelector('.popup__close_image');
const popupFormImage = document.querySelector('.popup__form-image');
const popupInputNameImage = document.querySelector('.popup__input_place_place');
const popupInputLinkImage = document.querySelector('.popup__input_place_link');
const popupFigureClose = document.querySelector('.popup__close_figure');
const elements = document.querySelector('.elements');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_line_error',
    errorClass: 'error-message_visible',
    sectionSelector: '.section'
    }
const editProfileValidator = new FormValidator(validationConfig, popupProfileForm);
const addCardValidator = new FormValidator(validationConfig, popupFormImage);

/*------- Валидация форм -------------------------------------------------------------------------------*/

editProfileValidator.enableValidation();
addCardValidator.enableValidation();

/*---  Кнопки -----------------------------------------------------------------------------------------*/

popupProfileOpen.addEventListener('click', openPopupEditProfile);//кнопка открытия попапа редактирования профиля
popupProfileClose.addEventListener('click', () => closePopup(popupProfile));//кнопка закрытия попапа редактирования профиля
popupProfileForm.addEventListener('submit', handleProfilePopupSubmit);//кнопка сохранения формы попапа редактирования профиля
popupOpenImage.addEventListener('click', () => {
    openPopup(popupAddCardImage);
    addCardValidator.resetError();
});
popupCloseImage.addEventListener('click', () => closePopup(popupAddCardImage));//кнопка закрытия попапа добавления фото
popupFormImage.addEventListener('submit', handleCardFormSubmit);//кнопка сохранения формы попапа добавления фото
popupFigureClose.addEventListener('click', () => closePopup(popupFigure));//Кнопка закрытия 3 попапа

/*--- Функции  -----------------------------------------------------------------------------------------*/

/* Фуккция открытие попапа редактирования профиля */
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
};
/* Фуккция создания карточек скалвсса кард */
function createCard(item) {
    return new Card (item, '.template__item').getCardElement();
}
/* Фуккция добавления карточек */
function addCard(item) {
    elements.prepend(createCard(item));
}
/* Фуккция добавления карточек из массива */
function renderCards() {
    initialCards.forEach(addCard);
}
/* Фуккция на сабмит карточек добавления */
function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: popupInputNameImage.value,
        link: popupInputLinkImage.value
    };
    initialCards.push(newCard);
    addCard(newCard);
    const button = popupFormImage.querySelector('.popup__save');
    button.setAttribute('disabled', true);
    button.classList.add('popup__save_disabled');
    popupInputNameImage.value = '';
    popupInputLinkImage.value = '';
    closePopup(popupAddCardImage);
}
/* Фуккция закрытия попапа по клику или оверлею */
function closePopup (element) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keyup', closePopupKeyup);
    document.removeEventListener('click', closePopupOverlay);
}

renderCards()