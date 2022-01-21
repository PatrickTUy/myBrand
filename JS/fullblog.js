const retrievedId = new URLSearchParams(window.location.search).get("id");
const retrievedData = JSON.parse(localStorage.getItem("blog"));
console.log(retrievedData.data);
const comments = document.getElementById("comments");
const retrievedBlog = retrievedData.data.find((post) => {
  return post.id == retrievedId;
});

let fullBlogContent = document.getElementById("fullBlogContent");
let html = `<img src="${retrievedBlog.blogPhoto}" alt="" />
         <h2 style='margin-bottom:1em;'> ${retrievedBlog.title} </h2>
         <p style=' width:80%;'>${retrievedBlog.text}</p>
         `;

fullBlogContent.innerHTML += html;
let html1 = "";
retrievedBlog.comments.forEach((element) => {
    
  html1 += `<div class='divComment'>
                    <h4>${element.names}</h4>
                    <h4 style='margin-bottom:0.5em;'>posted on:${element.date}</h4>
                    <h4>${element.comment}</h4>
            </div>`;
});
console.log(retrievedBlog);

comments.innerHTML += html1;
const sendComment = document.getElementById("sendComment");
sendComment.addEventListener("click", (e) => {
  e.preventDefault();
  let names = document.getElementById("names").value;
  let email = document.getElementById("email").value;
  let comment = document.getElementById("textbox").value;
  retrievedData.data = retrievedData.data.map((post) => {
    if (!post.id == retrievedId) {
      return post;
    } else {
      if (post.comments) {
        post.comments.push({
          names,
          email,
          comment,
          date: new Date().toLocaleString(),
        });
      } else {
        post.comments = [
          { names, email, comment, date: new Date().toLocaleString() },
        ];
      }
      return post;
    }

  });
  localStorage.setItem("blog", JSON.stringify(retrievedData));
  window.location.reload();
  console.log(retrievedData);
});
