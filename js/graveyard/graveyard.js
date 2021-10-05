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

//Code for calculating candidates before candidates array was introduced

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



//code for checking subsets with 4, 5 and 6 items (not effective) 
function bigSubsets() {
    if (candidatesArrays[i].length == 4) {
    var externalCandidates = false;
    if (checkIfArraysMatch(candidatesArrays[i], candidatesArrays[n])) {
        matches++
    } else {
        var candidateIndex = 0;
            while (!externalCandidates && candidateIndex < candidatesArrays[i].length) {
                if (candidatesArrays[n].includes(candidatesArrays[i][candidateIndex])) {
                    externalCandidates = true;
                }
                candidateIndex++;
            }
        }
    if (matches == 3 && externalCandidates) {
        subset = candidatesArrays[i];
    }
} else if (candidatesArrays[i].length == 5) {
    var externalCandidates = false;
    if (checkIfArraysMatch(candidatesArrays[i], candidatesArrays[n])) {
        matches++
    } else {
        var candidateIndex = 0;
            while (!externalCandidates && candidateIndex < candidatesArrays[i].length) {
                if (candidatesArrays[n].includes(candidatesArrays[i][candidateIndex])) {
                    externalCandidates = true;
                }
                candidateIndex++;
            }
        }
    if (matches == 4 && externalCandidates) {
        subset = candidatesArrays[i];
    }
} else if (candidatesArrays[i].length == 6) {
    var externalCandidates = false;
    if (checkIfArraysMatch(candidatesArrays[i], candidatesArrays[n])) {
        matches++
    } else {
    var candidateIndex = 0;
        while (!externalCandidates && candidateIndex < candidatesArrays[i].length) {
            if (candidatesArrays[n].includes(candidatesArrays[i][candidateIndex])) {
                externalCandidates = true;
            }
            candidateIndex++;
        }
    }
    if (matches == 5 && externalCandidates) {
        subset = candidatesArrays[i];
    }
}
}

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

//Before introduction "groups" array
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


//Fill grid function will console log of referrers before change
function fillGrid() {
    var change = false;
    var success = true;
    var filledSquares = 9;
    var lastChange;
    var randomToFill = 0;
    var fillToFill = 0;
    var nakedToFill = 0;
    var hiddenToFill = 0;
    var randomToNaked = 0;
    var fillToNaked = 0;
    var nakedToNaked = 0;
    var hiddenToNaked = 0;
    var randomToHidden = 0;
    var fillToHidden = 0;
    var nakedToHidden = 0;
    var hiddenToHidden = 0;
    var randomToRandom = 0;
    var fillToRandom = 0;
    var nakedToRandom = 0;
    var hiddenToRandom = 0;
    while (filledSquares < 81 && success) {
        if (change) {
            var start = filledSquares;
            filledSquares = filledSquares + fillSingleCandidateCells();
            filledSquares = filledSquares + fillSingleOptionRequirements();
            var difference = filledSquares - start;
            if (difference) {
                change = true;
                if (lastChange == "Random") {
                    randomToFill++;
                } else if (lastChange == "Fill") {
                    fillToFill++;
                } else if (lastChange == "Naked") {
                    nakedToFill++;
                } else if (lastChange == "Hidden") {
                    hiddenToFill++;
                }
                lastChange = "Fill"
            } else {
                change = false;
            }
            if (!change) {
                var subset = findNakedSubset();
                if (subset) {
                    removeCandidatesOfNakedSubset(subset);
                    change = true;
                    if (lastChange == "Random") {
                        randomToNaked++;
                    } else if (lastChange == "Fill") {
                        fillToNaked++;
                    } else if (lastChange == "Naked") {
                        nakedToNaked++;
                    } else if (lastChange == "Hidden") {
                        hiddenToNaked++;
                    }
                    lastChange = "Naked"

                } 
            }
            if (!change) {
                var subset = findHiddenSubset();
                if (subset) {
                    removeCandidatesOfHiddenSubset(subset);
                    change = true;
                    if (lastChange == "Random") {
                        randomToHidden++;
                    } else if (lastChange == "Fill") {
                        fillToHidden++;
                    } else if (lastChange == "Naked") {
                        nakedToHidden++;
                    } else if (lastChange == "Hidden") {
                        hiddenToHidden++;
                    }
                    lastChange = "Hidden"
                } 
            }
        } else {
            var y = 0;
            while (!change && y < 9) {
                var x = 0;
                while (!change && x < 9) {
                    if (sudoku[y][x] == 0) {
                        candidates = puzzleCandidates[y][x];
                        var n = candidates[Math.floor(Math.random()*candidates.length)];
                        fillCell(x, y, n);
                        if (sudoku[y][x] == undefined) {
                            success = false;
                        }
                        change = true;
                        if (lastChange == "Random") {
                            randomToRandom++;
                        } else if (lastChange == "Fill") {
                            fillToRandom++;
                        } else if (lastChange == "Naked") {
                            nakedToRandom++;
                        } else if (lastChange == "Hidden") {
                            hiddenToRandom++;
                        }
                        filledSquares++;
                        lastChange = "Random"
                    }
                    x++;
                }
                y++;
            }
        }
    }
    //console.log(sudoku);
    console.log("Random to Fill = " + randomToFill)
    console.log("Fill to Fill = " + fillToFill)
    console.log("Naked to Fill = " + nakedToFill)
    console.log("Hidden to Fill = " + hiddenToFill)
    console.log("Random to Naked = " + randomToNaked)
    console.log("Fill to Naked = " + fillToNaked)
    console.log("Naked to Naked = " + nakedToNaked)
    console.log("Hidden to Naked = " + hiddenToNaked)
    console.log("Random to Hidden = " + randomToHidden)
    console.log("Fill to Hidden = " + fillToHidden)
    console.log("Naked to Hidden = " + nakedToHidden)
    console.log("Hidden to Hidden = " + hiddenToHidden)
    console.log("Random to Random = " + randomToRandom)
    console.log("Fill to Random = " + fillToRandom)
    console.log("Naked to Random = " + nakedToRandom)
    console.log("Hidden to Random = " + hiddenToRandom)
    return success;
}

