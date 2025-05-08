import { useState } from "react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "Game Draw!" 
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Tic Tac Toe</h1>
        
        <div className="mb-4 text-lg font-medium text-center text-slate-700">
          {status}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {board.map((square, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-16 w-16 text-2xl font-bold"
              onClick={() => handleClick(index)}
            >
              {square}
            </Button>
          ))}
        </div>

        <Button 
          className="w-full"
          onClick={resetGame}
        >
          Reset Game
        </Button>
      </div>
    </div>
  );
};

export default Index;