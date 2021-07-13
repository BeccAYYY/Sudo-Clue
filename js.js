var sudoku = [
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

function getSquare(x) {
    if (x <= 3) {
    return [0, 1, 2]
} else if (x <= 6) {
    return [3, 4, 5]
} else {
    return [6, 7, 8]
}};

function getCandidates(x, y) {
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

function checkColumnRequirements(x) {
    var possibleLocations = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var columnCandidates = [];
    sudoku.forEach((row, i) => {
        if (row[x] == 0) {
            var y = i;
            columnCandidates[i] = getCandidates(x, y);
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
            rowCandidates[i] = getCandidates(x, y);
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



console.log(columnLocations);
console.log(rowLocations);




function fillGrid() {
    sudoku.forEach((row, i) => {
        var y = i;
        row.forEach((box, i) => {
            var x = i;
            candidates = getCandidates(x, y);
            sudoku[y][x] = candidates[Math.floor(Math.random()*candidates.length)];
        })
    });
    return sudoku;
}

sudoku = fillGrid();
console.log(sudoku);
