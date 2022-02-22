const sendQuery = document.getElementById("sendQuery");
sendQuery.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(sendQuery);
  console.log(Object.fromEntries(formData));
  let response = fetch("https://mynewbrandapi.herokuapp.com/api/v1/queries/", {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((query) => {
      console.log(query);
      window.location.replace("queries.html");
    });
});
