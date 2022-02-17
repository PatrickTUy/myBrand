const getArticles = () => {
  const blogContainer = document.getElementById("blog-container");
  let response = fetch("https://mynewbrandapi.herokuapp.com/api/v1/articles", {
    method: "GET",
  })
    .then((res) => {
      return res.json();
    })
    .then((post) => {
      post.data.map((article) => {
        const div = document.createElement("div");
        div.setAttribute("class", "post-container");
        const el = `
        <div class = 'blog'>
          <img class = 'image-skeleton' src = '${article.image}'>
          <div class = 'blogContent'>
              <h3 class = 'hiddenId' > ${article._id}</h3>
              <h3 style= "margin:0 0 1em 1em;">${article.title}</h3>
              <p>${article.content.substring(
                0,
                50
              )}<div style= "cursor:pointer;"class ="wholeblog"><a href="/pages/fullblog.html?id=${
          article._id
        }" >...Read more</a></div> </p>
          </div>
        </div>

        `;
        div.innerHTML = el;
        blogContainer.append(div);
      });
      console.log(document.getElementsByClassName("wholeblog"));
      const wholeblogs = document.getElementsByClassName("wholeblog");

      for (let i = 0; i < wholeblogs.length; i++) {
        wholeblogs[i].addEventListener("click", (e) => {
          // e.preventDefault();
          // console.log(
          //   e.target.parentElement.parentElement.children[0].innerHTML
          // );
          // localStorage.setItem(
          //   "id",
          //   e.target.parentElement.parentElement.children[0].innerHTML
          // );
          // window.location.replace("/pages/fullblog.html");
        });
      }
    })
    .catch((error) => console.log(error));
};

getArticles();

// getElementById("wholeblog").addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(e.target.parentElement);
// });

// getfullblog();
