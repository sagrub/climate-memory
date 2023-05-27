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

    // this.classList.add('active');
    // this.lastChild.classList.add('active');
    // console.log(this.lastChild.classList);

    // setTimeout(()=>{
        
    // },1000);

    // setTimeout(()=>{
    //     this.lastChild.classList.remove('active');
    // },1000);

    console.log('modal');

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


