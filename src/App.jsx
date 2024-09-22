import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./components/winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]; // initial gameboard with empty values

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]; //create a deepcopy as to not storing the updated game board to the initial game board memory

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, playerSymbol } = square;

    gameBoard[row][playerSymbol] = player; //e.g. setting gameBoard[0][0] to "X" => deriving state from props
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const comb of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[comb[0].row][comb[0].column];
    const secondSquareSymbol = gameBoard[comb[1].row][comb[1].column];
    const thirdSquareSymbol = gameBoard[comb[2].row][comb[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);
  //const [activePlayer, setActivePlayer] = useState("X"); => skip this state management

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleMoves(rowIndex, playerSymbolIndex) {
    //setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X")); //new state depends on old state, using => and new state: if current player is X then change to O, else change to X
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, playerSymbol: playerSymbolIndex },
          player: currentPlayer,
        },
        ...prevTurns, // This create an array with the square and player, and keeps the previous turns as well
      ];
      return updatedTurns;
    });
  }

  function handleRematch() {
    return setGameTurns([]); //to set the gameTurns state to empty array => restore to initial game board
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          {/* adding className for styling */}
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard
          onSelectSquare={handleMoves} //make sure handleMoves is executed when a square was selected inside the GameBoard component
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
