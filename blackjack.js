class BlackJack {
	constructor (title) {
		this.title = title;
	}

	//UPDATE CONSOLE
	updateConsole(text) {
		const consoleLog = document.createElement("p");
		consoleLog.innerText = text;
		consoleLog.classList.add("console_log");
		consoleContainer.appendChild(consoleLog);
	}

	//SUM OF CARD ARRAY
	sumOfArray(array){
		let sum;

		return array.reduce((i, j) => {
			sum = i + j;
			return sum;
		});
	}

	//BET MENU METHODS
	showBetMenu(betMenu) {
		betMenu.classList.remove("hidden");
		betMenu.classList.add("bet_menu");
	}

	//BET FUNCTION
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

			this.updateConsole("Game Started!");
			this.updateConsole("Player put their bet down!");
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

		this.updateConsole("The dealer put their bet down!");
	}

	//CREATING THE CARD
	createCard(cardHolder, cardArray, cardCounter) {
		let randCardValue = Math.floor(Math.random() * cardsType.length);
		let chosenCardValue = cardsType[randCardValue];

		if (chosenCardValue == "J" || chosenCardValue == "Q" || chosenCardValue == "K" || chosenCardValue == "A") {
			chosenCardValue = 10;
		}

		const card = document.createElement("div");
		card.classList.add("blackjack_card");

		const cardValue = document.createElement("label");
		cardValue.classList.add("card_value");
		if (dealerCardsCounter == 0) {
			dealerHiddenCard = cardsType[randCardValue];
			cardValue.innerText = "?";
			cardArray.push(chosenCardValue);
			dealerCardsCounter++;
		} else {
			cardValue.innerText = cardsType[randCardValue];
			cardArray.push(chosenCardValue);
			cardCounter++;
		}

		card.appendChild(cardValue);
		cardHolder.appendChild(card);
	}
}

//GLOBAL VARIABLES
main = new BlackJack("blackjack");
let playerBios = 15;
let enemyBios = 15;
let playerBetBios = 0;
let enemyBetBios = 0;
let cardsType = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", 10, "A"]; //CARDS TYPES
let playerCardsCounter = 0; //PLAYER CARDS COUNTER
let dealerCardsCounter = 0; //DEALER CARDS COUNTER
let playerCardValues = []; //PLAYER CARD ARRAY
let dealerCardValues = []; //DEALER CARD ARRAY
let dealerHiddenCard; //DEALER HIDDEN CARD

const consoleContainer = document.getElementById("consoleContainer"); //CONSOLE CONTAINER
const dealerCont = document.getElementById("dealerCont"); //DEALER CONTAINER

//SHOW BET MENU
const betBtn = document.getElementById("betBtn");
const betMenu = document.getElementById("betMenu");
const betInput = document.getElementById("betInput");
const biosErrorLbl = document.getElementById("biosErrorLbl");
const confirmBetBtn = document.getElementById("confirmBetBtn");
const playerBetBiosLbl = document.getElementById("playerBetBios");
const playerBiosCounterLbl = document.getElementById("playerBiosCounter");

//PLAYER BETTING AND GAME START
betBtn.addEventListener("click", () => {main.showBetMenu(betMenu)}); //SHOW BET WINDOW
confirmBetBtn.addEventListener("click", () => {
	main.bettingBios(playerBios, playerBetBios, playerBetBiosLbl, playerBiosCounterLbl, betInput, biosErrorLbl, betMenu);
	main.dealerBet(enemyBios, enemyBetBios, dealerBiosBetLbl, dealerBiosCounterLbl);

	//START DEALING THE CARDS
	setTimeout(() => {
		main.updateConsole("The dealing of the cards will now begin!");
		//FIRST DEALER CARD
		setTimeout(() => { 
			main.createCard(enemyCardHolder, dealerCardValues, dealerCardsCounter);
			console.log(`Dealer cards: ${dealerCardValues}`);

			//FIRST PLAYER CARD
			setTimeout(() => {
				main.createCard(playerCardHolder, playerCardValues, playerCardsCounter);
				console.log(`Player cards: ${playerCardValues}`);

				//SECOND DEALER CARD
				setTimeout(() => {
					main.createCard(enemyCardHolder, dealerCardValues, dealerCardsCounter);
					console.log(`Dealer cards: ${dealerCardValues}`);

					//SECOND PLAYER CARD
					setTimeout(() => {
						main.createCard(playerCardHolder, playerCardValues, playerCardsCounter);
						console.log(`Player cards: ${playerCardValues}`);

						console.log(main.sumOfArray(playerCardValues));
					}, 2000);
				}, 2000);
			}, 2000);
		}, 2000);
	}, 2000);
}); //CONFIRM BET //START DEALING CARDS

//DEALER BET
const dealerBiosBetLbl = document.getElementById("dealerBiosBetLbl");
const dealerBiosCounterLbl = document.getElementById("dealerBiosCounter");

//DRAWING THE CARDS
const playerCardHolder = document.getElementById("playerCardHolder");
const enemyCardHolder = document.getElementById("enemyCardHolder");