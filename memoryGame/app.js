const cards = document.querySelectorAll('.memory-card');

cards.forEach(card=> card.addEventListener('click', flipCard))

let hasFlippedCard = false
let points = 0
let lockBoard = false
let firstCard = ''
let secondCard = ''



function verifyWin(){
	points === (cards.length /2) && alert('Você venceu!!!')
}

function resetBoard(){
	firstCard = ''
	secondCard = ''
}
function disableCards(){
	firstCard.removeEventListener('click', flipCard)
	secondCard.removeEventListener('click', flipCard)
	points++
}

function unflipCards(){
	lockBoard = true
	setTimeout(function(){
				firstCard.classList.toggle('flip')
				secondCard.classList.toggle('flip')
				lockBoard = false;
				resetBoard()

	},1500)
}

function verifyMatch(){
	firstCard.dataset.framework === secondCard.dataset.framework ? disableCards() : unflipCards()
}



function flipCard(e){
	if (lockBoard) return
	if (firstCard === this) return
	this.classList.toggle('flip')

	if(!hasFlippedCard){
		firstCard= this;
	}else{
		secondCard = this;
		verifyMatch()

	}
	hasFlippedCard = !hasFlippedCard;
	verifyWin()
	
}

(function shuffle(){
	let sortedNumbers = []
	do{
		let randomPos = Math.floor(Math.random() * 12)
		sortedNumbers.indexOf(randomPos) == -1 && sortedNumbers.push(randomPos)
	}while(sortedNumbers.length <12)

	cards.forEach((card, index) =>{	
		card.style.order = sortedNumbers[index]
	})
	
})()