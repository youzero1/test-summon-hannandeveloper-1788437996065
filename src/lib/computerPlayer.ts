import { emptyCells, evaluateBoard } from '@/lib/gameLogic';
import type { Board, Player } from '@/types/game';

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
 * immediate win and always blocks the player's immediate win — it can never be beaten.
 *
 * Among moves that share the *same* best minimax score it picks uniformly at random
 * every time. Strength is unaffected (all of those moves lead to an identically good
 * outcome), but games vary: on an empty board every cell is a draw under optimal play,
 * so the opponent opens in a genuinely random spot instead of always the centre.
 */
export function chooseComputerMove(board: Board, computer: Player, human: Player): number | null {
  void human;
  if (evaluateBoard(board).kind !== 'playing') return null;

  const moves = emptyCells(board);
  if (moves.length === 0) return null;

  // Each root move is searched with fresh bounds, so every score below is exact
  // and directly comparable — no pruning artefacts to skew the tie set.
  let bestScore = -Infinity;
  let bestMoves: number[] = [];

  for (const index of moves) {
    const next = [...board];
    next[index] = computer;
    const score = minimax(next, opponentOf(computer), computer, 1, -Infinity, Infinity);

    if (score > bestScore) {
      bestScore = score;
      bestMoves = [index];
    } else if (score === bestScore) {
      bestMoves.push(index);
    }
  }

  return bestMoves[Math.floor(Math.random() * bestMoves.length)];
}
