import type { GameStatus, Player } from '@/types/game';

type StatusBannerProps = {
  status: GameStatus;
  isThinking: boolean;
  human: Player;
};

export default function StatusBanner({ status, isThinking, human }: StatusBannerProps) {
  let text = 'Your turn';
  let emoji = '🎯';
  let tone =
    'bg-white/70 text-stone-700 border-stone-200 dark:bg-stone-800/70 dark:text-stone-200 dark:border-stone-700';

  if (status.kind === 'win') {
    const humanWon = status.winner === human;
    text = humanWon ? 'You win!' : 'Computer wins';
    emoji = humanWon ? '🎉' : '🤖';
    tone = humanWon
      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-200 dark:border-emerald-500/40'
      : 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-500/15 dark:text-rose-200 dark:border-rose-500/40';
  } else if (status.kind === 'draw') {
    text = "It's a draw";
    emoji = '🤝';
    tone =
      'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-500/15 dark:text-amber-200 dark:border-amber-500/40';
  } else if (isThinking) {
    text = 'Computer is thinking…';
    emoji = '🤖';
    tone =
      'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-500/15 dark:text-cyan-200 dark:border-cyan-500/40';
  }

  return (
    <div
      aria-live="polite"
      className={`mx-auto mb-6 flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 text-base font-bold shadow-sm backdrop-blur-sm transition-colors sm:text-lg ${tone}`}
    >
      <span aria-hidden="true" className="text-xl">
        {emoji}
      </span>
      <span>{text}</span>
    </div>
  );
}
