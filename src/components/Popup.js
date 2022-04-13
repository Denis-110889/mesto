import { ESC_CODE } from '../utils/constants.js'

export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._closeButton = this._popup.querySelector('.popup__close');
    };

    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    };

    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
    };

    _handleEscClose(evt){
        if (evt.key === ESC_CODE) {            
            this.close(); 
    }};

    setEventListeners(){
        this._popup.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('popup') || e.target === this._closeButton){
                this.close(); 
            };
        });
    };
};