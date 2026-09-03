import type { Board, GameStatus, Player } from '@/types/game';

export const WINNING_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function createEmptyBoard(): Board {
  return Array<null>(9).fill(null);
}

export function emptyCells(board: Board): number[] {
  return board.reduce<number[]>((acc, cell, i) => {
    if (cell === null) acc.push(i);
    return acc;
  }, []);
}

export function evaluateBoard(board: Board): GameStatus {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    const value = board[a];
    if (value && value === board[b] && value === board[c]) {
      return { kind: 'win', winner: value as Player, line };
    }
  }
  if (emptyCells(board).length === 0) return { kind: 'draw' };
  return { kind: 'playing' };
}
