
/*  Общие объекты */

let popup = document.querySelector('.popup');

/* Объекты кнопок */

let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = popup.querySelector('.popup__close');

/* Объект получения данных профиля */

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

/* Объект строки ввода */

let popupName = document.querySelector('.popup_input_name');
let popupAbout = document.querySelector('.popup_input_about');





/* Фуккция открытие модального окна */

function openPopup() {
    popupName.value = profileTitle.textContent;
    popupAbout.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}

/* Фуккция закрытия модального окна */

function closePopup() {
    popup.classList.remove('popup_opened');
}

/* Фуккция сохранения данных профиля */

function profilePopupSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = `${popupName.value}`;
    profileSubtitle.textContent = `${popupAbout.value}`;
    closePopup();

}



/* Кнопки и слушатели событий */

popupOpen.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);
popup.addEventListener('submit', profilePopupSubmit);