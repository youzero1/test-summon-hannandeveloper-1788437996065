import Cell from '@/components/Cell';
import type { Board } from '@/types/game';

type GameBoardProps = {
  board: Board;
  winningLine: number[];
  disabled: boolean;
  onSelect: (index: number) => void;
};

export default function GameBoard({ board, winningLine, disabled, onSelect }: GameBoardProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-3 rounded-3xl border border-stone-200 bg-white/70 p-3 shadow-xl backdrop-blur-sm dark:border-stone-700 dark:bg-stone-800/60">
      {board.map((value, index) => (
        <Cell
          key={index}
          index={index}
          value={value}
          isWinning={winningLine.includes(index)}
          disabled={disabled}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
