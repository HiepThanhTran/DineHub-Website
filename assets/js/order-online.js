/* Open Modal Add Food */
const btnAdds = document.querySelectorAll(".food-add");
const modalFood = document.querySelector(".modal-food");
const btnMinus = document.querySelectorAll(".btn-minus");
const btnPlus = document.querySelectorAll(".btn-plus");
const closeModal = document.getElementById("btn-close");
const btnAddItem = document.querySelectorAll(".add-to-cart a");
const btnRemoveItem = document.querySelectorAll(".shopping-carts .removeItem");
const shoppingCarts = document.getElementById("shopping-carts");
const aTag = document.querySelector(".cart .cart-top a");
function showAddfood(e) {
   e.preventDefault();
   let parentElement = e.currentTarget.parentNode;
   let imgFood = parentElement.querySelector(".food-img").innerHTML;
   let titleFood = parentElement.querySelector(
      ".food-text .food-name"
   ).innerHTML;
   let priceFood = parentElement.querySelector(
      ".food-text .food-price"
   ).innerHTML;
   
   modalFood.querySelector(".number-var").innerHTML = 1;
   modalFood.querySelector(".modal-food-img").innerHTML = imgFood;
   modalFood.querySelector(".modal-food-name").innerHTML = titleFood;
   modalFood.querySelector(".modal-food-price").innerHTML = priceFood;
   modalFood.classList.add("open");
}
if (modalFood && btnAdds) {
   for (const btnAdd of btnAdds) {
      btnAdd.addEventListener("click", showAddfood);
   }
}
function removeFood(e) {
   e.preventDefault();
   let parentElement = e.currentTarget.parentNode;
   if (parentElement.querySelector(".number-var").innerHTML > 1) {
      parentElement.querySelector(".number-var").innerHTML =
         parseInt(parentElement.querySelector(".number-var").innerHTML) - 1;
   }
}
function addFood(e) {
   e.preventDefault();
   let parentElement = e.currentTarget.parentNode;
   if (parentElement.querySelector(".number-var").innerHTML > 0) {
      parentElement.querySelector(".number-var").innerHTML =
         parseInt(parentElement.querySelector(".number-var").innerHTML) + 1;
   }
}
function closeModalfood(e) {
   e.preventDefault();
   modalFood.classList.remove("open");
}
for (const btn of btnMinus) btn.addEventListener("click", removeFood);
for (const btn of btnPlus) btn.addEventListener("click", addFood);
closeModal.addEventListener("click", closeModalfood);
/* Close Modal Add Food */
window.addEventListener("click", function (e) {
   const wrapper = document.getElementById("wrapper-1");
   modalFood.addEventListener("click", function () {
      modalFood.classList.remove("open");
   });
   wrapper.addEventListener("click", function (event) {
      event.stopPropagation();
   });
});
/* Add To Cart */
const radios = document.getElementsByName("radio");
function addItemFood(e) {
   e.preventDefault();
   let itemType = "";
   for (let i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
         itemType = radios[i].parentElement.textContent.trim();
         break;
      }
   }
   let itemImg = modalFood.querySelector(".modal-food-img").innerHTML;
   let itemTitle = modalFood.querySelector(".modal-food-name").innerHTML;
   let itemNumber = parseInt(modalFood.querySelector(".number-var").innerHTML);
   let itemPrice = modalFood.querySelector(".modal-food-price").innerHTML;
   let itemContent =
      '<div class="shopping-cart"  price="' +
      itemPrice.replace(/[^0-9]/g, "") +
      '" number="' +
      itemNumber +
      '" data="' +
      itemTitle +
      '" type="' +
      itemType +
      '" > <div class="shopping-cart-img"> ' +
      itemImg +
      '</div> <div class="shopping-cart-content"> <div class="shopping-cart-left"> <h4>' +
      itemTitle +
      "</h4> <p>" +
      itemType +
      '</p> </div> <div class="number"> <a href="javascript:void(0)" onclick="removeFoodCart(this)" class="btn-minus"> <i class="fa-solid fa-minus"></i> </a> <p class="number-var">' +
      itemNumber +
      '</p> <a href="javascript:void(0)" onclick="addFoodCart(this)" class="btn-plus"> <i class="fa-solid fa-plus plus"></i> </a> </div> </div> <div class="shopping-cart-right"> <p> ' +
      itemPrice +
      '</p> <a class="removeItem" href="javascript:void(0)" onclick="removeItemFood(this)" >Xóa</a> </div> </div>';
      var children = shoppingCarts.children;
   if (children.length > 0) {
      let add = true;
      for (var i = 0; i < children.length; i++) {
         var titleChild = children[i].getAttribute("data");
         var typeChild = children[i].getAttribute("type").trim();
         if (titleChild == itemTitle && typeChild == itemType) {
            children[i].querySelector(".number-var").innerHTML =
               parseInt(children[i].querySelector(".number-var").innerHTML) +
               itemNumber;
            children[i].setAttribute(
               "number",
               children[i].querySelector(".number-var").innerHTML
            );
            add = false;
            modalFood.classList.remove("open");
         }
      }
      if (add == true) {
         shoppingCarts.innerHTML += itemContent;
      }
   } else {
      shoppingCarts.innerHTML += itemContent;
   }
   updateInfoCart(shoppingCarts);
   modalFood.classList.remove("open");
   aTag.classList.remove("disabled");

   function WidthChange(mq) {
      if (mq.matches) {
         pay.style.display = "block";
      } else {
         pay.style.display = "none";
      }
   }
   if (matchMedia) {
      const mq = window.matchMedia("(max-width: 1023px)");
      WidthChange(mq);
   }
}
function removeItemFood(e) {
   e.parentElement.parentElement.remove();
   console.log(e.parentElement.parentElement);
   updateInfoCart(shoppingCarts);
}
if (btnAddItem) {
   for (const btn of btnAddItem) btn.addEventListener("click", addItemFood);
}
function removeFoodCart(e) {
   if (e.parentElement.querySelector(".number-var").innerHTML > 1) {
      e.parentElement.querySelector(".number-var").innerHTML =
         parseInt(e.parentElement.querySelector(".number-var").innerHTML) - 1;
      e.parentElement.parentElement.parentElement.setAttribute(
         "number",
         e.parentElement.querySelector(".number-var").innerHTML
      );
      updateInfoCart(shoppingCarts);
   }
}
function addFoodCart(e) {
   if (e.parentElement.querySelector(".number-var").innerHTML > 0) {
      e.parentElement.querySelector(".number-var").innerHTML =
         parseInt(e.parentElement.querySelector(".number-var").innerHTML) + 1;
      e.parentElement.parentElement.parentElement.setAttribute(
         "number",
         e.parentElement.querySelector(".number-var").innerHTML
      );
      updateInfoCart(shoppingCarts);
   }
}
function updateInfoCart(list) {
   var children = shoppingCarts.children;
   var number = 0;
   var tong = 0;
   if (children.length > 0) {
      for (var i = 0; i < children.length; i++) {
         number = number + parseInt(children[i].getAttribute("number"));
         tong =
            tong +
            parseInt(children[i].getAttribute("number")) *
            parseInt(children[i].getAttribute("price"));
      }
   }
   if (tong == 0) aTag.classList.add("disabled");
   if (tong == 0) pay.style.display = "none";
   document.getElementById("amount-food").innerHTML = number;
   document.getElementById("sum-food").innerHTML =
      tong.toLocaleString() + "<sup>₫</sup>";
}
/* Scrolling Element */
const moveToFood = document.getElementById("movefood");
moveToFood.addEventListener("click", function () {
   window.scrollTo(0, 0);
});
const moveToCombo = document.getElementById("movecombo");
moveToCombo.addEventListener("click", function () {
   window.scrollTo(0, 2109);
});
const moveToAddFood = document.getElementById("moveaddfood");
moveToAddFood.addEventListener("click", function () {
   window.scrollTo(0, 4460);
});
/* Pay */
const pay = document.getElementById("pay");
pay.addEventListener("click", function () {
   window.scrollTo(0, 6918);
});
