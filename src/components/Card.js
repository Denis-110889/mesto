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

    _setEventListeners () {
        this._cardElement.querySelector('.element__trash').addEventListener('click', () => this._removeCard());
        this._cardElement.querySelector('.element__button').addEventListener('click', (evt) => this._likeCard(evt));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        });
    };

    _likeCard(evt){
        evt.target.classList.toggle('element__button_active');
};

    _removeCard(){
        this._cardElement.remove();
};

    getCardElement() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        return this._cardElement;
};
};