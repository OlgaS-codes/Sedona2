"use strict";!function(){window.form={};var e=document.querySelector("#firstName"),t=document.querySelector(".review__submit");document.querySelectorAll('input[type="checkbox"]');e.addEventListener("invalid",function(t){e.validity.tooShort?e.setCustomValidity("Имя должно состоять минимум из 2-х символов"):e.validity.tooLong?e.setCustomValidity("Имя не должно превышать 25-ти символов"):e.validity.valueMissing?e.setCustomValidity("Обязательное поле"):e.setCustomValidity("")});t.addEventListener("click",function(){console.log("I work")})}();