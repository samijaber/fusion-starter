import { cn } from "@/lib/utils";

type Player = "X" | "O";

interface GameCellProps {
  value: Player | null;
  onClick: () => void;
  index: number;
}

export const GameCell = ({ value, onClick, index }: GameCellProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full h-full flex items-center justify-center",
        "text-4xl font-bold rounded-md transition-all duration-200",
        "bg-background border-2 border-border hover:bg-accent",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        value && "cursor-not-allowed hover:bg-background",
      )}
      disabled={!!value}
      aria-label={
        value ? `Cell ${index + 1} with ${value}` : `Cell ${index + 1}`
      }
    >
      <span
        className={cn(
          "transform transition-all duration-300",
          value === "X" && "text-blue-500 scale-100",
          value === "O" && "text-red-500 scale-100",
          !value && "scale-0",
        )}
      >
        {value}
      </span>
    </button>
  );
};
