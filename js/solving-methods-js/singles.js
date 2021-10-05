
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
                change = {
                    "xIndex": xIndex,
                    "yIndex": yIndex,
                    "candidate": candidate
                };
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