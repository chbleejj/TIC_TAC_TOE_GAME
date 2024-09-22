export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.playerSymbol}`}>
          {turn.player} selected {turn.square.row},{turn.square.playerSymbol}
        </li>
      ))}
    </ol>
  );
}
