import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props) {
  const inputRef = React.useRef('');

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      children={
        <fieldset className="popup__input">
          <input
            type="url"
            className="popup__item popup__item_type_avatar"
            name="avatar"
            placeholder="Ссылка на аватар"
            ref={inputRef}
            required
          />
          <span className="popup__form-error popup__form-error_type_avatar avatar-error" />
        </fieldset>
      }
    />
  );
}

export default EditAvatarPopup;
