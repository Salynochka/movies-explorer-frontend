export const variablesForValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__item",
  inputErrorTemplate: ".popup__form-error_type_",
  errorActiveClass: "popup__form-error_active",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  errorPopupItemClass: "popup__item_error",
};

export const formEditProfile = document.querySelector(".popup-edit__form");
export const formAddCard = document.querySelector(".popup-add__form");
export const formUpdateProfile = document.querySelector(".popup-update__form");

export const nameInput = document.querySelector(".popup__item_type_name");
export const jobInput = document.querySelector(".popup__item_type_about");
export const avatarInput = document.querySelector(".popup__item_type_avatar");

export const profileName = document.querySelector(".profile__name");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profilePhoto = document.querySelector(".profile__photo");
export const profileCover = document.querySelector(".profile__cover");

export const popupEditProfile = document.querySelector(".popup-edit");
export const popupAddCard = document.querySelector(".popup-add");
export const popupUpdateProfile = document.querySelector(".popup-update");
export const popupConfirmation = document.querySelector(".popup-confirmation");

export const buttonChangeProfile = document.querySelector(".profile__changes");
export const buttonAddNewCard = document.querySelector(".profile__button-add");
export const buttonSubmit = document.querySelector(".popup__button");

export const cardTemplate = document.querySelector(".card__template").content;

export const popupWithPhoto = document.querySelector(".popup-increase");
