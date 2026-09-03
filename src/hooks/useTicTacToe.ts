import { useCallback, useEffect, useMemo, useState } from 'react';
import { chooseComputerMove } from '@/lib/computerPlayer';
import { createEmptyBoard, evaluateBoard } from '@/lib/gameLogic';
import type { Board, Player } from '@/types/game';

const HUMAN: Player = 'X';
const COMPUTER: Player = 'O';
const THINKING_MS = 550;

export function useTicTacToe() {
  const [board, setBoard] = useState<Board>(createEmptyBoard);
  const [turn, setTurn] = useState<Player>(HUMAN);
  const [round, setRound] = useState<number>(0);

  const status = useMemo(() => evaluateBoard(board), [board]);
  const isThinking = status.kind === 'playing' && turn === COMPUTER;

  const playCell = useCallback(
    (index: number) => {
      if (status.kind !== 'playing') return;
      if (turn !== HUMAN) return;
      if (board[index] !== null) return;

      const next = [...board];
      next[index] = HUMAN;
      setBoard(next);
      setTurn(COMPUTER);
    },
    [board, status.kind, turn],
  );

  useEffect(() => {
    if (status.kind !== 'playing' || turn !== COMPUTER) return;

    const timer = window.setTimeout(() => {
      setBoard((current) => {
        if (evaluateBoard(current).kind !== 'playing') return current;
        const move = chooseComputerMove(current, COMPUTER, HUMAN);
        if (move === null) return current;
        const next = [...current];
        next[move] = COMPUTER;
        return next;
      });
      setTurn(HUMAN);
    }, THINKING_MS);

    return () => window.clearTimeout(timer);
  }, [status.kind, turn, round]);

  const reset = useCallback(() => {
    setBoard(createEmptyBoard());
    setTurn(HUMAN);
    setRound((r) => r + 1);
  }, []);

  const winningLine = status.kind === 'win' ? status.line : [];
  const isOver = status.kind !== 'playing';

  return { board, status, isThinking, isOver, winningLine, round, playCell, reset, human: HUMAN };
}
