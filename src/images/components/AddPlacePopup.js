import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Создать"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input">
        <input
          type="text"
          className="popup__item popup__item_type_name"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleNameChange}
          value={name || ""}
          required
        />
        <span className="popup__form-error popup__form-error_type_name name-error" />
        <input
          type="url"
          className="popup__item popup__item_type_link"
          placeholder="Ссылка на картинку"
          name="link"
          onChange={handleLinkChange}
          value={link || ""}
          required
        />
        <span className="popup__form-error popup__form-error_type_link link-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
