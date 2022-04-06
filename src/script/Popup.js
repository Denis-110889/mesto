import { ESC_CODE } from './utils.js'

export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
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
        const closeButton = this._popup.querySelector('.popup__close')
        this._popup.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup') || e.target === closeButton){
                this.close(); 
            };
        });
    };
};