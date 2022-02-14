const email = document.querySelector('.email');
const names = document.querySelector('.names');
const description = document.querySelector('.description');
const  button = document.querySelector('.btn')
let displayMessage  = document.querySelector('#displayMessage');
console.log(displayMessage);
displayMessage.tagName ='h4';
email.onkeydown = function(){
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(regex.test(email.value)){
        displayMessage.innerText="YOUR EMAIL IS VALID";
        displayMessage.style.color = 'blue'
    }
    else{
        displayMessage.innerText = "YOUR EMAIL IS INVALID!"
        displayMessage.style.color = 'yellow'
    }
};
names.onkeydown = function(){
    const regexo = /^[a-zA-Z ]{2,30}$/;
    if(regexo.test(names.value)){
        displayMessage.innerText="YOUR NAME IS VALID";
        displayMessage.style.color = 'blue';
    }
    else{
        displayMessage.innerText = "YOUR NAME IS INVALID!"
        displayMessage.style.color = 'yellow';
    }
};
description.onkeydown = function(){
    descriptionlgth=description.value;
    if(descriptionlgth.length < 2){
        displayMessage.innerText = "MESSAGE SHOULD CONTAIN ATLEAST 2 CHARACTERS!"
        displayMessage.style.color = 'yellow'
    }
    else{
        displayMessage.innerText = '';
    }
}
document.querySelector('form').addEventListener('submit',function(e){
e.preventDefault();
let emailContent = email.value, namesContent = names.value, descriptionContent = description.value;

if(emailContent === '' || namesContent === '' || descriptionContent ===''){
    alert('fill all the boxes please!')
}
else{
     const currentDate= new Date().toLocaleDateString();
     console.log(currentDate);

    if(localStorage.getItem('query')){
        let query = JSON.parse(localStorage.getItem('query'));
        query.lastCount+=1;
        query.data.push({id:query.lastCount, email:emailContent, names:namesContent, date:currentDate, description:descriptionContent });
        localStorage.setItem('query', JSON.stringify(query));
    }
    else{
        query= { };
        query.lastCount = 0;
        query.data = [{id:query.lastCount, email:emailContent, names:namesContent, date:currentDate,description:descriptionContent}];
        localStorage.setItem('query',JSON.stringify(query));
    }
}
 window.location.replace('queries.html')


})