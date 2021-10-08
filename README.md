Sudo-Clue is currently in development.
It is part of my final project for my Diploma of Website Development.

Sudo-Clue is a sudoku app that helps users improve at sudoku by giving smart hints.
Smart hints will direct the user to the next cell they can solve, instead of solving it for them.
If the user still needs help, the next hint will tell them which solving technique they can use, then will fill the cell if they can still not solve it.
The user will be able to customise their puzzle by which solving techniques they want to use, and how many clues they want in the puzzle.

It is a browser-based mobile app consisting of three parts:

    - Client-side front-end:
        This section is the actual game. 

    - Client-side admin panel
        The admin page will be separate to the game itself, and will contain functions to generate sudokus and manage users.

    - Server-side API
        The API that will take requests from the client and access the database.


Technologies:
    - HTML, CSS, JS
    - PHP
    - Bootstrap 5.0.2


Before continuing with this file, it is recommended that you have a basic understanding of the rules of Sudoku.
    The following site provides a good explanation of how the game works:
    https://sudoku.com/how-to-play/sudoku-rules-for-complete-beginners/

    A proper sudoku puzzle should only ever have one possible solution. 
    If there are multiple options for a cell, all but one should lead to a failure before completing the grid.
    The puzzle should be able to be solved entirely with logic, meaning no guessing should be required.

Terms:
    Cell: A single cell of the sudoku grid
    Square: A 3x3 area of cells in the sudoku grid
    Row: A horizontal line of cells
    Column: A vertical line of cells
    Group: A row, column or square
    Solved Cell: A cell that contains a number that is correct for the solution.
    Candidate: A number that can go in an unsolved cell
    Coordinates: A pair of two values that give the location of a cell in the sudoku array (0-indexed). Referred to a "x" for horizontal and "y" for vertical.
    Constraints: The rules of a Sudoku that require each digit to appear only once in each row, column, and cell.




The sudoku array:
    To turn the 9x9 sudoku grid into code, I have used a multi-dimensional array, like this:
    [
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

    Each number in the array corresponds to the cell in the same position on the sudoku grid.
    The horizontal position has been referred to as "x" and the vertical position as "y".
    To stick with mathematic convention, functions take and assign x index first where possible, however, when accessing a value it must be called as arrayName[y][x], and when looping through each value using nested loops, the y loop (rows) will be the outer loop, and the x loop (columns) will be the inner.
    In the sudoku array, a 0 signifies an unsolved cell.

The candidates array: 
    Candidates arrays work exactly like the sudoku array above, except that each value is a further array, or, if a cell in the sudoku is solved, the candidate value for that cell will be 0 instead.

    For example, if the sudoku puzzle looked like this:
    [
        [1, 0, 3, 0, 9, 0, 0, 5, 6],
        [0, 5, 6, 1, 0, 2, 0, 9, 3],
        [0, 0, 9, 5, 6, 3, 0, 4, 1],
        [5, 1, 0, 9, 0, 6, 3, 0, 4],
        [0, 3, 0, 0, 5, 1, 9, 6, 0],
        [9, 6, 7, 0, 3, 0, 5, 1, 0],
        [0, 0, 0, 6, 0, 0, 1, 3, 0],
        [6, 7, 1, 3, 2, 9, 4, 8, 5],
        [3, 0, 0, 8, 1, 0, 6, 0, 0]
    ]

    The corresponsding candidates array would look like this:
    [
        [0, [2, 4, 8], 0, [4, 7], 0, [4, 7, 8], [2, 7, 8], 0, 0],
        [[4, 7, 8], 0, 0, 0, [4, 7, 8], 0, [7, 8], 0, 0],
        [[2, 7, 8], [2, 8], 0, 0, 0, 0, [2, 7, 8], 0, 0],
        [0, 0, [2, 8], 0, [7, 8], 0, 0, [2, 7], 0],
        [[2, 4, 8], 0, [2, 4, 8], [2, 7], 0, 0, 0, 0, [2, 7, 8]],
        [0, 0, 0, [2, 4], 0, [4, 8], 0, 0, [2, 8]],
        [[2, 4, 8], [2, 4, 8, 9], [2, 4, 5, 8], 0, [4, 7], [4, 5, 7], 0, 0, [2, 7, 9]],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, [2, 4, 9], [2, 4, 5], 0, 0, [4, 5, 7], 0, [2, 7], [2, 7, 9]]
    ]

    Notice that each filled cell location corresponds to a 0 in the candidates array.

    The sudoku array and the candidates array are not directly linked, but the x and y coordinates will always be the same for the matching cell value and candidates.
    e.g. sudoku[y][x] will have candidates at candidates[y][x]


