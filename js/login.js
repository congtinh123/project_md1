let email = document.getElementById("email");
let password = document.getElementById("password");
let errorEmail = document.getElementById("error-email");
let errorPassword = document.getElementById("error-password");
let users = JSON.parse(localStorage.getItem("users")) || [];
//LOG IN
let checkEmail = false;
function handlesEmailChecking() {
  let emailInformation = /@/;
  if (email.value === "") {
    errorEmail.innerHTML = "Email cannot be blank";
    checkEmail = false;
  } else if (email.value.length < 6) {
    errorEmail.innerHTML = "Email must be more than 5 characters";
    checkEmail = false;
  } else if (!emailInformation.test(email.value)) {
    errorEmail.innerHTML = "Email must have @ character";
    checkEmail = false;
  } else {
    errorEmail.innerHTML = "";
    checkEmail = true;
  }
}
let checkPassword = false;
function handlesPasswordChecking() {
  if (password.value === "") {
    errorPassword.innerHTML = "Password cannot be blank";
    checkPassword = false;
  } else if (password.value.length < 6) {
    errorPassword.innerHTML = "Password must be more than 5 characters";
    checkPassword = false;
  } else if (password.value === password.value.toLowerCase()) {
    errorPassword.innerHTML = "Password must have 1 uppercase character";
    checkPassword = false;
  } else {
    errorPassword.innerHTML = "";
    checkPassword = true;
  }
}
function handleSubmitLogin(event) {
  event.preventDefault();
  if (checkEmail && checkPassword) {
    let index = users.findIndex((user) => user.email === email.value);
    if (index !== -1) {
      if (users[index].password === password.value) {
        if (users[index].isActive == false) {
          alert("Your account has been locked");
        } else {
          alert("Logged in successfully");
          window.location.href = "homepage.html";
          //phần đăng nhập trên homepage
          let currentUser = {
            access_token: "10000000-1000-4000-8000-100000000000".replace(
              /[018]/g,
              (c) =>
                (
                  c ^
                  (crypto.getRandomValues(new Uint8Array(1))[0] &
                    (15 >> (c / 4)))
                ).toString(16)
            ),
            email: users[index].email,
            products: [],
          };
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        }
      } else {
        alert("Incorrect password");
      }
    } else {
      alert("The Email was registered");
    }
  } else {
    alert("Please enter complete information");
  }
}
