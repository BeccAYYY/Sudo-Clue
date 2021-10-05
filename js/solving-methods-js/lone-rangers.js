//Lone Rangers

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
        puzzle[yIndex].forEach((n, xIndex) => {
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
                        change = {
                            "xIndex": xIndex,
                            "yIndex": yIndex,
                            "candidate": candidate
                        };
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
                    var n = puzzle[yIndex][xIndex];
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
                                change = {
                                    "xIndex": xIndex,
                                    "yIndex": yIndex,
                                    "candidate": candidate
                                };
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
        puzzle.forEach((row, yIndex) => {
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
                        change = {
                            "xIndex": xIndex,
                            "yIndex": yIndex,
                            "candidate": candidate
                        };
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