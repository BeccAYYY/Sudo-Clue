/*
Definitions

Cell: A single cell of the sudoku grid
Solved: A cell that has a number in it that meets the sudoku constraints
Square: A 3x3 area of cells in the sudoku grid
Row: A horizontal line of cells
Column: A vertical line of cells
Group: A 9-cell row, column or square for which constraints apply.
Candidate: A number that can go in an unsolved cell
Coordinates: A pair of two values that give the location of a cell in the sudoku array (0-indexed). Referred to a "x" for horizontal and "y" for vertical.
Constraints: The rules of a Sudoku that require each digit to appear only once in each row, column, and cell.

*/

var sudoku = new Array;
var puzzleCandidates = new Array;
var oneThroughNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
var a = oneThroughNine;
var b = [4, 5, 6, 7, 8, 9]
var c = [1, 2, 3, 7, 8, 9]
var d = [1, 2, 3, 4, 5, 6]
var e = [2, 3, 5, 6, 8, 9]
var f = [1, 3, 4, 6, 7, 9]
var g = [1, 2, 4, 5, 7, 8]

    puzzleCandidates = [
        [0, 0, 0, b, b, b, b, b, b],
        [0, 0, 0, c, c, c, c, c, c],
        [0, 0, 0, d, d, d, d, d, d],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a],
        [e, f, g, a, a, a, a, a, a]
    ]
}
reset();


//This function returns an array of three numbers that will be either the x or y coordinates in the same 3x3 square as the x or y coordinate given for either a row or column.
function getSquare(x) {
    if (x <= 2) {
    return [0, 1, 2]
} else if (x <= 5) {
    return [3, 4, 5]
} else {
    return [6, 7, 8]
}};


//Takes coordinates of a cell and returns an array of the candidates for each item in the row that is not solved and is not the cell for which coordinates were given.
function getExclusiveRowCandidates(x, y) {
    var rowCandidates = [];
    puzzleCandidates[y].forEach((array, xIndex) => {
        if (xIndex !== x) {
        if (array !== 0) {
            rowCandidates.push(puzzleCandidates[y][xIndex]);
        }
    }
    })
    return rowCandidates;
}


//Takes coordinates of a cell and returns an array of the candidates for each item in the column that is not solved and is not the cell for which coordinates were given.
function getExclusiveColumnCandidates(x, y) {
    var columnCandidates = [];
    puzzleCandidates.forEach((row, yIndex) => {
        if (yIndex !== y) {
        if (row[x] !== 0) {
            columnCandidates.push(puzzleCandidates[yIndex][x]);
        }
    }
    })
    return columnCandidates;
}


//Takes coordinates of a cell and returns an array of the candidates for each item in the 3x3 square that is not solved and is not the cell for which coordinates were given.
function getExclusiveSquareCandidates(x, y) {
    var squareCandidates = [];
    var squareX = getSquare(x);
    var squareY = getSquare(y);
    squareY.forEach(yIndex => {
        squareX.forEach(xIndex => {
            if (yIndex !== y || xIndex !== x) {
                if (puzzleCandidates[yIndex][xIndex] !== 0) {
                    squareCandidates.push(puzzleCandidates[yIndex][xIndex])
                }
        }
        })
    })
    return squareCandidates;
}


//Counts the number of times a single candidate appears in an array of candidates.
function countCandidateOccurences(n, array) {
    var count = 0;
    array.forEach(candidateSet => {
        if (candidateSet.indexOf(n) !== -1) {
            count++
        }
    })
    return count;
}


//Takes coordinates, gets the solved value for those coordinates and removes it from the candidates list for the column, row and square that the solved cell is is.
function changeCandidatesGridAfterFill(x, y, n) {
    puzzleCandidates[y][x] = 0;
    var squareY = getSquare(y);
    var squareX = getSquare(x);
    puzzleCandidates.forEach((row, yIndex) => {
        if (squareY.includes(yIndex)) {
            if (yIndex === y) {
                row.forEach((cellCandidates, xIndex) => {
                    if (Array.isArray(cellCandidates) && xIndex !== x && cellCandidates.includes(n)) {
                        puzzleCandidates[y][xIndex] = cellCandidates.filter(candidate => candidate !== n);
                    }
                })
            } else {
                squareX.forEach(xIndex => {
                    if (Array.isArray(row[xIndex]) && row[xIndex].includes(n)) {
                        row[xIndex] = row[xIndex].filter(candidate => candidate !== n)
                    }
                })
            }
        } else {
            if (Array.isArray(row[x]) && row[x].includes(n)) {
                row[x] = row[x].filter(candidate => candidate !== n)
            }
        }
    })
}


//Fills a cell and updates the candidate grid
function fillCell(x, y, n) {
    sudoku[y][x] = n;
    changeCandidatesGridAfterFill(x, y, n);
}


//Loops through the candidates grid. If a candidate array with only one option is found, the loop breaks and an array with the x coordinate, y coordinate and the candidate is returned. If the entire grid is looped through and nothing is found, it returns false.
function findSingleCandidateCell() {
    var change = false;
    yIndex = 0;
    while (!change && yIndex < 9) {
        xIndex = 0;
        while (!change && xIndex < 9) {
            var candidates = puzzleCandidates[yIndex][xIndex];
            if (candidates !== 0 && candidates.length === 1) {
                    var candidate = candidates[0]
                    change = {"xIndex": xIndex, "yIndex": yIndex, "candidate": candidate};
                }
            xIndex++;
        }
    yIndex++;
    }
    return change
}

//Runs findSingleCandidateCell function, then fills the cell it found and starts the loops again if it is succesful, or ends the loop and returns the number of cell changed if it is unsuccessful. 
function fillSingleCandidateCells() {
    var cellsFilled = 0;
    do {
        var change = findSingleCandidateCell();
            if (change) {
                fillCell(change["xIndex"], change["yIndex"], change["candidate"])
                cellsFilled++
            }
    } while (change);
    return cellsFilled;
}




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


/*

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
                        candidates = getAdvancedCellCandidates(x, y);
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

function countSuccess(n) {
    var successes = 0;
    var failures = 0;
    for (let i = 0; i < n; i++) {
        console.log(i);
        if (fillGrid()) {
            successes++;
        } else {
            failures++;
        }
        reset();
    }
    console.log("Successful Sudoku created " + successes + " times, and unsuccessful " + failures + " times. (" + successes/n * 100 + "%)");
}

//countSuccess(1000);




function getAdvancedCellCandidates(x, y) {
    var basicCandidates= getBasicCellCandidates(x, y);
    var columnNakedSubsets = findNakedSubsets(getExclusiveColumnCandidates(x, y));
    var rowNakedSubsets = findNakedSubsets(getExclusiveRowCandidates(x, y));
    var squareNakedSubsets = findNakedSubsets(getExclusiveSquareCandidates(x, y))
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



function checkIfArraysMatch(array1, array2) {
    if(array1.join() === array2.join()){
        return true;
} else {
    return false;
}
}

var test = [[1,2,3], [1,2,3,4], [1,2,4], [4,5,6,7,8,9], [5,6,7,8], [4, 5, 6, 9], [4, 5, 6, 9]]

function findHiddenSubsets(candidatesArray) {
    var candidatesCount = [0,0,0,0,0,0,0,0,0];
    oneThroughNine.forEach((n, i) => {
        candidatesCount[i] = countCandidateOccurences(n, candidatesArray);
    })
    return candidatesCount;
}

console.log(findHiddenSubsets(test));
*/