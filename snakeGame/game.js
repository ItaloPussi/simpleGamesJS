import {update as updateSnake, draw as drawSnake, getSnakeHead, snakeIntersection} from './snake.js'
import {update as UpdateFood, draw as drawFood} from './food.js'
import {SNAKE_SPEED} from './variables.js'

const board = document.querySelector("#game-board")

let lastRenderTime = 0
let gameOver = false
function main(currentTime){
	if(gameOver){
		if(confirm("You lost. Press ok to restart.")){
			window.location = '/'
		}
		return
	}
	window.requestAnimationFrame(main)
	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
	if(secondsSinceLastRender < 1 / SNAKE_SPEED) return

	lastRenderTime=currentTime
	update()
	draw()
    
}

function update(){
	updateSnake()
    UpdateFood()
    checkDeath()
}

function draw(){
	drawSnake(board)
	drawFood(board)
}

function checkDeath(){
	gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function outsideGrid(position){
	return (
		position.x < 1 || position.x > 21 ||
		position.y < 1 || position.y > 21
	)
}
window.requestAnimationFrame(main)