var puzzle = new Array;
var puzzleCandidates = new Array;
var groups = new Array;
var oneThroughNine = [1, 2, 3, 4, 5, 6, 7, 8, 9];

if (localStorage.getItem("Lone Rangers") == null) {
    localStorage.setItem("Lone Rangers", true);
    localStorage.setItem("Locked Candidates", true);
    localStorage.setItem("Naked Subsets", true);
    localStorage.setItem("Hidden Subsets", true);
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

var timerValue = localStorage.getItem("timerValue");
var pause = true;
var currentPuzzle = getCurrentPuzzle()
var inProgressGame = false;
if (currentPuzzle) {
    continueButton.classList.remove("d-none")
}

cluesSettingNumber.innerHTML = settings["minimumClues"]
minimumClues.value = settings["minimumClues"]
loneRangersCheckbox.checked = methods["Lone Rangers"]
lockedCandidatesCheckbox.checked = methods["Locked Candidates"]
nakedSubsetsCheckbox.checked = methods["Naked Subsets"]
hiddenSubsetsCheckbox.checked = methods["Hidden Subsets"]

createGroupsArray();

var candidatesUpdate = false;
var highlightedCell = false;
var userGrid = getUserGrid()
var userCandidatesGrid = getUserCandidatesGrid()