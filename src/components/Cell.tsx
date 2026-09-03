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
    'group relative flex aspect-square items-center justify-center rounded-2xl border transition-all duration-150 outline-none focus-visible:ring-4 focus-visible:ring-amber-400/60';

  const surface = isWinning
    ? 'border-amber-400 bg-amber-100 shadow-[0_0_24px_rgba(251,191,36,0.45)] animate-pulse dark:border-amber-500/70 dark:bg-amber-500/20'
    : playable
      ? 'border-stone-200 bg-amber-50 hover:-translate-y-0.5 hover:bg-amber-100 active:translate-y-0 active:scale-95 cursor-pointer dark:border-stone-700 dark:bg-stone-900/60 dark:hover:bg-stone-700/60'
      : 'border-stone-200 bg-stone-100/70 cursor-default dark:border-stone-700 dark:bg-stone-900/40';

  const markColor =
    value === 'X' ? 'text-cyan-700 dark:text-cyan-300' : 'text-fuchsia-700 dark:text-fuchsia-300';

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
          className={`select-none text-5xl font-black transition-transform duration-200 sm:text-6xl ${markColor}`}
          style={{ animation: 'popIn 220ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          {value}
        </span>
      )}
    </button>
  );
}
