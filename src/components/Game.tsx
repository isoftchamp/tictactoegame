import React, { useState } from 'react';
import Board from './Board';
import { RotateCcw, Trophy } from 'lucide-react';

const Game: React.FC = () => {
  const [history, setHistory] = useState<{ squares: (string | null)[] }[]>([
    { squares: Array(9).fill(null) }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    
    // Check for draw
    if (squares.every(square => square !== null)) {
      return { winner: 'draw', line: null };
    }
    
    return { winner: null, line: null };
  };

  const current = history[stepNumber];
  const { winner, line } = calculateWinner(current.squares);

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const currentSquares = [...newHistory[newHistory.length - 1].squares];
    
    // Return if game is won or square is already filled
    if (winner || currentSquares[i]) {
      return;
    }
    
    currentSquares[i] = xIsNext ? 'X' : 'O';
    
    setHistory([...newHistory, { squares: currentSquares }]);
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
    
    // Check if this move resulted in a win or draw
    const result = calculateWinner(currentSquares);
    if (result.winner === 'X') {
      setXWins(prev => prev + 1);
    } else if (result.winner === 'O') {
      setOWins(prev => prev + 1);
    } else if (result.winner === 'draw') {
      setDraws(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  let status;
  if (winner === 'draw') {
    status = "It's a draw!";
  } else if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Tic Tac Toe</h1>
        <p className="text-gray-600">The classic game reimagined</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="game-board">
          <Board 
            squares={current.squares} 
            onClick={handleClick} 
            winningLine={line}
          />
        </div>
        
        <div className="game-info">
          <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-64">
            <div className="status text-xl font-semibold mb-4 text-center">
              {status}
            </div>
            
            <div className="stats grid grid-cols-3 gap-2 mb-6">
              <div className="stat bg-blue-50 p-3 rounded-md text-center">
                <div className="text-blue-600 font-bold text-xl">{xWins}</div>
                <div className="text-sm text-gray-600">X Wins</div>
              </div>
              <div className="stat bg-rose-50 p-3 rounded-md text-center">
                <div className="text-rose-500 font-bold text-xl">{oWins}</div>
                <div className="text-sm text-gray-600">O Wins</div>
              </div>
              <div className="stat bg-gray-50 p-3 rounded-md text-center">
                <div className="text-gray-600 font-bold text-xl">{draws}</div>
                <div className="text-sm text-gray-600">Draws</div>
              </div>
            </div>
            
            <button 
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
              onClick={resetGame}
            >
              <RotateCcw className="w-4 h-4" />
              New Game
            </button>
            
            {winner && (
              <div className="mt-4 p-3 bg-yellow-50 rounded-md flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">
                  {winner === 'draw' ? "It's a draw!" : `${winner} wins!`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
