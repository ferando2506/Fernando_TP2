const misteryAdventuresElButt = document.querySelector("#misteryAdventures");
misteryAdventuresElButt.redirect = 'misteryAdventures';

const rankingElBox = document.querySelector("#ranking");

const mainMenuScreen = document.querySelector("#choicesMenu");
let lastRun = localStorage.getItem("lastRun");
let bestRun = localStorage.getItem("bestRun");
alert(lastRun);

if(lastRun == null) lastRun = '0';
if(bestRun == null) bestRun = '0';
localStorage.clear();

if(lastRun > bestRun){bestRun = lastRun;}
localStorage.setItem("bestRun", bestRun);

misteryAdventuresElButt.addEventListener('click', redirect)



rankingElBox.value = bestRun;

function redirect(event){
    window.location = `../HTML/${event.currentTarget.redirect}.html`;
}


