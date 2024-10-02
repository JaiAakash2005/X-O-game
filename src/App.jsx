import { useState } from "react";
import "./App.css";

function App() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState({
    boardState: initialBoard,
    isNext: true,
  });
  function resetClick() {
    setBoard({ boardState: initialBoard, isNext: true });
  }
  const data=() => {
    const [active,isActive] = useState(true);
    function activate(){
      isActive(e.target.value);
    }
    return(
      <div>
      {active?<span>Player 1</span> : <input type='text' value={e.target.value}/>}
      <button onClick={()=>activate()}>Edit</button>

      </div>
    );
  };

  const handleClick = (index) => {
    const newBoard = [...board.boardState];
    if (newBoard[index] || calculateWinner(newBoard)) {
      return;
    }
    newBoard[index] = board.isNext ? "X" : "O";
    setBoard({ ...board, boardState: newBoard, isNext: !board.isNext });
  };

  const calculateWinner = (board) => {
    const winnerLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winnerLines.length; i++) {
      const [a, b, c] = winnerLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const getBoard = () => {
    return board.boardState.map((boardValue, index) => (
      <button key={index} onClick={() => handleClick(index)}>
        {boardValue}
      </button>
    ));
  };

  return (
    <div className="App">
      <div className="h1">
        <h1>Tic Tac Toe</h1>

        <div className="board-container">
          <div className="board">{getBoard()}</div>
          <button onClick={() => resetClick()}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
