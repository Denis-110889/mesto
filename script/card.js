import {popupFigureFigcaption, popupFigureImage, openPopup, popupFigure} from './utils.js'


export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._name = data.name;
        this._link = data.link;
    };

    _getTemplate(){
        const cardElements = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElements;
    };

    _setEventListeners () {//устанавливаю слушателей 
        this._cardElement.querySelector('.element__trash').addEventListener('click', () => this._removeCard());//на удаление
        this._cardElement.querySelector('.element__button').addEventListener('click', (evt) => this._likeCard(evt));//лайк карточек
        this._cardImage.addEventListener('click', () => {//увеличение изображения по клику
            this._handlePreviewPicture(this._name, this._link);
        });
    };

    _likeCard(evt){//функция лайка карточек
        evt.target.classList.toggle('element__button_active');
};

    _removeCard(){//функцияудаления карточек
        this._cardElement.remove();
};

    _handlePreviewPicture = () => {//функция увеличения изображенияпо клику
        popupFigureFigcaption.textContent = this._name;//меняю подпись к картинке в зависимости от кликнутого
        popupFigureImage.alt = this._name;//меняю альт в зависимости от кликнутого
        popupFigureImage.src = this._link;//меняю изображение в зависимости от кликнутого
        openPopup(popupFigure);
    };

    getCardElement() {//основнаяпубличная функциявклассе кард
        this._cardElement = this._getTemplate();//получениякард элемента из функции в зависимостиот того что надо получить
        this._likeButton = this._cardElement.querySelector('element__button');//кнопка лайка
        this._cardImage = this._cardElement.querySelector('.element__image');//изображение карточкм
        this._cardImage.src = this._link;//берем значения инпута для линка
        this._cardImage.alt = this._name;//берем значение импута для текста
        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        return this._cardElement;
};
};


















