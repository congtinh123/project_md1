document.querySelectorAll(".sidebar-submenu").forEach((e) => {
  e.querySelector(".sidebar-menu-dropdown").onclick = (event) => {
    event.preventDefault();
    e.querySelector(".sidebar-menu-dropdown .dropdown-icon").classList.toggle(
      "active"
    );

    let dropdown_content = e.querySelector(".sidebar-menu-dropdown-content");
    let dropdown_content_lis = dropdown_content.querySelectorAll("li");

    let active_height =
      dropdown_content_lis[0].clientHeight * dropdown_content_lis.length;

    dropdown_content.classList.toggle("active");

    dropdown_content.style.height = dropdown_content.classList.contains(
      "active"
    )
      ? active_height + "px"
      : "0";
  };
});

setDarkChart = (dark) => {
  let theme = {
    theme: {
      mode: dark ? "dark" : "light",
    },
  };

  customer_chart.updateOptions(theme);
  category_chart.updateOptions(theme);
};

// DARK MODE TOGGLE
let darkmode_toggle = document.querySelector("#darkmode-toggle");

darkmode_toggle.onclick = (e) => {
  e.preventDefault();
  document.querySelector("body").classList.toggle("dark");
  darkmode_toggle.querySelector(".darkmode-switch").classList.toggle("active");
  setDarkChart(document.querySelector("body").classList.contains("dark"));
};

let overlay = document.querySelector(".overlay");
let sidebar = document.querySelector(".sidebar");

document.querySelector("#mobile-toggle").onclick = () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
};

document.querySelector("#sidebar-close").onclick = () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
};

//PRODUCT
let image = document.getElementById("image");
let code = document.getElementById("code");
let productName = document.getElementById("name");
let price = document.getElementById("price");
let quantity = document.getElementById("quantity");
let tbody = document.getElementById("tbodyProduct");
let formInputProduct = document.getElementById("form-input-product");
let btnAdd = document.getElementById("btn-add");
let btnSave = document.getElementById("btn-save");
let btnAddProduct = document.getElementById("btn-addproduct");

let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  let newProduct = {
    id: Math.floor(Math.random() * 1000),
    image: image.value,
    code: code.value,
    name: productName.value,
    price: price.value,
    quantity: quantity.value,
  };
  products.push(newProduct);
  displayProduct();
  formInputProduct.style.display = "none";
  btnAddProduct.style.display = "block";
  localStorage.setItem("products", JSON.stringify(products));
}

function displayProduct() {
  let html = "";
  for (let i in products) {
    html += `
  <tr>
  <td>${parseInt(i) + 1}</td>
  <td>
  <img src="${products[i].image}"width="250px" height="150px"/>
  </td>
  <td>${products[i].code}</td>
  <td>${products[i].name}</td>
  <td>${products[i].price}</td>
  <td>${products[i].quantity}</td>
  <td>
  <button onclick="editProduct(${products[i].id})">Edit</button>
  <button onclick="deleteProduct(${products[i].id})">Delete</button>
  </td>
  </tr>
  `;
  }
  tbody.innerHTML = html;
  image.value = "";
  code.value = "";
  productName.value = "";
  price.value = "";
  quantity.value = "";
}
displayProduct();

function deleteProduct(id) {
  let index = products.findIndex((product) => product.id == id);
  products.splice(index, 1);
  formInputProduct.style.display = "none";
  displayProduct();
  localStorage.setItem("products", JSON.stringify(products));
}

function editProduct(id) {
  formInputProduct.style.display = "block";
  btnAdd.style.display = "none";
  btnSave.style.display = "block";
  localStorage.setItem("id", JSON.stringify(id));
  let index = products.findIndex((product) => product.id == id);
  image.value = products[index].image;
  code.value = products[index].code;
  productName.value = products[index].name;
  price.value = products[index].price;
  quantity.value = products[index].quantity;
  btnAddProduct.style.display = "none";
  tbody.style.display = "none";
}

function saveProduct() {
  let id = localStorage.getItem("id");
  let index = products.findIndex((product) => product.id == id);
  products[index].image = image.value;
  products[index].code = code.value;
  products[index].name = productName.value;
  products[index].price = price.value;
  products[index].quantity = quantity.value;
  localStorage.setItem("products", JSON.stringify(products));
  formInputProduct.style.display = "none";
  btnAddProduct.style.display = "block";
  displayProduct();
  tbody.style.display = "contents";
}
function displayFormInputProduct() {
  formInputProduct.style.display = "block";
  btnAdd.style.display = "block";
  btnSave.style.display = "none";
  btnAddProduct.style.display = "none";
}
