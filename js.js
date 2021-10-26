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


/*
var sudoku = [
    [8, 0, 0, 4, 0, 6, 0, 0, 7],
    [0, 0, 0, 0, 0, 0, 4, 0, 0],
    [0, 1, 0, 0, 0, 0, 6, 5, 0],
    [5, 0, 9, 0, 3, 0, 7, 8, 0],
    [0, 0, 0, 0, 7, 0, 0, 0, 0],
    [0, 4, 8, 0, 2, 0, 1, 0, 3],
    [0, 5, 2, 0, 0, 0, 0, 9, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 9, 0, 2, 0, 0, 5]
];
*/


function turnPuzzleToLetters() {
    puzzle.forEach((row, y) => {
        row.forEach((cell, x) => {
            puzzle[y][x] = String.fromCharCode(cell + 96)
        })
    })
}


function turnPuzzleToNumbers(numbers) {
    if (!numbers) {
        numbers = new Array;
        orderedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        while (orderedNumbers.length) {
            numbers.push(orderedNumbers.splice(Math.floor(Math.random() * orderedNumbers.length), 1)[0]);
        }
    } else {
        var numString = numbers.toString();
        numbers = new Array;
        for (let i = 0; i < 9; i++) {
            numbers.push(parseInt(numString[i]))
        }
    }
    puzzle.forEach((row, y) => {
        row.forEach((cell, x) => {
            puzzle[y][x] = numbers[cell.charCodeAt(0) - 97];
        })
    })
}


/*
var newPuzzle = createCopyOfMultidimensionalArray(puzzle);

createPuzzleFromSolution(20);

displayNewPuzzle()

[4, 6, 9, 1, 3, 5, 8, 2, 7];
[9, 2, 5, 7, 6, 3, 1, 8, 4];
*/





