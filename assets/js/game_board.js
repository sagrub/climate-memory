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

function generateBoard(numOfCards=12){
    const gameBoard = document.querySelector(".game__board");
    const cardsData = selectRandomCards();

    for(let i=0; i < numOfCards; i++){
        const card = document.createElement('div');
        const cardFront = document.createElement('div');
        const cardBack = document.createElement('div');
        const gameModal = document.createElement('div');
        let cardContent = cardsData[i]
    
        card.classList.add('card');
        card.dataset.id = cardContent.id;
        cardFront.classList.add('card__front');
        cardBack.classList.add('card__back');
        gameModal.classList.add('game__modal');
        

        
        if (cardContent.type==="txt") {
            cardFront.innerText = cardContent.text;
            gameModal.innerText = cardContent.text;
        }       
        else if (cardContent.type==="img"){
            cardFront.innerText = cardContent.img;
            gameModal.innerText = cardContent.img;
        }else{
            console.log('not implemented for such type')
        }

        gameBoard.append(card);
        card.append(cardFront);
        card.append(cardBack);
        gameBoard.append(gameModal);
        
    }
}
generateBoard();


const cards = document.querySelectorAll(".card");
cards.forEach(card => card.addEventListener('click',flipCard));

let flippedCard = false;
let firstCard;
let secondCard;

function flipCard(){
    this.classList.add('flip');

    if(!flippedCard){
        // the first card has fliped
        flippedCard = true;
        firstCard = this;
        console.log('fliped first', firstCard);
    }else{
        // the second card has fliped
        flippedCard = false;
        secondCard = this;
        console.log('fliped second',secondCard);

        // checked 
        if(firstCard.dataset.id,secondCard.dataset.id){
            console.log('match, leave flipped')
        }else{
            console.log('no match, flip back')
        }
    }
    
}


