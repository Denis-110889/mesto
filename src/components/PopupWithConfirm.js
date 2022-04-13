import { Popup } from './Popup.js'

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, handleConfirmPopup) {
        super(popupSelector);
        this._handleConfirmPopup = handleConfirmPopup;
        this._confirmButton = this._popup.querySelector('.popup__save');
        this._confirm = this._confirm.bind(this);
    };

    _confirm() {
        this._handleConfirmPopup(this._cardId);
    };

    setEventListeners() {
        super.setEventListeners();
        this._confirmButton.addEventListener('click', this._confirm);
    };

    open(cardId) {
        super.open();
        this._cardId = cardId;
    };

    changeSubmitHandler(newSubmitHandler){
        this._handleConfirmPopup = newSubmitHandler;
    };
};