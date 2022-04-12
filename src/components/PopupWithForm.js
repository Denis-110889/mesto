import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleSubmit){
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__input')];
        this._values = {};
        this._submitButton = this._popup.querySelector('.popup__save');
    };

    _getInputValues() {
        this._inputs.forEach((input) => {
            this._values[input.name] = input.value;  
        });
        return this._values;
    };


    loaderInfo(isLoading, popup){
        if (isLoading) {
            this._submitButton.textContent = 'Сохранение...'
        } else {
            if (popup === 'add') {
                this._submitButton.textContent = 'Создать'
            } else {
                this._submitButton.textContent = 'Сохранить'
            };
        };
    };

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit', () =>{
            this._handleSubmit(this._getInputValues());
        });
    };

    close(){
        super.close();
        this._form.reset();
    };
};