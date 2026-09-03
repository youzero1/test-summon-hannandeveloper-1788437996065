import type { CellValue } from '@/types/game';

type CellProps = {
  value: CellValue;
  index: number;
  isWinning: boolean;
  disabled: boolean;
  onSelect: (index: number) => void;
};

export default function Cell({ value, index, isWinning, disabled, onSelect }: CellProps) {
  const playable = !disabled && value === null;

  const base =
    'group relative flex aspect-square items-center justify-center rounded-2xl border transition-all duration-150 outline-none focus-visible:ring-4 focus-visible:ring-white/70';

  const surface = isWinning
    ? 'border-white/80 bg-white/45 shadow-[0_0_28px_rgba(255,255,255,0.65)] animate-pulse'
    : playable
      ? 'border-white/25 bg-white/15 hover:-translate-y-0.5 hover:bg-white/30 active:translate-y-0 active:scale-95 cursor-pointer'
      : 'border-white/20 bg-white/10 cursor-default';

  const markColor =
    value === 'X'
      ? isWinning
        ? 'text-cyan-700'
        : 'text-cyan-200'
      : isWinning
        ? 'text-fuchsia-700'
        : 'text-fuchsia-200';

  const label =
    value === null
      ? `Empty square ${index + 1}`
      : `Square ${index + 1}, taken by ${value === 'X' ? 'you' : 'the computer'}`;

  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={!playable}
      disabled={!playable}
      onClick={() => onSelect(index)}
      className={`${base} ${surface}`}
    >
      {value && (
        <span
          key={value}
          className={`select-none text-5xl font-black drop-shadow-md transition-transform duration-200 sm:text-6xl ${markColor}`}
          style={{ animation: 'popIn 220ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          {value}
        </span>
      )}
    </button>
  );
}
