let playerDeckList = [];
let enemySprList = ["BigGuy","BlueKnight","Cebolao"];
let deckEl = document.querySelector("#lowerGUI");

const profile = {
    nickname: null,
    exp: null
};

const cardModel = {
    Name: 'CardName',
    Img: 'CardImage',
    Dsc: 'cardDescription',
    Dmg: 0,
    Hlf: 0,
    Shl:0,
    Doc:null,
    Id: 0
};

const enemy = {
    Health: 0,
    Shield: 0,
    HealthEl: document.querySelector("#enemy .health"),
    ShieldEl: document.querySelector("#enemy .shield"),
    body: document.querySelector("#enemy img")
};

const player ={
    Health: 25,
    Shield: 35,
    HealthEl: document.querySelector("#player .health"),
    ShieldEl: document.querySelector("#player .shield"),
    body: document.querySelector("#player img")
}
player.HealthEl.innerHTML = player.Health;
player.ShieldEl.innerHTML = player.Shield;


function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

function getCardIndex(id){
    let index = 0;
    playerDeckList.forEach(card => {
        console.log(index);
        if (card.Id == id)
           return index
        index++;
    });
}

function newEnnemy(){
    enemy.Health = getRandomInt(40)+1;
    enemy.Shield = getRandomInt(50)+1;
    if (enemy.Health == 1) enemy.Shield += 25;
    enemy.HealthEl.innerHTML = enemy.Health;
    enemy.ShieldEl.innerHTML = enemy.Shield;
    let enemySprite = `${enemySprList[getRandomInt(3)]}`.replace(':', '');
    enemy.body.src = `../Images/CharacetSprites/${enemySprite}.png`;
  }

function addCardToDeck(card){
    let NewCardHtml = `<div class="card">
    <img src="../Images/CardSprites/${card.Img}.png" alt="${card.Name}">
    <blockquote>
      ${card.Dsc} ${getRandomInt(1000)}
    </blockquote>
    </div>`

    deckEl.insertAdjacentHTML("beforeend", NewCardHtml);

    let NewCardEl = document.querySelector("#lowerGUI :first-child");
    card.Doc = NewCardEl;
    card.Id = playerDeckList.length;
    playerDeckList.push(card);
    NewCardEl.addEventListener("click", () => useCard(card.Id));
}

function useCard(Id){ 
    let index = getCardIndex(Id);
    let cardEl = document.querySelector(`#lowerGUI :nth-child(${(index)})`);
    console.log(cardEl);
    playerDeckList.splice(index, 1);
    cardEl.remove();
}

addCardToDeck(cardModel);
addCardToDeck(cardModel);
addCardToDeck(cardModel);
newEnnemy();