class BlackJack {
	constructor (title) {
		this.title = title;
	}

	//BET MENU METHODS
	showBetMenu(betMenu) {
		betMenu.classList.remove("hidden");
		betMenu.classList.add("bet_menu");
	}

	bettingBios(biosNum, betBios, biosLbl, biosInput, errMsg, betMenu) {
		if (biosInput.value > biosNum) {
			console.log("You don't have enought BIOS");
			errMsg.classList.remove("hidden");
		} else {
			betBios = biosInput.value;
			biosNum -= betBios;
			betMenu.style.display = "none";
			biosLbl.innerText = `Bios bet \n ${betBios}`;

			console.log(`Bet BIOS: ${betBios}`);
			console.log(`Player BIOS: ${biosNum}`);
		}
	}

	//DEALER BET
	dealerBet(biosNum, betBios, biosLbl) {
		//Continue
	}
}

//GLOBAL VARIABLES
main = new BlackJack("blackjack");
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
const playerBetBiosLbl = document.getElementById("playerBetBios");

betBtn.addEventListener("click", () => {main.showBetMenu(betMenu)});
confirmBetBtn.addEventListener("click", () => {main.bettingBios(playerBios, playerBetBios, playerBetBiosLbl, betInput, biosErrorLbl, betMenu)});

//DEALER BET
const dealerBiosBet = document.getElementById("dealerBiosBet");