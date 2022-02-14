if (localStorage.getItem("iamMaster") == "12345") {
  let logoutContainer = document.createElement("div");
  logoutContainer.innerHTML = `<button class="styleLogout"'onclick="localStorage.setItem('iamMaster', '');window.location.reload()" >LOG OUT</button>`;
  let navBar = document.querySelector(".navbar");
  navBar.appendChild(logoutContainer);
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("thetitle").value;
    const text = document.getElementById("text").value;
    const blogPhoto = localStorage.getItem("recent-image");
    if (title.length < 5 || text.length < 8) {
      alert(
        "your title and text should be atleast 5 and 8 characters respectively"
      );
    } else {
      if (localStorage.getItem("blog")) {
        let blog = JSON.parse(localStorage.getItem("blog"));
        blog.lastCount += 1;
        blog.data.push({
          id: blog.lastCount,
          blogPhoto: blogPhoto,
          title: title,
          text: text,
          comments: [],
        });
        localStorage.setItem("blog", JSON.stringify(blog));
      } else {
        let blog = {};
        blog.lastCount = 0;
        blog.data = [
          {
            id: blog.lastCount,
            blogPhoto: blogPhoto,
            title: title,
            text: text,
            comments: [],
          },
        ];
        localStorage.setItem("blog", JSON.stringify(blog));
      }
      window.location.replace("blogb.html");
    }
  });

  document.querySelector("#photo").addEventListener("change", function () {
    getImageUrl().then((data) => {
      localStorage.setItem("recent-image", data);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const recentImageDataUrl = localStorage.getItem("recent-image");
    if (recentImageDataUrl) {
      document
        .querySelector(".image-skeleton")
        .setAttribute("src", recentImageDataUrl);
    }
  });

  const getImageUrl = () => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;

      reader.readAsDataURL(document.querySelector("#photo").files[0]);
    });
  };

  const blog = JSON.parse(localStorage.getItem("blog"));
  const blogContainer = document.getElementById("blog-container");
  blog.data.forEach((post) => {
    let html = `
      <section id="post-${post.id}" class="blog">
      <img class="image-skeleton" src='${post.blogPhoto}' />
      <div class="blogContent" >
      <h3 style= "margin:0 0 1em 1em;">${post.title}</h3>
      <p>${post.text.substring(0, 50)}<a href="/pages/fullblog.html?id=${
      post.id
    }">...Read more</a> </p>
      <button class="delblog" style = "margin:0 1em;" > Delete</button>
      <button class="edblog">Edit</button>
      </div>
      </section>
        `;
    blogContainer.innerHTML += html;
  });

  document.querySelector("#profileForm").addEventListener("submit", (event) => {
    event.preventDefault();
    let image = event.target.profile.files[0];
    if (image) {
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        localStorage.setItem("profilePic", reader.result);
        window.location.reload();
      };
      reader.onerror = () => {
        alert(
          "There was an error when processing the file. Please select another"
        );
      };
    } else {
      localStorage.setItem("profilePic", "./public/Patrickty.jpg");
      let result = confirm("Do want to remove profile picture?");
      if (result) {
        localStorage.setItem("profilePic", "./public/Patrickty.jpg");
        window.location.reload();
      } else {
        alert("So please select an image");
      }
    }
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
      let text = document.getElementById("edtext");
      text.value = element1.text;
    });
  });
  let btn = document.getElementById("btn");
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    let targetId = document.getElementById("hiddenId").value;
    let editedTitle = document.getElementById("title").value;
    let editedText = document.getElementById("edtext").value;
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
} else {
  document.body.innerHTML = "";
  document.body.innerHTML = `<h1 style="height: 100vh; width:100%; font-size: 80px; display:flex; align-items:center;justify-content:center;margin:0;">Hi, please login!</h1>`;
}
