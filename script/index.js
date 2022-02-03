const initialCards = [
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

/*----- Объекты --------------------------------------------------------- */

const popup = document.querySelector('.popupContent');
const popupForm = popup.querySelector('.popup__form');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupImage = document.querySelector('.popupImage');
const popupOpenImage = document.querySelector('.profile__add-button');
const popupCloseImage = document.querySelector('.popupImage__close');
const popupImageForm = document.querySelector('.popupImage__form');
const elementsSection = document.querySelector('.elements');
const template = document.querySelector('.template__item').content;
const popupOpen = document.querySelector('.profile__edit-button');
const popupClose = document.querySelector('.popup__closeContent');
const popupName = document.querySelector('.popup__input_place_name');//инпут имя профиля
const popupAbout = document.querySelector('.popup__input_place_about');//инпут о себе попап 1
const popupNameImage = document.querySelector('.popup__input_place_place');//инпут места во 2 попапе
const popupLinkImage = document.querySelector('.popup__input_place_link');//инпут ссылки 2 попапа
const nameCardElement = document.querySelector('.element__title');
const popupFigure = document.querySelector('.popupFigure');//Элемент 3 общий блок
const popupFigureImage = document.querySelector('.popupFigure__image');//Элемент 3 попапа изображение
const figcaption = document.querySelector('.popupFigure__figcaption');//Элемент 3 подпись к изображению
const popupCloseFigure = document.querySelector('.popup__closeFigure');//Элемент 3 попапа кнопка закрытия

/*---  Кнопки ----------------------------------------------------------*/

popupOpen.addEventListener('click', openPopup);//кнопка открытия попапа редактирования профиля
popupClose.addEventListener('click', closePopup);//кнопка закрытия попапа редактирования профиля
popupForm.addEventListener('submit', profilePopupSubmit);//кнопка сохранения формы попапа редактирования профиля
popupOpenImage.addEventListener('click', openPopupImage);//кнопка открытия попапа добавления фото
popupCloseImage.addEventListener('click', closePopup);//кнопка закрытия попапа добавления фото
popupImageForm.addEventListener('submit', cardSubmitImage);//кнопка сохранения формы попапа добавления фото
popupCloseFigure.addEventListener('click', closePopup);//Кнопка закрытия 3 попапа

/* Фуккция открытие попапа редактирования профиля */
function openPopup() {
    popupName.value = profileTitle.textContent;
    popupAbout.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}
/* Фуккция закрытия попапа редактирования профиля */
function closePopup() {
    popup.classList.remove('popup_opened');
    popupImage.classList.remove('popupImage_opened');
    popupFigure.classList.remove('popupFigure_activ');
}
/* Фуккция открытие попапа для добавления изображений */
function openPopupImage() {
    popupImage.classList.add('popupImage_opened');
    popupNameImage.value = '';//очистим форму 
    popupLinkImage.value = '';//очистим форму
}
/* Фуккция сохранения данных профиля */
function profilePopupSubmit(event) {
    event.preventDefault();
    profileTitle.textContent = `${popupName.value}`;
    profileSubtitle.textContent = `${popupAbout.value}`;
    closePopup();
}
/* Фуккция открытие попапа увеличения изображения */
function openPopapCardIncrease() {
    popupFigure.classList.add('popupFigure_activ');//Добавляю класс для открытия попапа
}
/* Функция добавления карточек из массива и добавление карточек пользователем */
function cardSubmitImage(evt) {// буду вешать эту функцию на сабмит формы
    evt.preventDefault();
    const oneElement = savePopupImage(popupNameImage.value, popupLinkImage.value);//Подаем на вход значение с инпутов
    prependOneElement(elementsSection, oneElement);//Функция добавления элемента в начало списка где 1 куда подаем 2 что подаем  
    closePopup();//закрытие попапа 
}
/* Функция клонирования и наполнения карточек */
function savePopupImage(NameImage, LinkImage) {//принимаем на вход 2параметра имя и ссылку
    const oneElement = template.cloneNode(true);//клонируем со всем содержимым и записывваем в переменную
    oneElement.querySelector('.element__image').src = LinkImage;//берем значения инпута для линка
    oneElement.querySelector('.element__image').alt = NameImage;//берем значение импута для текста
    oneElement.querySelector('.element__title').textContent = NameImage;//альт для картинки равен имени картинки
    //решил добавить слушатели элементов в саму функцию, пробовал отдельно, но тогда удаление элементов и лайки не срабатывали на новых карточках
    oneElement.querySelector('.element__button').addEventListener('click', cardLike);//кнопка лайк
    oneElement.querySelector('.element__image').addEventListener('click', cardIncrease);//элемент изображения для открытия 3 попапа
    oneElement.querySelector('.element__trash').addEventListener('click', cardRemove);//корзина 
    return oneElement;
}
/* Функция добавления какого-либо объекта в начало списка */
function prependOneElement(list, object) {//2 параметра на вход сам список куда добавить и объект в нашем случае oneElement
    list.prepend(object);//тело функции добавляет объект в начало списка
}
/* Функция добавления какого-либо объекта в конец списка */
function appendOneElement(list, object) {//2 параметра на вход сам список куда добавить и объект в нашем случае oneElement
    list.append(object);//тело функции добавляет объект в конец списка
}
/* Загрузка карточек из массива initialCards при открыитие страницы */
initialCards.forEach((card) => {//перебор массива и добавление элементов массива 
    const oneElement = savePopupImage(card.name, card.link);
    appendOneElement(elementsSection, oneElement);
});
/* Функция лайков карточек */
function cardLike(event) {
    event.target.classList.toggle('element__button_active');//активирую и убираю класс по нажатию при наведении 
}
/* Функция удаления карточек */
function cardRemove(event) {
    event.target.closest('.element').remove();//Закрываю элемент и сразу удаляю 
}
/*Реализация увеличения изображения на весь экран до 75 процентов*/
function cardIncrease(event){
    figcaption.textContent = event.target.parentNode.querySelector('.element__title').textContent;//меняю подпись к картинке в зависимости от кликнутого
    popupFigureImage.alt = event.target.alt;//меняю альт в зависимости от кликнутого
    popupFigureImage.src = event.target.src;//меняю изображение в зависимости от кликнутого
    openPopapCardIncrease()
}