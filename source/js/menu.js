'use strict';
/* jshint browser: true */
/*
  <script src="js/backend.js"></script>
  <script src="js/menu.js"></script>
  <script src="js/debounce.js"></script>
  <script src="js/form.js"></script>
  <script src="js/console.js"></script>
*/
(function () {
  window.menu = {};

  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__list");

  var toggleDisplayMenu = function (e) {
    e.preventDefault();
    if (toggle.classList.contains("open")) {
      console.log("close menu!");
      toggle.classList.remove("open");
      toggle.classList.add("close");
      menu.style.display = "none";

    } else {
      console.log("show menu!");
      toggle.classList.remove("close");
      toggle.classList.add("open");
      menu.style.display = "flex";

    }

  };

  toggle.addEventListener("touchstart", toggleDisplayMenu);
  toggle.addEventListener("click", toggleDisplayMenu);
})();
