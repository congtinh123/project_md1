let email = document.getElementById("email");
let oldPassword = document.getElementById("old-password");
let newPassword = document.getElementById("new-password");
let ConfirmPasswordChange = document.getElementById("confirm-password-change");
let errorOldPassword = document.getElementById("error-old-password");
let errorNewPassword = document.getElementById("error-new-password");
let errorConfirmPasswordChange = document.getElementById(
  "error-confirm-password-change"
);
let errorEmail = document.getElementById("error-email");
let users = JSON.parse(localStorage.getItem("users")) || [];
//CHANGE PASSWORD
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

let checkOldPassword = false;
function handlesOldPasswordChecking() {
  if (oldPassword.value === "") {
    errorOldPassword.innerHTML = "Old password cannot be blank";
    checkOldPassword = false;
  } else if (oldPassword.value.length < 6) {
    errorOldPassword.innerHTML = "Old password must be more than 5 characters";
    checkOldPassword = false;
  } else if (oldPassword.value === oldPassword.value.toLowerCase()) {
    errorOldPassword.innerHTML = "Old password must have 1 uppercase character";
    checkOldPassword = false;
  } else {
    errorOldPassword.innerHTML = "";
    checkOldPassword = true;
  }
}

let checkNewPassword = false;

function handlesNewPasswordChecking() {
  if (newPassword.value === "") {
    errorNewPassword.innerHTML = "New password cannot be blank";
    checkNewPassword = false;
  } else if (newPassword.value.length < 6) {
    errorNewPassword.innerHTML = "New password must be more than 5 characters";
    checkNewPassword = false;
  } else if (newPassword.value === newPassword.value.toLowerCase()) {
    errorNewPassword.innerHTML = "New password must have 1 uppercase character";
    checkNewPassword = false;
  } else {
    errorNewPassword.innerHTML = "";
    checkNewPassword = true;
  }
}

let checkConfirmPasswordChange = false;
function handlesConfirmPasswordChangeChecking() {
  if (ConfirmPasswordChange.value === "") {
    errorConfirmPasswordChange.innerHTML = "Confirm password cannot be blank";
    checkConfirmPasswordChange = false;
  } else if (ConfirmPasswordChange.value.length < 6) {
    errorConfirmPasswordChange.innerHTML =
      "Confirmpassword must be more than 5 characters";
    checkConfirmPasswordChange = false;
  } else if (
    ConfirmPasswordChange.value === ConfirmPasswordChange.value.toLowerCase()
  ) {
    errorConfirmPasswordChange.innerHTML =
      "Confirm password must have 1 uppercase character";
    checkConfirmPasswordChange = false;
  } else if (ConfirmPasswordChange.value != newPassword.value) {
    errorConfirmPasswordChange.innerHTML =
      "confirm password must be the same as new password";
    checkConfirmPasswordChange = false;
  } else {
    errorConfirmPasswordChange.innerHTML = "";
    checkConfirmPasswordChange = true;
  }
}

function handleSubmitChangePassword(event) {
  event.preventDefault();
  if (checkEmail && checkNewPassword && checkConfirmPasswordChange) {
    let index = users.findIndex((user) => user.email === email.value);
    if (index !== -1) {
      if (users[index].password === oldPassword.value) {
        users[index].password = newPassword.value;
        alert("Changed password successfully");
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "log-in.html";
      } else {
        alert("Old password is incorrect");
      }
    } else {
      alert("Email is not registered");
    }
  } else {
    alert("You must enter complete information");
  }
}
