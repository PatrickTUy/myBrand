const errorElement = document.getElementById("error");
errorElement.style.color = "red";
errorElement.style.marginBottom = "1em";

const form = document.querySelector("form");

document.getElementById("login").addEventListener("submit", (e) => {
  e.preventDefault();

  console.log(form);

  const formData = new FormData(form);

  let response = fetch(
    "https://mynewbrandapi.herokuapp.com/api/v1/users/login/",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((user) => {
      console.log(user);
      if (user.status == 200) {
        let token = localStorage.setItem("token", user.accessToken);
        window.location.replace("dashboard.html");
      } else {
        let errormessage = [];
        errormessage.push("INVALID CREDENTIALS!");
        errorElement.innerText = errormessage;
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
