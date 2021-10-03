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

//Checked an individual cell to see if it had any requirements in it's group that only it could have and filled it.
function fillIfRequired(x, y) {
    if (sudoku[y][x] == 0) {
    var fill = 0;
    var change = false;
    var candidates = getAdvancedCellCandidates(x, y);
    candidates.forEach(candidate => {
        var rowCandidates = getExclusiveRowCandidates(x, y);
        var count = countCandidateOccurences(candidate, rowCandidates)
        if (count == 0) {
            fill = candidate;
        }
        var columnCandidates = getExclusiveColumnCandidates(x, y);
        var count = countCandidateOccurences(candidate, columnCandidates)
        if (count == 0) {
            fill = candidate;
        }
        var squareCandidates = getExclusiveSquareCandidates(x, y);
        var count = countCandidateOccurences(candidate, squareCandidates)
        if (count == 0) {
            fill = candidate;
        }
    })
    sudoku[y][x] = fill;
    if (fill !== 0) {
        change = true;
    }
    return change;
}
}

//Old code for filling cells before refactor (in "if (change)")
for (let y = 0; y < 9; y++) {
    for (let x = 0; x < 9; x++) {
        if (x == 0 && y == 0) {filledSquares = 0}
        if (sudoku[y][x] == 0) {
            change = fillIfOnlyOneCandidate(x, y)
            if (change) {
                break;
            }
            change = fillIfRequired(x, y)
            if (change) {
                break;
            }
        } else {filledSquares++}
    }
}

function findNakedSubsets(candidatesArray) {
    var subset = false;
    for (let i = 0; i < candidatesArray.length; i++) {
        var matches = 0;
        for (let n = 0; n < candidatesArray.length; n++) {
            if (n !== i && candidatesArray[i].length === candidatesArray[n].length) {
                if (candidatesArray[i].length == 2) {
                    if (checkIfArraysMatch(candidatesArray[i], candidatesArray[n])) {
                        subset = candidatesArray[i];
                        return subset;
                    }
                } else if (candidatesArray[i].length == 3) {
                    if (checkIfArraysMatch(candidatesArray[i], candidatesArray[n])) {
                        matches++
                    }
                    if (matches == 2) {
                        subset = candidatesArray[i];
                        return subset;
                    }
                } else if (candidatesArray[i].length == 4) {
                    if (checkIfArraysMatch(candidatesArray[i], candidatesArray[n])) {
                        matches++
                    }
                    if (matches == 3) {
                        subset = candidatesArray[i];
                        return subset;
                    }
                } else if (candidatesArray[i].length == 5) {
                    if (checkIfArraysMatch(candidatesArray[i], candidatesArray[n])) {
                        matches++
                    }
                    if (matches == 4) {
                        subset = candidatesArray[i];
                        return subset;
                    }
                } else if (candidatesArray[i].length == 6) {
                    if (checkIfArraysMatch(candidatesArray[i], candidatesArray[n])) {
                        matches++
                    }
                    if (matches == 5) {
                        subset = candidatesArray[i];
                        return subset;
                    }
                }
            }
        }
}
return subset;
}