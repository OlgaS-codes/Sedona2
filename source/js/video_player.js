"use strict";

(function () {
  window.video_player = {};

  var LEFT_X = 0;
  var RIGHT_X = 227;


  var video = document.querySelector(".video__video");
  var progressBar = document.querySelector(".progress-bar");
  var watched = document.querySelector(".watched-Line");
  var watchedPoint = document.querySelector(".watched-indicator");
  var btnPlayPause = document.querySelector("#play-pause");
  var btnRepeat = document.querySelector("#repeat");
  var btnFullscreen = document.querySelector("#full-screen");

  /* функция пауза/плей при клике на центр видео*/
  var togglePlayPause = function () {
    // console.log("button is clicked");
    if (video.paused) {
      btnPlayPause.classList.add("play");
      btnPlayPause.classList.remove("pause");
      video.play();
      // console.log("play video");

    } else {

      btnPlayPause.classList.add("pause");
      btnPlayPause.classList.remove("play");
      video.pause();
      // console.log("pause video");
    }
  }

  /* функция, показывает текущее время просмотра видео и перематывает его*/
  var showWatched = function () {
    var watchPostition = video.currentTime / video.duration;
    watched.style.width = watchPostition * 100 + "%";
    watchedPoint.style.left = watchPostition * 100 + "%";
  }


  watchedPoint.addEventListener('touchmove', function (event) {

    if (event.targetTouches.length == 1) {
      var touch = event.targetTouches[0];

      /*не работает на айпаде, скорее всего проблема в ограничителях */
      if (LEFT_X > touch.pageX || touch.pageX > RIGHT_X) {
        watchedPoint.style.left = -touch.pageX;
      } else {
        watchedPoint.style.left = touch.pageX + 'px';
        // console.log(touch.pageX);
        watched.style.width = touch.pageX * 100 / 227 + "%";
        video.currentTime = (video.duration * parseInt(watched.style.width) / 100);


      }

    }

  }, false);


  /* обновить все */
  var refreshVideo = function () {

    watched.style.width = "0%";
    watchedPoint.style.left = "0%";
    btnPlayPause.className = "play";
    video.currentTime = 0;
  }
  /* показать полный экран */
  var fullscreenOnClick = function () {
    video.requestFullscreen();
  }


  btnPlayPause.addEventListener("click", togglePlayPause);
  video.addEventListener("timeupdate", showWatched);
  video.addEventListener("ended", refreshVideo);
  btnRepeat.addEventListener("click", refreshVideo);
  btnFullscreen.addEventListener("click", fullscreenOnClick);
})();


/* */
