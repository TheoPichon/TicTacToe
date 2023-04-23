/**
 *
 * Evolutions
 * 1 : Pour le coup en cours, afficher uniquement "Vous êtes au coup #... au lieu d'un bouton" ? Je ne comprend pas
 * 2 : Réécrire le tableau pour utiliser deux boucles pour faire les carrés au lieu de les coder en dur
 * 3 : Ajouter un bouton qui permet de trier les coups dans l'ordre croissant ou décroissant
 * 4 : Lorque quelqu'un gagne, mettre en évidence les trois cases qui ont causé la victoire (et lorque personne ne gagne,
 *     afficher un message indiquant que le résultat est un match null)
 * 5 : Afficher l'emplacement de chaque coup au format (ligne, col) dans la liste de l'historique des coups
 */

import React from "react";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

/**
 *
 * Si on est au mouvement actuel, et que le nombre de valeur enregistré dans square est égal au à la valeur
 * du mouvement actuel, alors afficher "vous êtes au mouvement actuel", sinon afficher moves
 *
 */

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  function areAllValuesNonNull(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == null) {
        return false;
      }
    }
    return true;
  }

  const winner = calculateWinner(squares);
  console.log(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (areAllValuesNonNull(squares)) {
    status = "Egality";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    console.log(currentMove);
    let description;
    if (move > 0) {
      description = "Allez au mouvement n°" + move;
    } else {
      description = "Retour en début de partie";
    }

    return move === currentMove && move > 0 && move < 9 ? (
      <>
        <p>Mouvement n° {currentMove + 1} en cours</p>
      </>
    ) : (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {/*       <div className="game-info">
        <ol>{moves}</ol>
      </div> */}
    </div>
  );
}

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}
