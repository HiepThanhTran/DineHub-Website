/* Scroll Element */
function WidthChange(mq) {
   if (mq.matches) {
   } else {
      function reveal() {
         var reveals = document.querySelectorAll(".reveal");
         for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var revealTop = reveals[i].getBoundingClientRect().top;
            var revealPoint = 150;

            if (revealTop < windowHeight - revealPoint) {
               reveals[i].classList.add("active");
            }
         }
      }
      window.addEventListener("scroll", reveal);
   }
}
if (matchMedia) {
   const mq = window.matchMedia("(max-width: 1023px)");
   WidthChange(mq);
}
/* Method */
const method = document.getElementById("pay-online");
const choose = document.getElementById("js-choose");
const payMethod = document.getElementById("payship");
method.addEventListener("click", function () {
   choose.style.opacity = "1";
});
payMethod.addEventListener("click", function () {
   choose.style.opacity = "0";
});
