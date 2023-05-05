/**
 * Wait for the DOM to be loaded
 * Add event listeners for the buttons
 */
document.addEventListener('DOMContentLoaded',function(){
    let buttons = document.querySelectorAll('button');

    for(let button of buttons){
        button.addEventListener('click',function(){
            let buttonType = this.getAttribute('data-btn');
            
            if(buttonType ==='btn-open-how-to'){
                openModal('modal-how-to');
                MakeBackgroundDark();
            }
            else if(buttonType === 'btn-open-play'){
                alert(`Open ${buttonType}` );
            }
            else if(buttonType === 'btn-open-story'){
                alert(`Open ${buttonType}`);
            }
            else if(buttonType === 'btn-close'){
                closeModal();
                MakeBackgroundLight();
            }
            else{
                console.log('not implemented');
            }
        })
    }
    
})

function openModal(modalId){
    let modal = document.getElementById(modalId);
    if (modal == null) return
    modal.classList.add('active');
}

function closeModal(modalId){
    let modals = document.getElementsByClassName('modal');
    for (let modal of modals){
        if (modal == null) return
        modal.classList.remove('active');
    }
}

function MakeBackgroundDark(){
    let overlay = document.querySelector('#overlay');
    overlay.classList.add('active');
}

function MakeBackgroundLight(){
    let overlay = document.querySelector('#overlay');
    overlay.classList.remove('active');
}