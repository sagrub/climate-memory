// get the data using fetch - code from the slack CI community
const data = await fetch("assets/data/data.json").then(res => res.json());
console.log(data);


function generateBoard(){
    const gameBoard = document.querySelector(".game__board");

    for(let i=1; i <= 12; i++){
        const card = document.createElement('div');
        const cardFront = document.createElement('div');
        const cardBack = document.createElement('div');
    
        card.classList.add('card');
        cardFront.classList.add('card__front');
        cardFront.innerText = 'Test'
        cardBack.classList.add('card__back');

        gameBoard.append(card);
        card.append(cardFront);
        card.append(cardBack);
        
    }
}
generateBoard();

const shuffleCards = () => {
    // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
    const shuffledData = data.sort(() => 0.5 - Math.random());
    const selectedData = shuffledData.slice(0,6);
    return selectedData;
}

const cardsData = shuffleCards()







// const shuffledCards = () => {
//     // get the data using fetch - code from the slack CI community
//     fetch("assets/data/data.json")
//     .then(res => res.json())
//     .then(data => {
//         // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
//         const shuffledData = data.sort(() => 0.5 - Math.random());
//         const selectedData = shuffledData.slice(0,6);
//         console.log(selectedData);
//         return selectedData;
//     }
//     )
// }


// import data from '../data/data.json' assert { type: 'json' };
// console.log(data);