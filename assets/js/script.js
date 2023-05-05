/**
 * Wait for the DOM to be loaded
 * Add event listeners for the buttons
 */
document.addEventListener('DOMContentLoaded',function(){
    let buttons = document.querySelectorAll('button')

    for(let button of buttons){
        button.addEventListener('click',function(){
            if(this.getAttribute('data-bth')==='btn-open-how-to'){
                alert('Open how to ')
            }
            else if(this.getAttribute('data-bth')==='btn-open-play'){
                alert('Open play ')
            }
            else if(this.getAttribute('data-bth')==='btn-open-story'){
                alert('Open Story ')
            }
            else if(this.getAttribute('data-bth')==='btn-close'){
                alert('Closed')
            }
        })
    }
    
})