console.log('hi');

const cards = document.querySelectorAll(".card");
cards.forEach(card => card.addEventListener('click',flipCard));

let flipedCard = false;
let freezBoard = false;
let firstCard;
let secondCard;

let totalFlips = 0;

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
        console.log('fliped first', firstCard);
    }else{
        // the second card has fliped
        flipedCard = false;
        secondCard = this;
        console.log('fliped second',secondCard);

        // check for match 
        checkCardsMatch()
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
    // no match
    }else{
        flipCardsBack();  
    }
    
};

function keepCardsFliped(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    console.log('match, leave flipped');
}

function flipCardsBack(){
    freezBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        console.log('no match, flip back');
        freezBoard = false;
    }, 1000);
}

function displayFlips(){
    let textFlips = document.getElementById('total-flips');
    console.log(totalFlips);
    textFlips.innerText = `${totalFlips}`;
}

// let timeSecond = 0;
// const textTime = document.getElementById('total-time');
// textTime.innerText = `00:${textTime}`;

// const countUp = setInterval(() =>{
//     timeSecond++;
// },10000)