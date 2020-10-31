import {onSnake, expandSnake} from './snake.js'
import {EXPANSION_RATE} from './variables.js'

let food = getRandomFood()


function getRandomFood(){
	let x
	let y
	do{
		x = Math.floor(Math.random()*21)+1
		y = Math.floor(Math.random()*21)+1
	}while(onSnake({x:x,y:y}))
	
	return{
		x,
		y
	}
}

export function update(){
	if(onSnake(food)){
		expandSnake(EXPANSION_RATE)
		food = getRandomFood()
	}
}

export function draw(gameBoard){
	const foodElement = document.createElement("div")
	foodElement.style.gridRowStart = food.y
	foodElement.style.gridColumnStart = food.x
	foodElement.classList.add("food")
	gameBoard.append(foodElement)
}