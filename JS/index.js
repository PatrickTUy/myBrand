let profileImage = localStorage.getItem("profilePic");
document.querySelector("#myprofile").innerHTML = `<img
src="${profileImage}"
alt="TUYISHIMIRE YANGENEYE Patrick"
/>`;
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
    position.json().then((data) => {
      console.log(data);
    });
  });
};

const errorCallback = (error) => {
  console.error(error);
};
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
