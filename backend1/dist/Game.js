"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const messages_1 = require("./messages");
class Game {
    constructor(player1, player2) {
        this.movesCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "white",
            }
        }));
        this.player2.send(JSON.stringify({
            type: messages_1.INIT_GAME,
            payload: {
                color: "black",
            }
        }));
    }
    makeMove(socket, move) {
        // Validate the type of move using zod (if needed)
        // Check if it's the player's turn
        const isWhiteTurn = this.movesCount % 2 === 0;
        const isPlayerWhite = socket === this.player1;
        if (isWhiteTurn !== isPlayerWhite) {
            // It's not the player's turn
            return;
        }
        try {
            this.board.move(move);
        }
        catch (e) {
            // Invalid move
            return;
        }
        // Update the board
        this.movesCount++;
        // Check if the game is over
        if (this.board.isGameOver()) {
            const winner = this.board.turn() === 'w' ? 'black' : 'white';
            this.player1.send(JSON.stringify({ type: messages_1.GAME_OVER, payload: { winner } }));
            this.player2.send(JSON.stringify({ type: messages_1.GAME_OVER, payload: { winner } }));
            return;
        }
        // Send the move to the opponent
        const opponent = isPlayerWhite ? this.player2 : this.player1;
        opponent.send(JSON.stringify({ type: messages_1.MOVE, payload: move }));
    }
}
exports.Game = Game;
