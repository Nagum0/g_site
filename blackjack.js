class BlackJack {
	constructor () {
		console.log("hello blackjack");
	}

	//BET MENU METHODS
	showBetMenu(betMenu) {
		betMenu.classList.remove("hidden");
		betMenu.classList.add("bet_menu");
	}

	bettingBios(biosNum, betBios, biosInput, errMsg, betMenu) {
		if (biosInput.value > biosNum) {
			console.log("You don't have enought BIOS");
			errMsg.classList.remove("hidden");
		} else {
			betBios = biosInput.value;
			biosNum -= betBios;
			betMenu.style.display = "none";

			console.log(`Bet BIOS: ${betBios}`);
			console.log(`Player BIOS: ${biosNum}`);
		}
	}

}

//GLOBAL VARIABLES
main = new BlackJack();
let playerBios = 15;
let enemyBios = 15;
let playerBetBios = 0;
let enemyBetBios = 0;

const dealerCont = document.getElementById("dealerCont");

//SHOW BET MENU
const betBtn = document.getElementById("betBtn");
const betMenu = document.getElementById("betMenu");
const betInput = document.getElementById("betInput");
const biosErrorLbl = document.getElementById("biosErrorLbl");
const confirmBetBtn = document.getElementById("confirmBetBtn");

betBtn.addEventListener("click", () => {main.showBetMenu(betMenu)});
confirmBetBtn.addEventListener("click", () => {main.bettingBios(playerBios, playerBetBios, betInput, biosErrorLbl, betMenu)});
