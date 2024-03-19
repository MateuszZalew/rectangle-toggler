import { FC } from "react";
import "./Cell.css";

type CellProps = {
  isLit: boolean;
  flipCellsAroundMe: () => void;
};

export const Cell: FC<CellProps> = ({ isLit, flipCellsAroundMe }) => {
  function handleClick() {
    flipCellsAroundMe();
  }

  const classes = "Cell" + (isLit ? " Cell-lit" : "");

  return <td className={classes} onClick={handleClick}></td>;
};

export default Cell;
