 const email = document.querySelector('.email');

 const password= document.querySelector('.password');
 
 const  button = document.querySelector('.btn').nodeValue;
 const errorElement = document.getElementById('error')
 errorElement.style.color = 'red';
 errorElement.style.marginBottom = '1em';
 document.querySelector('form').addEventListener('submit',validation);
 
 function validation(e){
     e.preventDefault();
     let message = [];
     var email1 = email.value;
     var password1 = password.value;
    
     if(email1 === 'yangeney@gmail.com'&& password1 === '12345'){
        alert('succesfully loged in') 
        window.location.replace('dashboard.html')}
        else{
            message.push('INVALID CREDENTIALS!');
             errorElement.innerText = message;
            //  setTimeout((errorElement),3000);
             window.location.reload();
            }
            
        
 }
 
 
