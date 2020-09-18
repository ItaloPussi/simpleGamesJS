import Paddle from '/paddle.js'
import InputHandler from '/input.js'
import Ball from './ball.js'
import Brick from './brick.js'

import {buildLevel, level1, level2, level3, level4, level5, level6, level7, level8, level9, level10} from './levels.js'

export const GAMESTATE = {
	PAUSED: 0,
	RUNNING: 1,
	MENU: 2,
	GAMEOVER:3,
	NEWLEVEL:4,
	VICTORY:5
}
export default class Game{
	constructor(gameWidth, gameHeight){
		this.gameWidth = gameWidth
		this.gameHeight = gameHeight
		this.paddle = new Paddle(this)
		this.ball = new Ball(this)
		this.bricks = []
		new InputHandler(this.paddle, this)
		this.reset()

		this.levels = [level1, level2, level3, level4, level5, level6, level7, level8, level9, level10]
	}

	reset(){
		this.gameObjects = []
		this.lives = 3
		this.gamestate = GAMESTATE.MENU
		this.currentLevel = 0

	}
	start(){
		if(this.gamestate != GAMESTATE.MENU && this.gamestate != GAMESTATE.NEWLEVEL)return
		this.bricks = buildLevel(this, this.levels[this.currentLevel])
		this.gameObjects = [this.ball, this.paddle]
		this.gamestate = GAMESTATE.RUNNING
		this.ball.reset()
	}

	togglePause(){
		if(this.gamestate == GAMESTATE.PAUSED){
			this.gamestate = GAMESTATE.RUNNING 
		}else{
			this.gamestate = GAMESTATE.PAUSED 
		}

	}
	draw(ctx){

		[...this.gameObjects,...this.bricks].forEach((object)=>{
			object.draw(ctx)
		})

		if(this.gamestate == GAMESTATE.PAUSED){
			ctx.rect(0,0,this.gameWidth, this.gameHeight)
			ctx.fillStyle = "rgba(0,0,0,0.5)"
			ctx.fill()

			ctx.font = "30px Arial"
			ctx.fillStyle = "white"
			ctx.textAlign = "center"
			ctx.fillText("Paused", this.gameWidth /2, this.gameHeight/2)
		}

		if(this.gamestate == GAMESTATE.MENU){
			ctx.rect(0,0,this.gameWidth, this.gameHeight)
			ctx.fillStyle = "rgba(0,0,0,1)"
			ctx.fill()

			ctx.font = "30px Arial"
			ctx.fillStyle = "white"
			ctx.textAlign = "center"
			ctx.fillText("PRESS SPACEBAR TO START", this.gameWidth /2, this.gameHeight/2)
		}

		if(this.gamestate == GAMESTATE.GAMEOVER){
			ctx.rect(0,0,this.gameWidth, this.gameHeight)
			ctx.fillStyle = "rgba(0,0,0,1)"
			ctx.fill()

			ctx.font = "30px Arial"
			ctx.fillStyle = "red"
			ctx.textAlign = "center"
			ctx.fillText("GAMEOVER", this.gameWidth /2, this.gameHeight/2)
			ctx.fillStyle = "white"
			ctx.fillText("PRESS ANYTHING TO RESTART", this.gameWidth /2, this.gameHeight/2+40)
		}

		if(this.gamestate == GAMESTATE.VICTORY){
			ctx.rect(0,0,this.gameWidth, this.gameHeight)
			ctx.fillStyle = "rgba(0,0,0,1)"
			ctx.fill()

			ctx.font = "30px Arial"
			ctx.fillStyle = "green"
			ctx.textAlign = "center"
			ctx.fillText("VICTORY", this.gameWidth /2, this.gameHeight/2)
			ctx.fillStyle = "white"
			ctx.fillText("PRESS ANYTHING TO RESTART", this.gameWidth /2, this.gameHeight/2+40)
		}
	}

	update(deltaTime){
		if(this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER
		if(this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER || this.gamestate === GAMESTATE.VICTORY) return


		if(this.bricks.length==0){
			this.currentLevel++
			this.gamestate = GAMESTATE.NEWLEVEL
			if(this.currentLevel >= this.levels.length){
				this.gamestate = GAMESTATE.VICTORY
			}else{
				this.start()
			}
		}
		[...this.gameObjects,...this.bricks].forEach((object)=>{
			object.update(deltaTime)
		})

		this.bricks = this.bricks.filter(brick=> !brick.markedForDeletion)
	}
}