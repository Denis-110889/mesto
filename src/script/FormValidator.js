export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
    };

    enableValidation(){
    this._form.addEventListener('submit', (event) =>{
        event.preventDefault(); 
    });
        this._setEventListeners();
    };

    _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    };
};

    _showInputError(inputElement, errorMessage){
        const {inputErrorClass, errorClass} = this._settings;
        const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
        errorElement.textContent = errorMessage;
        inputElement.classList.add(inputErrorClass);
        errorElement.classList.add(errorClass);
    };

    _hideInputError(inputElement){
        const {inputErrorClass, errorClass} = this._settings;
        const errorElement = this._form.querySelector(`#error-${inputElement.id}`);
        errorElement.textContent = '';
        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
    };

    _setEventListeners(){
        const {inputSelector, submitButtonSelector} = this._settings;
        this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
        this._buttonElement = this._form.querySelector(submitButtonSelector);  
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState();
            });
        });
    };

    _toggleButtonState() {
        const {inactiveButtonClass} = this._settings
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(inactiveButtonClass);
            this._buttonElement.setAttribute('disabled', true);
        } else {
            this._buttonElement.classList.remove(inactiveButtonClass);
            this._buttonElement.removeAttribute('disabled');
        };
    };

    _hasInvalidInput() {
        return this._inputList.some(inputElement => {
        return !inputElement.validity.valid;
        });
    };

    resetValidation = () => {
        this._form.reset();
        this._toggleButtonState();
        this._inputList.forEach(inputElement => {
            this._hideInputError(inputElement)
        });
    };

};