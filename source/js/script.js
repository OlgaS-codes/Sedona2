'use strict';
/*video */

(function () {
  window.script = {};

  var video = document.querySelector(".video__video");
  var progressBar = document.querySelector("progress-bar");
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
    var watchPostition = video.currentTime / video.duration;
    watched.style.width = watchPostition * 100 + "%";
    watchedPoint.style.left = watchPostition * 100 + "%";
    // console.log("current time is " + video.currentTime + "s.");
    // console.log("video duration is " + video.duration + "s.");

  }
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
