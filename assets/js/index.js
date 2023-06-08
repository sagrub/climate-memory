/**
 * Open a pop up window based on the passed id, by additing the active class
 */
const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal == null) return;
    modal.classList.add('active');
};


/**
 * Close any pop up window with a class modal
 */
const closeModal = () => {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals){
        if (modal == null) return;
        modal.classList.remove('active');
    }
};


/**
 * Make the bakcground darker, used in case if the popup
 * window gets active.
 */
const makeBackgroundDark = () =>{
    const overlay = document.querySelector('#overlay');
    overlay.classList.add('active');
};


/**
 * Put the background into the previous stage, used in case
 * the pop-up window is inactive
 */
const makeBackgroundNormal = () => {
    const overlay = document.querySelector('#overlay');
    overlay.classList.remove('active');
};

/**
 * Add a click event listner on the buttons depending on the their 
 * data attributes.
 */
const addListenerOnButtons = () => {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) =>{
        button.addEventListener('click',function(){
            let buttonType = this.getAttribute('data-btn');
            
            switch(buttonType){
                case 'btn-open-how-to':
                    // open the modal How to play and freeze the board
                    openModal('modal-how-to');
                    makeBackgroundDark();
                    break;
                case 'btn-open-play':
                    // direct to the game page
                    window.location.href = "game.html";
                    break;
                case 'btn-open-story':
                    // open the modal Story behind and freeze the board
                    openModal('modal-story');
                    makeBackgroundDark();
                    break;
                case  'btn-close':
                    // all close buttons close the modal and unfreeze the board
                    closeModal();
                    makeBackgroundNormal();
                    break;
                case  'btn-home':
                    // direct to the homepage
                    window.location.href = "index.html";
                    break;
                case 'btn-homepage':
                    // direct to the homepage from the hidden pages
                    window.location = "https://brodsa.github.io/climate-memory/";
                    break;
                case  'btn-refresh':
                    // reload the gameboard to refresh the game
                    window.location.href = "game.html";
                    break;
                case'btn-contact':
                    // open the modal Contact me and freeze the board
                    openModal('modal-contact');
                    makeBackgroundDark();
                    break;
                default:
                    console.info('not implemented');
            }
            
        });
    });
};

addListenerOnButtons();

// export the object for further usage
export default {makeBackgroundDark, makeBackgroundNormal,addListenerOnButtons};