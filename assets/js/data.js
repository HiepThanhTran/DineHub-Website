window.addEventListener("load", function () {
   /* DISABLED DEV TOOL */
   // document.addEventListener(
   //    "contextmenu",
   //    function (e) {
   //       e.preventDefault();
   //    },
   //    false
   // );
   // document.addEventListener(
   //    "keydown",
   //    function (e) {
   //       // "I" key
   //       if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
   //          disabledEvent(e);
   //       }
   //       // "J" key
   //       if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
   //          disabledEvent(e);
   //       }
   //       // "S" key + macOS
   //       if (
   //          e.keyCode == 83 &&
   //          (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
   //       ) {
   //          disabledEvent(e);
   //       }
   //       // "U" key
   //       if (e.ctrlKey && e.keyCode == 85) {
   //          disabledEvent(e);
   //       }
   //       // "F12" key
   //       if (event.keyCode == 123) {
   //          disabledEvent(e);
   //       }
   //    },
   //    false
   // );
   // function disabledEvent(e) {
   //    if (e.stopPropagation) {
   //       e.stopPropagation();
   //    } else if (window.event) {
   //       window.event.cancelBubble = true;
   //    }
   //    e.preventDefault();
   //    return false;
   // }

   /* Loading */
   const loader = document.querySelector(".loader");
   if (loader != null) loader.classList.add("hidden");

   /* HEADING SCROLL */
   window.addEventListener("scroll", function () {
      var header = document.querySelector("header");
      header.classList.toggle("sticky", window.scrollY > 10);
   });

   /* RESPONSIVE SIDE BAR MENU */
   var menu = document.querySelector(".menu");
   var menuBtn = document.querySelector(".menu-btn");
   var closeBtn = document.querySelector("header .menu .btn-mobile .close-btn");
   if (menuBtn != null) {
      menuBtn.addEventListener("click", () => {
         menu.classList.add("active");
      });
      closeBtn.addEventListener("click", () => {
         menu.classList.remove("active");
      });
   }

   /* OPEN MODAL LOGIN */
   const modalContainer = document.querySelector(".wrapper");
   const lgBtn = document.querySelector(".js-login");
   const modal = document.querySelector(".js-modal");
   lgBtn.addEventListener("click", function (e) {
      e.preventDefault();
      modal.classList.add("open");
   });

   /* CLOSE MODAL LOGIN */
   modal.addEventListener("click", function () {
      modal.classList.remove("open");
   });
   modalContainer.addEventListener("click", function (event) {
      event.stopPropagation();
   });

   /* LOGIN AND REGISTER */
   const loginText = document.querySelector(".title-text .login");
   const loginForm = document.querySelector("form.login");
   const loginBtn = document.querySelector("label.login");
   const signupBtn = document.querySelector("label.signup");
   const signupLink = document.querySelector("form .signup-link a");
   signupBtn.onclick = function (e) {
      loginForm.style.marginLeft = "-50%";
      loginText.style.marginLeft = "-50%";
   };
   loginBtn.onclick = () => {
      loginForm.style.marginLeft = "0%";
      loginText.style.marginLeft = "0%";
   };
   signupLink.onclick = () => {
      signupBtn.click();
      return false;
   };

   /* SCROLL PROGRESS */
   const progressBar = document.getElementById("progressBar");
   window.addEventListener("scroll", function () {
      let progress = Math.ceil(
         (window.pageYOffset /
            (document.body.scrollHeight - window.innerHeight)) *
            100
      );
      progressBar.style = `width: ${progress}%`;
   });

   /* BACK TO TOP BUTTON */
   const backToTopButton = document.querySelector("#back-to-top");
   if (backToTopButton != null) {
      window.addEventListener("scroll", function scrollFunction() {
         if (window.pageYOffset > 300) {
            if (!backToTopButton.classList.contains("fadeInRight")) {
               backToTopButton.classList.remove("fadeOutRight");
               backToTopButton.classList.add("fadeInRight");
               backToTopButton.style.display = "flex";
            }
         } else {
            if (backToTopButton.classList.contains("fadeInRight")) {
               backToTopButton.classList.remove("fadeInRight");
               backToTopButton.classList.add("fadeOutRight");
               setTimeout(function () {
                  backToTopButton.style.display = "none";
               }, 250);
            }
         }
      });
      backToTopButton.addEventListener("click", function backToTop() {
         window.scrollTo(0, 0);
      });
   }

   /* DROPDOWN MENU */
   const arrow = document.querySelector(".arrow");
   const listItem = document.querySelector(".list-items");
   const sidebarTitle = document.querySelector(".sidebar-title");
   if (sidebarTitle != null) {
      sidebarTitle.addEventListener("click", function () {
         listItem.classList.toggle("close");
         arrow.classList.toggle("rotate");
      });
   }

   /* MORE BUTTON */
   const moreBtn = document.getElementById("js-btn-more");
   const moreBlog = document.querySelectorAll(".blog-more");
   const moreNews = document.querySelectorAll(".news-more");
   var countMore = 0;
   if (moreBtn != null) {
      moreBtn.addEventListener("click", function showMore() {
         for (let i = 0; i < 3; i++) {
            if (moreBlog.length != 0)
               moreBlog[countMore++].style.display = "block";
            if (moreNews.length != 0)
               moreNews[countMore++].style.display = "block";
         }
         if (countMore == moreBlog.length || countMore == moreNews.length)
            moreBtn.style.display = "none";
      });
   }
});
