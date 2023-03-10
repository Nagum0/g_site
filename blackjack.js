class BlackJack {
	constructor () {
		this.dealer = "The dealer";
		this.player = "The player";
		//this.beginInterval;
		this.timeCounter = 0;
		this.stopInterval = false;

		this.playerBios = 15;
		this.dealerBios = 15;
	}

	//UPDATE CONSOLE
	updateConsole(text) {
		const consoleLog = document.createElement("p");
		consoleLog.innerText = text;
		consoleLog.classList.add("console_log");
		consoleContainer.appendChild(consoleLog);
	}

	//CLEAR CONSOLE
	clearConsole() {
		consoleContainer.innerHTML = ""; //CLEARS GAME CONSOLE
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
		console.log("Betting started!");
		betMenu.classList.remove("hidden");
		betMenu.classList.add("bet_menu");
	}

	//LOST MENU
	showLostMenu(lostMenu) {
		if (lostMenuEnabled) {
			console.log("Lost menu opened");
			lostMenu.classList.remove("hidden");
			lostMenu.classList.add("bet_menu");
		} else {
			console.log("Lost menu already enabled");
		}
	}

	//WIN MENU
	showWinMenu() {
		winMenu.classList.remove("hidden");
		winMenu.classList.add("bet_menu");
	}

	//BET FUNCTION
	bettingBios(betBios, betBiosLbl, playerBiosLbl, biosInput, errMsg, betMenu) {
		if (biosInput.value > this.playerBios) {
			console.log("You don't have enought BIOS");
			errMsg.classList.remove("hidden");
		} else if (biosInput.value == 0) {
			errMsg.classList.remove("hidden");
			errMsg.innerText = "Bet entry cannot be 0!";
		} else {
			betBios = biosInput.value;
			this.playerBios -= betBios;
			playerBiosLbl.innerText = `Bios \n ${this.playerBios}`;
			betBiosLbl.innerText = `Bios bet \n ${betBios}`;

			//console.log(`PLayer bet BIOS: ${betBios}`);
			//console.log(`Player BIOS: ${this.playerBios}`);

			this.updateConsole("Game Started!");
			this.updateConsole("Player put their bet down!");

			betMenu.classList.remove("bet_menu");
			betMenu.classList.add("hidden");

			gameStart = true;
		}
	}

	//DEALER BET
	dealerBet(betBios, betBiosLbl, dealerBiosLbl) {
		betBios = Math.floor(Math.random() * 5);

		while (betBios < 3) {
			betBios = Math.floor(Math.random() * 5);
			if (betBios >= 3) {
				break;
			} else {
				continue;
			}
		}

		this.dealerBios -= betBios;
		dealerBiosLbl.innerText = `Bios \n ${this.dealerBios}`;
		betBiosLbl.innerText = `Bios bet \n ${betBios}`;

		//console.log(`Enemy bet BIOS: ${betBios}`);
		//console.log(`Enemy BIOS: ${this.dealerBios}`);

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
			card.id = "firstChild"; //FIRST CHILD OF DEALER CARD CONTAINER
			cardValue.id = "firstValueChild";
			cardValue.innerText = "?";
			cardArray.push(chosenCardValue);
			dealerCardsCounter++;
		} else {
			cardValue.innerText = cardsType[randCardValue];
			cardArray.push(chosenCardValue);
			cardCounter++;
		}

		/*cardValue.innerText = cardsType[randCardValue];
			cardArray.push(chosenCardValue);
			cardCounter++;*/

		console.log(card);
		card.appendChild(cardValue);
		cardHolder.appendChild(card);
	}

	//CHECK LOSS
	checkLoss(name, argCardValues) {
		if (this.sumOfArray(argCardValues) > 21) {
			console.log(`${name} went over 21`);

			lostMenuEnabled = true; //ENABLING LOST MENU
			
			setTimeout(() => {
				this.showLostMenu(lostWindow);
			}, 1500);

			return true;
		} else {
			console.log(`${name} didn't go over 21`);
			return false;
		}
	}

	//BEGIN CARD DEALING FUNCTION //ONLY CALL THIS ONCE FOR EACH GAME
	beginDealing(enemyCardHolder, dealerCardValues, dealerCardsCounter, playerCardHolder, playerCardValues, playerCardsCounter) {
		let beginInterval = setInterval(() => {
			this.timeCounter++;
			
			switch (this.timeCounter) {
				case 1:
					this.createCard(enemyCardHolder, dealerCardValues, dealerCardsCounter);
					console.log(`Dealer cards: ${dealerCardValues}`);
					break;
				case 2:
					this.createCard(playerCardHolder, playerCardValues, playerCardsCounter);
					break;
				case 3:
					this.createCard(enemyCardHolder, dealerCardValues, dealerCardsCounter);
					console.log(`Dealer cards: ${dealerCardValues}`);
					break;
				case 4:
					this.createCard(playerCardHolder, playerCardValues, playerCardsCounter);
					this.stopInterval = true;
					break;
			}

			if (this.stopInterval) {
				clearInterval(beginInterval); //CLEARING BEGIN INTERVAL
				console.log("Interval stopped");

				if (this.sumOfArray(playerCardValues) < 16) {
					this.updateConsole("Player gets bonus cards!");

					let minInterval = setInterval(() => {
						this.createCard(playerCardHolder, playerCardValues, playerCardsCounter);
						console.log(`Player cards: ${playerCardValues}`);

						if (this.sumOfArray(playerCardValues) > 15) {
							clearInterval(minInterval);
							playerCardSumLbl.innerText = `Card Sum \n ${this.sumOfArray(playerCardValues)}`;
							dealerCardSumLbl.innerText = "Card Sum \n ?";
							console.log("cleared minInterval");

							if (this.checkLoss(this.player, playerCardValues)) {
								this.updateConsole("The player went over 21!");
								this.updateConsole("The player LOST!");
							} 
						}
					}, 1500);
				}

				playerCardSumLbl.innerText = `Card Sum \n ${this.sumOfArray(playerCardValues)}`;
				dealerCardSumLbl.innerText = "Card Sum \n ?";
				hitEnabled = true; //PLAYER'S ABILITY TO ASK FOR A HIT ENABLED
				standEnabled = true; //PLAYER'S ABILITY TO STAND ENABLED
			}

		}, 1500);
	}

	//PLAYER HIT
	playerHit() {
		this.updateConsole("Player hit!");
		this.createCard(playerCardHolder, playerCardValues, playerCardsCounter);
		playerCardSumLbl.innerText = `Card Sum \n ${this.sumOfArray(playerCardValues)}`;

		if (this.checkLoss(this.player, playerCardValues)) {
			this.showLostMenu(lostWindow);
			playerStatus = "lost";
		}
	}

	//PLAYER STAND
	playerStand() {
		if (standEnabled) {
			console.log("stand");
			hitEnabled = false; //DISABLING HIT ABILITY
			this.updateConsole("Player stands! \n The endgame will begin!");
			this.endGame(); //ENDGAME METHOD STARTED
		} else {
			console.log("stand not enabled");
		}
	}

	//CHECK WIN
	checkWin() {
		if (this.sumOfArray(dealerCardValues) > this.sumOfArray(playerCardValues)) { //DEALER WIN
			console.log("Dealer Wins");

			setTimeout(() => {
				this.updateConsole("The dealer is closer to 21! \n The dealer wins!");
				this.showLostMenu(lostWindow); //SHOW LOST MENU
			}, 1000);

		} else if (this.sumOfArray(dealerCardValues) < this.sumOfArray(playerCardValues)) { //PLAYER WIN
			console.log("Player wins");

			setTimeout(() => {
				this.updateConsole("The player is closer to 21! \n The player wins!");
				this.showWinMenu(); //SHOW WIN MENU
			}, 1000);

		} else { //DRAW
			console.log("Draw");

			setTimeout(() => {
				this.updateConsole("Same score! \n DRAW!");
			}, 1000);
		}
	}

	//ENDGAME
	endGame() {
		console.log("Endgame started");
		console.log(dealerCardValues);

		setTimeout(() => {
			this.updateConsole("First dealer card is being shown!");
			const firstDealerCardValue = document.getElementById("firstValueChild");
			firstDealerCardValue.innerText = dealerCardValues[1];
		}, 1000);

		if (this.sumOfArray(dealerCardValues) < 16) {
			let dealerMinInterval = setInterval(() => {
				this.updateConsole("Dealer gets bonus card!");
				this.createCard(enemyCardHolder, dealerCardValues, dealerCardsCounter);

				if (this.sumOfArray(dealerCardValues) > 15) {
					clearInterval(dealerMinInterval);
					dealerCardSumLbl.innerText = `Card Sum \n ${this.sumOfArray(dealerCardValues)}`
					console.log("cleared delearMinInterval");

					if (this.checkLoss(this.dealer, dealerCardValues)) {
						this.updateConsole("The dealer went over 21! \n The dealer lost!");
					}
				}
			}, 1000);
		}

		//this.checkWin();
	}

	//RETRY
	retryRound() {
		console.log("RETRY");
		gameStart = false;

		this.clearConsole();
		this.updateConsole("New round started! Place your bets!");

		playerBetBios = 0;
		enemyBetBios = 0;

		playerCardValues = [0];
		dealerCardValues = [0];

		playerBetBiosLbl.innerText = "Bios bet \n 0";
		dealerBiosBetLbl.innerText = "Bios bet \n 0";
		playerCardSumLbl.innerText = "Card Sum \n 0";
		dealerCardSumLbl.innerText = "Card Sum \n 0";

		playerCardHolder.innerHTML = "";
		enemyCardHolder.innerHTML = "";

		dealerCardsCounter = 0;
		playerCardsCounter = 0;

		this.stopInterval = false; //RESETTING INTERVAL
		this.timeCounter = 0; //RESETTING TIME COUNTER

		playerStatus = "neutral"; //REVERSING PLAYER STATUS FOR HIT FUNCTION

		lostMenuEnabled = false;

		hitEnabled = false;
		standEnabled = false;

		lostWindow.classList.remove("bet_menu");
		lostWindow.classList.add("hidden");

		winMenu.classList.remove("bet_menu");
		winMenu.classList.add("hidden");

		console.log(`Player BIOS: ${this.playerBios}, Dealer BIOS: ${this.dealerBios}`);
		console.log(`Player bet BIOS: ${playerBetBios}, Dealer bet BIOS: ${enemyBetBios}`);
		console.log(playerCardValues, dealerCardValues);
	}
}

