import { useState, FC } from "react";
import Cell from "../cell/index.js";
import { createBoard } from "../../helpers/helpers.js";
import "./Board.css";

type BoardProps = {
  numCols: number;
  numRows: number;
};

const Board: FC<BoardProps> = ({ numCols = 5, numRows = 5 }) => {
  const [chanceLightStartsOn, setChangeLightStartsOn] = useState(0.25);
  const [hasWon, setHasWon] = useState(false);
  const [board, setBoard] = useState<boolean[][]>(
    createBoard(numRows, numCols, chanceLightStartsOn)
  );

  const flipCell = (y: number, x: number, board: boolean[][]): boolean[][] => {
    if (x >= 0 && x < numRows && y >= 0 && y < numCols) {
      board[y][x] = !board[y][x];
    }
    return board;
  };

  const flipCellsAround = (coordinates: string): void => {
    const [y, x] = coordinates.split("-").map(Number);
    let newBoard = board!;

    newBoard = flipCell(y, x, newBoard);
    newBoard = flipCell(y, x + 1, newBoard);
    newBoard = flipCell(y, x - 1, newBoard);
    newBoard = flipCell(y + 1, x, newBoard);
    newBoard = flipCell(y - 1, x, newBoard);

    let offNums = 0;
    for (let x = 0; x < numRows; x++) {
      for (let y = 0; y < numCols; y++) {
        if (board !== null && board[x][y] === true) {
          offNums++;
        }
      }
    }

    if (offNums === 0) {
      setHasWon(true);
    } else {
      setBoard(newBoard);
      setChangeLightStartsOn((prev) => prev + 1);
    }
  };

  const handlePlayAgainClick = (chanceLightStartsOn: number = 0.25) => {
    setHasWon(false);
    setChangeLightStartsOn(chanceLightStartsOn);
    setBoard(createBoard(numRows, numCols, chanceLightStartsOn));
  };

  if (hasWon) {
    return (
      <>
        <div className="Board-winner">
          <div className="neon">You</div>
          <div className="flux">win!</div>
        </div>
        <div className="Board-retry">
          <button
            className="Board-button"
            onClick={() => handlePlayAgainClick()}
          >
            Play again
          </button>
        </div>
      </>
    );
  }

  if (board) {
    const tableBoard = [];
    for (let x = 0; x < numRows; x++) {
      const row = [];
      for (let y = 0; y < numCols; y++) {
        const coordinates = `${x}-${y}`;
        row.push(
          <Cell
            key={coordinates}
            isLit={board[x][y]}
            flipCellsAroundMe={() => flipCellsAround(coordinates)}
          />
        );
      }
      tableBoard.push(<tr key={x}>{row}</tr>);
    }

    return (
      <section>
        <div className="Board-neons">
          <div className="neon">Lights</div>
          <div className="flux">Out</div>
        </div>
        <table className="Board">
          <tbody>{tableBoard}</tbody>
        </table>
        <button
          type="button"
          className="restart-btn"
          onClick={() => handlePlayAgainClick()}
        >
          Restart
        </button>
      </section>
    );
  }
};

export default Board;
