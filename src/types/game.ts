export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

export type GameStatus =
  | { kind: 'playing' }
  | { kind: 'win'; winner: Player; line: number[] }
  | { kind: 'draw' };
