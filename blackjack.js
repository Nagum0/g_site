class BlackJack {
	constructor (title) {
		this.title = title;
	}

	//BET MENU METHODS
	showBetMenu(betMenu) {
		betMenu.classList.remove("hidden");
		betMenu.classList.add("bet_menu");
	}

	bettingBios(biosNum, betBios, betBiosLbl, playerBiosLbl, biosInput, errMsg, betMenu) {
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
			playerBiosLbl.innerText = `Bios \n ${biosNum}`;
			betBiosLbl.innerText = `Bios bet \n ${betBios}`;
			console.log(`PLayer bet BIOS: ${betBios}`);
			console.log(`Player BIOS: ${biosNum}`);
		}
	}

	//DEALER BET
	dealerBet(biosNum, betBios, betBiosLbl, dealerBiosLbl) {
		betBios = Math.floor(Math.random() * 5);

		while (betBios < 3) {
			betBios = Math.floor(Math.random() * 5);
			if (betBios >= 3) {
				break;
			} else {
				continue;
			}
		}

		biosNum -= betBios;
		dealerBiosLbl.innerText = `Bios \n ${biosNum}`;
		betBiosLbl.innerText = `Bios bet \n ${betBios}`;

		console.log(`Enemy bet BIOS: ${betBios}`);
		console.log(`Enemy BIOS: ${biosNum}`);
	}
}

//GLOBAL VARIABLES
main = new BlackJack("blackjack");

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
const playerBiosCounterLbl = document.getElementById("playerBiosCounter");

betBtn.addEventListener("click", () => {main.showBetMenu(betMenu)}); //SHOW BET WINDOW
confirmBetBtn.addEventListener("click", () => {
	main.bettingBios(playerBios, playerBetBios, playerBetBiosLbl, playerBiosCounterLbl, betInput, biosErrorLbl, betMenu);
	main.dealerBet(enemyBios, enemyBetBios, dealerBiosBetLbl, dealerBiosCounterLbl);
}); //CONFIRM BET

//DEALER BET
const dealerBiosBetLbl = document.getElementById("dealerBiosBetLbl");
const dealerBiosCounterLbl = document.getElementById("dealerBiosCounter");

//DEALING CARDS LOOP