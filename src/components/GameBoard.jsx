export default function GameBoard({ onSelectSquare, board }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectSquare(rowIndex, playerSymbolIndex) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedBoard[rowIndex][playerSymbolIndex] = activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   onSelectSquare(); //To execute a function defined outside GameBoard component bcoz the value of onSelectSquare prop is a function
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, playerSymbolIndex) => (
              <li key={playerSymbolIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, playerSymbolIndex)}
                  disabled={playerSymbol !== null} // playerSymbol = 'X' or 'O', OR: {playerSymbol !== null ? true : false}
                >
                  {playerSymbol}
                </button>
                {/* Make sure the onSelectSquare function has attributes which pass the info to handleMove in App*/}
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
