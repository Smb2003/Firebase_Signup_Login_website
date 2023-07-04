//-----------------------------------------------------------------------------------
//--------------------------------- Declaring the Variables ------------------------------------
var loginDiv = document.getElementById("LoginDiv");
var regBtn = document.getElementById("Register_submit_btn");
var logBtn = document.getElementById('loginBtn');
var registerbtn = document.getElementById('RegisterBtn');
var login_submit_btn = document.getElementById('Login_submit_btn');
const loader = document.getElementById('loader');
const content_container = document.getElementById('content_container');
const logoutBtn = document.getElementById('logout')
//-----------------------------------------------------------------------------------
// Login button when you are already in the register page..


logBtn.addEventListener('click', loginPage);
function loginPage(){
    document.getElementById("RegisterDiv").style.display = 'none';
    document.getElementById("LoginDiv").style.display = 'block';    
}

registerbtn.addEventListener('click', registerPage)
function registerPage(){
  document.getElementById("RegisterDiv").style.display = 'block';
    document.getElementById("LoginDiv").style.display = 'none';
}
//-----------------------------------------------------------------------------------
//--------------------------------- Firebase ------------------------------------



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  onAuthStateChanged, signOut} 
 from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
 const firebaseConfig = {
  apiKey: "AIzaSyDOUGTJd4YsWJj_ZwOJnAfqEui3FmV9V0g",
  authDomain: "smit-project-3f088.firebaseapp.com",
  projectId: "smit-project-3f088",
  storageBucket: "smit-project-3f088.appspot.com",
  messagingSenderId: "925632184063",
  appId: "1:925632184063:web:ad5d05888c40aa4e4456ca",
  measurementId: "G-3EWBQV7M6D"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
//-----------------------------------------------------------------------------------
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      document.getElementById('loader').style.display = 'none';
      document.getElementById('content_container').style.display = 'block';
      document.getElementById('LoginDiv').style.display = 'none';
      document.getElementById("RegisterDiv").style.display = 'none';
      // ...
    } else {
      // User is signed out
      console.log('user mojood nahn he',)
      document.getElementById('loader').style.display = 'none';
      document.getElementById('content_container').style.display = 'none';
      document.getElementById('LoginDiv').style.display = 'none';
      document.getElementById("RegisterDiv").style.display = 'block';
      // ...
    }
  });
//-----------------------------------------------------------------------------------
// When register button is pressed...

regBtn.addEventListener('click', register)
function register (){
    const reg_email = document.getElementById('register_email').value;
    const reg_password = document.getElementById('register_password').value; 
    
   createUserWithEmailAndPassword(auth, reg_email, reg_password)
      .then((userCredential) => {
       // Signed in 
       const user = userCredential.user;
       console.log("User signed up -->",user);
       // ...
    })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Error Message-->",errorMessage);
     // ..
    });
}

//-----------------------------------------------------------------------------------
// When login button is pressed... 

login_submit_btn.addEventListener('click', login);
function login(){
    const login_email = document.getElementById("Login_email").value
    const login_password = document.getElementById("Login_password").value
    signInWithEmailAndPassword(auth, login_email, login_password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("User logged in -->", user);
      // ...
   })
   .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("ErrorMessage -->", errorMessage);
   });
}

//-----------------------------------------------------------------------------------

logoutBtn.addEventListener('click', logout)

function logout(){
    signOut(auth).then(() => {
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
    alert("User has been logged out")
}