The global arrays:
    On startup, the code defines two new Arrays:
        - puzzle: a sudoku array
        - puzzleCandidates: a candidates array
    Most of the functions of this app do not take arrays as parameters, but will instead automatically work on the puzzle and puzzleCandidates arrays.

    This means that most functions can only work on one sudoku/candidates pair at a time, and, if the same functions are to be run on two different sudoku/candidates arrays, the puzzle and puzzleCandidates arrays must be reassigned.
    To reassign the values array without making a referrence to it, there is a function in general-functions.js:
        createCopyOfMultidimensionalArray(array)
    Which takes a sudoku or candidates array and returns a copy of it without altering the original array.
    To assign the puzzle array to a new array would look like:

    puzzle = createCopyOfMultidimensionalArray(newArray)

    Or to assign the current value of puzzle to a different array would be the opposite:

    var newArray = createCopyOfMultidimensionalArray(puzzle);

    After this, you could reassign or run a function on puzzle without affecting "newArray".
    This also works with candidates arrays.


362,880 options:
    This section covers the logic behind converting the top left square group to letters.
    Look at the following two filled sudoku grids:

    Example 1:
    [
        [9, 2, 5, 7, 4, 3, 6, 1, 8],
        [7, 6, 3, 9, 1, 8, 5, 2, 4],
        [1, 8, 4, 2, 6, 5, 9, 3, 7],
        [8, 1, 9, 4, 5, 7, 3, 6, 2],
        [3, 4, 7, 6, 2, 9, 1, 8, 5],
        [2, 5, 6, 3, 8, 1, 4, 7, 9],
        [5, 3, 1, 8, 9, 2, 7, 4, 6],
        [4, 9, 2, 1, 7, 6, 8, 5, 3],
        [6, 7, 8, 5, 3, 4, 2, 9, 1]
    ]
    
    Example 2:
    [
        [4, 6, 9, 1, 7, 5, 3, 8, 2],
        [1, 3, 5, 4, 8, 2, 9, 6, 7],
        [8, 2, 7, 6, 3, 9, 4, 5, 1],
        [2, 8, 4, 7, 9, 1, 5, 3, 6],
        [5, 7, 1, 3, 6, 4, 8, 2, 9],
        [6, 9, 3, 5, 2, 8, 7, 1, 4],
        [9, 5, 8, 2, 4, 6, 1, 7, 3],
        [7, 4, 6, 8, 1, 3, 2, 9, 5],
        [3, 1, 2, 9, 5, 7, 6, 4, 8]
    ]

    At first, they look completely different.
    However, in a way, these are exactly the same completed puzzle.

    To understand this, we need to look at POSITIONS instead of VALUES.

    To see if these sudoku's are the same, we need to replace the value in each POSITION of any group in both sudokus with the same value.

    Let's look at the top left square groups.

        Example 1:
            [9, 2, 5],
            [7, 6, 3],
            [1, 8, 4]

        Example 2:
            [4, 6, 9],
            [1, 3, 5],
            [8, 2, 7]

    If we replace the value top left position with 'a', the top middle with 'b', the top right with 'c', etc. the first group of both examples will look like this:

        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i']

    This means we swapped the values as follows:
        Example 1:
            9 = 'a' 
            2 = 'b' 
            5 = 'c' 
            7 = 'd' 
            6 = 'e' 
            3 = 'f' 
            1 = 'g' 
            8 = 'h' 
            4 = 'i' 

        Example 2:
            4 = 'a' 
            6 = 'b' 
            9 = 'c' 
            1 = 'd' 
            3 = 'e' 
            5 = 'f' 
            8 = 'g' 
            2 = 'h' 
            7 = 'i' 

    Let's the look at the next group (top, middle square):
        
        Example 1:
            [7, 4, 3],
            [9, 1, 8],
            [2, 6, 5]

        Example 2:
            [1, 7, 5],
            [4, 8, 2],
            [6, 3, 9]

    Now let's put in 'a' for both using the values above

        9 = 'a' in example 1:
            [7, 4, 3],
            ['a', 1, 8],
            [2, 6, 5]

        4 = 'a' in Example 2:
            [1, 7, 5],
            ['a', 8, 2],
            [6, 3, 9]

    Then 'b'
        2 = 'b' in example 1:
            [7, 4, 3],
            ['a', 1, 8],
            ['b', 6, 5]

        6 = 'b' in Example 2:
            [1, 7, 5],
            ['a', 8, 2],
            ['b', 3, 9]


    Then, after replacing them all, the second group will look like:

        Example 1:
            ['d', 'i', 'f'],
            ['a', 'g', 'h'],
            ['b', 'e', 'c']

        Example 2:
            ['d', 'i', 'f'],
            ['a', 'g', 'h'],
            ['b', 'e', 'c']

    This means that in both the value from the top left of the first group, is in the middle left of the second group, and so on.

    If we convert the entire grid, both puzzles end up looking like this:

    [
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

    This is the POSITION PATTERN of both grids.

    This shows that if the same group of two sudoku grids is made identical, and they have the same position pattern, they will be identical.

    This is why in the fillGrid() function, which generates complete sudokus, the first group is prefilled with numbers 1 - 9. It means that no grid in the database will have the same position pattern.

    If you were to then convert the letters grid back by picking a random number for each letter there would be 9x8x7x6x5x4x3x2x1 (9!) different ways it could be converted back into a filled grid. Meaning that one record in the database can make 362,880 different puzzles.

    There are 18,383,222,420,692,992 possible position patterns in sudoku for a total of 6,670,903,752,021,072,936,960 filled sudoku grids.