//MAIN-----------------------------------------------------------------------------------------------------------------------------------------------
//GLOBAL VARIABLES
main = new BlackJack();
let gameStart = false;
let playerBetBios = 0;
let enemyBetBios = 0;
let cardsType = [2, 3, 4, 5, 6, 7, 8, 9, "J", "Q", "K", 10, "A"]; //CARDS TYPES
let playerCardsCounter = 0; //PLAYER CARDS COUNTER
let dealerCardsCounter = 0; //DEALER CARDS COUNTER
let playerCardValues = [0]; //PLAYER CARD ARRAY
let dealerCardValues = [0]; //DEALER CARD ARRAY
let dealerHiddenCard; //DEALER HIDDEN CARD
let hitEnabled = false; //PLAYER ABILITY TO ASK FOR A HIT
let standEnabled = false; //PLAYER ABILITY TO ASK FOR A STAND
let playerStatus = "neutral"; //"lost" or "won"
let lostMenuEnabled = false; //LOST MENU ENABLED VARIABLE

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
betBtn.addEventListener("click", () => { //SHOW BET WINDOW
	main.showBetMenu(betMenu);
});

confirmBetBtn.addEventListener("click", () => { //CONFIRM BET //START DEALING CARDS
	main.bettingBios(playerBetBios, playerBetBiosLbl, playerBiosCounterLbl, betInput, biosErrorLbl, betMenu);

	if (gameStart) {
		main.dealerBet(enemyBetBios, dealerBiosBetLbl, dealerBiosCounterLbl);

		setTimeout(main.updateConsole("The dealing will now begin!"), 1500);

		//START DEALING THE CARDS
		main.beginDealing(enemyCardHolder, dealerCardValues, dealerCardsCounter, playerCardHolder, playerCardValues, playerCardsCounter);
	} else {
		main.updateConsole("Now enought BIOS!");
	}

});

