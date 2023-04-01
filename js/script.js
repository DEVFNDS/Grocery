// get the add to cart button element
var addToCartBtn = document.querySelector(".card-add-to-cart");
function addToCart(event) {
  var itemprice =
    event.target.parentElement.querySelector(".card-price").textContent;
  var itemtitle =
    event.target.parentElement.querySelector(".card-title").textContent;
  var itemvalue = 
  event.target.parentElement.querySelector(".quantity").querySelector("span").textContent;

  var cart = document.querySelector(".cart-items");
  position = cart.children.length + 1;
  var cartItem = document.createElement("div");
  cartItem.classList.add("cart-card");
  cartItem.classList.add("cart-item");
  cartItem.id = position;
  cartItem.innerHTML = `
    <span class="cart-title">${itemtitle}</span>
    <span> ${itemvalue}</span>
    <span class="cart-price">${itemprice}</span>
    <button  onclick="remove(${position})"><i class="fa fa-trash" aria-hidden="true"></i></button>
  `;

  cart.appendChild(cartItem);
}

function remove(position) {
  var cart = document.querySelector(".cart-items");
  cart.removeChild(document.getElementById(position));
}

function toggleSidebar() {
  var sidebar = document.getElementById("side");
  console.log(sidebar.classList);
  document.getElementById("side").classList.add("inactive");
  document.querySelector(".main-content").style.pointerEvents = "auto";
}

function showSidebar() {
  console.log("called");
  var sidebar = document.getElementById("side");
  if (sidebar.classList.contains("inactive")) {
    sidebar.classList.remove("inactive");
  }
  document.getElementById("side").classList.toggle("active");
  document.querySelector(".main-content").style.pointerEvents = "none";
}

function showPoup() {
  popupCard.style.display = "block";
}

// Get the details button and popup card
var popupCard = document.querySelector(".popup-card");

// When the close button is clicked, hide the popup card
popupCard.querySelector(".close").addEventListener("click", function () {
  popupCard.style.display = "none";
});

// When the user clicks outside of the popup card, hide it
window.addEventListener("click", function (event) {
  if (event.target == popupCard) {
    popupCard.style.display = "none";
  }
});

// handling the increment and decrement of the number on the product
const products = document.querySelectorAll(".card");
products.forEach((product) => {
  const incrementBtn = product.querySelector(".increment");
  const decrementBtn = product.querySelector(".decrement");
  const quantityInput = product.querySelector(".quantity span");

  incrementBtn.addEventListener("click", () => {
    quantityInput.innerHTML = parseInt(quantityInput.innerHTML) + 1;
  });

  decrementBtn.addEventListener("click", () => {
    // Make sure the quantity doesn't go below 1
    if (parseInt(quantityInput.innerHTML) > 0) {
      quantityInput.innerHTML = parseInt(quantityInput.innerHTML) - 1;
    }
  });
});