//Fill grid function that counts the times each section is being hit
function fillGrid() {
    var change = false;
    var success = true;
    var filledSquares = 9;
    var fillCount = 0;
    var fillSuccess = 0;
    var hiddenCount = 0;
    var hiddenSuccess = 0;
    var nakedCount = 0;
    var nakedSuccess = 0;
    var randomCount = 0;
    while (filledSquares < 81 && success) {
        if (change) {
            fillCount++;
            var start = filledSquares;
            filledSquares = filledSquares + fillSingleCandidateCells();
            filledSquares = filledSquares + fillSingleOptionRequirements();
            var difference = filledSquares - start;
            if (difference) {
                change = true;
                fillSuccess++;
            } else {
                change = false;
            }
            if (!change) {
                nakedCount++;
                var subset = findNakedSubset();
                if (subset) {
                    nakedSuccess++;
                    removeCandidatesOfNakedSubset(subset);
                    change = true;
                } 
            }
            if (!change) {
                hiddenCount++;
                var subset = findHiddenSubset();
                if (subset) {
                    hiddenSuccess++
                    removeCandidatesOfHiddenSubset(subset);
                    change = true;
                } 
            }
        } else {
            randomCount++;
            var y = 0;
            while (!change && y < 9) {
                var x = 0;
                while (!change && x < 9) {
                    if (sudoku[y][x] == 0) {
                        candidates = puzzleCandidates[y][x];
                        var n = candidates[Math.floor(Math.random()*candidates.length)];
                        fillCell(x, y, n);
                        if (sudoku[y][x] == undefined) {
                            success = false;
                        }
                        change = true;
                        filledSquares++;
                    }
                    x++;
                }
                y++;
            }
        }
    }
    console.log("Fill Count = " + fillCount)
    console.log("Fill Success = " + fillSuccess)
    console.log("Naked Count = " + nakedCount)
    console.log("Naked Success = " + nakedSuccess)
    console.log("Hidden Count = " + hiddenCount)
    console.log("Hidden Success = " + hiddenSuccess)
    console.log("Random Count = " + randomCount)
    //console.log(sudoku);
    return success;
}