var puzzle = new Array;
var puzzleCandidates = new Array;
var groups = new Array;
var oneThroughNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

if (localStorage.getItem("Lone Rangers") == null) {
    localStorage.setItem("Lone Rangers", true);
    localStorage.setItem("Locked Candidates", false);
    localStorage.setItem("Naked Subsets", false);
    localStorage.setItem("Hidden Subsets", false);
}

var methods = {
    "Lone Rangers": JSON.parse(localStorage.getItem("Lone Rangers")), 
    "Locked Candidates": JSON.parse(localStorage.getItem("Locked Candidates")), 
    "Naked Subsets": JSON.parse(localStorage.getItem("Naked Subsets")), 
    "Hidden Subsets": JSON.parse(localStorage.getItem("Hidden Subsets"))
};
var settings = {
    "candidates": true,
    "automaticCorrection": true,
    "minimumClues": getMinimumClues()
}

if (localStorage.getItem("timerValue") == null) {
    localStorage.setItem("timerValue", 0)
}
if (localStorage.getItem("Difficulty") == null) {
    localStorage.setItem("Difficulty", "beginner");
}

var onLoadDifficultyButton = localStorage.getItem("Difficulty") + "DifficultyButton";
document.getElementById(onLoadDifficultyButton).classList.add("selected-button")

var timerValue = localStorage.getItem("timerValue");
var pause = true;
var currentPuzzle = getCurrentPuzzle()
var inProgressGame = false;
if (currentPuzzle) {
    continueButton.classList.remove("d-none")
}


setDifficultySettingInputs()

createGroupsArray();

var candidatesUpdate = false;
var highlightedCell = false;
var userGrid = getUserGrid()
var userCandidatesGrid = getUserCandidatesGrid()