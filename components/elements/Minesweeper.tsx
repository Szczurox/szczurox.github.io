import React from "react";
import { createDesktopElement } from "../utils/Element";
import { UniversalContext } from "../utils/UniversalProvider";
import styles from "../../styles/components/elements/Minesweeper.module.css";

export interface MinesweeperProps {}

export interface MinesweeperStates {
  currentGameState: number;
  minesLeft: number;
  choice: number;
  board: [number, boolean, boolean][][]; // value, isVisible, isFlagged
}

export class MinesweeperContent extends React.Component<
  MinesweeperProps,
  MinesweeperStates
> {
  static contextType = UniversalContext;
  context!: React.ContextType<typeof UniversalContext>;
  dx: number[] = [-1, 1, -1, 0, 1, -1, 0, 1];
  dy: number[] = [0, 0, -1, -1, -1, 1, 1, 1];
  boardSize: [number, number] = [8, 8];
  numOfMines: number = 10;
  colors: Map<number, string> = new Map([
    [1, "blue"],
    [2, "green"],
    [3, "red"],
    [4, "purple"],
    [5, "maroon"],
    [6, "turquiose"],
    [7, "black"],
    [8, "gray"],
  ]);

  constructor(props: MinesweeperProps) {
    super(props);
    this.state = {
      currentGameState: 1,
      minesLeft: this.numOfMines,
      choice: -1,
      board: [],
    };
  }

  componentDidMount(): void {
    this.restart();
  }

  generateBoard = (
    board: [number, boolean, boolean][][]
  ): [number, boolean, boolean][][] => {
    let boardWidth = this.boardSize[0];
    let boardHeight = this.boardSize[1];
    for (let i = 0; i < this.numOfMines; i++) {
      // Random coordinates for a mine
      let ranX = Math.floor(Math.random() * boardWidth);
      let ranY = Math.floor(Math.random() * boardHeight);
      // Set mine's coordinates if a mine doesn't already exist in this place
      if (board[ranX][ranY][0] != 9) board[ranX][ranY][0] = 9;
      // If a mine exists in this place, go back in loop (generate new random coordinates)
      else {
        i--;
        continue;
      }
      // Increase mine count of every tile surrouding the mine (if a tile isn't a mine itself)
      for (let i = 0; i < 8; i++)
        if (this.isTileExisting(ranX + this.dx[i], ranY + this.dy[i]))
          if (board[ranX + this.dx[i]][ranY + this.dy[i]][0] != 9)
            board[ranX + this.dx[i]][ranY + this.dy[i]][0] += 1;
    }
    return board;
  };

  // Updates both local state and child state
  updateStates = (newState: { [key: string]: any }): void => {
    this.context.updateChildState(newState);
    this.setState({ ...this.state, ...newState });
  };

  checkBoard = (): boolean => {
    console.log(this.state.minesLeft);
    // Iterate through the visible and the true board and see if all the flags match all the bombs
    for (let i = 0; i < this.boardSize[0]; i++)
      for (let j = 0; j < this.boardSize[1]; j++)
        if (this.state.board[i][j][0] == 9 && !this.state.board[i][j][2])
          return false;
    return true;
  };

  isTileExisting = (column: number, row: number): boolean => {
    return (
      column >= 0 &&
      row >= 0 &&
      column < this.boardSize[0] &&
      row < this.boardSize[1]
    );
  };

  placeFlag = (column: number, row: number): void => {
    let board = [...this.state.board];
    let minesChange = 0;
    if (
      !board[column][row][1] &&
      this.state.minesLeft > 0 &&
      !board[column][row][2]
    ) {
      board[column][row][2] = true;
      minesChange = -1;
    } else if (board[column][row][2]) {
      board[column][row][2] = false;
      minesChange = 1;
    }

    this.setState({
      board: board,
      minesLeft: this.state.minesLeft + minesChange,
    });

    if (this.state.minesLeft + minesChange == 0 && this.checkBoard())
      this.setState({ currentGameState: 3 });
  };

  // Updates both local state and child state
  breakTile = (column: number, row: number): void => {
    // Rescursive function breaking all free tiles
    const breakFreeTiles = (ncolumn: number, nrow: number) => {
      board[ncolumn][nrow][1] = true;
      if (board[ncolumn][nrow][0] == 0) {
        // Recursively break all surrounding tiles
        for (let i = 0; i < 8; i++)
          if (this.isTileExisting(ncolumn + this.dx[i], nrow + this.dy[i])) {
            if (
              !board[ncolumn + this.dx[i]][nrow + this.dy[i]][1] &&
              !board[ncolumn + this.dx[i]][nrow + this.dy[i]][2]
            ) {
              board[ncolumn + this.dx[i]][nrow + this.dy[i]][1] = true;
              breakFreeTiles(ncolumn + this.dx[i], nrow + this.dy[i]);
            }
          }
      }
    };

    let board = [...this.state.board];
    if (!board[column][row][2]) {
      board[column][row][1] = true;
      if (board[column][row][0] == 9) this.setState({ currentGameState: 2 });
      else if (board[column][row][0] == 0) {
        // Recursively break all surrounding tiles
        for (let i = 0; i < 8; i++)
          if (this.isTileExisting(column + this.dx[i], row + this.dy[i]))
            if (
              !board[column + this.dx[i]][row + this.dy[i]][1] &&
              !board[column + this.dx[i]][row + this.dy[i]][2]
            ) {
              breakFreeTiles(column + this.dx[i], row + this.dy[i]);
              board[column + this.dx[i]][row + this.dy[i]][1] = true;
            }
      }
      this.setState({ board: board });
    }
  };

  restart = () => {
    this.setState({
      currentGameState: 1,
      minesLeft: this.numOfMines,
      choice: -1,
    });
    let board: [number, boolean, boolean][][] = [[]];
    for (let i = 0; i < this.boardSize[0]; i++) {
      board.push([]);
      for (let j = 0; j < this.boardSize[1]; j++)
        board[i].push([0, false, false]);
    }
    board = this.generateBoard(board);
    this.setState({ board: board });
  };

  render() {
    return (
      <div
        className={styles.minesweeper}
        style={{
          paddingLeft: "10px",
          paddingTop: "10px",
        }}
      >
        {this.state.currentGameState == 1 ? (
          <div className={styles.board}>
            <div
              className={styles.stats}
              style={{
                width: 512,
                height: 64,
                paddingLeft: 10,
              }}
            >
              <div style={{ display: "inline-block", fontSize: 30 }}>
                MINES: {this.state.minesLeft}
              </div>
            </div>
            {this.state.board.map((row) => {
              const rowIndex = this.state.board.indexOf(row);
              return (
                <div
                  key={rowIndex}
                  style={{
                    height: 512 / this.boardSize[0],
                    display: "inline-list-item",
                  }}
                >
                  {row.map((element) => {
                    const columnIndex = row.indexOf(element);
                    return (
                      <div
                        key={rowIndex * this.boardSize[0] + columnIndex}
                        className={styles.board_element}
                        style={{
                          width: 512 / this.boardSize[0],
                          height: 512 / this.boardSize[1],
                          display: "inline-block",
                          fontSize: 256 / this.boardSize[0],
                          textAlign: "center",
                          backgroundColor: element[1]
                            ? "rgb(2, 62, 2)"
                            : undefined,
                        }}
                        onClick={(_) => {
                          this.breakTile(rowIndex, columnIndex);
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          this.placeFlag(rowIndex, columnIndex);
                        }}
                      >
                        <span
                          style={{
                            color: element[1]
                              ? this.colors.get(element[0])
                              : undefined,
                            filter: element[2]
                              ? "invert(23%) sepia(64%) saturate(6902%) hue-rotate(354deg) brightness(92%) contrast(124%)"
                              : undefined,
                          }}
                        >
                          {element[1] && element[0] != 0
                            ? element[0]
                            : element[2]
                            ? "🚩"
                            : "⠀"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              fontSize: 60,
            }}
          >
            <div className={styles.game_complete_text}>
              {this.state.currentGameState == 2 ? <>You Lose</> : <>You Win</>}
            </div>
            <div
              onClick={(_) => this.restart()}
              className={styles.restart}
              style={{
                marginTop: 20,
                width: 160,
                height: 60,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 35,
                textAlign: "center",
                backgroundColor: "rgb(2, 62, 2)",
              }}
            >
              RESTART
            </div>
          </div>
        )}
      </div>
    );
  }
}

export const MinesweeperElement = createDesktopElement({
  fileName: "Minesweeper",
  iconPath: "/mine-icon.svg",
  windowDisallowFullscreen: true,
  windowNotResizable: true,
  children: <MinesweeperContent />,
  width: 532,
  height: 636,
});

export default MinesweeperElement;
