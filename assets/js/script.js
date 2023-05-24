/**
 * Wait for the DOM to be loaded
 * Add event listeners for the buttons
 */
document.addEventListener('DOMContentLoaded',function(){
    const buttons = document.querySelectorAll('button');

    for(let button of buttons){
        button.addEventListener('click',function(){
            let buttonType = this.getAttribute('data-btn');
            
            if(buttonType ==='btn-open-how-to'){
                openModal('modal-how-to');
                MakeBackgroundDark();
            }
            else if(buttonType === 'btn-open-play'){
                window.location = "https://brodsa.github.io/climate-memory/game.html"
            }
            else if(buttonType === 'btn-open-story'){
                openModal('modal-story');
                MakeBackgroundDark();
            }
            else if(buttonType === 'btn-close'){
                closeModal();
                MakeBackgroundNormal();
            }
            else{
                console.log('not implemented');
            }
        })
    }
    
})

/**
 * Open a pop up window based on the passed id, by additing the active class
 */
function openModal(modalId){
    const modal = document.getElementById(modalId);
    if (modal == null) return
    modal.classList.add('active');
}

/**
 * Close any pop up window with a class modal
 */
function closeModal(){
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals){
        if (modal == null) return
        modal.classList.remove('active');
    }
}


/**
 * Make the bakcground darker, used in case if the popup
 * window gets active.
 */
function MakeBackgroundDark(){
    const overlay = document.querySelector('#overlay');
    overlay.classList.add('active');
}

/**
 * Put the background into the previouse stage, used in case
 * the pop-up window is inactive
 */
function MakeBackgroundNormal(){
    const overlay = document.querySelector('#overlay');
    overlay.classList.remove('active');
}