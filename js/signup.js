let fullName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirm-password");
let errorName = document.getElementById("error-name");
let errorEmail = document.getElementById("error-email");
let errorPassword = document.getElementById("error-password");
let errorConfirmPassword = document.getElementById("error-confirm-password");
let users = JSON.parse(localStorage.getItem("users")) || [];
//SIGN UP

let checkName = false;
function handlesNameChecking() {
  if (fullName.value === "") {
    errorName.innerHTML = "Name cannot be blank";
    checkName = false;
  } else if (fullName.value.length < 6) {
    errorName.innerHTML = "Name must be more than 5 characters";
    checkName = false;
  } else {
    errorName.innerHTML = "";
    checkName = true;
  }
}

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

let checkConfirmPassword = false;
function handlesConfirmPasswordChecking() {
  if (confirmPassword.value === "") {
    errorConfirmPassword.innerHTML = "Confirm password cannot be blank";
    checkConfirmPassword = false;
  } else if (confirmPassword.value.length < 6) {
    errorConfirmPassword.innerHTML =
      "Confirmpassword must be more than 5 characters";
    checkConfirmPassword = false;
  } else if (confirmPassword.value === confirmPassword.value.toLowerCase()) {
    errorConfirmPassword.innerHTML =
      "Confirm password must have 1 uppercase character";
    checkConfirmPassword = false;
  } else if (confirmPassword.value != password.value) {
    errorConfirmPassword.innerHTML =
      "confirm password must be the same as password";
    checkConfirmPassword = false;
  } else {
    errorConfirmPassword.innerHTML = "";
    checkConfirmPassword = true;
  }
}

function handleSubmitSignUp(event) {
  event.preventDefault();
  if (checkName && checkEmail && checkPassword && checkConfirmPassword) {
    let newUser = {
      id: Math.floor(Math.random() * 1000),
      name: fullName.value,
      email: email.value,
      password: password.value,
      isActive: true,
    };
    let index = users.findIndex((user) => user.email === email.value);
    if (index === -1) {
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account registration successful");
      window.location.href = "log-in.html";
    } else {
      alert("The Email was registered");
    }
  } else {
    alert("Please enter complete information");
  }
}
