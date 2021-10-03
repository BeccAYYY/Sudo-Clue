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
var groups = new Array;
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

function createGroupsArray() {
    var groupIndex = 0;
    for (y = 0; y < 9; y++) {
        groups.push([])
        for (x = 0; x < 9; x++) {
            groups[groupIndex].push({"x": x, "y": y})
        }
        groupIndex++;
    }
    for (x = 0; x < 9; x++) {
        groups.push([])
        for (y = 0; y < 9; y++) {
            groups[groupIndex].push({"x": x, "y": y})
        }
        groupIndex++;
    }

    var a = getSquare(0);
    var b = getSquare(3);
    var c = getSquare(6);
    var squareCoords = [a, b, c];

    for (squareYIndex = 0; squareYIndex < 3; squareYIndex++) {
        for (squareXIndex = 0; squareXIndex < 3; squareXIndex++) {
            groups.push([]);
            var yIndexes = squareCoords[squareYIndex]
            var xIndexes = squareCoords[squareXIndex]
            yIndexes.forEach(y => {
                xIndexes.forEach(x => {
                    groups[groupIndex].push({"x": x, "y": y})
                })
            })
            groupIndex++;
        }
    }

}
createGroupsArray();


//This function returns an array of three numbers that will be either the x or y coordinates in the same 3x3 square as the x or y coordinate given for either a row or column.
function getSquare(x) {
    if (x <= 2) {
    return [0, 1, 2]
} else if (x <= 5) {
    return [3, 4, 5]
} else {
    return [6, 7, 8]
}};

function getCellsGroupIndexes(x, y) {
    var groupIndexes = [];
    var rowIndex = y;
    groupIndexes.push(rowIndex);
    var columnIndex = x + 9;
    groupIndexes.push(columnIndex);
    var a = Math.ceil((x+1)/3);
    var b = Math.ceil((y+1)/3);
    var c = a*b;
    var squareIndex = c + 17;
    groupIndexes.push(squareIndex);
    return groupIndexes;
}

