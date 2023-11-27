const misteryAdventuresElButt = document.querySelector("#misteryAdventures");
const rankingElButt = document.querySelector("#ranking");
const logInElButt = document.querySelector("#logIn");
const accountManagerEl = document.querySelector("#account");

const mainMenuScreen = document.querySelector("#choicesMenu");
const logInScreen = '<section id="logInScreen"> <input type="text" placeholder="Nickname"> <input type="password" placeholder="Password"> <button id = "createAcc">Create account</button> <button id = "logIn">LogIn</button> </section>';


let logElButt;
let createAccElButt;
let passwordElInp;
let nicknameElInp;

const profile = {
    nickname: null,
    password: null
};

misteryAdventuresElButt.addEventListener('click', ()=> redirect("misteryAdventures"));
rankingElButt.addEventListener('click', () => redirect("ranks"));

logInElButt.addEventListener('click', () =>{
    let accName = document.querySelector("#account p");
    if(accName.innerHTML == "Guest")
        logMenu();
    else
       changeImage();
})

function redirect(adress){
    window.localStorage.setItem(user,stringfy(profile));
    window.location = `../HTML/${adress}.html`
}


function changeImage(){

}
function backToMainMenu(antiqueElList){
    antiqueElList.forEach(element => {
        element.remove();
    });
    document.querySelector("main").insertAdjacentHTML("afterbegin", mainMenuScreen);

}

function logMenu(){
    mainMenuScreen.remove();
    document.querySelector("main").insertAdjacentHTML("afterbegin", logInScreen);
    logElButt = document.querySelector("#logIn");
    createAccElButt =  document.querySelector("#createAcc");
    
    passwordElInp =  document.querySelector('input[placeholder="Password"]');
    nicknameElInp =  document.querySelector('input[placeholder="Nickname"]');

    let screenElList = [logElButt,createAccElButt,passwordElInp,nicknameElInp];
    logElButt.addEventListener('click', () => {if (nicknameElInp.value != '' && passwordElInp.value != '') setProfile(nicknameElInp.value, passwordElInp.value); logIn();backToMainMenu(screenElList);});
    createAccElButt.addEventListener('click', () => {if(nicknameElInp.value != '' && passwordElInp.value != '') setProfile(nicknameElInp.value, passwordElInp.value); createAcc();backToMainMenu(screenElList)});
}
function setProfile(nickname, password){
    profile.nickname = nickname;
    profile.password = password;
}
function logIn(){
    fetch('https://api.sheetmonkey.io/form/aB2rMiHk75CKJ7poDUP9Fn', {
        method: 'GET',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(profile),
    }).then((result) => {logIn(profile)});
}

function createAcc(){
    alert("a");
    fetch('https://api.sheetmonkey.io/form/aB2rMiHk75CKJ7poDUP9Fn', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
    }).then((result) => {logIn(profile)});
}