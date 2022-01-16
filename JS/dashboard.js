document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("thetitle").value;
  const text = document.getElementById("text").value;
  const blogPhoto = document.querySelector('#photo');
  if (!title || !text || title.length < 5 || text.length < 8) {
    alert(
      "your title and text should be atleast 5 and 8 characters respectively"
    );

    // alert("fill the spaces before submitting");
  } else {
    if (localStorage.getItem("blog")) {
      let blog = JSON.parse(localStorage.getItem("blog"));
      blog.lastCount += 1;
      blog.data.push({ id: blog.lastCount, title: title, text: text });
      localStorage.setItem("blog", JSON.stringify(blog));
    } else {
      let blog = {};
      blog.lastCount = 0;
      blog.data = [{ id: blog.lastCount, title: title, text: text }];
      localStorage.setItem("blog", JSON.stringify(blog));
    }
    // window.location.replace("blogb.html");
  }
});
