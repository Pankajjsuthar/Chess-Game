import React, { useEffect, useState } from "react";
import { ChessBoard } from "../components/ChessBoard";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import {Chess} from 'chess.js';

const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER = "game over";

const Game = () => {
  const navigate = useNavigate();
  const socket = useSocket();

  const [chess, setChess] = useState(new Chess());
  const [board,setBoard] = useState(chess.board());
  const [started,setStarted] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case INIT_GAME:
            // setChess(new Chess());
            setBoard(chess.board());
            setStarted(true);
            console.log("Game started");
            break;
        case MOVE:
            const move = message.payload;
            chess.move(move);
            setBoard(chess.board());
            console.log("Move made");
            break;
        case GAME_OVER:
          console.log("Game Over");
          break;
      }
    };
  }, [socket]);


  if (!socket) return <div>Connecting .....</div>;

  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4  w-full flex justify-center">
            <ChessBoard chess={chess} board={board} setBoard = {setBoard} socket = {socket} />
          </div>
          <div className="col-span-2  w-full">
            {!started && <Button
              onClick={() => {
                socket.send(JSON.stringify({
                    type: INIT_GAME,
                  })
                )
              }} >
              Play
            </Button>}
          </div>
        </div>
      </div>
      Game
    </div>
  );
};

export default Game;
