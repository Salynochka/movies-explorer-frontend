//Валидация
export class FormValidator {
  constructor(variablesForValidation, form){
    this._variablesForValidation = variablesForValidation;
    this._form = form;
    this._inputList =  Array.from(this._form.querySelectorAll(this._variablesForValidation.inputSelector));
    this._buttonSubmit = this._form.querySelector(this._variablesForValidation.submitButtonSelector)
  }

  _showError (errorText, validationMessage) {
    errorText.textContent = validationMessage;
    errorText.classList.add(this._variablesForValidation.errorActiveClass);
  }
  
  _hideError(errorText) {
    errorText.classList.remove(this._variablesForValidation.errorActiveClass);
    errorText.textContent = ''
  }
  
  _disableButton(buttonSubmit) {
    buttonSubmit.classList.add(this._variablesForValidation.inactiveButtonClass);
    buttonSubmit.disabled = true;
  }
  
  _enableButton(buttonSubmit) {
    buttonSubmit.classList.remove(this._variablesForValidation.inactiveButtonClass);
    buttonSubmit.disabled = false;
  }
  
  _checkInputValidity (input) {
    const errorText = this._form.querySelector(`${this._variablesForValidation.inputErrorTemplate}${input.name}`)
    if (!input.validity.valid) {
      this._showError(errorText, input.validationMessage);
      input.classList.add(this._variablesForValidation.errorPopupItemClass);
    } else {
      this._hideError(errorText);
      input.classList.remove(this._variablesForValidation.errorPopupItemClass);
    }
  }
  
  _hasInvalidInput() {
    return Array.from(this._inputList).some((input) => !input.validity.valid);
  }
  
  toggleButtonState() {
    if (!this._hasInvalidInput(this._inputList)){
      this._enableButton(this._buttonSubmit)
    } else {
      this._disableButton(this._buttonSubmit)
    }
  }
  
  resetValidation() {
    this.toggleButtonState();

    this._inputList.forEach((input) => {
      const errorText = this._form.querySelector(`${this._variablesForValidation.inputErrorTemplate}${input.name}`)
      this._hideError(errorText);
      input.classList.remove(this._variablesForValidation.errorPopupItemClass);
    });
  }
  
  _setEventListeners () {
    this._form.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    })
    
    this.toggleButtonState()
  
    this._inputList.forEach((input) => {
      input.addEventListener('input', () =>{
        this._checkInputValidity(input)
        this.toggleButtonState();
      })
    })
  }
  
  enableValidation () {
      this._setEventListeners()  
  }
}