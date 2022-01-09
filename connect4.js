"use strict";

// The goal is to create a Connect 4 board. 
class Grid {
  constructor() {
    // Dimensions of the C4 grid. Could possibly be dynamic. 
    this.rows = 7;
    this.cols = 7;

    // The contents of the C4 grid itself. 
    this.tiles = [];
    for (let x = 0; x < 7; x++) {
      this.tiles.push([]);
      for (let y = 0; y < 7; y++) {
        this.tiles[x][y] = ".";
      }
    }

    // Current turn. 0 means X, 1 means O. 
    this.turn = 0;
    // If the game is over. Requires either the board to be full or a connect 4 to be present. 
    this.gameOver = false;
    this.winner = -1;
  }

  // Check if a position is valid. Mainly for determining if a Connect 4 has occured and ensuring I'm not just bad. 
  isValid(x, y) {
    return (x >= 0 && x < this.cols && y >= 0 && y < this.rows);
  }

  // Check if a column is full. Used for placing chips. 
  isFull(x) {
    // First check if the column is valid; Who knows, don't want an error ruining everything. 
    if (!this.isValid(x, this.rows - 1)) return false;
    return (this.tiles[x][this.rows - 1] !== ".");
  }

  // (Try to) place a tile in a certain column. 
  place(x) {
    if (this.gameOver || this.isFull(x)) return;
    for (let y = 0; y < this.rows; y++) {
      if (this.tiles[x][y] === ".") {
        this.tiles[x][y] = (this.turn === 1 ? "X" : "O");
        if (this.checkWins(x, y)) {
          this.gameOver = true;
          this.winner = this.turn;
        } else {
          this.turn = 1 - this.turn;
        }
        return;
      }
    }
  }

  // Check if the tile that was just played created a Connect 4.
  checkWins(x, y) {
    for (let i = 0; i < 8; i++) {
      if (this.inRowFrom(x, y, i) >= 4) return true;
    }
    return false;
  }

  // Show how many tiles are in a row from a given position. 
  inRowFrom(x, y, dir) {
    if (!this.isValid(x, y) || this.tiles[x][y] !== (this.turn === 1 ? "X" : "O")) return 0;
    const dPos = [ // There's probably a better way to do this. 
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [-1, -1],
    ];
    const nx = x + dPos[dir][0];
    const ny = y + dPos[dir][1];
    return 1 + this.inRowFrom(nx, ny, dir);
  }

  // Turn the data into a string for easy rendering.
  toString() {
    let out = "  ";
    for (let y = this.rows - 1; y >= 0; y--) {
      for (let x = 0; x < this.cols; x++) {
        out += this.tiles[x][y];
        out += " ";
      }
      out += "\n  ";
    }
    if (this.gameOver) {
      out += `\n Player ${this.winner + 1} (${this.winner === 1 ? "X" : "O"}) has won!`;
    } else {
      out += `\n Player ${this.turn + 1} (${this.turn === 1 ? "X" : "O"}) to move.`;
    }
    return out;
  }
}