var sudoku = new Array;

function reset() {
    sudoku = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
}
reset();


function getSquare(x) {
    if (x <= 2) {
    return [0, 1, 2]
} else if (x <= 5) {
    return [3, 4, 5]
} else {
    return [6, 7, 8]
}};

function getBoxCandidates(x, y) {
    var candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    sudoku.forEach(row => {
        if (row[x] !== 0) {
            candidates.splice(candidates.indexOf(row[x]), 1);
        }
    })
    sudoku[y].forEach(box => {
        if (box !== 0 && candidates.indexOf(box) !== -1) {
            candidates.splice(candidates.indexOf(box), 1);
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

function getRowCandidates(y) {
    var rowCandidates = [];
    sudoku[y].forEach((box, x) => {
        if (box == 0) {
            rowCandidates.push(getBoxCandidates(x, y));
        }
    })
    return rowCandidates;
}

function getColumnCandidates(x) {
    var columnCandidates = [];
    sudoku.forEach((row, y) => {
        if (row[x] == 0) {
            columnCandidates.push(getBoxCandidates(x, y));
        }
    })
    return columnCandidates;
}

function getSquareCandidates(x, y) {
    var squareCandidates = [];
    var squareX = getSquare(x);
    var squareY = getSquare(y);
    squareY.forEach(yIndex => {
        squareX.forEach(xIndex => {
            if (sudoku[yIndex][xIndex] == 0) {
                squareCandidates.push(getBoxCandidates(xIndex, yIndex))
            }
        })
    })
    return squareCandidates;
}

function countCandidateOccurences(n, array) {
    var count = 0;
    array.forEach(candidateSet => {
        if (candidateSet.indexOf(n) !== -1) {
            count++
        }
    })
    return count;
}

function fillIfRequired(x, y) {
    if (sudoku[y][x] == 0) {
    var fill = 0;
    var change = false;
    var candidates = getBoxCandidates(x, y);
    candidates.forEach(candidate => {
        var rowCandidates = getRowCandidates(y);
        var count = countCandidateOccurences(candidate, rowCandidates)
        if (count == 1) {
            fill = candidate;
        }
        var columnCandidates = getColumnCandidates(x);
        var count = countCandidateOccurences(candidate, columnCandidates)
        if (count == 1) {
            fill = candidate;
        }
        var squareCandidates = getSquareCandidates(x, y);
        var count = countCandidateOccurences(candidate, squareCandidates)
        if (count == 1) {
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

/*
function checkColumnRequirements(x, y) {
    var candidates = getBoxCandidates(x, y);
    candidates.forEach(option => {
        i = 0
        sudoku[y].forEach(box =>
        if (box !== 0) {

            }
            i++;
            )
    })
    //for each box in the column, if it equals 0, check its candidates. Then for each candidates of the box the function is checking, check if that candidate exists in
    //For each candidates, check each item in a column to see if it's 0. If it is 0, check the candidates for that box.
    // 


    sudoku.forEach((row, i) => {
        if (row[x] == 0) {
            var y = i;
            columnCandidates[i] = getBoxCandidates(x, y);
        }
    })
    possibleLocations.forEach((number, i) => {
        var num = i + 1;
        columnCandidates.forEach(row => {
            if (row.indexOf(num) !== -1) {
                possibleLocations[i]++
            }
        })
    })
    return possibleLocations;
}

function checkRowRequirements(y) {
    var possibleLocations = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var rowCandidates = [];
    sudoku[y].forEach((box, i) => {
        if (box == 0) {
            var x = i;
            rowCandidates[i] = getBoxCandidates(x, y);
        }
    })
    possibleLocations.forEach((number, i) => {
        var num = i + 1;
        rowCandidates.forEach(row => {
            if (row.indexOf(num) !== -1) {
                possibleLocations[i]++
            }
        })
    })
    return possibleLocations;
}
*/



function fillGrid() {
    var change = false;
    var success = true;
    var filledSquares;
    while (filledSquares !== 81) {
        if (change) {
            for (let y = 0; y < 9; y++) {
                for (let x = 0; x < 9; x++) {
                    if (x == 0 && y == 0) {filledSquares = 0}
                    if (sudoku[y][x] == 0) {
                        change = fillIfRequired(x, y)
                        if (change) {
                            break;
                        }
                    } else {filledSquares++}
                }
            }
        } else {
            for (let y = 0; y < 9; y++) {
                for (let x = 0; x < 9; x++) {
                    if (sudoku[y][x] == 0) {
                        candidates = getBoxCandidates(x, y);
                        sudoku[y][x] = candidates[Math.floor(Math.random()*candidates.length)];
                        if (sudoku[y][x] == undefined) {
                            success = false;
                        }
                        change = true;
                        break;
                    }
                }
                if (change) {break;}
            }
        }
    }
    return success;
}

function countSuccess() {
    var successes = 0;
    var failures = 0;
    for (let i = 0; i < 1000; i++) {
        console.log(i);
        if (fillGrid()) {
            successes++;
        } else {
            failures++;
        }
        reset();
    }
    console.log("Successful Sudoku created " + successes + " times, and unsuccessful " + failures + " times. (" + successes/10 + "%)");
}

countSuccess();
