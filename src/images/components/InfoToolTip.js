import React from "react";
import success from "../images/success.svg";
import error from "../images/error.svg";


function InfoToolTip(props) {
  return (
    <section
      className={`popup-info ${props.isOpen && "popup_opened"}`}
    >
      <div className={`popup-info__container`}>
        <button
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <img className="popup-info__img" src={props.isSuccessful ? success : error} alt={props.isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}/>
        <h2 className="popup-info__heading">{props.isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}</h2>
      </div>
    </section>
  );
}

export default InfoToolTip;