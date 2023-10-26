import React from "react";


function InfoPopup({isOpen, onClose, isSuccessful}) {
  return (
    <section
      className={`popup-info ${isOpen && "popup-info_opened"}`}
    >
      <div className={`popup-info__container`}>
        <button
          className="popup-info__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <h2 className={`popup-info__heading${isSuccessful ? "-green" : "-red"}`}>{isSuccessful ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз'}</h2>
      </div>
    </section>
  );
}

export default InfoPopup;