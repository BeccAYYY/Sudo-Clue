
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
    console.log("Successful Sudoku created " + successes + " times, and unsuccessful " + failures + " times. (" + (successes * 100) / n + "%)");
    var endTime = new Date();
    console.log((endTime - startTime) / 1000 + " seconds.")
}