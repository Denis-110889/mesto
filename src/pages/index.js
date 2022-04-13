import { validationConfig, popupOpenImage, popupProfileOpen, popupProfileInputAbout, popupProfileInputName,
    popupFormImage, popupProfileForm, popupFormAvatar, popupOpenAvatar} from "../utils/constants.js"
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import {FormValidator} from "../components/FormValidator.js"
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section.js'
import Card from '../components/Card.js'
import { api } from '../utils/API.js'
import { PopupWithConfirm } from '../components/PopupWithConfirm.js'

import '../pages/index.css'; //закоментировать при редактировании

const editProfileValidator = new FormValidator(validationConfig, popupProfileForm);
const addCardValidator = new FormValidator(validationConfig, popupFormImage);
const formAvatarValidator = new FormValidator(validationConfig, popupFormAvatar);

const section = new Section ({items: [], renderer: renderCard}, '.elements');
const userInfo = new UserInfo ({profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle', avatarElementSelector: '.profile__avatar'});

const imagePopup = new PopupWithImage('.popup_type_figure');
const editProfilePopup = new PopupWithForm('.popup_type_profile', handleProfilePopupSubmit);
const addCardPopup = new PopupWithForm('.popup_type_add-card', handleCardFormSubmit);
const popupAvatar = new PopupWithForm ('.popup_type_avatar', handleAvatarFormSubmit);
const confirmPopup = new PopupWithConfirm ('.popup_type_delete');

let userId 

editProfileValidator.enableValidation();
addCardValidator.enableValidation();
formAvatarValidator.enableValidation();

editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
confirmPopup.setEventListeners();
imagePopup.setEventListeners();
popupAvatar.setEventListeners();

popupProfileOpen.addEventListener('click', openPopupEditProfile);
popupOpenImage.addEventListener('click', () => {
    addCardPopup.open();
    addCardValidator.resetValidation();
});
popupOpenAvatar.addEventListener('click', handleClickOpenAvatarPopup)

/* функция отображения данных на странице */
function renderPage() {
    Promise.all([api.getProfile(), api.getInitialCards()])
        .then(res => {
            console.log(res[1])
            userInfo.setUserInfo(res[0].name, res[0].about)
            userId = (res[0]._id)
            userInfo.setAvatar(res[0])
            section.renderItem(res[1])
        })
        .catch(err => console.log("Не удалось загрузить страницу:", err))
};

/* Фуккция добавления карточек */
function renderCard (data) {
    const card = createCard({
            name: data.name,
            link: data.link,
            likes: data.likes,
            id: data._id,
            userId: userId,
            ownerId: data.owner._id
    });
    section.addItem(card);
};

/* Фуккция открытие попапа аватара профиля */
function handleClickOpenAvatarPopup() {
    popupAvatar.open();
    formAvatarValidator.resetValidation();
};

/* Фуккция открытие попапа редактирования профиля */
function openPopupEditProfile() {
    const { name, job } = userInfo.getUserInfo();
    popupProfileInputName.value = name;
    popupProfileInputAbout.value = job;
    editProfilePopup.open();
};

/* Фуккция сохранения данных профиля */
function handleProfilePopupSubmit(data) {
    editProfilePopup.loaderInfo(true)
    const {nameProfile, aboutProfile} = data;
    api.editProfile(nameProfile, aboutProfile)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
            editProfilePopup.close()
        })
        .catch (err => console.log(err))
        .finally (() => editProfilePopup.loaderInfo(false))
};

/* Функция Изменения картинки аватара */
function handleAvatarFormSubmit(data){
    popupAvatar.loaderInfo(true)
    api.editUserAvatar(data.avatar)
    .then((res) => {
        userInfo.setAvatar(res)
        popupAvatar.close()
    })
    .catch(err => console.log(err))
    .finally(() => popupAvatar.loaderInfo(false));
};

/* Фуккция на сабмит добавления карточек */
function handleCardFormSubmit(data) {
    addCardPopup.loaderInfo(true)
    api.addCard(data['namePlace'], data['UrlPlace'])
        .then((res) => {
            renderCard(res)
            addCardPopup.close();
        })
        .catch (err => console.log(err))
        .finally (() => addCardPopup.loaderInfo(false))
    };

/* Фуккция создания карточек */
function createCard(data) {
    const card = new Card (
        data,
        '.template__item', 
        () =>{
            imagePopup.open(data.name, data.link);
        },
        (id) => {
            confirmPopup.open()
            confirmPopup.changeSubmitHandler(() => {
                api.deleteCard(id)
                .then(res => {
                    card.removeCard()
                    confirmPopup.close()
                })
                .catch (err => console.log(err))
            })
        },
        (id) => {
            if(card.isLiked()){
                api.deleteLike(id)
            .then(res =>{
                card.setLikes(res.likes)
            })
            .catch (err => console.log(err))
            } else {
                api.addLike(id)
                .then(res =>{
                    card.setLikes(res.likes)
                })
                .catch (err => console.log(err))
            }
        }
        )
        return card.getCardElement();
};

renderPage()

