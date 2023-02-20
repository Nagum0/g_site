const hangManReadyLink = document.getElementById("readyLink");
const hangManRulesCont = document.getElementById("hangManRulesCont");
const hTitle = document.getElementById("hTitle");

hangManReadyLink.addEventListener("click", ()=>{
    hangManRulesCont.classList.add("hidden");
});

let enemyCards = [];
let playerCards = [];
let joker;

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
        array1.push(`Joker: ${randJoker}`);
    } else {
        array2.push(`Joker: ${randJoker}`);
    }
}

//CHECK CARD PAIRS FUNCTION (I kinda know how this works)
function cardPairs(array){
    let counts = {};

    for (let i = 0; i < array.length; i++) {
        counts[array[i]] = (counts[array[i]] || 0) + 1;
    }

    let result = array.filter((item)=>{
        return counts[item] <= 1;
    })

    return result;

}

genCards(enemyCards);
genCards(playerCards);
genJoker(enemyCards, playerCards);

console.log(`Enemy cards: ${enemyCards}`);
console.log(`Player cards: ${playerCards}`);

console.log(`Filtered enemy cards: ${cardPairs(enemyCards)}`);
console.log(`Filtered player cards: ${cardPairs(playerCards)}`);