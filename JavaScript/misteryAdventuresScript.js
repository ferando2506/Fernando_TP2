let cardsList = [];
let playerDeckList = [];
let enemySprList = ["BigGuy","BlueKnight","Cebolao"];
let deckEl = document.querySelector("#lowerGUI");
let sequenceEl = document.querySelector("#upperGUI label");
let sequence = 0;
sequenceEl.innerHTML = `Sequence:${sequence}`;

const cardModel = {
    Name: 'CardName',
    Img: 'CardImage',
    Dsc: 'cardDescription',
    Dmg: 0,
    Hlf: 0,
    Shl:0
};

const enemy = {
    Health: 0,
    Shield: 0,
    HealthEl: document.querySelector("#enemy .health"),
    ShieldEl: document.querySelector("#enemy .shield"),
    body: document.querySelector("#enemy img")
};

const player ={
    Health: 15,
    Shield: 4,
    HealthEl: document.querySelector("#player .health"),
    ShieldEl: document.querySelector("#player .shield"),
    body: document.querySelector("#player img")
}
player.HealthEl.innerHTML = player.Health;
player.ShieldEl.innerHTML = player.Shield;

function Card(Name, ImgName, Description, Damage, Healing, Shield){
	this.Name = Name;
	this.Img = ImgName;
	this.Dsc = Description;
	this.Dmg = Damage;
	this.Hlf = Healing;
	this.Shl = Shield;
}

function getRandomInt(max){
    return Math.floor(Math.random() * max)
}

function getCardIndex(cardEl){
    let index = 0;
    playerDeckList.forEach(card => {
        if (card == playerDeckList[index])
           return index;
        index++;
    });
}

function getCard(element){
	if(element.classList == "card")
		return element;
	else if(element.parentNode.classList == "card")
		return element.parentNode;
}

function newEnnemy(){
    enemy.Health = getRandomInt(20)+1;
    enemy.Shield = getRandomInt(10)+1;
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
	${card.Dsc}<br>Dmg:${card.Dmg}<br>Hlf:${card.Hlf}<br>Shl:${card.Shl} 
    </blockquote>
    </div>`

    deckEl.insertAdjacentHTML("beforeend", NewCardHtml);
      

    playerDeckList.push(document.querySelector("#lowerGUI :last-child.card"));
    
    $(playerDeckList[playerDeckList.length-1]).data("Card", card);
    playerDeckList.forEach((card) => {
    	card.addEventListener('click',useCard);
    });
}

function updateGameValues(card, user, target){
    let damage = card.Dmg;
    user.Health += card.Hlf;
    user.Shield += card.Shl;
    
    if(target.Shield < damage){
    	damage -= target.Shield;
    	target.Shield = 0;
    	target.Health -= damage;
    }
    else {target.Shield -= damage;}
    
    user.HealthEl.innerHTML = user.Health;
    user.ShieldEl.innerHTML = user.Shield;
	target.ShieldEl.innerHTML = target.Shield;
	target.HealthEl.innerHTML = target.Health;
}
function enemyAttak(){
	let card = cardsList[getRandomInt(cardsList.length)];
	alert(card.Name);
	updateGameValues(card, enemy, player);
}

function gameOver(){
	alert("You Died");
	window.localStorage.setItem("lastRun", sequence);
	window.location = `../HTML/index.html`;
}

function useCard(event){
    let cardEl = getCard(event.target);
    let cardObj = $(cardEl).data("Card");
    let index = getCardIndex(cardEl);
    playerDeckList.splice(index, 1);
    cardEl.remove();
    
    updateGameValues(cardObj,player,enemy);
    addCardToDeck(cardsList[getRandomInt(cardsList.length)]);
    
    if (enemy.Health <= 0) {
    	addCardToDeck(cardsList[getRandomInt(cardsList.length)]);
    	newEnnemy();
    	sequence += 1;
    	sequenceEl.innerHTML = `Sequence:${sequence}`;
    }
    
    enemyAttak();
    
    if(player.Health <= 0){
    	gameOver();
    }
}

cardsList[0] = new Card("Glory'o Fight", null, "Give'th Energy<br>for those in need", -2, 2, 1);

cardsList[1] = new Card("Sword Of Killn", null, 'It does, indeed<br> kill',7, 0,0);

cardsList[2] = new Card("Shield o' Faith", null, 'May God protect<br> your soul',0, 0,3);

cardsList[3] = new Card("Moon Knight", null, "The Night<br>Killer o'Souls",10, -5,0);

cardsList[4] = new Card("Draconic Blast",null, "Blast the hole <br> Field",3,-3,0);

cardsList[5] = new Card("Harden",null, "Harden your skin",0,3,4);

cardsList[6] = new Card("Huge Axe",null, "Bring it down",14,0,0);

addCardToDeck(cardsList[getRandomInt(cardsList.length)]);
addCardToDeck(cardsList[getRandomInt(cardsList.length)]);
addCardToDeck(cardsList[getRandomInt(cardsList.length)]);

newEnnemy();
