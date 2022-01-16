// create a place for the info to go actually i need to create an object to contain the info;
const blog = JSON.parse(localStorage.getItem("blog"));
const blogContainer = document.getElementById("blog-container");
// const newBlog = document.createElement("h2");
// const blogTitle = document.createTextNode(title);
blog.data.forEach((post) => {
  let html = `
  <section id="post-${post.id}" class="blog">
  <img class="image-skeleton" />
  <div >
  <h3>${post.title}</h3>
  <p>${post.text}</p>
  <button class="delblog">Delete</button>
  <button class="edblog">Edit</button>
  </div>
  </section>
    `;
  blogContainer.innerHTML += html;
  //   let blogWrapper = document.createElement("section");
  //   let image = document.createElement("img");
  //   let textContainer = document.createElement("div");
  //   let titleElement = document.createElement("h3");
  //   let paragraphElement = document.createElement("p");
  //   let deletebutton = document.createElement("button");
  //   deletebutton.innerHTML = "delete";
  //   deletebutton.classList.add("delblog");
  //   let editbutton = document.createElement("button");
  //   editbutton.innerHTML = "edit";
  //   blogWrapper.id = "post-" + post.id;
  //   blogWrapper.classList.add("blog");
  //   image.classList.add("image-skeleton");
  //   titleElement.innerHTML = post.title;
  //   paragraphElement.innerHTML = post.text;
  //   textContainer.append(
  //     titleElement,
  //     paragraphElement,
  //     deletebutton,
  //     editbutton
  //   );
  //   blogWrapper.append(image, textContainer);
  //   blogContainer.append(blogWrapper);
});

document.querySelectorAll(".delblog").forEach((element) => {
  element.addEventListener("click", function (e) {
    e.preventDefault();
    if(confirm("are you sure you want to delete?")){
    let id = e.target.parentNode.parentNode.id.split("-")[1];
    let newBlogData = blog;
    newBlogData.data = blog.data.filter((post) => post.id != id);
    localStorage.setItem("blog", JSON.stringify(newBlogData));
    window.location.reload()};
  });
})

// document.querySelectorAll('.edblog').forEach((element) =>{
//   element.addEventListener('click',function(e){
//     e.preventDefault();
//     const edTitle = document.getItem('title').value;
//     title=edTitle;

//     windows.location.replace('.dashboard.html')
//   })
// })

// newBlog.appendChild(blogTitle);
// newBlog.appendChild(blogText);
// newBlog.className = "newBLog";
// document.appendChild(newBlog);
