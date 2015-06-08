//Adapted From the java implementation of Othello by Davis Wang
function othello() {
  this.init();
}

othello.prototype.initBoard = function initBoard() {
  var board = new Array(8);
  for(i = 0 ; i < 8 ; i++) {
    board[i] = new Array(8);
  }

  for(y = 0 ; y < 8 ; y++) {
    for(x = 0 ; x < 8 ; x++) {
      board[y][x] = "-";
    }
  }
  board[3][3] = "X";
  board[4][4] = "X";
  board[3][4] = "O";
  board[4][3] = "O";

  return board;
}

othello.prototype.printBoard = function printBoard() {
  for(y = 0 ; y < 8 ; y++) {
    for(x = 0 ; x < 8 ; x++) {
      process.stdout.write(this.board[y][x].toString());
    }
    process.stdout.write("\n");
  }
  process.stdout.write("\n");
}

othello.prototype.init = function init() {
  /**
   * 0 = Unoccupied
   * 1 = White X
   * 2 = Black O
   **/
  this.board = this.initBoard();
  
  /**
   * True = White
   * False = Black
   **/
  this.turn = true;
}

othello.prototype.getNumOfPieces = function getNumOfPieces() {
  var white = 0;
  var black = 0;
  for(y = 0 ; y < 8 ; y++) {
    for(x = 0 ; x < 8 ; x++) {
      if(this.board[y][x] == "X") {
        white++;
      }
      else if(this.board[y][x] == "O") {
        black++;
      }
    }
  }
  return {"black" : black, "white" : white};
}

othello.prototype.gameOver = function gameOver() {
  for(y = 0 ; y < 8 ; y++) {
    for(x = 0 ; x < 8 ; x++) {
      if(this.canPlayerGo(true) || this.canPlayerGo(false)) {
        return false;
      }
    }
  }
  return true;
}

othello.prototype.canPlayerGo = function canPlayerGo(turn) {
  for(y = 0 ; y < 8 ; y++) {
    for(x = 0 ; x < 8 ; x++) {
      if(this.validMove(y, x)) {
        return true;
      }
    }
  }
  return false;
}

//private
othello.prototype.validMove = function validMove(y, x) {
  var p = this.turn ? "X" : "O";
  if(this.board[y][x] != "-") {
    return false;
  }
  //TODO - do a more concise algo
  /**
   * Eight directions, starting from top left, going counterclockwise.
   */
  var processRow = new Array(8);
  for(a = 0 ; a < processRow.length ; a++) {
    processRow[a]=true;
  }
  
  for(a = 1 ; a < 8 ; a++) {
    if(processRow[0] && y-a >=0 && x-a >=0) {
      if(this.board[y-a][x-a] == "-" || this.board[y-1][x-1] == p) {
        processRow[0] = false;
      }
      else if(this.board[y-a][x-a] == p && this.board[y-a+1][x-a+1] != p) {
        return true;
      }
    }
    if(processRow[1] && y-a >=0) {
      if(this.board[y-a][x] == "-" || this.board[y-1][x] == p) {
        processRow[1] = false;
      }
      else if(this.board[y-a][x] == p && this.board[y-a+1][x] != p) {
        return true;
      }
    }
    if(processRow[2] && y-a >=0 && x+a <=7) {
      if(this.board[y-a][x+a] == "-" || this.board[y-1][x+1] == p) {
        processRow[2] = false;
      }
      else if(this.board[y-a][x+a] == p && this.board[y-a+1][x+a-1] != p) {
        return true;
      }
    }
    if(processRow[3] && x+a <=7) {
      if(this.board[y][x+a] == "-" || this.board[y][x+1] == p) {
        processRow[3] = false;
      }
      else if(this.board[y][x+a] == p && this.board[y][x+a-1] != p) {
        return true;
      }
    }
    if(processRow[4] && y+a <=7 && x+a <=7) {
      if(this.board[y+a][x+a] == "-" || this.board[y+1][x+1] == p) {
        processRow[4] = false;
      }
      else if(this.board[y+a][x+a] == p && this.board[y+a-1][x+a-1] != p) {
        return true;
      }
    }
    if(processRow[5] && y+a <=7) {
      if(this.board[y+a][x] == "-" || this.board[y+1][x] == p) {
        processRow[5] = false;
      }
      else if(this.board[y+a][x] == p && this.board[y+a-1][x] != p) {
        return true;
      }
    }
    if(processRow[6] && y+a <=7 && x-a >=0) {
      if(this.board[y+a][x-a] == "-" || this.board[y+1][x-1] == p) {
        processRow[6] = false;
      }
      else if(this.board[y+a][x-a] == p && this.board[y+a-1][x-a+1] != p) {
        return true;
      }
    }
    if(processRow[7] && x-a >=0) {
      if(this.board[y][x-a] == "-" || this.board[y][x-1] == p) {
        processRow[7] = false;
      }
      else if(this.board[y][x-a] == p && this.board[y][x-a+1] != p) {
        return true;
      }
    }
  }
  return false;
}

