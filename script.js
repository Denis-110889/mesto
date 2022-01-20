
/*  Общие объекты */

let body = document.querySelector('.body');
let popup = document.querySelector('.popup');
let popupBody = document.querySelector('.popup__body');

/* Объекты кнопок */

let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = popup.querySelector('.popup__close');
let popupSave = popup.querySelector('.popup__save');

/* Объект получения данных профиля */

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

/* Объект строки ввода */

let popupName = document.querySelector('.popup__name');
let popupAbout = document.querySelector('.popup__about');

/* Функция данные в строку ввода */

function completion() {
    popupName.value = profileTitle.textContent;
    popupAbout.value = profileSubtitle.textContent;
}

/* Фуккция открытие модального окна */

function showClick() {
    completion();
    popup.classList.add('popup_opened');
}

/* Фуккция закрытия модального окна */

function closeClick() {
    popup.classList.remove('popup_opened');
}

/* Фуккция сохранения данных профиля */

function ReName() {
    profileTitle.textContent = `${popupName.value}`;
    profileSubtitle.textContent = `${popupAbout.value}`;
    closeClick();
    popupName.value = '';
    popupAbout.value = '';
}

/* Кнопки и слушатели событий */

popupOpen.addEventListener('click', showClick);
popupClose.addEventListener('click', closeClick);
popupSave.addEventListener('click', ReName);

/* Реализация закрытия модального окна при клике
по пустому экрану */

window.addEventListener("click", function(event) {
    if (event.target == popupBody) {
        popup.classList.remove('popup_opened');
    }
})