//Counts the number of times a single candidate appears in an array of candidates.
function countCandidateOccurences(n, array) {
    var count = 0;
    array.forEach(candidateSet => {
        if (candidateSet.includes(n)) {
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

/*
//Fills a cell and updates the candidate grid
function fillCell(x, y, n) {
    sudoku[y][x] = n;
    changeCandidatesGridAfterFill(x, y, n);
}


//Loops through the candidates grid. If a candidate array with only one option is found, the loop breaks and an array with the x coordinate, y coordinate and the candidate is returned. If the entire grid is looped through and nothing is found, it returns false.
function findSingleCandidateCell() {
    var change = false;
    var yIndex = 0;
    while (!change && yIndex < 9) {
        var xIndex = 0;
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
    var change = false;
    do {
        change = findSingleCandidateCell();
            if (change) {
                fillCell(change["xIndex"], change["yIndex"], change["candidate"])
                cellsFilled++
            }
    } while (change);
    return cellsFilled;
}



//Each group in sudoku required one of each number (1-9) to be present once. 
//If a number is not yet used in a group, I have called it a group requirement (the group still needs to have it).
//This function loops through each group (row, square and column).
//Within each group it find which numbers are still required, then gets the candidates (array) for every cell in the group that is not filled from the puzzleCandidates array and puts those candidates arrays and puts them into a new array (candidatesArrays)
//For each group requirement, the function checks how many times the required number appears as a candidate in the candidatesArrays using the countCandidateOccurences() function.
//If a required number has only one unsolved cell for which it is a candidate, it must go in that cell.
//The first time a requirement with only a single occurence is found, the function ends and returns the xIndex and yIndex of the and the number of the requirement/candidate the must be used to fill said cell.
//If no instance of this is found, the function will loop through all 27 groups (9 rows, 9 squares, 9 columns) and return false.
function findSingleOptionRequirement() {
    var change = false;
    
    //Rows
    var yIndex = 0;
    while (!change && yIndex < 9) {
        var groupRequirements = oneThroughNine;
        var candidatesArrays = new Array;
        sudoku[yIndex].forEach((n, xIndex) => {
            if (n !== 0) {
                groupRequirements = groupRequirements.filter(requirement => requirement !== n);
            } else {
                candidatesArrays.push(puzzleCandidates[yIndex][xIndex])
            }
        })
        var i = 0;
        while (!change && i < groupRequirements.length) {
        var candidate = groupRequirements[i];
            var count = countCandidateOccurences(candidate, candidatesArrays);
            if (count == 1) {
                var xIndex = 0;
                while (!change) {
                    if (puzzleCandidates[yIndex][xIndex] !== 0 && puzzleCandidates[yIndex][xIndex].includes(candidate)) {
                        change = {"xIndex": xIndex, "yIndex": yIndex, "candidate": candidate};
                    } else {
                        xIndex++;
                    }
                }
            }
            i++;
        }
        yIndex++;
    }

    //Squares

    //Each of these makes an array of three coords within a square: [0,1,2], [3,4,5], [6,7,8]. 
    //There are nine squares in the grid, and nine cells within each 3x3 square.
    //One square is a set of three x coordinates, multiplied by a set of three y coordinates.
    //i.e. if x is [0,1,2] and y is [3,4,5], the coords of the nine squares will be (0,3)(0,4)(0,5)(1,3)(1,4)(1,5)(2,3)(2,4)(2,5), which will be inverted when used as keys (since y is the row, and x is the column)
    //i.e. For x = 0 and y = 3, finding that cell in the sudoku grid would be sudoku[3][0] (y first, then x)

    var a = getSquare(0);
    var b = getSquare(3);
    var c = getSquare(6);

    //The following array is a set of all the possible coordinate sets. Using it in a nested loop allows for all nine 3x3 squares to be checked.
    //i.e. a by a is x = [0,1,2] and y = [0,1,2], a by b is  x = [0,1,2] and y = [3,4,5] (although this will be reversed since y is used first in the code.) 
    //This means every combination checks the nine cells of a square, and there are nine combinations (aa, ab, ac, ba, bb, bc, ca, cb, cc)
    var squareCoords = [a, b, c];

    //This is the index for the array above. It will be used to access either a, b or c from the above array in the OUTER loop (y-coords.)
    var squareYIndex = 0;

    //One loop of the following while loops through three square groups
    //i.e it will do the y-coords of [0,1,2] for the x-coords of [0,1,2], [3,4,5] and [6,7,8] (three squares of nine cells)
    //At the bottom, squareYIndex is added to, which will then make the y-coords [3,4,5] and will test all three x-coord arrays again.
    while (!change && squareYIndex < 3) {

        //This is the index for the squareCoords array above. It will be used to access either a, b or c from the squareCoords array in the INNER loop (x-coords.)
        var squareXIndex = 0;

        //One loop of the following while is one loop of a square group
        //i.e. it will test one set off x-coords, such as [0,1,2] against whatever the current y-coords are for the outer loops.
        //It will then either find an instance of a required candidate only appearing once, and break the loop, or add one to squareXIndex and go again for the next square [3,4,5]
        while (!change && squareXIndex < 3) {
            var groupRequirements = oneThroughNine;
            var candidatesArrays = new Array;
            var yIndexes = squareCoords[squareYIndex]
            var xIndexes = squareCoords[squareXIndex]
            yIndexes.forEach(yIndex => {
                xIndexes.forEach(xIndex => {
                    var n = sudoku[yIndex][xIndex];
                    if (n !== 0) {
                        groupRequirements = groupRequirements.filter(requirement => requirement !== n);
                    } else {
                        candidatesArrays.push(puzzleCandidates[yIndex][xIndex])
                    }
                })
            })
            var i = 0;
            while (!change && i < groupRequirements.length) {
                var candidate = groupRequirements[i];
                var count = countCandidateOccurences(candidate, candidatesArrays);
                if (count == 1) {
                    var iY = 0;
                    while (!change && iY < 3) {
                        var iX = 0;
                        while (!change && iX < 3) {
                                var yIndex = yIndexes[iY]
                                var xIndex = xIndexes[iX]
                                if (puzzleCandidates[yIndex][xIndex] != 0 && puzzleCandidates[yIndex][xIndex].includes(candidate)) {
                                    change = {"xIndex": xIndex, "yIndex": yIndex, "candidate": candidate};
                                } else {
                                    iX++;
                                }
                            }
                        iY++;
                    }
                }
            i++;
        }
            squareXIndex++;
        }
        squareYIndex++;
    }

//Columns
    var xIndex = 0;
    while (!change && xIndex < 9) {
        var groupRequirements = oneThroughNine;
        var candidatesArrays = new Array;
        var i = 0;
        sudoku.forEach((row, yIndex) => {
            var n = row[xIndex]
            if (n !== 0) {
                groupRequirements = groupRequirements.filter(requirement => requirement !== n);
            } else {
                candidatesArrays.push(puzzleCandidates[yIndex][xIndex])
            }
        })
        while (!change && i < groupRequirements.length) {
            var candidate = groupRequirements[i];
            var count = countCandidateOccurences(candidate, candidatesArrays);
            if (count == 1) {
                var yIndex = 0;
                while (!change) {
                    if (puzzleCandidates[yIndex][xIndex] != 0 && puzzleCandidates[yIndex][xIndex].includes(candidate)) {
                        change = {"xIndex": xIndex, "yIndex": yIndex, "candidate": candidate};
                    } else {
                        yIndex++;
                    }
                }
            }
            i++;
        }
        xIndex++;
    }
    return change;
}


function fillSingleOptionRequirements() {
    var cellsFilled = 0;
    var change = false;
    do {
        change = findSingleOptionRequirement();
            if (change) {
                fillCell(change["xIndex"], change["yIndex"], change["candidate"])
                cellsFilled++
            }
    } while (change);
    return cellsFilled;
}


function fillGrid() {
    var change = false;
    var success = true;
    var filledSquares = 9;
    var loops = 0;
    while (filledSquares < 81 && success) {
        if (change) {
            var start = filledSquares;
            filledSquares = filledSquares + fillSingleCandidateCells();
            filledSquares = filledSquares + fillSingleOptionRequirements();
            var difference = filledSquares - start;
            if (difference) {
                change = true;
            } else {
                change = false;
            }
            if (!change) {
                var subset = findNakedSubset();
                if (subset) {
                    removeCandidatesOfNakedSubset(subset);
                    change = true;
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
                        filledSquares++;
                    }
                    x++;
                }
                y++;
            }
        }
    }
    //console.log(sudoku);
    return success;
}



function countSuccess(n) {
    var startTime = new Date();
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
    console.log("Successful Sudoku created " + successes + " times, and unsuccessful " + failures + " times. (" + (successes * 100)/n + "%)");
    var endTime = new Date();
    console.log((endTime - startTime)/1000 + " seconds.")
}

//countSuccess(100000)

function findNakedSubset() {
        var subset = false;
        
        //Rows
        var yIndex = 0;
        while (!subset && yIndex < 9) {
            var candidatesArrays = new Array;
            var subsetCandidates = false;
            puzzleCandidates[yIndex].forEach((candidates) => {
                if (candidates !== 0) {
                    candidatesArrays.push(candidates)
                }
            })
            if (candidatesArrays.length > 2) {
                subsetCandidates = checkGroupForNakedSubset(candidatesArrays);
            }
            if (subsetCandidates) {
                subset = {"candidates": subsetCandidates, "subsetCoords": [], "nonSubsetCoords": []}
                puzzleCandidates[yIndex].forEach((candidates, xIndex) => {
                    if (candidates !== 0 && checkIfArraysMatch(subsetCandidates, candidates)) {
                        subset["subsetCoords"].push({"xIndex": xIndex, "yIndex": yIndex})
                    } else {
                        subset["nonSubsetCoords"].push({"xIndex": xIndex, "yIndex": yIndex})
                    }
                })
            }
            yIndex++;
        }

        //Squares
    
        var a = getSquare(0);
        var b = getSquare(3);
        var c = getSquare(6);
        var squareCoords = [a, b, c];
        var squareYIndex = 0;
        while (!subset && squareYIndex < 3) {
            var squareXIndex = 0;
            while (!subset && squareXIndex < 3) {
                var yIndexes = squareCoords[squareYIndex]
                var xIndexes = squareCoords[squareXIndex]
                var candidatesArrays = new Array;
                var subsetCandidates = false;
                yIndexes.forEach(yIndex => {
                    xIndexes.forEach(xIndex => {
                        var candidates = puzzleCandidates[yIndex][xIndex]
                        if (candidates !== 0) {
                            candidatesArrays.push(candidates)
                        }
                    })
                })
                if (candidatesArrays.length > 2) {
                    subsetCandidates = checkGroupForNakedSubset(candidatesArrays);
                }
                if (subsetCandidates) {
                    subset = {"candidates": subsetCandidates, "subsetCoords": [], "nonSubsetCoords": []}
                    yIndexes.forEach(yIndex => {
                        xIndexes.forEach(xIndex => {
                                var candidates = puzzleCandidates[yIndex][xIndex];
                                if (candidates !== 0 && checkIfArraysMatch(subsetCandidates, candidates)) {
                                    subset["subsetCoords"].push({"xIndex": xIndex, "yIndex": yIndex})
                                } else {
                                    subset["nonSubsetCoords"].push({"xIndex": xIndex, "yIndex": yIndex})
                                }
                        })
                    })
                }
                squareXIndex++;
            }
            squareYIndex++;
        }
    
    //Columns
        var xIndex = 0;
        while (!subset && xIndex < 9) {
            var candidatesArrays = new Array;
            var subsetCandidates = false;
            puzzleCandidates.forEach((row) => {
                candidates = row[xIndex]
                if (candidates !== 0) {
                    candidatesArrays.push(candidates)
                }
            })
            if (candidatesArrays.length > 2) {
                subsetCandidates = checkGroupForNakedSubset(candidatesArrays);
            }
            if (subsetCandidates) {
                subset = {"candidates": subsetCandidates, "subsetCoords": [], "nonSubsetCoords": []}
                puzzleCandidates.forEach((row, yIndex) => {
                    var candidates = row[xIndex];
                    if (candidates !== 0 && checkIfArraysMatch(subsetCandidates, candidates)) {
                        subset["subsetCoords"].push({"xIndex": xIndex, "yIndex": yIndex})
                    } else {
                        subset["nonSubsetCoords"].push({"xIndex": xIndex, "yIndex": yIndex})
                    }

                })
                    
                
            }
            xIndex++;
        }
    return subset;
}

function checkGroupForNakedSubset(candidatesArrays) {
    var i = 0;
    subset = false;
    while (!subset && i < candidatesArrays.length) {
        var matches = 0;
        var n = 0;
        while (!subset && n < candidatesArrays.length) {
            if (n !== i && candidatesArrays[i].length < candidatesArrays.length && candidatesArrays[i].length >= candidatesArrays[n].length) {
                if (candidatesArrays[i].length == 2) {
                    var externalCandidates = false;
                    if (checkIfArraysMatch(candidatesArrays[i], candidatesArrays[n])) {
                        matches ++;
                    } else {
                        var candidateIndex = 0;
                        while (!externalCandidates && candidateIndex < candidatesArrays[i].length) {
                            if (candidatesArrays[n].includes(candidatesArrays[i][candidateIndex])) {
                                externalCandidates = true;
                            }
                            candidateIndex++;
                        }
                    }
                    if (matches == 1 && externalCandidates) {
                        subset = candidatesArrays[i];
                    }

                } else if (candidatesArrays[i].length == 3) {
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
                    if (matches == 2 && externalCandidates) {
                        subset = candidatesArrays[i];
                    }
                } 
            }
            n++;
        }
        i++;
    }
    return subset;
}

function removeCandidatesOfNakedSubset(subset) {
    subset["nonSubsetCoords"].forEach(coordinate => {
        var xIndex = coordinate["xIndex"];
        var yIndex = coordinate["yIndex"];
        var candidates = subset["candidates"]
        if (puzzleCandidates[yIndex][xIndex] !== 0) {
            puzzleCandidates[yIndex][xIndex] = puzzleCandidates[yIndex][xIndex].filter(candidate => !candidates.includes(candidate))
        }
    })
}

function checkIfArraysMatch(array1, array2) {
    if (array2.length < array1.length) {
        var matches = 0;
        var match;
        array1.forEach(candidate => {
            if (array2.includes(candidate)) {
                matches++;
            }
            if (matches == array2.length) {
                match = true;
            } else {
                match = false;
            }
        })
        return match;
    } else if (array1.join() === array2.join()){
        return true;
    } else {
        return false;
    }
}

function findHiddenSubset() {
    var subset = false;

    //Rows
    var yIndex = 0;
    while (!subset && yIndex < 9) {
        var groupRequirements = oneThroughNine;
        sudoku[yIndex].forEach(n => {
            if (n !== 0) {
                groupRequirements = groupRequirements.filter(requirement => requirement !== n);
            }
        })
        yIndex++;
    }
}
*/
