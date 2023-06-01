// get the data using fetch function from the slack CI community
const data = await fetch("assets/data/data.json").then(res => res.json());


/**
 * Select random cards based on the given number of pairs (numOfCards). 
 * For the game, the numOfCards stays fixed.
 * Returns an object of 6 card pairs (6 images and 6 text).
 */
const selectRandomCards = (numOfPairs=6) => {
    // shuffle the array elements from https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    const shuffledCards = data.sort(() => 0.5 - Math.random());
    const selectedBasis = shuffledCards.slice(0,numOfPairs);

    // add the type of the card
    const selectedImg = []
    const selectedTxt = []
    for(let item of selectedBasis){
        item["type"] = "txt"
        selectedTxt.push(item);
        // how to clone the object from https://www.freecodecamp.org/news/clone-an-object-in-javascript/
        let element = { ... item }
        element["type"] = "img"
        selectedImg.push(element);
    }
    
    // put img cards and txt cards together and shuffle the array again
    const shuffled = selectedTxt.concat(selectedImg)
    const shuffledData = shuffled.sort(() => 0.5 - Math.random());
    console.log(shuffledData);
    return shuffledData;
}


/**
 * Generate the board layout and content for 
 * the given number of cards (see electRandomCards())
 * 
 */
const generateBoard = (numOfCards=12) => {
    const gameBoard = document.querySelector(".game__board");
    const cardsData = selectRandomCards();

   
    for(let i=0; i < numOfCards; i++){
         // start: create card function
        const card = document.createElement('div');
        const cardFront = document.createElement('div');
        const cardBack = document.createElement('div');
        // const cardModal = document.createElement('div');
        
        // add attributes and classes
        card.classList.add('card');
        card.dataset.key = cardsData[i].id;
        card.id = `card-${i}`;
        cardFront.classList.add('card__front');
        cardBack.classList.add('card__back');
        
        // start: check img or txt
        // add the content to the cards based on the type
        if (cardsData[i].type==="txt") {
            cardFront.innerText = cardsData[i].text;
        }       
        else if (cardsData[i].type==="img"){
            cardFront.innerHTML = `<img src="${cardsData[i].img}">` ;
        }else{
            console.log('not implemented for such type');
        }
        // end: check img or txt

    
        gameBoard.append(card);
        card.append(cardFront);
        card.append(cardBack);
        // card.append(cardModal);
         // start: create card function
        
    }
};

generateBoard();

const cardsModal = document.querySelector(".card__modal");
const cards = document.querySelectorAll(".card");
cards.forEach(card => card.addEventListener('click',flipCard));

let flipedCard = false;
let freezBoard = false;
let firstCard;
let secondCard;

let totalFlips = 0;
let correctFlips = 0;


console.log(freezBoard);

// code inspiration from https://www.youtube.com/watch?v=ZniVgo8U7ek
function flipCard(){
    if (freezBoard) return;
    this.classList.add('flip');
    showCardsModal(this);

    if(!flipedCard){
        // the first card has fliped
        flipedCard = true;
        firstCard = this;
    }else{
        // the second card has fliped
        flipedCard = false;
        secondCard = this;
        // check for match 
        checkCardsMatch();
    }
    totalFlips++;
    displayFlips();
    
}

function showCardsModal(obj){
    console.log(obj);
    setTimeout(()=>{
        cardsModal.classList.add('active');
    },800);

    setTimeout(()=>{
        cardsModal.classList.remove('active');
    },2000);
}

function checkCardsMatch(){
    //if clicked on the same card
    if(firstCard.id === secondCard.id){
        firstCard.classList.remove('flip');
        totalFlips--;
    // if clicked on the matched card
    }else if(firstCard.dataset.key === secondCard.dataset.key){
        keepCardsFliped();  
        correctFlips++;
    // no match
    }else{
        flipCardsBack();  
    }
    showWinBoard();
    
};

function keepCardsFliped(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
}

function flipCardsBack(){
    freezBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        freezBoard = false;
    }, 2050);
}


/**
 * Display the number of fliped card
 */
function displayFlips(){
    let textFlips = document.getElementById('total-flips');
    textFlips.innerText = `${totalFlips}`;
}

/**
 * Display the timer
 */
let timeSecond = 0;
const textTime = document.getElementById('total-time');

let getTime = setInterval(function(){
    timeSecond++;
    let seconds = (timeSecond % 60).toString().padStart(2,'0');
    let minutes = (Math.floor(timeSecond / 60)).toString().padStart(2,'0');
    textTime.innerText = `${minutes}:${seconds}`
},1200);

getTime;

/**
 * Display win board
 */
function showWinBoard(){
    const totalNumberCards = cards.length / 2;
    const winBoard = document.querySelector(".win-board");
    const winBoardTime = document.querySelector("#win-board__time");
    const winBoardFlips = document.querySelector("#win-board__flips");

    
    if (totalNumberCards === correctFlips){
        clearInterval(getTime);
        const time = document.querySelector("#total-time").innerText;
        const flips = document.querySelector("#total-flips").innerText;
        
        winBoardTime.innerText = time;
        winBoardFlips.innerText = flips;

        winBoard.classList.add('active');
        setTimeout(() => {
            winBoard.classList.remove('active')
        },3000);
    }
    ;
}


