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

//getSuccessfulSolution();
console.log(puzzle)

function turnPuzzleToLetters() {
    puzzle.forEach((row, y) => {
        row.forEach((cell, x) => {
            puzzle[y][x] = String.fromCharCode(cell + 96)
        })
    })
}

puzzle = [
    ['a', 'b', 'c', 'd', 'i', 'f', 'e', 'g', 'h'],
    ['d', 'e', 'f', 'a', 'g', 'h', 'c', 'b', 'i'],
    ['g', 'h', 'i', 'b', 'e', 'c', 'a', 'f', 'd'],
    ['h', 'g', 'a', 'i', 'c', 'd', 'f', 'e', 'b'],
    ['f', 'i', 'd', 'e', 'b', 'a', 'g', 'h', 'c'],
    ['b', 'c', 'e', 'f', 'h', 'g', 'i', 'd', 'a'],
    ['c', 'f', 'g', 'h', 'a', 'b', 'd', 'i', 'e'],
    ['i', 'a', 'b', 'g', 'd', 'e', 'h', 'c', 'f'],
    ['e', 'd', 'h', 'c', 'f', 'i', 'b', 'a', 'g']
]


function turnPuzzleToNumbers() {
    var numbers = [4, 6, 9, 1, 3, 5, 8, 2, 7];
    puzzle.forEach((row, y) => {
        row.forEach((cell, x) => {
            puzzle[y][x] = numbers[cell.charCodeAt(0) - 97];
        })
    })
}

turnPuzzleToNumbers()

console.log(puzzle)


/*
var newPuzzle = createCopyOfMultidimensionalArray(puzzle);

createPuzzleFromSolution(20);

displayNewPuzzle()

[4, 6, 9, 1, 3, 5, 8, 2, 7];
[9, 2, 5, 7, 6, 3, 1, 8, 4];
*/


