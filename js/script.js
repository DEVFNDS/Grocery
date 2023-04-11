// get the add to cart button element
var addToCartBtn = document.querySelector(".card-add-to-cart");
function addToCart(event) {
  var itemprice =
    event.target.parentElement.querySelector(".card-price").textContent;
  var itemtitle =
    event.target.parentElement.querySelector(".card-title").textContent;
  var itemvalue = 
  event.target.parentElement.querySelector(".quantity").querySelector("span").textContent;
  var imageSrc = event.target.parentElement.parentElement.querySelector("img").getAttribute('src');
  var productId = event.target.parentElement.id;
  var cartId = "cart-" + productId;

  var cart = document.querySelector(".cart-items")
  var cartItem = document.createElement("div");
  cartItem.classList.add("cart-card");
  cartItem.classList.add("cart-item");
  cartItem.id = cartId;
  cartItem.innerHTML = `
    <div class="cart-desc">
      <div>
        <div class="cart-quantity"> ${itemvalue}</div>
        <img class="cart-image" src="${imageSrc}">
      </div>
      <div class="cart-detail">
        <span class="cart-title">${itemtitle}</span>
        <span class="cart-price">Price: ${itemprice}</span>
      </div>
    </div>
    <button onclick="remove('${cartId}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
  `;

  cart.appendChild(cartItem);
  // add amount to the existing amount
  var amount  = localStorage.getItem("amount");
  console.log("amount",amount);
  if(amount === null || isNaN(amount)){
    console.log("no amount");
    var __data = parseFloat(itemprice.replace(/[^\d.]/g, "")).toFixed(2);
    console.log(__data);
    localStorage.setItem("amount",__data);
  }else{
    var __data = localStorage.getItem("amount");
    var price = parseFloat(itemprice.replace(/[^\d.]/g, ""));
    localStorage.setItem("amount",parseFloat(parseFloat(__data)+parseFloat(price) ).toFixed(2));
  }
  event.target.style.display = "none";
  event.target.parentElement.querySelector(".quantity span").innerHTML = 1;
  event.target.parentElement.querySelector(".quantity").style.display = "block";
  document.getElementById("empty-cart").style.display = "none";
}

function remove(cartId) {
  var cart = document.querySelector(".cart-items");
  cart.removeChild(document.getElementById(cartId));
  var productId = cartId.replace("cart-", "");
  document.getElementById(productId).querySelector(".quantity").style.display = "none";
  document.getElementById(productId).querySelector(".add-cart").style.display = "block";
  if(cart.childElementCount === 0) {
    document.getElementById("empty-cart").style.display = "block";
  }
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

function showPoup(val) {
  
  // data fetch functinality to fetch data from json
  fetch('./data/data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data['data']);
    var values = data['data']
    for(var i=0;i<values.length;i++){
      console.log(values[i]['name'])
      if(values[i]['name'] == val){
        document.getElementById("#product-des").innerHTML = values[i]['product_description']
        document.getElementById("#img-des").src = values[i]['image']
        document.getElementById("#des-pr").innerHTML = values[i]['price']
      }
    }
  })
  
  
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

  incrementBtn.addEventListener("click", (e) => {
    console.log(e);
    var productID = e.target.parentElement.parentElement.id;
    document.getElementById("cart-"+ productID).querySelector(".cart-quantity").innerHTML = parseInt(quantityInput.innerHTML) + 1;
    quantityInput.innerHTML = parseInt(quantityInput.innerHTML) + 1;

    // adding the price 
    var priceStr =  document.getElementById("cart-"+ productID).querySelector(".cart-price").innerHTML
    var price =  parseFloat(priceStr.replace(/[^\d.]/g, ""));
    var amount = localStorage.getItem("amount");
    localStorage.setItem("amount",parseFloat(parseFloat(amount) +parseFloat(price)).toFixed(2));
    console.log(localStorage.getItem("amount"));
  });

  decrementBtn.addEventListener("click", (e) => {
    // Make sure the quantity doesn't go below 1
    var productID = e.target.parentElement.parentElement.id;
    if (parseInt(quantityInput.innerHTML) > 1) { 
      document.getElementById("cart-"+ productID).querySelector(".cart-quantity").innerHTML = parseInt(quantityInput.innerHTML) - 1;
      quantityInput.innerHTML = parseInt(quantityInput.innerHTML) - 1;

      // subtracting the price 
      var priceStr =  document.getElementById("cart-"+ productID).querySelector(".cart-price").innerHTML
      var price =  parseFloat(priceStr.replace(/[^\d.]/g, ""));
      var amount = localStorage.getItem("amount");
      localStorage.setItem("amount", parseFloat(parseFloat(amount) - parseFloat(price)).toFixed(2));
      console.log(localStorage.getItem("amount"));
    } else {
      remove("cart-"+ productID);
    }
  });
});

// adding to the local storage the the checkout data
function addItemData(){
  // looping through the data to add the amount
  const data = document.querySelector(".cart-items");
  console.log("data",data);
  const strdata = data.innerHTML;
  localStorage.setItem('data', strdata);
  window.location.href = "checkout.html"
  // const amountData = data.cart-items;

}


function clearData(){
  localStorage.clear();
}