var sudoku = new Array;

function reset() {
    sudoku = [
    [1, 2, 3, 0, 0, 0, 0, 0, 0],
    [4, 5, 6, 0, 0, 0, 0, 0, 0],
    [7, 8, 9, 0, 0, 0, 0, 0, 0],
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

function getBasicBoxCandidates(x, y) {
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

function getRowCandidates(x, y) {
    var rowCandidates = [];
    sudoku[y].forEach((box, xIndex) => {
        if (xIndex !== x) {
        if (box == 0) {
            rowCandidates.push(getBasicBoxCandidates(xIndex, y));
        }
    }
    })
    return rowCandidates;
}


function getColumnCandidates(x, y) {
    var columnCandidates = [];
    sudoku.forEach((row, yIndex) => {
        if (yIndex !== y) {
        if (row[x] == 0) {
            columnCandidates.push(getBasicBoxCandidates(x, yIndex));
        }
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
            if (yIndex !== y || xIndex !== x) {
                if (sudoku[yIndex][xIndex] == 0) {
                    squareCandidates.push(getBasicBoxCandidates(xIndex, yIndex))
                }
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

function fillIfOnlyOneCandidate(x, y) {
    if (sudoku[y][x] == 0) {
        var fill = 0;
        var change = false;
        var candidates = getAdvancedBoxCandidates(x, y);
        if (candidates.length == 1) {
            fill = candidates[0];
        }
        sudoku[y][x] = fill;
        if (fill !== 0) {
            change = true;
        }
        return change;
    }
}


function fillIfRequired(x, y) {
    if (sudoku[y][x] == 0) {
    var fill = 0;
    var change = false;
    var candidates = getAdvancedBoxCandidates(x, y);
    candidates.forEach(candidate => {
        var rowCandidates = getRowCandidates(x, y);
        var count = countCandidateOccurences(candidate, rowCandidates)
        if (count == 0) {
            fill = candidate;
        }
        var columnCandidates = getColumnCandidates(x, y);
        var count = countCandidateOccurences(candidate, columnCandidates)
        if (count == 0) {
            fill = candidate;
        }
        var squareCandidates = getSquareCandidates(x, y);
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
        } else {
            for (let y = 0; y < 9; y++) {
                for (let x = 0; x < 9; x++) {
                    if (sudoku[y][x] == 0) {
                        candidates = getAdvancedBoxCandidates(x, y);
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
    console.log(sudoku);
    return success;
}

fillGrid();

function countSuccess() {
    var successes = 0;
    var failures = 0;
    for (let i = 0; i < 200; i++) {
        console.log(i);
        if (fillGrid()) {
            successes++;
        } else {
            failures++;
        }
        reset();
    }
    console.log("Successful Sudoku created " + successes + " times, and unsuccessful " + failures + " times. (" + successes/2 + "%)");
}

//countSuccess();




function getAdvancedBoxCandidates(x, y) {
    var basicCandidates= getBasicBoxCandidates(x, y);
    var columnNakedSubsets = findNakedSubsets(getColumnCandidates(x, y));
    var rowNakedSubsets = findNakedSubsets(getRowCandidates(x, y));
    var squareNakedSubsets = findNakedSubsets(getSquareCandidates(x, y))
    var advancedCandidates = basicCandidates;
    if (columnNakedSubsets) {
        advancedCandidates = removeCandidatesFromArray(advancedCandidates, columnNakedSubsets)
    }
    if (rowNakedSubsets) {
        advancedCandidates = removeCandidatesFromArray(advancedCandidates, rowNakedSubsets)
    }
    if (squareNakedSubsets) {
        advancedCandidates = removeCandidatesFromArray(advancedCandidates, squareNakedSubsets)
    }
    return advancedCandidates;
}

function removeCandidatesFromArray(initialArray, candidatesToRemoveArray) {
    candidatesToRemoveArray.forEach(candidate => {
        if (initialArray.indexOf(candidate) !== -1) {
            initialArray.splice(initialArray.indexOf(candidate), 1);
        }
    })
    return initialArray;
}


function findNakedSubsets(candidatesArray) {
    var subset = false;
    for (let i = 0; i < candidatesArray.length; i++) {
        for (let n = 0; n < candidatesArray.length; n++) {
            if (n !== i && candidatesArray[i].length == candidatesArray[n].length) {
                var matches = 0;
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
                }
            }
        }
}
return subset;
}



function checkIfArraysMatch(array1, array2) {
    if(array1.join() === array2.join()){
        return true;
} else {
    return false;
}
}

