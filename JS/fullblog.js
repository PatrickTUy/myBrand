const retrievedId = localStorage.getItem("id");
const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
console.log(id);
let fullBlogContent = document.getElementById("fullBlogContent");

const getOneArticle = () => {
  console.log(retrievedId);
  let response = fetch(
    `https://mynewbrandapi.herokuapp.com/api/v1/articles/${id}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((article) => {
      const div = document.createElement("div");
      let html = `<img src="${article.data.image}" alt="" />
         <h2 style='margin-bottom:1em;'> ${article.data.title} </h2>
         <p style=' width:80%;'>${article.data.content}</p>
         `;

      div.innerHTML = html;
      fullBlogContent.appendChild(div);
    })
    .catch((error) => console.log(error));
};

getOneArticle();

const getComments = () => {
  const CommentContainer = document.getElementById("comments");
  let response = fetch(
    `https://mynewbrandapi.herokuapp.com/api/v1/comments/${id}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((comments) => {
      console.log(comments);
      comments.data.map((comment) => {
        let html1 = "";
        html1 += `<div class='divComment'>
                          <h4>${comment.name}</h4>
                          <h4 style='margin-bottom:0.5em;'>posted on:${comment.create_at}</h4>
                          <h4>${comment.comment}</h4>
                   </div>`;

        CommentContainer.innerHTML += html1;
      });
    })
    .catch((error) => console.log(error));
};

getComments();

const commentContainer = document.getElementById("PostComment");
commentContainer.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(commentContainer);
  let response = fetch(
    `https://mynewbrandapi.herokuapp.com/api/v1/comments/${id}`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((comment) => {
      location.reload();
    })
    .catch((error) => console.log(error));
});
