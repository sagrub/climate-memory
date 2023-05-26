function flipCard(){
    this.classList.toggle('flip');
}


const cards = document.querySelectorAll(".card");
cards.forEach(card => card.addEventListener('click',flipCard));