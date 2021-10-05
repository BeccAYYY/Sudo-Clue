function createPuzzleFromSolution(solution, methods, minNumberOfClues) {
    var maxNumberToRemove = 81 - minNumberOfClues;
    var loops = 0;
    var puzzle = solution;
    while (maxNumberToRemove !== 0 && loops < 10) {
        var x = Math.floor(Math.random * 9);
        var y = Math.floor(Math.random * 9);
        puzzle[y][x] = 0;
        if (checkIfSolvable(methods)) {
            loops = 0;
            maxNumberToRemove--;
        } else {
            loops++
            puzzle[y][x] = solution[y][x]
        }
    }

}