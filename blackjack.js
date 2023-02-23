class BlackJack {
	constructor (title) {
		this.title = title;
	}

	//BET MENU METHODS
	showBetMenu(betMenu) {
		betMenu.classList.remove("hidden");
		betMenu.classList.add("bet_menu");
	}

	bettingBios(biosNum, betBios, biosLbl, biosInput, errMsg, betMenu, timeCounter) {
		if (biosInput.value > biosNum) {
			console.log("You don't have enought BIOS");
			errMsg.classList.remove("hidden");
		} else if (biosInput.value == 0) {
			errMsg.classList.remove("hidden");
			errMsg.innerText = "Bet entry cannot be 0!";
		} else {
			betBios = biosInput.value;
			biosNum -= betBios;
			betMenu.style.display = "none";
			biosLbl.innerText = `Bios bet \n ${betBios}`;
			console.log(`Bet confirmed at ${timeCounter} seconds`);
			console.log(`Time restarted because of bettingBios btn click. Time: ${timeCounter}`);
			console.log(`Bet BIOS: ${betBios}`);
			console.log(`Player BIOS: ${biosNum}`);
		}
	}

	//DEALER BET
	dealerBet(biosNum, betBios, biosLbl, gameStep) {
		betBios = Math.floor(Math.random() * 6);

		while (betBios < 3) {
			betBios = Math.floor(Math.random() * 6);
			if (betBios >= 3) {
				break;
			} else {
				continue;
			}
		}

		console.log(betBios);
	}
}

//GLOBAL VARIABLES
main = new BlackJack("blackjack");
let gameStep = 0; //GAME STEP
let timeCounter = 0; //TIME COUNTER
let playerBios = 15;
let enemyBios = 15;
let playerBetBios = 0;
let enemyBetBios = 0;
let playerCardsCounter = 0; //PLAYER CARDS COUNTER
let dealerCardsCounter = 0; //DEALER CARDS COUNTER

const dealerCont = document.getElementById("dealerCont");

//SHOW BET MENU
const betBtn = document.getElementById("betBtn");
const betMenu = document.getElementById("betMenu");
const betInput = document.getElementById("betInput");
const biosErrorLbl = document.getElementById("biosErrorLbl");
const confirmBetBtn = document.getElementById("confirmBetBtn");
const playerBetBiosLbl = document.getElementById("playerBetBios");

betBtn.addEventListener("click", () => {main.showBetMenu(betMenu)}); //SHOW BET WINDOW
confirmBetBtn.addEventListener("click", () => {
	main.bettingBios(playerBios, playerBetBios, playerBetBiosLbl, betInput, biosErrorLbl, betMenu, timeCounter);
	gameStep++;
	main.dealerBet(enemyBios, enemyBetBios, dealerBiosBetLbl, gameStep);
}); //CONFIRM BET

//DEALER BET
const dealerBiosBetLbl = document.getElementById("dealerBiosBet");

//MAIN LOOP
/*setInterval(() => {
	timeCounter++;
	//console.log(timeCounter);
	if (gameStep == 1) {
		main.dealerBet(enemyBios, enemyBetBios, dealerBiosBetLbl, gameStep);
	}
}, 1000);*/