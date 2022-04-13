export default class Card {
    constructor(data, cardSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._handleDeleteClick = handleDeleteClick;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._handleLikeClick = handleLikeClick;
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
        this._cardElement.querySelector('.element__trash').addEventListener('click', () => this._handleDeleteClick(this._id));
        this._cardElement.querySelector('.element__button').addEventListener('click', () => this._handleLikeClick(this._id));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick();
        });
    };

    removeCard(){
        this._cardElement.remove();
        this._cardElement = null;
};

    setLikes(newLikes){
        this._likes = newLikes;
        const likeCountElement = this._cardElement.querySelector('.element__heart-value');
        likeCountElement.textContent = this._likes.length;
        if(this.isLiked()){
            this._handleActivLikeIcon();
        } else {
            this._handleDeactivateLikeIcon();
        }
};

    _handleActivLikeIcon(){
        this._cardElement.querySelector('.element__button').classList.add('element__button_active');
};

    _handleDeactivateLikeIcon(){
        this._cardElement.querySelector('.element__button').classList.remove('element__button_active');
};

    isLiked(){
        const userHasLikedCard = this._likes.find(user => user._id === this._userId);
        return userHasLikedCard;
    };

    getCardElement() {
        this._cardElement = this._getTemplate();
        this._cardImage = this._cardElement.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardElement.querySelector('.element__title').textContent = this._name;
        this._setEventListeners();
        this.setLikes(this._likes);
        if(this._ownerId !== this._userId){
            this._cardElement.querySelector('.element__trash').style.display ='none';
        };
        return this._cardElement;
};
};


