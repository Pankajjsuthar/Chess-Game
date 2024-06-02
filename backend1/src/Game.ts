import {WebSocket} from "ws";
import {Chess} from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";

export class Game{

    public player1 : WebSocket;
    public player2 : WebSocket;
    private board : Chess;
    private startTime : Date;
    private movesCount = 0;
    constructor(player1 : WebSocket, player2:WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload : {
                color : "white",
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload : {
                color : "black",
            }
        }))
    }


    makeMove(socket: WebSocket, move: { from: string; to: string; }) {
        // Validate the type of move using zod (if needed)
        if(this.movesCount %2 ===0 && socket!=this.player1){
            return;
        }
        if(this.movesCount %2 ===1 && socket!=this.player2){
            return;
        }
        
    
        try {
            this.board.move(move);
            
        } catch (e) {
            // Invalid move
            return;
        }
    
        // Update the board
        if(this.movesCount %2==0){
            this.player2.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }
        else{
            this.player1.send(JSON.stringify({
                type : MOVE,
                payload : move
            }))
        }
        this.movesCount++;
    
        // Check if the game is over
        if (this.board.isGameOver()) {
            const winner = this.board.turn() === 'w' ? 'black' : 'white';
            this.player1.send(JSON.stringify({ type: GAME_OVER, payload: { winner } }));
            this.player2.send(JSON.stringify({ type: GAME_OVER, payload: { winner } }));
            return;
        }
    }
}