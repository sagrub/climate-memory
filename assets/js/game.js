
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
generateBoard()

