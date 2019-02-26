'use strict';
// backend.js — модуль, который работает с сервером

/* модуль, который будет загружать наши данные по сети load.js. */
(function () {

  window.backend = {};

  var URL = {
    'SEND': 'https://js.dump.academy/keksobooking',
  };

  var TIME_OUT = 10000;
  var ECS_INPUT = 27;



  var templateSuccessMessageElement = document.querySelector('#success');
  var templateErrorMessageElement = document.querySelector('#error');
  var button = templateErrorMessageElement.querySelector('.message__button');

  var styleSuccess = window.getComputedStyle(templateSuccessMessageElement); // это и ниже попытки извлечь значение display
  var displaySuccess = styleSuccess.getPropertyValue('display'); // Это уже вернет значение display

  var styleError = window.getComputedStyle(templateSuccessMessageElement); // это и ниже попытки извлечь значение display
  var displayError = styleError.getPropertyValue('display'); // Это уже вернет значение display


  window.backend.upload = function (data, onSuccess) {
    xhrSend(URL['SEND'], 'POST', onSuccess, data);
  };


  /* блок с сообщениями на успшную/неуспешную ситуацию при получении/отправке данных */
  window.backend.onSuccessUpLoad = function () {

    templateSuccessMessageElement.style.display = "block"; // 1) покажем сообщение поставим ему дисплей блок

    var removeMessageListeners = function () { //6) удаление слушателей, которые в п 4 5 были добавлены
      successMessageClone.removeEventListener('click', removeSuccessMessage);
      document.removeEventListener('keydown', onSuccessEscDown);
    };

    var removeSuccessMessage = function () { // 4) фун-я скрытия сообщения по клику
      templateSuccessMessageElement.style.display = "none"; // поставим дисплей нон
      removeMessageListeners();
    };
    var onSuccessEscDown = function (evt) { // 5) фун-я скрытия сообщения по esc
      if (displaySuccess == "block" && evt.keyCode === ECS_INPUT) {
        templateSuccessMessageElement.style.display = "none"; // поставим дисплей нон
        removeMessageListeners();
      }

    };


    successMessageClone.addEventListener('click', removeSuccessMessage); // 2) добавим туда скрывание сообщения по клику на него, а оно занимает весь экран
    document.addEventListener('keydown', onSuccessEscDown); // 3) добавим туда скрывание сообщения по esc

  };


  var onError = function (errorMessage) { // брат-близнец функции выше, только везде error стоит

    templateErrorMessageElement.style.display = "block"; // 1) покажем сообщение поставим ему дисплей блок

    var removeMessageListeners = function () { //6) удаление слушателей, которые в п 4 5 были добавлены
      successMessageClone.removeEventListener('click', removeSuccessMessage);
      document.removeEventListener('keydown', onSuccessEscDown);
    };

    var removeErrorMessage = function () { // 4) фун-я скрытия сообщения по клику
      templateErrorMessageElement.style.display = "none"; // поставим дисплей нон
      removeMessageListeners();
    };
    var onErrorEscDown = function (evt) { // 5) фун-я скрытия сообщения по esc
      if (displayError == "block" && evt.keyCode === ECS_INPUT) {
        templateErrorMessageElement.style.display = "none"; // поставим дисплей нон
        removeMessageListeners();
      }
    };

    templateErrorMessageElement.addEventListener('click', removeErrorMessage); // 2) добавим туда скрывание сообщения по клику на него, а оно занимает весь экран
    document.addEventListener('keydown', onErrorEscDown); // 3) добавим туда скрывание сообщения по esc


  };

  var xhrSend = function (url, method, onSuccess, data) { //функция отправки данных
    var xhr = new XMLHttpRequest();

    xhr.timeout = TIME_OUT; // 10s
    xhr.responseType = 'json';

    var onTimeOutData = function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    var onErrorData = function () {
      onError('Произошла ошибка соединения');
    };

    xhr.addEventListener('error', onErrorData);
    xhr.addEventListener('timeout', onTimeOutData);

    var onLoad = function () {

      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    };

    xhr.addEventListener('load', onLoad);
    xhr.open(method, url);
    xhr.send(method === 'POST' ? data : undefined);

  };

})();
