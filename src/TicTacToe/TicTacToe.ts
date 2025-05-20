enum pieceType {
  X,
  O,
}

class PlayingPiece {
  public pieceType: pieceType;
  constructor(pieceType: pieceType) {
    this.pieceType = pieceType;
  }
}

class PlayingPieceX extends PlayingPiece {
  constructor() {
    super(pieceType.X);
  }
}

class PlayingPieceO extends PlayingPiece {
  constructor() {
    super(pieceType.O);
  }
}

class Board {
  public board: (PlayingPiece | null)[][];

  constructor() {
    this.board = Array.from({ length: 3 }, () => Array(3).fill(null));
  }

  addPiece(row: number, col: number, playingPiece: PlayingPiece): boolean {
    if (this.board[row][col] != null) {
      return false;
    }
    this.board[row][col] = playingPiece;
    return true;
  }

  printBoard(): void {
    for (let i = 0; i < 3; i++) {
      const row = this.board[i].map((cell) => {
        if (cell == null) return "-";
        return cell.pieceType == pieceType.X ? "X" : "O";
      });
      console.log(row.join("|"));
    }
  }

  checkWinner(): pieceType | null {
    for (let i = 0; i < 3; i++) {
      const a = this.board[i][0];
      const b = this.board[i][1];
      const c = this.board[i][2];

      if (
        a !== null &&
        b !== null &&
        c !== null &&
        a.pieceType === b.pieceType &&
        b.pieceType === c.pieceType
      ) {
        return a.pieceType;
      }

      const d = this.board[0][i];
      const e = this.board[1][i];
      const f = this.board[2][i];

      if (
        d !== null &&
        e !== null &&
        f !== null &&
        d.pieceType === e.pieceType &&
        e.pieceType === f.pieceType
      ) {
        return d.pieceType;
      }
    }

    const g = this.board[0][0];
    const h = this.board[1][1];
    const i = this.board[2][2];
    if (
      g &&
      h &&
      i &&
      g.pieceType === h.pieceType &&
      h.pieceType === i.pieceType
    ) {
      return g.pieceType;
    }

    const j = this.board[0][2];
    const k = this.board[1][1];
    const l = this.board[2][0];
    if (
      j &&
      k &&
      l &&
      j.pieceType === k.pieceType &&
      k.pieceType === l.pieceType
    ) {
      return j.pieceType;
    }
    return null;
  }

  isFull(): boolean {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === null) {
          return false;
        }
      }
    }
    return true;
  }
}

class Player {
  public name: string;
  public piece: PlayingPiece;

  constructor(name: string, piece: PlayingPiece) {
    this.name = name;
    this.piece = piece;
  }
}

class TicTacToeGame {
  public players: Player[];
  public gameBoard: Board;
  public currentPlayerIdx = 0;

  constructor() {
    this.players = [];
    this.gameBoard = new Board();
    this.initializeGame();
  }

  initializeGame() {
    const crossPiece: PlayingPieceX = new PlayingPieceX();
    const circlePiece: PlayingPieceO = new PlayingPieceO();
    const player1: Player = new Player("Player1", crossPiece);
    const player2: Player = new Player("Player2", circlePiece);

    this.players.push(player1);
    this.players.push(player2);
  }

  startGame(moves: [number, number][]) {
    for (const [row, col] of moves) {
      const currentPlayer = this.players[this.currentPlayerIdx];
      const success = this.gameBoard.addPiece(row, col, currentPlayer.piece);

      console.log(
        `Move: ${currentPlayer.name} (${currentPlayer.piece.pieceType}) -> [${row}, ${col}]`
      );

      if (!success) {
        console.log("Invalid move! Cell already taken.");
        return;
      }

      this.gameBoard.printBoard();

      const winner = this.gameBoard.checkWinner();
      if (winner!=null) {
        console.log(`${currentPlayer.name} wins with ${winner}!`);
        return;
      }

      if (this.gameBoard.isFull()) {
        console.log("It's a draw!");
        return;
      }

      this.currentPlayerIdx = 1 - this.currentPlayerIdx;
    }

    console.log("Game ended without a winner.");
  }
}

const game = new TicTacToeGame();

const moves: [number, number][] = [
  [0, 0], 
  [0, 1],
  [1, 1], 
  [0, 2], 
  [2, 2], // X wins
];
game.startGame(moves);
