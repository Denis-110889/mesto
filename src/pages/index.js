import { validationConfig, popupOpenImage, popupProfileOpen, popupProfileInputAbout, popupProfileInputName,
    popupFormImage, popupProfileForm} from "../utils/constants.js"
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import {FormValidator} from "../components/FormValidator.js"
import { initialCards } from '../utils/cards.js'
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section.js'
import Card from '../components/Card.js'

import '../pages/index.css';

export const editProfileValidator = new FormValidator(validationConfig, popupProfileForm);//с валидацией проведу эксперимент, спасибо!
export const addCardValidator = new FormValidator(validationConfig, popupFormImage);
export const section = new Section ({items: initialCards, renderer: renderCard}, '.elements');
export const imagePopup = new PopupWithImage('.popup_type_figure');
export const addCardPopup = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
export const editProfilePopup = new PopupWithForm('.popup_type_profile', handleProfilePopupSubmit);
export const userInfo = new UserInfo ({profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle'});


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
function renderCard (data) {
    const card = createCard(data);
    section.addItem(card);//
};


section.renderItem();

/*немного не пойму как сделать функцию и прописать её в этом файле - эксперимент продолжу */