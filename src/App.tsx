import React from 'react';
import Game from './components/Game';
import { Github } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex flex-col">
      <header className="py-4 px-6 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">TicTacToe</h1>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <Game />
      </main>
      
      <footer className="py-6 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>Tic Tac Toe Game - Built with ChatAndBuild</p>
          <p className="mt-1">Made with React, TypeScript & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
