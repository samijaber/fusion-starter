import { cn } from "@/lib/utils";
import { GameCell } from "./GameCell";

type Player = "X" | "O";
type BoardState = (Player | null)[];

interface GameBoardProps {
  board: BoardState;
  onCellClick: (index: number) => void;
}

export const GameBoard = ({ board, onCellClick }: GameBoardProps) => {
  return (
    <div className={cn("grid grid-cols-3 gap-2 aspect-square")}>
      {board.map((cell, index) => (
        <GameCell
          key={index}
          value={cell}
          onClick={() => onCellClick(index)}
          index={index}
        />
      ))}
    </div>
  );
};
