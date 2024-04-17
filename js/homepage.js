let products = JSON.parse(localStorage.getItem("products"));
let mainSave = document.querySelector(".main__save");
let currentEmail = document.getElementById("current-email");
let cartNumber = document.getElementById("cartnumber");
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
function displayProduct() {
  for (let i in products) {
    mainSave.innerHTML += `
    <div class="main__save--flex--text--img">
    <div class="main__img">
    <img src="${products[i].image}" width="317px" height="296px"/>
    </div>
    <div class="main__text">
      <p class="main__text--p" >${products[i].name}</p>
      <h3 class="main__text--h3">${products[i].price + " VND"}</h3>
      <button class="main__text--btn" onClick="handleChangePage('${
        products[i].name
      }')">Buy Now</button>
    </div>
    </div>
  `;
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

if (currentUser.access_token !== undefined && currentUser.access_token !== "") {
  currentEmail.innerHTML = currentUser.email;
  document.getElementById("icon-logout").style.display = "flex";
  document.getElementById("icon-login").style.display = "none";
} else {
  currentEmail.innerHTML = "";
  document.getElementById("icon-logout").style.display = "none";
  document.getElementById("icon-login").style.display = "flex";
}
function signInUser() {
  window.location.href = "log-in.html";
}

function handleChangePage(name) {
  window.location.href = `product-detail-page.html?${name}`;
  let product = products.find((product) => name == product.name);
  localStorage.setItem("product", JSON.stringify(product));
}
displayProduct();

function handleSignOut() {
  //Xóa lô cồ currentUers
  localStorage.removeItem("currentUser");
  window.location.href = "log-in.html";
}
