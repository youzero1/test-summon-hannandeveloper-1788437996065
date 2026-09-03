import { emptyCells, evaluateBoard } from '@/lib/gameLogic';
import type { Board, Player } from '@/types/game';

/** Chance of picking a random move among the equally-best ones instead of the first best. */
const VARIETY_CHANCE = 0.12;

/** Positional preference used only to break ties between moves of equal score. */
const POSITION_BONUS: number[] = [3, 1, 3, 1, 4, 1, 3, 1, 3];

const WIN_SCORE = 10;

function opponentOf(player: Player): Player {
  return player === 'X' ? 'O' : 'X';
}

/**
 * Minimax with alpha-beta pruning.
 * Returns a score from `maximizer`'s point of view. Wins are discounted by depth
 * so the engine wins as quickly as possible and loses as slowly as possible.
 */
function minimax(
  board: Board,
  toMove: Player,
  maximizer: Player,
  depth: number,
  alpha: number,
  beta: number,
): number {
  const status = evaluateBoard(board);
  if (status.kind === 'win') {
    return status.winner === maximizer ? WIN_SCORE - depth : depth - WIN_SCORE;
  }
  if (status.kind === 'draw') return 0;

  const moves = emptyCells(board);
  const isMaximizing = toMove === maximizer;
  let best = isMaximizing ? -Infinity : Infinity;
  let a = alpha;
  let b = beta;

  for (const index of moves) {
    const next = [...board];
    next[index] = toMove;
    const score = minimax(next, opponentOf(toMove), maximizer, depth + 1, a, b);

    if (isMaximizing) {
      if (score > best) best = score;
      if (best > a) a = best;
    } else {
      if (score < best) best = score;
      if (best < b) b = best;
    }
    if (b <= a) break; // pruned: this branch can't affect the outcome
  }

  return best;
}

/**
 * Advanced opponent: plays optimal tic-tac-toe via minimax, so it always takes an
 * immediate win and always blocks the player's immediate win. Ties between equally
 * optimal moves fall back to centre > corner > edge, with a small chance of choosing
 * a different equally-optimal move so games aren't perfectly deterministic.
 */
export function chooseComputerMove(board: Board, computer: Player, human: Player): number | null {
  void human;
  if (evaluateBoard(board).kind !== 'playing') return null;

  const moves = emptyCells(board);
  if (moves.length === 0) return null;

  const scored = moves.map((index) => {
    const next = [...board];
    next[index] = computer;
    return {
      index,
      score: minimax(next, opponentOf(computer), computer, 1, -Infinity, Infinity),
    };
  });

  const bestScore = Math.max(...scored.map((m) => m.score));
  const bestMoves = scored.filter((m) => m.score === bestScore).map((m) => m.index);

  // Randomise only among moves that are provably just as good, so strength is unchanged.
  if (bestMoves.length > 1 && Math.random() < VARIETY_CHANCE) {
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
  }

  return bestMoves.reduce((a, b) => (POSITION_BONUS[b] > POSITION_BONUS[a] ? b : a));
}
