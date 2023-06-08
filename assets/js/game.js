
/** *****************************************
 *          GAME START
 ******************************************** */
// import the objects - a partial inspiration from the disscusion with Helmuth Lammer
import {default as script} from "./index.js";
import {default as board} from "./game_board.js";

// defined the paramters
const parametersBoard = board.parameters;
let parametersGame = {
    flippedCard: false,
    freezeBoard: false,
    firstCard: undefined,
    secondCard: undefined,
    totalFlips: 0, 
    pairFlips: 0,
    secondsInMinute: 60,
};

// prapare the objects - a partial inspiration from the disscusion with Helmuth Lammer
let cardsModal;
let cards;
let getTime;

/**
 * Start the game which wraps timer, board generator and cards listner.
 * To put everything together was an inspiration 
 * from the disscusion with Helmuth Lammer
 */
const startGame = () => {
    board.generateBoard();

    cardsModal = document.querySelector(".card__modal");
    cards = document.querySelectorAll(".card");

    // add event listener
    cards.forEach(card => card.addEventListener('click',flipCard));
    cardsModal.addEventListener('click', closeCardsModal);

    // keep track of time
    let timeSecond = 0;
    const textTime = document.getElementById('total-time');
    getTime = setInterval(function(){
        timeSecond++;
        let seconds = (timeSecond % parametersGame.secondsInMinute).toString().padStart(2,'0');
        let minutes = (Math.floor(timeSecond / parametersGame.secondsInMinute)).toString().padStart(2,'0');
        textTime.innerText = `${minutes}:${seconds}`;
    },1200);
};

/**
 * Flip the card and show the card modal automatically.
 * Code inspiration from https://www.youtube.com/watch?v=ZniVgo8U7ek
 */
function flipCard(){    
    if (parametersGame.freezeBoard);

    this.classList.add('flip');
    let cardContent = this.children[0].children[0];
    
    if(!parametersGame.flippedCard){
        // the first card has flipped
        parametersGame.flippedCard = true;
        parametersGame.firstCard = this;
        showCardsModal(cardContent);
        // closeCardsModal();
        
    }else{
        // the second card has flipped
        parametersGame.flippedCard = false;
        parametersGame.secondCard = this;
        // check for match 
        checkCardsMatch(cardContent);
    }
    parametersGame.totalFlips++; 
    displayFlips();
    
}

/**
 * Show tha card modal, containing the information from the flip card.
 * Style the card modal depending on the type of card
 */
function showCardsModal(cardContent){
    script.makeBackgroundDark(); // freeze the board so that user cannot flip the second card 
    setTimeout(()=>{
        // show the pop up window
        cardsModal.classList.add('active');
        
        const modalContent = cardContent.cloneNode(true);
        const isText = modalContent.classList.contains('card__txt');
        const classToAdd = isText ? 'card__modal--txt' : 'card__modal--img';

        
        modalContent.classList.add('card__modal--large');
        cardsModal.appendChild(modalContent);
        cardsModal.classList.add(classToAdd); 

    },800);

}


/**
 * Close the cards modal, prepare him for the next card.
 * and flip the cards back automatically.
 */
function closeCardsModal(){
        // remove the active class to close the modal
        cardsModal.classList.remove('active');

        // remove type card specific classes
        cardsModal.classList.forEach(item => {
            if (item.includes(parametersBoard.cardTypes[0])){
                cardsModal.classList.remove('card__modal--txt'); 
            }else if(item.includes(parametersBoard.cardTypes[1])){
                cardsModal.classList.remove('card__modal--img'); 
            }else{
                console.info('not implemented');
            }
        });

        // activate the background again
        script.makeBackgroundNormal();
        // remove the conent of the modal
        cardsModal.innerHTML='';  
        // flip the cards back
        flipCardsBack();
   
}

/**
 * Check for the cards match and perform the needed step. 
 * If the cards are the same, flip the card back.
 * If it is a match, show the card modal anyway and dont flip the cards back
 * Otherwise show the card modal.
 * A partial code inspiration from https://www.youtube.com/watch?v=ZniVgo8U7ek
 */
function checkCardsMatch(cardContent){
    //if clicked on the same card
    if(parametersGame.firstCard.id === parametersGame.secondCard.id){
        parametersGame.firstCard.classList.remove('flip');
        parametersGame.totalFlips--;  // should not be considered as flip
    // if clicked on the matched card
    }else if(parametersGame.firstCard.dataset.key === parametersGame.secondCard.dataset.key){
        showCardsModal(cardContent);
        keepCardsFlipped(); 
        highlightMatchedCards();
        parametersGame.pairFlips++;
    // no match
    }else{
        showCardsModal(cardContent);  
    }
    // prepare the win board each time, but show when all cards are flipped
    setTimeout(()=>{
          showWinBoard();
        },400);
    
}

/**
 * Dont flip the cards back by removing the event listener.
 * The function is used in case the is a match.
 */
function keepCardsFlipped(){
    parametersGame.firstCard.removeEventListener('click',flipCard);
    parametersGame.secondCard.removeEventListener('click',flipCard);
}

/**
 * Increase the size of the matched cards 
 */
function highlightMatchedCards(){
    parametersGame.firstCard.style.transform = "rotateY(180deg) scale(1.05)";
    parametersGame.secondCard.style.transform = "rotateY(180deg) scale(1.05)";
}

/**
 * Flip the cards back in case they do not match, by removing the class flip,
 * and set the variable to the initial stage.
 */
function flipCardsBack(){
    // create a variable which helps to check if they dont match in order to be flipped back
    let toComparewith = typeof parametersGame.secondCard === 'undefined'? '': parametersGame.secondCard.dataset.key;

    // check for unmatch and flip back by removing the class flip
    if ((parametersGame.firstCard.dataset.key !== toComparewith ) && toComparewith){
        parametersGame.freezeBoard = true;
    
        setTimeout(() => {
            parametersGame.firstCard.classList.remove('flip');
            parametersGame.secondCard.classList.remove('flip');
            parametersGame.freezeBoard = false;
            parametersGame.secondCard = undefined; // set the second to undefined in order to make the if condition in closeModal() correct
        }, 800);

    }else{
        parametersGame.secondCard = undefined; // otherwise set the second to undefined in order to make the if condition correct
    }

}


/**
 * Display the number of fliped card
 */
function displayFlips(){
    let textFlips = document.getElementById('total-flips');
    textFlips.innerText = `${parametersGame.totalFlips}`;
}


/**
 * Display win board, containing the number of total flips and time
 */
function showWinBoard(){
    const totalNumberCards = cards.length / 2;
    const winBoard = document.querySelector(".win-board");
    const winBoardTime = document.querySelector("#win-board__time");
    const winBoardFlips = document.querySelector("#win-board__flips");

    if (totalNumberCards === parametersGame.pairFlips){
        clearInterval(getTime);
        
        const time = document.querySelector("#total-time").innerText;
        const flips = document.querySelector("#total-flips").innerText;
                
        winBoardTime.innerText = time;
        winBoardFlips.innerText = flips;
        winBoard.classList.add('active');

        setTimeout(() => {
            winBoard.classList.remove('active');
            // remove the pop up window of the last card
            cardsModal.classList.remove('active');
            script.makeBackgroundNormal();
        },2000);
    }
}

startGame();