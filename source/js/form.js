"use strict";

(function () {
  window.form = {};

  var userNameInput = document.querySelector('#firstName');
  var submitButtonElement = document.querySelector('.review__submit');
  var formReview = document.querySelector(".form__review");
  var visitedPlacesElement = document.querySelector(".visitedPlaces");
  var fieldsetInFormContainer = formReview.querySelectorAll('fieldset');

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

    fieldsetInFormContainer.forEach(function (node) {
      node.value = '';
    });
    formAdElement.reset();
    window.form.setAddress(window.map.getCoordinateX(), window.map.getCoordinateY());
  };


  var onSubmitButtonElementClick = function () {
    var visitedPlacesCheckedContainer = document.querySelectorAll('input[type="checkbox"]:checked');
    console.log("I work");
    visitedPlacesCheckedContainer.length === 0 ? visitedPlacesElement.setCustomValidity('Укажите, пожалуйста, посещенные достопримечателености') : visitedPlacesElement.setCustomValidity('');

    if (formReview.checkValidity()) {
      window.backend.upload(new FormData(formReview), window.backend.onSuccessUpLoad);
      setFormNew();
    }

  };

  submitButtonElement.addEventListener("click", onSubmitButtonElementClick);

})();
