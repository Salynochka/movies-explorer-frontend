import React from "react";

function PopupWithForm({isOpen, onClose, name, title, onSubmit, buttonText, children}) {
  return (
    <section
      className={`popup popup-${name} ${isOpen && "popup_opened"}`}
    >
      <div className={`popup__container popup-${name}__container`}>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__heading">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="popup__form popup-update__form"
          name={`information-${name}`}
        >
          {children}
          <button className="popup__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
