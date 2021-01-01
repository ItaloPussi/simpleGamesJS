let userScore = 0
let computerScore = 0
const userScoreElement = document.querySelector("#user-score")
const computerScoreElement = document.querySelector("#computer-score")

const actionMessage = document.querySelector("#action-message")
const result = document.querySelector(".result p")

const choices = document.querySelectorAll(".choice")
choices.forEach(choice => choice.addEventListener("click", game, false))


function getComputerMove(){
    const computerPossibleChoices = ['rock', 'paper', 'scissors']
    const computerMove = computerPossibleChoices[Math.floor(Math.random() * 3)]
    return computerMove
}
 
function getRoundWinner(userMovement, computerMovement){
    if (userMovement === computerMovement){
        return 'tie'
    } else if ((userMovement == 'paper' && computerMovement == 'rock') ||
        (userMovement == 'rock' && computerMovement == 'scissors') ||
        (userMovement == 'scissors' && computerMovement == 'paper')){
        return 'user'
    } else {
        return 'computer'
    }
}

function handleScore(winner){
    if(winner === 'user'){
        userScore++
        userScoreElement.textContent = userScore
    }else if(winner === 'computer'){
        computerScore++
        computerScoreElement.textContent = computerScore
    }
}

function handleResultMessage(userMove, computerMove, winner, userMoveElement){
    let message;
    if(winner === 'user'){
        message = `${userMove} beats ${computerMove}. You win 🔥`
        userMoveElement.style.borderColor = '#4dcc7d'
        userMoveElement.boxShadow = '0 0 10px #31b43a'
    }else if(winner === 'computer'){
        message = `${userMove} loses to ${computerMove}. You lost... 😥`
        userMoveElement.style.borderColor = '#fc121b'
        userMoveElement.boxShadow = '0 0 10px #d01115'

    }else {
        message = `${userMove} equals to ${computerMove}. It's a tie ✌`
        userMoveElement.style.borderColor = '#464647'
        userMoveElement.boxShadow = '0 0 10px #25292b'

    }

    setTimeout(() => {
        userMoveElement.style.borderColor = 'white'
        userMoveElement.boxShadow = ''
    },300)
    result.textContent = message
}
function game(){
    const userMoveElement = this
    const userMove = this.id
    const computerMove = getComputerMove()
    const roundWinner = getRoundWinner(userMove, computerMove)
    handleScore(roundWinner)
    handleResultMessage(userMove, computerMove, roundWinner, userMoveElement)
}