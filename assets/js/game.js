const cards = document.querySelectorAll(".card");
cards.forEach(card => card.addEventListener('click',flipCard));

let flipedCard = false;
let freezBoard = false;
let firstCard;
let secondCard;

let totalFlips = 0;
let correctFlips = 0;

function showModal(){
    this.classList.toggle('active');
    console.log('active');
}

// code inspiration from https://www.youtube.com/watch?v=ZniVgo8U7ek
function flipCard(){
    if (freezBoard) return;
    this.classList.add('flip');

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

function checkCardsMatch(){
    //if clicked on the same card
    if(firstCard.id === secondCard.id){
        firstCard.classList.remove('flip');
        totalFlips--;
    // if clicked on the matched card
    }else if(firstCard.dataset.key === secondCard.dataset.key){
        keepCardsFliped();  
        correctFlips++;
        console.log(correctFlips);
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
    }, 1000);
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

setInterval(function(){
    timeSecond++;
    let seconds = (timeSecond % 60).toString().padStart(2,'0');
    let minutes = (Math.floor(timeSecond / 60)).toString().padStart(2,'0');
    textTime.innerText = `${minutes}:${seconds}`
},1500);


/**
 * Display win board
 */
function showWinBoard(){
    const totalNumberCards = cards.length / 2;
    const winBoard = document.querySelector(".win-board");
    console.log(winBoard.classList);
    totalNumberCards === correctFlips ? winBoard.classList.add('active') : winBoard.classList.remove('active');
}
