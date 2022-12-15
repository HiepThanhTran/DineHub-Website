$(document).ready(function () {
   /* RANDOM NAMES & IMGS */
   var names = [
      "Thanh Hiệp",
      "Trung Thắng",
      "Nguyên Chương",
      "Ngọc Như",
      "Song Hậu",
      "Trọng Phúc",
      "Ngọc Sơn",
      "Trí Cường",
   ];
   var imgs = ["avatar-1.png", "avatar-2.png", "avatar-3.png", "avatar-4.png"];
   var random = [];
   function in_array(array, el) {
      for (var i = 0; i < array.length; i++) if (array[i] == el) return true;
      return false;
   }
   function get_rand(array) {
      var rand = array[Math.floor(Math.random() * array.length)];
      if (!in_array(random, rand)) {
         random.push(rand);
         return rand;
      }
      return get_rand(array);
   }
   const header = document.querySelectorAll(".comment-header a");
   const ava = document.querySelectorAll(".avatar img");
   for (const a of ava) {
      let idx = parseInt(Math.random() * imgs.length);
      a.setAttribute("src", `./assets/img/${imgs[idx]}`);
   }
   for (const h of header) {
      h.innerHTML = get_rand(names);
   }

   /* ADD NEW FEEDBACK */
   let user = 1;
   $("#btnUpload").click(function () {
      let text = $("#text-box").val();
      if (text !== "") {
         let h = `<div class="timeline-feedback m-row">
                  <div class="avatar">
                     <a href="javascript:;"><img src="./assets/img/${
                        imgs[parseInt(Math.random() * imgs.length)]
                     }"></a>
                  </div>
                  <div class="comment">
                     <div class="comment-header">
                        <a href="javasciprt:;">USER ${user++}</a>
                        <button class="option"><i class="fa-solid fa-ellipsis"></i></button>
                        <ul>
                           <li class="edit">Chỉnh sửa</li>
                           <li class="delete">Xóa</li>
                        </ul>
                     </div>
                     <div class="comment-body">
                        <p>${text}</p>
                     </div>
                     <div class="comment-bottom-bar">
                        <input class="btnConfirm" type="button" value="Xác nhận">
                     </div>
                  </div>
               </div>`;
         $(".m-feedback").prepend(h);
      }
      $("#text-box").val("");
   });

   /* OPEN OPTION MENU */
   $(".m-feedback").on("click", ".option", function () {
      if ($("+ ul", this).hasClass("active")) {
         $("+ ul", this).removeClass("active");
      } else {
         $(".m-feedback ul").removeClass("active");
         $("+ ul", this).addClass("active");
      }
   });
   $("body").click(function () {
      $(".m-feedback ul").removeClass("active");
   });
   $(".m-feedback").on("click", ".option, .option + ul", function (event) {
      event.stopPropagation();
   });

   /* FEEDBACK OPTIONS */
   // Edit feedback
   $(".m-feedback").on("click", ".edit", function () {
      $(".comment-body p").attr("contentEditable", "false");
      $(".comment-bottom-bar").css("height", "48px");
      $(".btnConfirm").css("display", "none");
      $(this)
         .parents(".comment-header")
         .next(".comment-body")
         .find("p")
         .attr("contentEditable", "true")
         .focus();
      $(this)
         .parents(".comment-header")
         .siblings(".comment-bottom-bar")
         .css("height", "auto")
         .find(".btnConfirm")
         .css("display", "block");
      $(".m-feedback ul").removeClass("active");
   });
   $(".m-feedback").on("click", ".btnConfirm", function () {
      $(this)
         .parent()
         .siblings(".comment-body")
         .find("p")
         .attr("contentEditable", "false");
      $(this).css("display", "none").parent().css("height", "48px");
   });

   // Delete feedback
   $(".m-feedback").on("click", ".delete", function () {
      // if (confirm("Bạn chắc chắn xóa không?") == true) {
      //    $(this).parents(".timeline-feedback").remove();
      // }
      // Customs alert box
      let str = this;
      $(".m-feedback ul").removeClass("active");
      $(".alert-container").fadeIn().css("display", "flex");
      $(".btnAccept").click(function () {
         $(str).parents(".timeline-feedback").remove();
      });
      $(".btnAccept, .btnCancel").click(function () {
         $(".alert-container").fadeOut();
      });
   });
});