//DEALER BET
const dealerBiosBetLbl = document.getElementById("dealerBiosBetLbl");
const dealerBiosCounterLbl = document.getElementById("dealerBiosCounter");

//DRAWING THE CARDS
const playerCardHolder = document.getElementById("playerCardHolder");
const enemyCardHolder = document.getElementById("enemyCardHolder");
const playerCardSumLbl = document.getElementById("playerCardSumLbl");
const dealerCardSumLbl = document.getElementById("dealerCardSumLbl");

//HIT FUNCTION
const hitBtn = document.getElementById("hitBtn");

hitBtn.addEventListener("click", () => {
	if (hitEnabled == true && playerStatus == "neutral") {
		console.log("hit");
		main.playerHit();
	}
});

//LOST FUNCTION
const lostWindow = document.getElementById("lostWindow"); //LOST WINDOW POPUP
const retryBtn = document.getElementById("retryBtn");

retryBtn.addEventListener("click", () => {
	main.retryRound();
});

//STAND BTN
const standBtn = document.getElementById("standBtn");

standBtn.addEventListener("click", () => {
	main.playerStand();
});

//WIN MENU
const winMenu = document.getElementById("winMenu");
const playAgainBtn = document.getElementById("playAgainBtn");

playAgainBtn.addEventListener("click", () => {
	main.retryRound();
});