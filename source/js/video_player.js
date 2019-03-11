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

  /* функция, показывает текущее время просмотра видео*/
  var showWatched = function () {
    var watchPostition = video.duration * (progressBar.value / 100);
    video.currentTime = watchPostition;
  }


  /* функция, перемотки видео с помощью ползунка*/
  var showWatchedUpdate = function () {
    var newTime = video.currentTime * (100 / video.duration);
    progressBar.value = newTime;
  }

  /*функция обновить все */
  var refreshVideo = function () {

    progressBar.value = "0";
    btnPlayPause.className = "play";
    video.currentTime = 0;
  }
  
  /* показать полный экран */
  var fullscreenOnClick = function () {
    video.requestFullscreen();
  }


  btnPlayPause.addEventListener("click", togglePlayPause);
  video.addEventListener("timeupdate", showWatchedUpdate);
  progressBar.addEventListener("change", showWatched)
  video.addEventListener("ended", refreshVideo);
  btnRepeat.addEventListener("click", refreshVideo);
  btnFullscreen.addEventListener("click", fullscreenOnClick);
})();


/* */
