// if (localStorage.getItem("iamMaster") == "12345") {
//   let logoutContainer = document.createElement("div");
//   logoutContainer.innerHTML = `<button class="styleLogout"'onclick="localStorage.setItem('iamMaster', '');window.location.reload()" >LOG OUT</button>`;
//   let navBar = document.querySelector(".navbar");
//   navBar.appendChild(logoutContainer);

let retrievedToken = localStorage.getItem("token");
const createBlog = document.getElementById("createBlog");
createBlog.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(createBlog);

  let response = fetch("https://mynewbrandapi.herokuapp.com/api/v1/articles", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `token ${retrievedToken}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((article) => {
      console.log(article);
      if (article.status == 200) {
        window.location.replace("blogb.html");
      }
    });
});

// const blog = JSON.parse(localStorage.getItem("blog"));
// const blogContainer = document.getElementById("blog-container");
// blog.data.forEach((post) => {
//   let html = `
//     <section id="post-${post.id}" class="blog">
//     <img class="image-skeleton" src='${post.blogPhoto}' />
//     <div class="blogContent" >
//     <h3 style= "margin:0 0 1em 1em;">${post.title}</h3>
//     <p>${post.text.substring(0, 50)}<a href="/pages/fullblog.html?id=${
//     post.id
//   }">...Read more</a> </p>
//     <button class="delblog" style = "margin:0 1em;" > Delete</button>
//     <button class="edblog">Edit</button>
//     </div>
//     </section>
//       `;
//   blogContainer.innerHTML += html;
// });

// document.querySelector("#profileForm").addEventListener("submit", (event) => {
//   event.preventDefault();
//   let image = event.target.profile.files[0];
//   if (image) {
//     let reader = new FileReader();
//     reader.readAsDataURL(image);
//     reader.onload = () => {
//       localStorage.setItem("profilePic", reader.result);
//       window.location.reload();
//     };
//     reader.onerror = () => {
//       alert(
//         "There was an error when processing the file. Please select another"
//       );
//     };
//   } else {
//     localStorage.setItem("profilePic", "./public/Patrickty.jpg");
//     let result = confirm("Do want to remove profile picture?");
//     if (result) {
//       localStorage.setItem("profilePic", "./public/Patrickty.jpg");
//       window.location.reload();
//     } else {
//       alert("So please select an image");
//     }
//   }
// });
// document.querySelectorAll(".delblog").forEach((element) => {
//   element.addEventListener("click", function (e) {
//     e.preventDefault();
//     if (confirm("are you sure you want to delete?")) {
//       let id = e.target.parentNode.parentNode.id.split("-")[1];
//       var newBlogData = blog;
//       newBlogData.data = blog.data.filter((post) => post.id != id);
//       localStorage.setItem("blog", JSON.stringify(newBlogData));
//       window.location.reload();
//     }
//   });
// });
// let edBlog = document.getElementById("edBlogContainer");
// document.querySelectorAll(".edblog").forEach((element) => {
//   element.addEventListener("click", function (e) {
//     e.preventDefault();
//     edBlog.style.display = "flex";
//     let id = element.parentNode.parentNode.id.split("-")[1];
//     let element1 = blog.data.find((element) => element.id == id);
//     let hiddenId = document.getElementById("hiddenId");
//     hiddenId.value = element1.id;
//     let title = document.getElementById("title");
//     title.value = element1.title;
//     let text = document.getElementById("edtext");
//     text.value = element1.text;
//   });
// });
// let btn = document.getElementById("btn");
// btn.addEventListener("click", (e) => {
//   e.preventDefault();
//   let targetId = document.getElementById("hiddenId").value;
//   let editedTitle = document.getElementById("title").value;
//   let editedText = document.getElementById("edtext").value;
//   let editedBlog = blog;
//   let test = blog.data.find((element) => element.id == targetId);
//   test.title = editedTitle;
//   test.text = editedText;
//   test.id = parseInt(targetId);

//   let existingBlogs = JSON.parse(localStorage.getItem("blog"));
//   existingBlogs.data.map((article, index) => {
//     if (article.id == test.id) {
//       existingBlogs.data[index] = test;
//     }
//   });
//   localStorage.setItem("blog", JSON.stringify(existingBlogs));
//   location.reload();
// });

// }

// let cancel = document.getElementById("cancel");
// cancel.addEventListener("click", function (e) {
//   edBlog.style.display = "none";
// });
// else {
//   document.body.innerHTML = "";
//   document.body.innerHTML = `<h1 style="height: 100vh; width:100%; font-size: 80px; display:flex; align-items:center;justify-content:center;margin:0;">Hi, please login!</h1>`;
// }

const getArticles = () => {
  const blogContainer = document.getElementById("allblogs-container");
  let response = fetch("https://mynewbrandapi.herokuapp.com/api/v1/articles", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((post) => {
      console.log(post);
      post.data.map((article) => {
        const div = document.createElement("div");
        div.setAttribute("class", "post-container");
        const el = `
            <div class = 'blog'>
              <img class = 'image-skeleton' src = '${article.image}'>
              <div class = 'blogContent' style = 'margin:2em;'>
                  <h3 class = 'hiddenId' >${article._id}</h3>
                  <h3 style= "margin:0 0 1em 1em;">${article.title}</h3>
                  <p>${article.content.substring(
                    0,
                    50
                  )}<div class ="wholeblog"><button class = "deleteBLog"style = 'margin:1em; cursor:pointer' >Delete</button><button class = "editBlog" style = 'cursor:pointer;'>Update</button></div> </p>
              </div>
            </div>
    
            `;
        div.innerHTML = el;
        blogContainer.append(div);
      });

      const deleteBLog = document.getElementsByClassName("deleteBLog");
      for (let i = 0; i < deleteBLog.length; i++) {
        deleteBLog[i].addEventListener("click", (e) => {
          const id = e.target.parentElement.parentElement.children[0].innerHTML;
          if (confirm("are you sure you want to delete?")) {
            let response = fetch(
              `https://mynewbrandapi.herokuapp.com/api/v1/articles/${id}  `,
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
              });
          }
        });
      }

      const form = document.querySelector("#edBlog");
      const editBlog = document.getElementsByClassName("editBlog");

      for (let i = 0; i < editBlog.length; i++) {
        editBlog[i].addEventListener("click", (e) => {
          console.log(e);

          let edBlog = document.getElementById("edBlogContainer");
          edBlog.style.display = "flex";
          const hideUpdate = document.getElementById("updateUser");
          hideUpdate.style.display = "none";
          let title = document.getElementById("title");
          title.value =
            editBlog[i].parentElement.parentElement.children[1].innerHTML;
          let texte = document.getElementById("texte");
          texte.value =
            editBlog[i].parentElement.parentElement.children[2].innerHTML;
          let cancelUpdate = document.getElementById("cancel");
          cancelUpdate.addEventListener("click", (e) => {
            edBlog.style.display = "none";
          });

          let btn = document.getElementById("btn");
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            let response = fetch(
              ` https://mynewbrandapi.herokuapp.com/api/v1/articles/${editBlog[i].parentElement.parentElement.children[0].innerHTML}/`,
              {
                method: "PATCH",
                body: formData,
                headers: {
                  Authorization: `token ${retrievedToken}`,
                },
              }
            )
              .then((res) => {
                console.log(res.json);
                return res.json();
              })
              .then((user) => {
                console.log(user);
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          });
        });
      }
    })
    .catch((error) => console.log(error));
};

getArticles();

const logout = document.getElementById("logout");
logout.addEventListener("click", (e) => {
  localStorage.setItem("token", "");
  window.location.replace("/pages/login.html");
});

const form = document.querySelector("#updateUser");
const displayUser = document.getElementById("displayUser");
displayUser.addEventListener("click", (e) => {
  console.log(e);
  e.preventDefault();
  let updateUser = document.getElementById("updateUser");
  let edBlog = document.getElementById("edBlogContainer");
  let ediBlog = document.getElementById("edBlog");
  edBlog.style.display = "flex";
  ediBlog.style.display = "none";
  updateUser.style.display = "inline";
});
