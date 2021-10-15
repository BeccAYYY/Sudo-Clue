var puzzle = new Array;
var puzzleCandidates = new Array;
var groups = new Array;
var oneThroughNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var methods = {
    "Lone Rangers": true, 
    "Locked Candidates": true, 
    "Naked Subsets": true, 
    "Hidden Subsets": true
};
var settings = {
    "candidates": true,
    "automaticCorrection": true,
    "minimumClues": 20
}

var timerValue = 0;
var pause = true;
var currentPuzzle = getCurrentPuzzle()
var inProgressGame = false;
if (currentPuzzle) {
    continueButton.classList.remove("d-none")
}

createGroupsArray();