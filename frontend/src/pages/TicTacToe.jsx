import React, { useState, useEffect } from 'react';

const initialBoard = Array(9).fill(null);

const checkWinner = (board) => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],           // diags
  ];
  for (let [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : 'Draw';
};

const getAvailableMoves = (board) =>
  board.map((val, idx) => (val === null ? idx : null)).filter((v) => v !== null);

const TicTacToe = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner || !isUserTurn) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsUserTurn(false);
  };

  const aiMove = (board) => {
    const moves = getAvailableMoves(board);
    const choice = moves[Math.floor(Math.random() * moves.length)];
    if (choice !== undefined) {
      const newBoard = [...board];
      newBoard[choice] = 'O';
      setBoard(newBoard);
      setIsUserTurn(true);
    }
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      setTimeout(() => {
        setBoard(initialBoard);
        setIsUserTurn(true);
        setWinner(null);
      }, 2000);
    } else if (!isUserTurn) {
      setTimeout(() => aiMove(board), 500); // delay AI move
    }
  }, [board, isUserTurn]);

  return (
    <div className="w-full max-w-xs mx-auto">
      <h2 className="text-center text-lg font-semibold mb-4">Tic Tac Toe</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className="w-20 h-20 border text-2xl font-bold flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200"
          >
            {cell}
          </button>
        ))}
      </div>
      {winner && (
        <div className="mt-4 text-center text-md font-medium text-blue-600">
          {winner === 'Draw' ? 'It’s a Draw!' : `${winner} wins!`}
        </div>
      )}
    </div>
  );
};

export default TicTacToe;
