//Code for getting candidates for a cell, before candidates grid was introduced
function getBasicCellCandidates(x, y) {
    var candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    sudoku.forEach(row => {
        if (row[x] !== 0) {
            candidates.splice(candidates.indexOf(row[x]), 1);
        }
    })
    sudoku[y].forEach(cell => {
        if (cell !== 0 && candidates.indexOf(cell) !== -1) {
            candidates.splice(candidates.indexOf(cell), 1);
        }
    })
    var squareX = getSquare(x);
    var squareY = getSquare(y);
    squareY.forEach(yIndex => {
        squareX.forEach(xIndex => {
            if (sudoku[yIndex][xIndex] !== 0 && candidates.indexOf(sudoku[yIndex][xIndex]) !== -1) {
                candidates.splice(candidates.indexOf(sudoku[yIndex][xIndex]), 1)
            }
        })
    })
    return candidates;
}

//Took coordinates and filled a cell if it only had one candidate
function fillIfOnlyOneCandidate(x, y) {
    if (sudoku[y][x] == 0) {
        var fill = 0;
        var change = false;
        var candidates = puzzleCandidates[y][x];
        if (Array.isArray(candidates) && candidates.length == 1) {
            fill = candidates[0];
        }
        sudoku[y][x] = fill;
        if (fill !== 0) {
            change = true; 
        }
        return change;
    }
}