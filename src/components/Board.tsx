import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onClick: (i: number) => void;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine }) => {
  const renderSquare = (i: number) => {
    const isWinningSquare = winningLine?.includes(i) || false;
    
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={isWinningSquare}
        key={i}
      />
    );
  };

  const renderRow = (rowIndex: number) => {
    return (
      <div className="flex" key={rowIndex}>
        {[0, 1, 2].map(colIndex => renderSquare(rowIndex * 3 + colIndex))}
      </div>
    );
  };

  return (
    <div className="board">
      {[0, 1, 2].map(rowIndex => renderRow(rowIndex))}
    </div>
  );
};

export default Board;