othello.prototype.processMove = function processMove(y, x) {
  var canGo = true;
  var validMove = this.validMove(y,x);
  if(y < 8 && y >= 0 && x < 8 && x>=0 && validMove) {
    //process move
    /**
     * Eight directions, starting from top left, going counterclockwise.
     **/

    var processRow = Array(8);
    for(a = 0 ; a < processRow.length ; a++) {
      processRow[a] = true;
    }

    var p = this.turn ? "X" : "O";

    this.board[y][x] = p;

    for(a = 1 ; a < 8 ; a++) {
      if(processRow[5] && y+a <= 7 && this.board[y+a][x] == "-")
        processRow[5] = false;
      if(processRow[1] && y-a >= 0 && this.board[y-a][x] == "-")
        processRow[1] = false;
      if(processRow[3] && x+a <= 7 && this.board[y][x+a] == "-")
        processRow[3] = false;
      if(processRow[7] && x-a >= 0 && this.board[y][x-a] == "-")
        processRow[7] = false;
      if(processRow[4] && y+a <= 7 && x+a <= 7 && this.board[y+a][x+a] == "-")
        processRow[4] = false;
      if(processRow[6] && y+a <= 7 && x-a >= 0 && this.board[y+a][x-a] == "-")
        processRow[6] = false;
      if(processRow[2] && y-a >= 0 && x+a <= 7 && this.board[y-a][x+a] == "-")
        processRow[2] = false;
      if(processRow[0] && y-a >= 0 && x-a >= 0 && this.board[y-a][x-a] == "-")
        processRow[0] = false;
      
      if(processRow[5] && y+a <= 7 && this.board[y+a][x] == p) {
        processRow[5] = false;
        for(b = 0 ; b < a ; b++) {
          this.board[y+b][x] = p;
        }
      }
      if(processRow[1] && y-a >= 0 && this.board[y-a][x] == p) {
        processRow[1] = false;
        for(b = 0 ; b < a ; b++) {
          this.board[y-b][x] = p;
        }
      }
      if(processRow[3] && x+a <= 7 && this.board[y][x+a] == p) {
        processRow[3] = false;
        for(b = 0 ; b < a ; b++) {
          this.board[y][x+b] = p;
        }
      }
      if(processRow[7] && x-a >= 0 && this.board[y][x-a] == p) {
        processRow[7] = false;
        for(b = 0 ; b < a ; b++) {
          this.board[y][x-b] = p;
        }
      }
      if(processRow[4] && y+a <= 7 && x+a <= 7 && this.board[y+a][x+a] == p) {
        processRow[4] = false;
        for(b = 0 ; b < a ; b++) {
          this.board[y+b][x+b] = p;
        }
      }
      if(processRow[6] && y+a <= 7 && x-a >= 0 && this.board[y+a][x-a] == p) {
        processRow[6] = false;
        for(b = 0 ; b < a ; b++) {
          this.board[y+b][x-b] = p;
        }
      }
      if(processRow[2] && y-a >= 0 && x+a <= 7 && this.board[y-a][x+a] == p) {
        processRow[2] = false;
        for(b = 0 ; b < a ; b++) {
          this.board[y-b][x+b] = p;
        }
      }
      if(processRow[0] && y-a >= 0 && x-a >= 0 && this.board[y-a][x-a] == p) {
        processRow[0] = false;
        for(b = 0 ; b < a ; b++) {
          this.board[y-b][x-b] = p;
        }
      }
    }
    canGo = this.canPlayerGo(!this.turn);
    if(canGo) {
      this.turn = !this.turn;
    }
  }
  return {"board": this.board, "numPieces": this.getNumOfPieces(), "gameOver": this.gameOver(), "canGo": canGo, "turn": (this.turn ? "White,X" : "Black,O"), "x": x, "y": y, "validMove": validMove};
}

module.exports = othello;

// module.exports.init = init;
// module.exports.processMove = processMove;
// module.exports.printBoard = printBoard;