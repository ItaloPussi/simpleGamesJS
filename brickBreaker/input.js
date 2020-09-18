import {GAMESTATE} from './game.js'
export default class InputHandler{
	constructor(paddle, game){
		document.addEventListener("keydown", event=>{
			if(game.gamestate == GAMESTATE.GAMEOVER || game.gamestate == GAMESTATE.VICTORY){
				game.reset()
				return false
			}
			switch(event.keyCode){
				case 37: case 65:
					paddle.moveLeft()
					break;
				case 39: case 68:
					paddle.moveRight()
					break;
				case 27:
					game.togglePause()
					break;
				case 32:
					game.start()
					break;
			}
		})
	}
}