let input_fields = document.querySelectorAll("input");
for (let i = 0; i < input_fields.length; i++) {
  let field = input_fields[i];
  field.addEventListener("input", function (e) {
    if (e.target.value != "") {
      e.target.parentNode.classList.add("has-content");
    } else if (e.target.value == "") {
      e.target.parentNode.classList.remove("has-content");
    }
  });
}
//đăng nhập sai tài khoản mật khẩu admin thì không cho đăng nhập vào trang user.
let addminName = document.getElementById("username");
let addminPassword = document.getElementById("password");

function handleAdminSubmit(event) {
  event.preventDefault();
  if (addminName.value === "admin" && addminPassword.value === "123456") {
    // alert("Đăng nhập thành công");
    window.location.href = "User.html";
  } else {
    alert("Sai tài khoản hoặc mật khẩu");
  }
}
