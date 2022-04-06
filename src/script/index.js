import { PopupWithImage } from './PopupWithImage.js';
import { PopupWithForm } from './PopupWithForm.js';
import {FormValidator} from "./FormValidator.js";
import {initialCards} from "./cards.js";
import { UserInfo } from './UserInfo.js';
import { Section } from './Section.js';
import Card from './Card.js';

import '../pages/index.css';


const popupProfileForm = document.querySelector('.popup__form-profile');
const popupFormImage = document.querySelector('.popup__form-image');
const popupProfileInputName = document.querySelector('.popup__input_place_name');
const popupProfileInputAbout = document.querySelector('.popup__input_place_about');
const popupProfileOpen = document.querySelector('.profile__edit-button');
const popupOpenImage = document.querySelector('.profile__add-button');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_line_error',
    errorClass: 'error-message_visible',
    sectionSelector: '.section'
    };


const editProfileValidator = new FormValidator(validationConfig, popupProfileForm);
const addCardValidator = new FormValidator(validationConfig, popupFormImage);
const section = new Section ({items: initialCards, renderer: renderCard}, '.elements');
const imagePopup = new PopupWithImage('.popup_type_figure');
const addCardPopup = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
const editProfilePopup = new PopupWithForm('.popup_type_profile', handleProfilePopupSubmit);
const userInfo = new UserInfo ({profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle'});


editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();


popupProfileOpen.addEventListener('click', openPopupEditProfile);
popupOpenImage.addEventListener('click', () => {
    addCardPopup.open();
    addCardValidator.resetValidation();
});


/* Фуккция открытие попапа редактирования профиля */
function openPopupEditProfile() {
    const { name, job } = userInfo.getUserInfo();
    popupProfileInputName.value = name;
    popupProfileInputAbout.value = job;
    editProfilePopup.open();
};

/* Фуккция сохранения данных профиля */
function handleProfilePopupSubmit(data) {
    const {nameProfile, aboutProfile} = data;
    userInfo.setUserInfo(nameProfile, aboutProfile);
    editProfilePopup.close()
};

/* Фуккция на сабмит карточек добавления */
function handleCardFormSubmit(data) {
    const card =  createCard({
        name: data['namePlace'],
        link: data['UrlPlace']
    });
    section.addItem(card);
    addCardPopup.close();
};

/* Фуккция создания карточек класса кард */
function createCard(item) {
    return new Card (item, '.template__item', () =>{
        imagePopup.open(item.name, item.link);
    }).getCardElement();
};

/* Фуккция добавления карточек */
function renderCard(data, wrap) {
    const card = createCard(data);
    wrap.prepend(card);
};


section.renderItem();
