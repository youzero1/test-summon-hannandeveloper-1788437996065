import GameBoard from '@/components/GameBoard';
import StatusBanner from '@/components/StatusBanner';
import { useTicTacToe } from '@/hooks/useTicTacToe';

export default function GameScreen() {
  const { board, status, isThinking, isOver, winningLine, playCell, reset, human } = useTicTacToe();

  return (
    <div className="w-full max-w-md">
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-black tracking-tight text-white drop-shadow-sm sm:text-5xl">
          Tic<span className="text-fuchsia-300">·</span>Tac
          <span className="text-cyan-300">·</span>Toe
        </h1>
        <p className="mt-2 text-sm font-medium text-white/70">You are X — beat the computer!</p>
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
            ? 'bg-white text-violet-700 hover:bg-white/90'
            : 'border border-white/30 bg-white/15 text-white hover:bg-white/25'
        }`}
      >
        {isOver ? 'Play again' : 'Restart'}
      </button>
    </div>
  );
}
