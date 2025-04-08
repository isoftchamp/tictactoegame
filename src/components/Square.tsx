import React from 'react';
import { X, Circle } from 'lucide-react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  const renderIcon = () => {
    if (value === 'X') {
      return <X className="w-12 h-12 text-blue-600" strokeWidth={2.5} />;
    } else if (value === 'O') {
      return <Circle className="w-12 h-12 text-rose-500" strokeWidth={2.5} />;
    }
    return null;
  };

  return (
    <button
      className={`w-24 h-24 border-2 border-gray-300 flex items-center justify-center transition-all duration-200 
      ${isWinningSquare ? 'bg-yellow-100 border-yellow-400' : 'hover:bg-gray-100'}`}
      onClick={onClick}
    >
      {renderIcon()}
    </button>
  );
};

export default Square;
