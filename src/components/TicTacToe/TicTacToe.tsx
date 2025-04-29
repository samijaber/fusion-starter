import { useState, useCallback, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameBoard } from "./GameBoard";

type Player = "X" | "O";
type BoardState = (Player | null)[];
type GameStatus = "playing" | "won" | "draw";

const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

export const TicTacToe = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | null>(null);
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const checkWinner = useCallback(
    (boardState: BoardState): [GameStatus, Player | null] => {
      // Check for winner
      for (const combo of WINNING_COMBINATIONS) {
        const [a, b, c] = combo;
        if (
          boardState[a] &&
          boardState[a] === boardState[b] &&
          boardState[a] === boardState[c]
        ) {
          return ["won", boardState[a] as Player];
        }
      }

      // Check for draw
      if (boardState.every((cell) => cell !== null)) {
        return ["draw", null];
      }

      // Game still in progress
      return ["playing", null];
    },
    [],
  );

  const handleMove = useCallback(
    (index: number) => {
      if (board[index] || gameStatus !== "playing") return;

      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      const [newStatus, newWinner] = checkWinner(newBoard);
      setGameStatus(newStatus);
      setWinner(newWinner);

      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    },
    [board, currentPlayer, gameStatus, checkWinner],
  );

  useEffect(() => {
    if (gameStatus === "won" && winner === "X") {
      setXWins((prev) => prev + 1);
    } else if (gameStatus === "won" && winner === "O") {
      setOWins((prev) => prev + 1);
    } else if (gameStatus === "draw") {
      setDraws((prev) => prev + 1);
    }
  }, [gameStatus, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setWinner(null);
    setGameStatus("playing");
  };

  const resetScores = () => {
    setXWins(0);
    setOWins(0);
    setDraws(0);
    resetGame();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Tic Tac Toe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-center px-3 py-2 bg-secondary rounded-md">
            <div className="text-xs text-muted-foreground">Player X</div>
            <div className="text-lg font-medium">{xWins}</div>
          </div>
          <div className="text-center px-3 py-2 bg-secondary rounded-md">
            <div className="text-xs text-muted-foreground">Draws</div>
            <div className="text-lg font-medium">{draws}</div>
          </div>
          <div className="text-center px-3 py-2 bg-secondary rounded-md">
            <div className="text-xs text-muted-foreground">Player O</div>
            <div className="text-lg font-medium">{oWins}</div>
          </div>
        </div>

        <div className="text-center mb-4">
          {gameStatus === "playing" && (
            <div className="text-lg font-medium">
              Current Player: <span className="font-bold">{currentPlayer}</span>
            </div>
          )}
          {gameStatus === "won" && (
            <div className="text-lg font-bold text-primary">
              Player {winner} wins!
            </div>
          )}
          {gameStatus === "draw" && (
            <div className="text-lg font-bold text-primary">It's a draw!</div>
          )}
        </div>

        <GameBoard board={board} onCellClick={handleMove} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetGame}>
          New Game
        </Button>
        <Button variant="secondary" onClick={resetScores}>
          Reset Scores
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TicTacToe;
