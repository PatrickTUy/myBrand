

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("thetitle").value;
  const text = document.getElementById("text").value;
  const blogPhoto = localStorage.getItem('recent-image')
  if (title.length < 5 || text.length < 8) {
    alert(
      "your title and text should be atleast 5 and 8 characters respectively"
    );

    // alert("fill the spaces before submitting");
  } else {
    if (localStorage.getItem("blog")) {
      console.log(blogPhoto);
      let blog = JSON.parse(localStorage.getItem("blog"));
      blog.lastCount += 1;
      blog.data.push({ id: blog.lastCount, blogPhoto:blogPhoto, title: title,text: text });
      localStorage.setItem("blog", JSON.stringify(blog));
    } else {
      let blog = {};
      blog.lastCount = 0;
      blog.data = [{ id: blog.lastCount, blogPhoto:blogPhoto, title: title,text: text }];
      localStorage.setItem("blog", JSON.stringify(blog));
    }
    window.location.replace("blogb.html");
  }
});

document.querySelector('#photo').addEventListener('change', function(){
  getImageUrl().then((data)=>{
    localStorage.setItem('recent-image',data)
  })
  // const reader = new FileReader();

  // reader.addEventListener('load',()=>{
  //   localStorage.setItem('recent-image',reader.result)
  // });

  // reader.readAsDataURL(this.files[0]);
});

document.addEventListener("DOMContentLoaded",()=>{
  const recentImageDataUrl = localStorage.getItem('recent-image')
  if(recentImageDataUrl){
    document.querySelector('.image-skeleton').setAttribute('src', recentImageDataUrl);
  }


});

const getImageUrl = () => {

        return new Promise((resolve, reject) => {
            let reader = new FileReader();
        
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = reject;
        
            reader.readAsDataURL(document.querySelector('#photo').files[0]);
        })
    }

