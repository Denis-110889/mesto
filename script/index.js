
/*----- Объекты решил объединить по блокам --------------------------------------------------------- */

const popupProfil = document.querySelector('.popup_type_profil');
const popupProfilForm = document.querySelector('.popup__form-profil');
const popupProfileTitle = document.querySelector('.profile__title');
const popupProfileSubtitle = document.querySelector('.profile__subtitle');
const popupProfilOpen = document.querySelector('.profile__edit-button');
const popupProfilClose = document.querySelector('.popup_close_profil');
const popupProfilInputName = document.querySelector('.popup__input_place_name');
const popupProfilInputAbout = document.querySelector('.popup__input_place_about');

const popupAddCardImage = document.querySelector('.popup_type_image');
const popupOpenImage = document.querySelector('.profile__add-button');
const popupCloseImage = document.querySelector('.popup_close_image');
const popupFormImage = document.querySelector('.popup__form-image');
const popupInputNameImage = document.querySelector('.popup__input_place_place');
const popupInputLinkImage = document.querySelector('.popup__input_place_link');

const popupFigure = document.querySelector('.popup_type_figure');
const popupFigureImage = document.querySelector('.popup__image');
const popupFigureFigcaption = document.querySelector('.popup__figcaption');
const popupFigureClose = document.querySelector('.popup_close_figure');

const sectionForElements = document.querySelector('.elements');
const elementTitle = document.querySelector('.element__title');
const template = document.querySelector('.template__item').content;


/*---  Кнопки ----------------------------------------------------------*/

popupProfilOpen.addEventListener('click', openPopupEditProfil);//кнопка открытия попапа редактирования профиля
popupProfilClose.addEventListener('click', () => closePopup(popupProfil));//кнопка закрытия попапа редактирования профиля
/*Подскажите пожалуйста вот есть такой пример popupProfilForm.addEventListener('submit', closedPopup(popupProfil))
я передаю такой параметр в функцию, но это функция не хочет работать, нашел на просторах инета документацию и рабочее решение, 
чтобы эта вся конструкция заработала, но если можно объясните мне почему все таки не запускается функция с параметром и как правильнее передать
параметр в саму функцию, ведь если я запускаю просто функцию она отрабатывает... */
popupProfilForm.addEventListener('submit', handleProfilePopupSubmit);//кнопка сохранения формы попапа редактирования профиля
popupOpenImage.addEventListener('click', () => openPopup(popupAddCardImage));//кнопка открытия попапа добавления фото
popupCloseImage.addEventListener('click', () => closePopup(popupAddCardImage));//кнопка закрытия попапа добавления фото
popupFormImage.addEventListener('submit', handleCardFormSubmit);//кнопка сохранения формы попапа добавления фото
popupFigureClose.addEventListener('click', () => closePopup(popupFigure));//Кнопка закрытия 3 попапа


/* Универсальная функция открытие попапов */ //У меня к Вам вопрос а можно ли использовать toggle - не станет ли она универсальной еще и на закрытие?
function openPopup(object){
    object.classList.add('popup_opened');
}
/* Универсальная функция закрытия попапов */ 
function closePopup(object){
    object.classList.remove('popup_opened');
}
/* Фуккция открытие попапа редактирования профиля - решил вывести в отдельную функцию так каесть доп параметры - универсальную функцию встроил внутрь */
function openPopupEditProfil() {
    popupProfilInputName.value = popupProfileTitle.textContent;
    popupProfilInputAbout.value = popupProfileSubtitle.textContent;
    openPopup(popupProfil);
}
/* Фуккция сохранения данных профиля */
function handleProfilePopupSubmit(event) {
    event.preventDefault();
    popupProfileTitle.textContent = `${popupProfilInputName.value}`;
    popupProfileSubtitle.textContent = `${popupProfilInputAbout.value}`;
    closePopup(popupProfil);
}
/* Функция добавления карточек из массива и добавление карточек пользователем */
function handleCardFormSubmit(evt) {// буду вешать эту функцию на сабмит формы
    evt.preventDefault();
    const cardElement = createCard(popupInputNameImage.value, popupInputLinkImage.value);//Подаем на вход значение с инпутов
    renderCard(sectionForElements, cardElement, true);//Функция добавления элемента в начало списка где 1 куда подаем 2 что подаем 
    popupInputNameImage.value = '';//очистим форму 
    popupInputLinkImage.value = '';//очистим форму
    closePopup(popupAddCardImage);//закрытие попапа 
}
/* Функция клонирования и наполнения карточек */
function createCard(nameImage, linkImage) {//принимаем на вход 2параметра имя и ссылку
    const cardElement = template.cloneNode(true);//клонируем со всем содержимым и записывваем в переменную
    const cardImage = cardElement.querySelector('.element__image');
    cardImage.src = linkImage;//берем значения инпута для линка
    cardImage.alt = nameImage;//берем значение импута для текста
    cardElement.querySelector('.element__title').textContent = nameImage;//альт для картинки равен имени картинки
    //решил добавить слушатели элементов в саму функцию, пробовал отдельно, но тогда удаление элементов и лайки не срабатывали на новых карточках
    cardElement.querySelector('.element__button').addEventListener('click', likeCard);//кнопка лайк
    cardImage.addEventListener('click', () => handlePreviewPicture(nameImage, linkImage));//элемент изображения для открытия 3 попапа
    cardElement.querySelector('.element__trash').addEventListener('click', removeCard);//корзина 
    return cardElement;
}
/* Функция рендера кард в начало или в конец списка */
function renderCard(container, card, prepend){
    if (prepend){
        container.prepend(card);
    } else {
        container.append(card);
    }
}
/* Загрузка карточек из массива initialCards при открыитие страницы */
initialCards.forEach((card) => {//перебор массива и добавление элементов массива 
    const cardElement = createCard(card.name, card.link);
    renderCard(sectionForElements, cardElement, false);
});
/* Функция лайков карточек */
function likeCard(event) {
    event.target.classList.toggle('element__button_active');//активирую и убираю класс по нажатию при наведении 
}
/* Функция удаления карточек */
function removeCard(event) {
    event.target.closest('.element').remove();//Закрываю элемент и сразу удаляю 
}
/*Реализация увеличения изображения на весь экран до 75 процентов*/
function handlePreviewPicture(nameImage, linkImage){
    popupFigureFigcaption.textContent = nameImage//меняю подпись к картинке в зависимости от кликнутого
    popupFigureImage.alt = nameImage;//меняю альт в зависимости от кликнутого
    popupFigureImage.src = linkImage;//меняю изображение в зависимости от кликнутого
    openPopup(popupFigure);
}