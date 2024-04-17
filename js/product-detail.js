let detailProduct = document.getElementById("main-detail");
let cartNumber = document.getElementById("cartnumber");
let product = JSON.parse(localStorage.getItem("product"));
let currentEmail = document.getElementById("current-email");
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

if (currentUser.access_token !== undefined && currentUser.access_token !== "") {
  currentEmail.innerHTML = currentUser.email;
  document.getElementById("icon-logout").style.display = "flex";
  document.getElementById("icon-login").style.display = "none";
} else {
  currentEmail.innerHTML = "";
  document.getElementById("icon-logout").style.display = "none";
  document.getElementById("icon-login").style.display = "flex";
}

function clickLogoChangeHomePage() {
  window.location.href = "homepage.html";
}

function signInUser() {
  window.location.href = "log-in.html";
}

function handleSignOut() {
  //Xóa lô cồ currentUers
  localStorage.removeItem("currentUser");
  window.location.href = "log-in.html";
}

function displayProduct() {
  detailProduct.innerHTML = `
 <div class="main--buy--now">
        <div>
          <img src="${product.image}" />
          <div class="main--flex--box--inp">
            <div class="main--button--span">
              <button onClick="handleDecrease()" class="main--button--calculation">-</button>
              <span id="quantity"></span>
              <button onClick="handleIncrease()" class="main--button--calculation">+</button>
            </div>
          </div>
        </div>
        <div class="main--text--icon--btn">
          <h1>${product.name}</h1>
          <div class="main--icon--star">
            <i class="fa-solid fa-star fa-2xl" style="color: #ffd43b"></i>
            <i class="fa-solid fa-star fa-2xl" style="color: #ffd43b"></i>
            <i class="fa-solid fa-star fa-2xl" style="color: #ffd43b"></i>
            <i class="fa-solid fa-star fa-2xl" style="color: #ffd43b"></i>
            <i class="fa-solid fa-star fa-2xl" style="color: #ffd43b"></i>
          </div>
          <p class="main--text--icon--p">${
            "PRICE: " + product.price + " VND"
          }</p>
          <p class="main--text--icon--p">${"QUANTITY: " + product.quantity}</p>
          <p class="main--text--icon--p"></p>
          <p class="main--text--icon--p"></p>
          <button onClick="addToCart()" class="main--btn--buyNow">Buy Now</button>
        </div>
        </div>`;
}
displayProduct();
let quantity = 1;
let quantityNumber = document.getElementById("quantity");
function displayNumberProduct() {
  quantityNumber.innerHTML = quantity;
}
displayNumberProduct();
function handleDecrease() {
  if (quantity > 1) {
    quantity = quantity - 1;
    displayNumberProduct();
  }
}
function handleIncrease() {
  if (quantity < product.quantity) {
    quantity++;
    displayNumberProduct();
  }
}
function addToCart() {
  if (
    currentUser.access_token === "" ||
    currentUser.access_token === undefined
  ) {
    alert("Bạn phải đăng  nhập thì mới có thể mua hàng!");
    window.location.href = "log-in.html";
  } else {
    currentUser.products.push({
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: quantity,
    });

    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    window.location.href = "cart.html";
  }
}

let sumQuantity = 0;

for (let i in currentUser.products) {
  sumQuantity += currentUser.products[i].quantity;
}
function displayCartNumber() {
  if (sumQuantity > 0) {
    cartNumber.innerHTML = sumQuantity;
  }
}
displayCartNumber();
