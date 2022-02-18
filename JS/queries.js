let retrievedToken = localStorage.getItem("token");
const getArticles = () => {
  const queryContainer = document.getElementById("queryContainer");
  let response = fetch("https://mynewbrandapi.herokuapp.com/api/v1/queries", {
    method: "GET",
    headers: {
      Authorization: `token ${retrievedToken}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((queries) => {
      console.log(queries);
      queries.data.map((querySent) => {
        let date = "";
        date = querySent.date_created.split("T");
        let finalDate = `${date[0]} `;
        let html = `
        <div style="background:rgba(80, 110, 103, 0.226); margin:2em; border-radius:10px" > 
                <section  style= "margin:2em; display:flex">
                <div class="info1">
                <h2 class = 'hiddenId'>${querySent._id}</h2>
                    <h2>Names:${querySent.senderName}</h2>
                    <h2> Email:${querySent.email}</h2>
                    <h2>Sent on:${finalDate}</h2>
                </div>
            
                <div class="detail" >
                <p >${querySent.message} <button type = "submit" class = 'deleteQuery'style = 'cursor:pointer;'> delete query</button></p>
                </div>
         </div>
        `;
        queryContainer.innerHTML += html;

        const deleteQuery = document.getElementsByClassName("deleteQuery");

        for (let i = 0; i < deleteQuery.length; i++) {
          deleteQuery[i].addEventListener("click", (e) => {
            e.preventDefault();
            const id =
              e.target.parentElement.parentElement.parentElement.children[0]
                .children[0].innerHTML;
            if (confirm("are you sure you want to delete ?")) {
              let response = fetch(
                `https://mynewbrandapi.herokuapp.com/api/v1/queries/${id}  `,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `token ${retrievedToken}`,
                  },
                }
              )
                .then((res) => {
                  console.log(res);
                  return res.json();
                })
                .then((deleted) => {
                  console.log(deleted);
                  window.location.reload();
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
        }
      });
    })
    .catch((error) => console.log(error));
};

getArticles();
