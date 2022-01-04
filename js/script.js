function readMore1(){
    var dots1=document.getElementById("dots1");
    var more1=document.getElementById("more1");
    var button1=document.getElementById("button1");

    if(dots1.style.display=== "none"){
        dots1.style.display="inline";
        button1.innerHTML=" Read more";
        more1.style.display="none";

    }
    else{
        dots1.style.display="none";
        button1.innerHTML=" Read less";
        more1.style.display="inline";

    }


}

function readMore2(){
    var dots2=document.getElementById("dots2");
    var more2=document.getElementById("more2");
    var button2=document.getElementById("button2");


    if(dots2.style.display=== "none"){
        dots2.style.display="inline";
        button2.innerHTML=" Read more";
        more2.style.display="none";

    }
    else{
        dots2.style.display="none";
        button2.innerHTML=" Read less";
        more2.style.display="inline";

    }

}

function readMore3(){

    var dots3=document.getElementById("dots3");
    var more3=document.getElementById("more3");
    var button3=document.getElementById("button3");

    if(dots3.style.display=== "none"){
        dots3.style.display="inline";
        button3.innerHTML=" Read more";
        more3.style.display="none";

    }
    else{
        dots3.style.display="none";
        button3.innerHTML=" Read less";
        more3.style.display="inline";

    }

}
const hamburger = document.querySelector (".hamburger");
const navMenu = document.querySelector (".nav-menu");
hamburger.addEventListener("click", ()=>{
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

})
document.querySelectorAll(".nav-link").forEach(n=>n.addEventListener
    ("click",()=>{
        hamburger.classList.remove("active");
        navMenu.classlist.remove("active");
    }))

   
  