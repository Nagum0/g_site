const hangManReadyLink = document.getElementById("readyLink");
const hangManRulesCont = document.getElementById("hangManRulesCont");
const gameContainer = document.getElementById("gameContainer");
const hTitle = document.getElementById("hTitle");

const playerDeck = document.getElementById("playerDeck");
const enemyDeck = document.getElementById("enemyDeck");

hangManReadyLink.addEventListener("click", ()=>{
    hangManRulesCont.classList.add("hidden");
    gameContainer.classList.remove("hidden");
    playerDeck.classList.remove("hidden");
    enemyDeck.classList.remove("hidden");
});

let enemyCards = [];
let playerCards = [];
let joker;

let sortedEnemyCards = [];
let sortedPlayerCards = [];

//GEN CARDS FUNCTION
function genCards(array){
    let counter = 0;

    while (counter < 5) {
        let randCard = Math.floor(Math.random() * 10);
        array.push(randCard);
        counter++;
    }
}

//GENERATE JOKER
function genJoker(array1, array2){
    let randJoker = Math.floor(Math.random() * 5);

    if (randJoker == 0) {
        randJoker = Math.floor(Math.random() * 5);
    }

    let randArrayChooser = Math.floor(Math.random() * 2); //either 0 or 1
    
    if (randArrayChooser == 0) {
        array1.push(`Joker`);
    } else {
        array2.push(`Joker`);
    }
}

//CHECK CARD PAIRS FUNCTION (I kinda know how this works)
function cardPairs(array, newArray){
    let counts = {};

    for (let i = 0; i < array.length; i++) {
        counts[array[i]] = (counts[array[i]] || 0) + 1;
    }

    let result = array.filter((item)=>{
        return counts[item] <= 1;
    })

    for (let i = 0; i < result.length; i++) {
        newArray.push(result[i]);
    } 
}

genCards(enemyCards);
genCards(playerCards);
genJoker(sortedEnemyCards, sortedPlayerCards);

console.log(`Enemy cards: ${enemyCards}`);
console.log(`Player cards: ${playerCards}`);

cardPairs(enemyCards, sortedEnemyCards);
cardPairs(playerCards, sortedPlayerCards);

console.log(`Filtered enemy cards: ${sortedEnemyCards}`);
console.log(`Filtered player cards: ${sortedPlayerCards}`);

const enemyCardCounter = document.getElementById("enemyCardCounter"); //--------TEMPORARY
const playerCardCounter = document.getElementById("playerCardCounter");

enemyCardCounter.innerText = `Cards: ${sortedEnemyCards.length}`;
playerCardCounter.innerText = `Cards: ${sortedPlayerCards.length}`;

//CARDS DISPLAY CORRECT NUMBER
const enemyCardsContainer = document.getElementById("enemyCardsContainer");
const playerCardsContainer = document.getElementById("playerCardsContainer");
let cardLinkArray = [];

function createCards(array, cardContainer){
    let counter = 0;
    let randIndexCounter = [];

    while (counter < array.length) {
        let randIndex = Math.floor(Math.random() * array.length);
        randIndexCounter.push(randIndex);

        cardLink = document.createElement("a");
        cardLink.classList.add("card");
        cardLink.draggable = true;
        cardLink.innerHTML = array[counter];
        cardContainer.appendChild(cardLink);
        cardLinkArray.push(cardLink);
        counter++;
    }
}

createCards(sortedEnemyCards, enemyCardsContainer);
createCards(sortedPlayerCards, playerCardsContainer);

//CARDS CONTAINERS //EVERY SINGLE CREATED CARD LINK
const containers = document.querySelectorAll(".cards_container");
const draggables = document.querySelectorAll(".card");
let dragCounter = 0;

function checkForNewCards(array1, array2, element1, element2){
    array1 = element1.innerText;
    array2 = element2.innerText;

    for (let i = 0; i < element1.length; i++) {
        array1.push(element1[i]);
    }

    for (let i = 0; i < element2.length; i++) {
        array2.push(element2[i]);
    }
}

draggables.forEach(card => {
    card.addEventListener("dragstart", () => {
        card.classList.add("card_draggable");
    })

    card.addEventListener("dragend", () => {
        card.classList.remove("card_draggable");
    })
})

containers.forEach(cardContainer => {
    cardContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
        draggable = document.querySelector(".card_draggable");
        cardContainer.appendChild(draggable);
        dragCounter++;
        
        //checkForNewCards(sortedEnemyCards, sortedPlayerCards, enemyCardsContainer, playerCardsContainer);
    })
})

//DEBUG BTN
const checkBtn = document.getElementById("checkBtn");

checkBtn.addEventListener("click", () => {
    let enemyString = "";
    let playerString = "";

    for (let i = 0; i < enemyCardsContainer.innerText.length; i++) {
        //enemyString = enemyString + enemyCardsContainer.innerText[i];
        console.log(enemyCardsContainer.innerText[i]);
    }

    console.log(enemyString);
})