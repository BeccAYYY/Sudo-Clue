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

getSuccessfulSolution();
var newPuzzle = createCopyOfMultidimensionalArray(puzzle);

createPuzzleFromSolution(0);

console.log(newPuzzle)
console.log(puzzleCandidates)


