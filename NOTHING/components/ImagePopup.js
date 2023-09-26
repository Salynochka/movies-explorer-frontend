import React from "react";

function ImagePopup(props) {
  return (
    <section
      className={`popup popup-increase ${
        props.card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup-increase__container">
        <img
          className="popup-increase__photo"
          src={props.card.link}
          alt={props.card.name}
        />
        <button
          className="popup__button-close popup-increase__button-close"
          onClick={props.onClose}
          type="button"
        ></button>
        <h2 className="popup-increase__heading">{props.card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
