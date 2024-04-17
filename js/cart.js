let currentEmail = document.getElementById("current-email");
let cartNumber = document.getElementById("cartnumber");
let mainCart = document.querySelector(".main__cart");
let totalMoney = document.getElementById("total-money");
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

let allProducts = currentUser.products;
function displayProduct() {
  let html = "";
  for (let i in allProducts) {
    html += `
            <div class="main__flex--img--text">
              <img class="main__img" src="${
                allProducts[i].image
              }" width="180px" height="190px" />
              <div class="gap--main--text">
              <h3>${allProducts[i].name}</h3>
                <h3>${"Price: " + allProducts[i].price + " VND"}</h3>
                <p class="main__text--p">${
                  "Quantity: " + allProducts[i].quantity
                }</p>
                <p class="main__text--p">${
                  "Subtotal: " +
                  parseInt(allProducts[i].price) * allProducts[i].quantity +
                  " VND"
                }</p>
              </div>
              <i onclick="handleDelete('${
                allProducts[i].name
              }')" class="fa-solid fa-delete-left fa-2xl" style="color: #e0190b;cursor: pointer"></i>
            </div>`;
  }
  mainCart.innerHTML = html;
}
displayProduct();

function displayMoney() {
  let sum = 0;
  for (let i in currentUser.products) {
    sum +=
      parseInt(currentUser.products[i].price) *
      currentUser.products[i].quantity;
  }
  totalMoney.innerHTML = `TOTAL: ${sum} VND`;
}
displayMoney();

function handleCheckOut() {
  alert("Payment success");
  currentUser.products = [];
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  window.location.href = "homepage.html";
}

function handleDelete(name) {
  console.log(name);
  let index = currentUser.products.findIndex((product) => product.name == name);
  currentUser.products.splice(index, 1);
  localStorage.setItem("currentUser", JSON.stringify(currentUser));
  displayProduct();
  displayMoney();
  displayCartNumber();
}
