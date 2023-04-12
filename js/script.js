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

  document.getElementById("count-header").innerHTML = parseInt(document.getElementById("count-header").innerHTML) + 1;
  localStorage.setItem("productCount", document.getElementById("count-header").innerHTML);
  localStorage.getItem("cartData") ?  localStorage.setItem("cartData", localStorage.getItem("cartData") +  cartItem.outerHTML) :localStorage.setItem("cartData", cartItem.outerHTML);
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
  document.getElementById("count-header").innerHTML = parseInt(document.getElementById("count-header").innerHTML) - 1;

  var cartData = localStorage.getItem("cartData");
    const tempElement = document.createElement("div");
    tempElement.innerHTML = cartData;
    var products = tempElement.querySelectorAll(".cart-card");
    cartData = "";
    products.forEach((item)=> {
      id = item.id.replace("cart-", "");
      if(id != productId) {
        cartData = cartData + item.outerHTML; 
      }
    });
    localStorage.setItem("cartData", cartData);
    localStorage.setItem("productCount", document.getElementById("count-header").innerHTML);
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


function login(){
  var email = document.getElementById("email").value;
  var pwd = document.getElementById("Password").value;
  if(email == ""){
    alert("Email Id cannot be empty");
  }else if(pwd == ""){
    alert("password cannot be empty");
  }else{
    document.getElementById("user").innerHTML = email;
    localStorage.setItem("loggedin",email);
    window.location.href = "#"
    document.querySelectorAll(".login-header").forEach((item) => item.style.display = "none");
    document.querySelector(".logout-header").style.display = "inline";
  }
}

function logout(){
  localStorage.setItem("loggedin","");
  document.getElementById("user").innerHTML = "User";
  document.querySelectorAll(".login-header").forEach((item) => item.style.display = "inline");
  document.querySelector(".logout-header").style.display = "none";
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
    var cartData = localStorage.getItem("cartData");
    const tempElement = document.createElement("div");
    tempElement.innerHTML = cartData;
    var products = tempElement.querySelectorAll(".cart-card");
    cartData = "";
    products.forEach((item)=> {
      id = item.id.replace("cart-", "");
      if(id == productID) {
        item.querySelector(".cart-quantity").innerHTML = quantityInput.innerHTML;
      }
      cartData = cartData + item.outerHTML;
      console.log(cartData, item);
    });
    localStorage.setItem("cartData", cartData);


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
      var cartData = localStorage.getItem("cartData");
      const tempElement = document.createElement("div");
      tempElement.innerHTML = cartData;
      var products = tempElement.querySelectorAll(".cart-card");
      cartData = "";
      products.forEach((item)=> {
        id = item.id.replace("cart-", "");
        if(id == productID) {
          item.querySelector(".cart-quantity").innerHTML = quantityInput.innerHTML;
        }
        cartData = cartData + item.outerHTML;
        console.log(cartData, item);
      });
      localStorage.setItem("cartData", cartData);

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
  var buttons = data.querySelectorAll("button");
  console.log("buttons" , buttons);
  // removing the remove button
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].remove()
  }
  console.log("data",data);
  var strdata = data.innerHTML;
  localStorage.setItem('data', strdata);
  window.location.href = "checkout.html"
  // const amountData = data.cart-items;
}

function clearData(){
  localStorage.clear();
}

const slide = document.querySelector('.carousel-slide');
const cards = document.querySelectorAll('.carousel-slide .card');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentIndex = 0;

nextBtn.addEventListener('click', () => {
  currentIndex++;
  slide.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth + 40)}px)`;
  prevBtn.disabled = false;
  if (currentIndex >= cards.length - 4) {
    nextBtn.disabled = true;
  }
});

prevBtn.addEventListener('click', () => {
  currentIndex--;
  slide.style.transform = `translateX(-${currentIndex * (cards[0].offsetWidth + 20)}px)`;
  nextBtn.disabled = false;
  if (currentIndex === 0) {
    prevBtn.disabled = true;
  }
});

function loadCart() {
  if(localStorage.getItem("cartData")){
    var cartData = localStorage.getItem("cartData");
    const tempElement = document.createElement("div");
    tempElement.innerHTML = cartData;
    document.getElementById("empty-cart").style.display = "none";
    document.querySelector(".cart-items").innerHTML = cartData;
    document.getElementById("count-header").innerHTML = localStorage.getItem("productCount");
    var products = tempElement.querySelectorAll(".cart-card");
    products.forEach((item)=> {
    id = item.id.replace("cart-", "");
    if(document.getElementById(id)) {
      document.getElementById(id).querySelector(".add-cart").style.display = "none";
      document.getElementById(id).querySelector(".quantity span").innerHTML = item.querySelector(".cart-quantity").innerHTML;
      document.getElementById(id).querySelector(".quantity").style.display = "block";
    }
    
    })
  }
  if(localStorage.getItem("loggedin") !== "") {
    document.getElementById("user").innerHTML = localStorage.getItem("loggedin");
    document.querySelectorAll(".login-header").forEach((item) => item.style.display = "none");
    document.querySelector(".logout-header").style.display = "inline";
  }
}
