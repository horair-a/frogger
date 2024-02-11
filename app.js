const timeDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#Result')
const StartPauseButton = document.querySelector('#start-pause-button')

const squares = document.querySelectorAll('.grid div')

const logsleft = document.querySelectorAll('.log-left')
const logsright = document.querySelectorAll('.log-right')
const carsleft = document.querySelectorAll('.car-left')
const carsright = document.querySelectorAll('.car-right')

console.log(squares)
let currentIndex = 76
const width = 9
let timerId
let outcomeTimerId

let currentTime = 20

function moveFrog(e) {
    //console.log('moved')
    squares[currentIndex].classList.remove('frog')

    switch(e.key) {
       case 'ArrowLeft' :

        if(currentIndex % width !==0) currentIndex -=1
        break

        case 'ArrowRight' :
            
            if(currentIndex % width < width -1) currentIndex += 1
            break
        
        case 'ArrowUp' :
            
            if(currentIndex - width >= 0) currentIndex -= width
            break

        case 'ArrowDown' :
            
            if(currentIndex + width < width * width) currentIndex += width
            break
        
    }

    squares[currentIndex].classList.add('frog')
}
//document.addEventListener('keyup', moveFrog)

function autoMoveElements() {
    currentTime--
    timeDisplay.textContent = currentTime
    logsleft.forEach(loglefts => movelogleft(loglefts))
    logsright.forEach(logsrights => movelogright(logsrights))
    carsleft.forEach(carleft => movecarleft(carleft))
    carsright.forEach(carright => movecarright(carright))
    //lose()
    //win()
}

//autoMoveElements()

function checkOutcomes() {
    lose()
    win()
}



function movelogleft(loglefts) {
    switch(true) {
        case loglefts.classList.contains('l1') :
             loglefts.classList.remove('l1')
             loglefts.classList.add('l2')
             break
        
        case loglefts.classList.contains('l2') : 
             loglefts.classList.remove('l2')
             loglefts.classList.add('l3')
             break

        case loglefts.classList.contains('l3') :
             loglefts.classList.remove('l3')
             loglefts.classList.add('l4')
             break
        
        case loglefts.classList.contains('l4') :
            loglefts.classList.remove('l4')
            loglefts.classList.add('l5')
            break

        case loglefts.classList.contains('l5') :
             loglefts.classList.remove('l5')
             loglefts.classList.add('l1')
             break
    }
}


function movelogright(logsrights) {
    switch(true) {
        case logsrights.classList.contains('l1') :
             logsrights.classList.remove('l1')
             logsrights.classList.add('l5')
             break
        
        case logsrights.classList.contains('l2') : 
             logsrights.classList.remove('l2')
             logsrights.classList.add('l1')
             break

        case logsrights.classList.contains('l3') :
             logsrights.classList.remove('l3')
             logsrights.classList.add('l2')
             break
        
        case logsrights.classList.contains('l4') :
            logsrights.classList.remove('l4')
            logsrights.classList.add('l3')
            break

        case logsrights.classList.contains('l5') :
             logsrights.classList.remove('l5')
             logsrights.classList.add('l4')
             break
    }
}


function movecarleft(carleft) {
    switch(true) {
        case carleft.classList.contains('c1') :
             carleft.classList.remove('c1')
             carleft.classList.add('c2')
             break
        
        case carleft.classList.contains('c2') : 
             carleft.classList.remove('c2')
             carleft.classList.add('c3')
             break

        case carleft.classList.contains('c3') :
             carleft.classList.remove('c3')
             carleft.classList.add('c1')
             break
        
    }
}


function movecarright(carright) {
    switch(true) {
        case carright.classList.contains('c1') :
             carright.classList.remove('c1')
             carright.classList.add('c3')
             break
        
        case carright.classList.contains('c2') : 
             carright.classList.remove('c2')
             carright.classList.add('c1')
             break

        case carright.classList.contains('c3') :
             carright.classList.remove('c3')
             carright.classList.add('c2')
             break
        
    }
}


function lose() {
    if(squares[currentIndex].classList.contains('c1') || 
       squares[currentIndex].classList.contains('l4') ||
       squares[currentIndex].classList.contains('l5') ||
       currentTime <=0
       
    ) {
        resultDisplay.textContent = 'You lose!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup' , moveFrog)
    }

}

function win() {
    if(squares[currentIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'You win!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        //squares[currentIndex].classList.remove('frog')
        document.removeEventListener('keyup' , moveFrog)

    }
}

StartPauseButton.addEventListener('click', () =>  {
    if(timerId) {
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener('keyup', moveFrog)
    }
})
//timerId = setInterval(autoMoveElements, 1000)