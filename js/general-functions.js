//General Use


//This function returns an array of three numbers that will be either the x or y coordinates in the same 3x3 square as the x or y coordinate given for either a row or column.
function getSquare(x) {
    if (x <= 2) {
        return [0, 1, 2]
    } else if (x <= 5) {
        return [3, 4, 5]
    } else {
        return [6, 7, 8]
    }
};

function getCellsGroupIndexes(x, y) {
    var groupIndexes = [];
    var rowIndex = y;
    groupIndexes.push(rowIndex);
    var columnIndex = x + 9;
    groupIndexes.push(columnIndex);
    var a = Math.floor(y / 3) * 3;
    var b = Math.floor(x / 3);
    var c = a + b;
    var squareIndex = c + 18;
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



//Fills a cell and updates the candidate grid
function fillCell(x, y, n) {
    sudoku[y][x] = n;
    changeCandidatesGridAfterFill(x, y, n);
}

//Takes coordinates, gets the solved value for those coordinates and removes it from the candidates list for the column, row and square that the solved cell is is.
function changeCandidatesGridAfterFill(x, y, n) {
    puzzleCandidates[y][x] = 0;
    var groupIndexes = getCellsGroupIndexes(x, y);
    groupIndexes.forEach(groupIndex => {
        groups[groupIndex].forEach(cell => {
            var candidates = puzzleCandidates[cell["y"]][cell["x"]];
            if (candidates !== 0 && candidates.includes(n)) {
                puzzleCandidates[cell["y"]][cell["x"]] = candidates.filter(candidate => candidate !== n)
            }
        })
    })
}

function createGroupsArray() {
    var groupIndex = 0;
    for (y = 0; y < 9; y++) {
        groups.push([])
        for (x = 0; x < 9; x++) {
            groups[groupIndex].push({
                "x": x,
                "y": y
            })
        }
        groupIndex++;
    }
    for (x = 0; x < 9; x++) {
        groups.push([])
        for (y = 0; y < 9; y++) {
            groups[groupIndex].push({
                "x": x,
                "y": y
            })
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
                    groups[groupIndex].push({
                        "x": x,
                        "y": y
                    })
                })
            })
            groupIndex++;
        }
    }

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
    } else if (array1.join() === array2.join()) {
        return true;
    } else {
        return false;
    }
}



function checkIfMultidimensionalArraysMatch(array1, array2) {
    if (array2.length < array1.length) {
        var matches = 0;
        var match;
        array2.forEach(candidate2 => {
            array1.forEach(candidate1 => {
                if (candidate1.join() === candidate2.join()) {
                    matches++;
                }
            })
            if (matches == array2.length) {
                match = true;
            } else {
                match = false;
            }
        })
    } else if (array1.join() === array2.join()) {
        return true;
    } else {
        return false;
    }
    return match;
}

function checkIfMultidimensionalArrayContainsArray(mdArray, array) {
    var match = false;
    var i = 0;
    while (!match && i < mdArray.length) {
        if (mdArray[i].join() === array.join()) {
            match = true;
        }
        i++;
    }
    return match;
}

function getGroupRequirements(group) {
    var groupRequirements = oneThroughNine;
    group.forEach(cell => {
        var x = cell["x"];
        var y = cell["y"];
        var n = sudoku[y][x];
        if (n !== 0) {
            groupRequirements = groupRequirements.filter(requirement => requirement !== n);
        }
    })
    return groupRequirements
}