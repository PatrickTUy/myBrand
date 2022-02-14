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
              <h3 style= "margin:0 0 1em 1em;">${article.title}</h3>
              <p>${article.content.substring(
                0,
                50
              )}<a href="/pages/fullblog.html?id=${
          article.id
        }" id ="wholeblog">...Read more</a> </p>
          </div>
        </div>

        `;
        div.innerHTML = el;
        blogContainer.append(div);
      });
    })
    .catch((error) => console.log(error));
};

getArticles();

// getElementById("wholeblog").addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(e.target.parentElement);
// });

// getfullblog();
