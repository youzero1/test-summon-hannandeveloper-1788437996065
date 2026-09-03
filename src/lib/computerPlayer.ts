import { emptyCells, evaluateBoard } from '@/lib/gameLogic';
import type { Board, Player } from '@/types/game';

function findWinningMove(board: Board, player: Player): number | null {
  for (const index of emptyCells(board)) {
    const next = [...board];
    next[index] = player;
    const status = evaluateBoard(next);
    if (status.kind === 'win' && status.winner === player) return index;
  }
  return null;
}

function pickRandom(options: number[]): number | null {
  if (options.length === 0) return null;
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Competent but beatable: win, block, center, corner, then anything free.
 */
export function chooseComputerMove(board: Board, computer: Player, human: Player): number | null {
  const win = findWinningMove(board, computer);
  if (win !== null) return win;

  const block = findWinningMove(board, human);
  if (block !== null) return block;

  if (board[4] === null) return 4;

  const free = emptyCells(board);
  const corner = pickRandom(free.filter((i) => [0, 2, 6, 8].includes(i)));
  if (corner !== null) return corner;

  return pickRandom(free);
}
