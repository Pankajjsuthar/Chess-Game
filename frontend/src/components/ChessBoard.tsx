import { Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";
const INIT_GAME = "init_game";
const MOVE = "move";
const GAME_OVER = "game over";
import b_Pawn from "../assets/img/pawn_b.png";
import w_Pawn from "../assets/img/pawn_w.png";
import b_King from "../assets/img/king_b.png";
import w_King from "../assets/img/king_w.png"; // Assuming the correct path and filename
import b_Horse from "../assets/img/horse_b.png"; // Assuming the correct path and filename
import w_Horse from "../assets/img/horse_w.png"; // Assuming the correct path and filename
import b_Unt from "../assets/img/unt_b.png"; // Assuming the correct path and filename
import w_Unt from "../assets/img/unt_w.png"; // Assuming the correct path and filename
import b_Queen from "../assets/img/queen_b.png"; // Assuming the correct path and filename
import w_Queen from "../assets/img/queen_w.png"; // Assuming the correct path and filename
import b_Ele from "../assets/img/ele_b.png"; // Assuming the correct path and filename
import w_Ele from "../assets/img/ele_w.png"; // Assuming the correct path and filename

export const ChessBoard = ({
  board,
  setBoard,
  chess,
  socket,
}: {
  chess: any;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const [to, setTo] = useState<null | Square>(null);
  return (
    <div className="text-white-200 ">
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const squareRepresentation = (String.fromCharCode(97 + (j % 8)) +
                "" +
                (8 - i)) as Square;

              return (
                <div
                  onClick={() => {
                    if (!from) {
                      setFrom(squareRepresentation);
                    } else {
                      socket.send(
                        JSON.stringify({
                          type: MOVE,
                          payload: {
                            move: {
                              from,
                              to: squareRepresentation,
                            },
                          },
                        })
                      );
                      setFrom(null);
                      chess.move({
                        from,
                        to: squareRepresentation,
                      });
                      setBoard(chess.board());
                      console.log(chess.board());
                      console.log({
                        from,
                        to: squareRepresentation,
                      });
                    }
                  }}
                  
                  className={`w-16 h-16 ${(i + j) % 2 == 0 ? "bg-white" : "bg-green-400"}`} key={j}>
                    <div className="w-full justify-center flex h-full">
                        <div className="h-full justify-center flex flex-col">
                        {square && square.type === "p" && square.color === "b" && (
                        <img src={b_Pawn} alt="Black Pawn" />
                      )}
                      {square && square.type === "k" && square.color === "b" && (
                        <img src={b_King} alt="Black King" />
                      )}
                      {square && square.type === "q" && square.color === "b" && (
                        <img src={b_Queen} alt="Black Queen" />
                      )}
                      {square && square.type === "r" && square.color === "b" && (
                        <img src={b_Ele} alt="Black Elephant" />
                      )}
                      {square && square.type === "n" && square.color === "b" && (
                        <img src={b_Horse} alt="Black Horse" />
                      )}
                      {square && square.type === "b" && square.color === "b" && (
                        <img src={b_Unt} alt="Black Camel" />
                      )}


                      {square && square.type === "p" && square.color === "w" && (
                        <img src={w_Pawn} alt="White Pawn" />
                      )}
                      {square && square.type === "k" && square.color === "w" && (
                        <img src={w_King} alt="White King" />
                      )}
                      {square && square.type === "q" && square.color === "w" && (
                        <img src={w_Queen} alt="white Queen" />
                      )}
                      {square && square.type === "r" && square.color === "w" && (
                        <img src={w_Ele} alt="White Elephant" />
                      )}
                      {square && square.type === "n" && square.color === "w" && (
                        <img src={w_Horse} alt="White Horse" />
                      )}
                      {square && square.type === "b" && square.color === "w" && (
                        <img src={w_Unt} alt="White Camel" />
                      )} 
                        </div>
                    </div>
                </div>
                  
                  
                  
                       
                  
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
