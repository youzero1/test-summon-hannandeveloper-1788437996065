import GameBoard from '@/components/GameBoard';
import StatusBanner from '@/components/StatusBanner';
import { useTicTacToe } from '@/hooks/useTicTacToe';

export default function GameScreen() {
  const { board, status, isThinking, isOver, winningLine, playCell, reset, human } = useTicTacToe();

  return (
    <div className="w-full max-w-md">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-black tracking-tight text-stone-800 sm:text-5xl dark:text-stone-100">
          Tic<span className="text-fuchsia-600 dark:text-fuchsia-400">·</span>Tac
          <span className="text-cyan-600 dark:text-cyan-400">·</span>Toe
        </h1>
        <p className="mt-2 text-sm font-medium text-stone-500 dark:text-stone-400">
          You are X — beat the computer!
        </p>
      </header>

      <StatusBanner status={status} isThinking={isThinking} human={human} />

      <GameBoard
        board={board}
        winningLine={winningLine}
        disabled={isOver || isThinking}
        onSelect={playCell}
      />

      <button
        onClick={reset}
        className={`mt-6 w-full rounded-2xl px-6 py-3 text-base font-extrabold shadow-lg transition active:scale-[0.98] ${
          isOver
            ? 'bg-stone-800 text-amber-50 hover:bg-stone-700 dark:bg-amber-100 dark:text-stone-900 dark:hover:bg-white'
            : 'border border-stone-300 bg-white/70 text-stone-700 hover:bg-white dark:border-stone-700 dark:bg-stone-800/70 dark:text-stone-200 dark:hover:bg-stone-800'
        }`}
      >
        {isOver ? 'Play again' : 'Restart'}
      </button>
    </div>
  );
}
