"use strict";

(function () {
  window.form = {};

  var userNameInput = document.querySelector('#firstName');
  var submitButtonElement = document.querySelector('.review__submit');
  var formReview = document.querySelector(".form__review");
  var visitedPlacesElement = document.querySelector(".visitedPlaces__input");
  var fieldsetInFormContainer = formReview.querySelectorAll('input');

  userNameInput.addEventListener('invalid', function (evt) {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('Обязательное поле');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  var setFormNew = function () {

    fieldsetInFormContainer.forEach(function (node) { // ИСПРАВИТЬ НА VALUE ИНПУТОВ!!!!!
      node.value = '';
    });
    formReview.reset();
  };


  var onSubmitButtonElementClick = function () {

      window.backend.upload(new FormData(formReview), window.backend.onSuccessUpLoad);
      console.log("Send data");
      setFormNew();

  };

  submitButtonElement.addEventListener("click", onSubmitButtonElementClick);

})();
