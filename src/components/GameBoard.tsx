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
    <div className="grid w-full grid-cols-3 gap-3 rounded-3xl border border-white/25 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
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
