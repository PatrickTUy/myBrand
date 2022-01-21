// REPLACE AN ELEMENT

// CREATE ELEMENT

// const newHeading = document.createElement('h7');
// // GET ELEMENT BY ID

// newHeading.id ='task-title';

// // CREATING A NEW TEXT NODE

// newHeading.appendChild(document.createTextNode('LEARNING IN PROGRESS')) ; //append child is crucial otherwise it won't be added to our document

// // GETTING THE OLD HEADING
// const oldHeading = document.getElementById('text-title');

// //REPLACE CHILD :here we need to target the parent of what we want to replace in my case the parent is the class main

// const MAIN = document.querySelector('.main');

// // REPLACING
// MAIN.replaceChild(newHeading,oldHeading);// successfully replaced the word

// //REMOVING ELEMENTS
// const photos = document.querySelector('.rolemodel-1');
// photos.remove();
// const namey = document.querySelector('.rolemodel-2');
// namey.remove('h2');  // the h2 in here didn't change a thing meaning that remove removes the whole item while removeChild(li[0]) removes that specified item;
// //CLASSES AND ATTRIBUTES
// let val;
// let vis = document.querySelector('li:first-child');

// vis.classList.add('text');
// val = vis.children[0];
// //ATTRIBUTES
// val = vis.getAttribute('href');
// val = vis.hasAttribute('href');

// console.log(val);
// console.log(oldHeading);
// console.log(newHeading);
// document.querySelector(".navbar-items").addEventListener("click", function (e) {
//   e.preventDefault();
//   console.log("Hello world");
// });

const successCallback = (position) => {
  console.log(position);
  // localStorage.setItem('userPosition',position);
  fetch(
    "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
      position.coords.latitude +
      "," +
      position.coords.longitude +
      "&sensor=false"
  ).then((position) => {
    position.json().then((data)=>{console.log(data)});
  });
};

const errorCallback = (error) => {
  console.error(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
