// create a place for the info to go actually i need to create an object to contain the info;
const blog = JSON.parse(localStorage.getItem("blog"));
const blogContainer = document.getElementById("blog-container");
blog.data.forEach((post) => {
  let html = `
  <section id="post-${post.id}" class="blog">
  <img class="image-skeleton" src='${post.blogPhoto}' />
  <div class="blogContent" >
  <h3 style= "margin:0 0 1em 1em;">${post.title}</h3>
  <p>${post.text.substring(0,50)}<a href="/pages/fullblog.html?id=${post.id}">...Read more</a> </p>
  <button class="delblog" style = "margin:0 1em;" > Delete</button>
  <button class="edblog">Edit</button>
  </div>
  </section>
    `;
  blogContainer.innerHTML += html;
});

document.querySelectorAll(".delblog").forEach((element) => {
  element.addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("are you sure you want to delete?")) {
      let id = e.target.parentNode.parentNode.id.split("-")[1];
      var newBlogData = blog;
      newBlogData.data = blog.data.filter((post) => post.id != id);
      localStorage.setItem("blog", JSON.stringify(newBlogData));
      window.location.reload();
    }
  });
});
let edBlog = document.getElementById("edBlogContainer");
document.querySelectorAll(".edblog").forEach((element) => {
  element.addEventListener("click", function (e) {
    e.preventDefault();
    edBlog.style.display = "flex";
    let id = element.parentNode.parentNode.id.split("-")[1];
    let element1 = blog.data.find((element) => element.id == id);
    let hiddenId = document.getElementById("hiddenId");
    hiddenId.value = element1.id;
    let title = document.getElementById("title");
    title.value = element1.title;
    let text = document.getElementById("text");
    text.value = element1.text;
  });
});
let btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let targetId = document.getElementById("hiddenId").value;
  let editedTitle = document.getElementById("title").value;
  let editedText = document.getElementById("text").value;
  let editedBlog = blog;
  let test = blog.data.find((element) => element.id == targetId);
  test.title = editedTitle;
  test.text = editedText;
  test.id = parseInt(targetId);

  let existingBlogs = JSON.parse(localStorage.getItem("blog"));
  existingBlogs.data.map((article, index) => {
    if (article.id == test.id) {
      existingBlogs.data[index] = test;
    }
  });
  localStorage.setItem("blog", JSON.stringify(existingBlogs));
  location.reload();
  
});
let cancel = document.getElementById("cancel");
cancel.addEventListener("click", function (e) {
  edBlog.style.display = "none";
});
