import type { GameStatus, Player } from '@/types/game';

type StatusBannerProps = {
  status: GameStatus;
  isThinking: boolean;
  human: Player;
};

export default function StatusBanner({ status, isThinking, human }: StatusBannerProps) {
  let text = 'Your turn';
  let emoji = '🎯';
  let tone = 'bg-white/15 text-white border-white/30';

  if (status.kind === 'win') {
    const humanWon = status.winner === human;
    text = humanWon ? 'You win!' : 'Computer wins';
    emoji = humanWon ? '🎉' : '🤖';
    tone = humanWon
      ? 'bg-emerald-400/25 text-emerald-50 border-emerald-200/60'
      : 'bg-rose-500/25 text-rose-50 border-rose-200/60';
  } else if (status.kind === 'draw') {
    text = "It's a draw";
    emoji = '🤝';
    tone = 'bg-amber-300/25 text-amber-50 border-amber-200/60';
  } else if (isThinking) {
    text = 'Computer is thinking…';
    emoji = '🤖';
    tone = 'bg-cyan-400/20 text-cyan-50 border-cyan-200/50';
  }

  return (
    <div
      aria-live="polite"
      className={`mx-auto mb-6 flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 text-base font-bold shadow-lg backdrop-blur-sm transition-colors sm:text-lg ${tone}`}
    >
      <span aria-hidden="true" className="text-xl">
        {emoji}
      </span>
      <span>{text}</span>
    </div>
  );
}
