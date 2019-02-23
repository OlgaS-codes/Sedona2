"use strict";

(function () {
  window.form = {};

  var userNameInput = document.querySelector('#firstName');
  var submitButtonElement = document.querySelector('.review__submit');
  var visitedPlacesContainer = document.querySelectorAll('input[type="checkbox"]');


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

  var onSubmitButtonElementClick = function () {
    console.log("I work");
    var checkCheckboxes = function () {
      var empty = [].filter.call( visitedPlacesContainer, function( el ) {
        return !el.checked
     });

     if (visitedPlacesContainer.length == empty.length) {
         console.log("None filled");
         return false;
     }
    }
  };

  submitButtonElement.addEventListener("click", onSubmitButtonElementClick);

})();
