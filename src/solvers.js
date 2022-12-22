/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// solution = [[1, 0, 0, 0],
//             [0, 1, 0, 0],
//             [0, 0, 1, 0],
//             [0, 0, 0, 1]]

window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});

  solution.togglePiece(0, 0);

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (solution.get(row)[col] === 0) {
        solution.togglePiece(row, col);
        if (solution.hasRowConflictAt(row) || solution.hasColConflictAt(col)) {
          solution.togglePiece(row, col);
        }
      }
    }
  }

  var output = [];

  for (let i = 0; i < n; i++) {
    output.push(solution['attributes'][i]);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return output;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  // if no conflicts
  // push into array
  var currentSolution;
  var firstGenerationLimit = Math.ceil((n * n) / 2);
  var firstGenerationCount = 0;
  var isAtLimit = false;

  // inner function goes here
  // [0, 0] toggle item
  // are there any conflicts?

  // recursion call the inner function on the next available spot
  var counter = 0;

  var inner = function (trialNum, board) {
    var numPieces = _.reduce(board.rows(), function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);

    if (numPieces === n) {
      solutionCount++;
      return board;
    }

    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (board.get(row)[col] === 0) {
          board.togglePiece(row, col);
          if (board.hasRowConflictAt(row) || board.hasColConflictAt(col)) {
            board.togglePiece(row, col);
          // if no conflict, traverse further down tree
          } else {
            inner(counter, board);
          }
        }
      }
    }

  };

  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (firstGenerationCount === firstGenerationLimit) {
        isAtLimit = true;
        break;
      }

      // CREATING SOLUTION
      currentSolution = new Board({'n': n});
      inner(counter, currentSolution);
      firstGenerationCount++;
    }
    if (isAtLimit) {
      break;
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
