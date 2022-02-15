const query = JSON.parse(localStorage.getItem("query"));
// const queryContainer = document.getElementById("queryContainer");
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
        let html = `
        <div style="background:rgba(80, 110, 103, 0.226); margin:2em" > 
                <section id ="query-${querySent.id} class=" visitor" style= "margin:2em; display:flex">
                <div class="info1">
                    <h2>Names:${querySent.senderName}</h2>
                    <h2> Email:${querySent.email}</h2>
                    <h2>Sent on:${querySent.date_created}</h2>
                </div>
            
                <div class="detail" >
                <p >${querySent.message} <button type="submit"> reply query</p>
                </div>
         </div>
        `;
        queryContainer.innerHTML += html;
      });
    })
    .catch((error) => console.log(error));
};

getArticles();
// query.data.forEach((querySent) => {
//   let html = `
//     <div style="background:rgba(80, 110, 103, 0.226); margin:2em" >
//             <section id ="query-${querySent.id} class=" visitor" style= "margin:2em; display:flex">
//             <div class="info1">
//                 <h2>${querySent.names}</h2>
//                 <h2> ${querySent.email}</h2>
//                 <h2>Sent on:${querySent.date}</h2>
//             </div>

//             <div class="detail" >
//             <p >${querySent.description} <button type="submit"> reply query</p>
//             </div>
//      </div>
//     `;
//   queryContainer.innerHTML += html;
// });
