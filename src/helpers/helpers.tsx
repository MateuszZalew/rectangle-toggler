export const createBoard = (
  numRows: number,
  numCols: number,
  chanceLightStartsOn: number
): boolean[][] => {
  const board: boolean[][] = [];
  for (let x = 0; x < numRows; x++) {
    const singleRow: boolean[] = [];
    for (let y = 0; y < numCols; y++) {
      singleRow.push(Math.random() < chanceLightStartsOn);
    }
    board.push(singleRow);
  }
  return board;
};
