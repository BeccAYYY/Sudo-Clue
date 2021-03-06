

hamburger.addEventListener("click", openAndCloseHamburger);
newGameButton.addEventListener("click", () => {
    newGame();
    closeHamburgerAndWelcome();
});
clearGameButton.addEventListener("click", () => {
    closeHamburgerAndWelcome()
    clearPuzzle();
    if (highlightedCell) {
        highlightCell(document.getElementById(highlightedCell))
    }
});
difficultyButton.addEventListener("click", () => openMenuPage(difficulty));
difficultyMainButton.addEventListener("click", () => openMenuPage(difficulty));
leaderboardButton.addEventListener("click", () => openMenuPage(leaderboardPage));
accountButton.addEventListener("click", () => openMenuPage(account));
registerButton.addEventListener("click", () => openMenuPage(registerPage));
editUsernameButton.addEventListener("click", () => openMenuPage(editUsernamePage));
editPasswordButton.addEventListener("click", () => openMenuPage(editPasswordPage));
registerLinkText.addEventListener("click", () => openMenuPage(registerPage));
loginButton.addEventListener("click", () => openMenuPage(loginPage));
helpButton.addEventListener("click", () => openMenuPage(helpPage));
loginLinkText.addEventListener("click", () => openMenuPage(loginPage));
mainUsername.addEventListener("click", () => openMenuPage(account));
darkMode.addEventListener("click", () => changeColourMode())
newGameMainButton.addEventListener("click", () => {
    newGame();
    closeHamburgerAndWelcome();
});
continueButton.addEventListener("click", () => {
    continueGame();
    closeHamburgerAndWelcome();
})
pauseButton.addEventListener("click", () => {
    openAndCloseWelcomeScreen();
    pause = true;
    clearInterval(interval);
});
minimumClues.addEventListener("input", () => {
    settings["minimumClues"] = minimumClues.value;
    localStorage.setItem("minimumClues", minimumClues.value)
    cluesSettingNumber.innerHTML = settings["minimumClues"];
    changeToCustomDifficulty();
})
loneRangersCheckbox.addEventListener("change", () => {
    localStorage.setItem("Lone Rangers", loneRangersCheckbox.checked);
    methods["Lone Rangers"] = loneRangersCheckbox.checked;
    changeToCustomDifficulty();
})
lockedCandidatesCheckbox.addEventListener("change", () => {
    localStorage.setItem("Locked Candidates", lockedCandidatesCheckbox.checked);
    methods["lockedCandidates"] = lockedCandidatesCheckbox.checked;
    changeToCustomDifficulty();
})
hiddenSubsetsCheckbox.addEventListener("change", () => {
    localStorage.setItem("Hidden Subsets", hiddenSubsetsCheckbox.checked);
    methods["Hidden Subsets"] = hiddenSubsetsCheckbox.checked;
    changeToCustomDifficulty();
})
nakedSubsetsCheckbox.addEventListener("change", () => {
    localStorage.setItem("Naked Subsets", nakedSubsetsCheckbox.checked);
    methods["Naked Subsets"] = nakedSubsetsCheckbox.checked;
    changeToCustomDifficulty();
})
candidatesEditButton.addEventListener("click", turnOnAndOffCandidatesEditing);

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", (e) => buttonPress(e.target));
})
clearCellButton.addEventListener("click", clearCell);
beginnerDifficultyButton.addEventListener("click", () => {
    settings["minimumClues"] = 40;
    methods = {
        "Lone Rangers": true, 
        "Locked Candidates": false, 
        "Naked Subsets": false, 
        "Hidden Subsets": false
    };
    updateDifficultySettingsInLocalStorage();
    setDifficultySettingInputs();
    document.querySelectorAll(".selected-button").forEach(button => {
        button.classList.remove("selected-button");
    })
    beginnerDifficultyButton.classList.add("selected-button");
    localStorage.setItem("Difficulty", "beginner");
})
intermediateDifficultyButton.addEventListener("click", () => {
    settings["minimumClues"] = 30;
    methods = {
        "Lone Rangers": true, 
        "Locked Candidates": true, 
        "Naked Subsets": false, 
        "Hidden Subsets": false
    };
    updateDifficultySettingsInLocalStorage()
    setDifficultySettingInputs()
    document.querySelectorAll(".selected-button").forEach(button => {
        button.classList.remove("selected-button")
    })
    intermediateDifficultyButton.classList.add("selected-button");
    localStorage.setItem("Difficulty", "intermediate");
})
expertDifficultyButton.addEventListener("click", () => {
    settings["minimumClues"] = 20;
    methods = {
        "Lone Rangers": true, 
        "Locked Candidates": true, 
        "Naked Subsets": true, 
        "Hidden Subsets": true
    };
    updateDifficultySettingsInLocalStorage()
    setDifficultySettingInputs()
    document.querySelectorAll(".selected-button").forEach(button => {
        button.classList.remove("selected-button")
    })
    expertDifficultyButton.classList.add("selected-button");
    localStorage.setItem("Difficulty", "expert");
})
customDifficultyButton.addEventListener("click", changeToCustomDifficulty)
undoButton.addEventListener("click", undo)
checkAnswersButton.addEventListener("click", checkAnswers)
leaderboardTimeSelect.addEventListener("click", displayBestTime)
leaderboardCompletedSelect.addEventListener("click", displayPuzzlesComplete)
getClueButton.addEventListener("click", findNextStep);
showClueButton.addEventListener("click", showAndHideClue)
minimizeClueButton.addEventListener("click", showAndHideClue)

document.querySelectorAll(".form-button").forEach(button => {
    button.addEventListener("click", e => {
        formSubmit(e.target.parentNode)
        
    })
})
logoutButton.addEventListener("click", logout)


document.querySelectorAll(".back-to-menu").forEach(e => {
    e.addEventListener("click", () => {
        document.querySelectorAll(".menu-child").forEach(e => {
            if (!e.classList.contains("hidden")) {
                e.classList.add("hidden");
            }
        })
    })
})


document.querySelectorAll(".back-to-account").forEach(e => {
    e.addEventListener("click", () => {
        document.querySelectorAll(".account-child").forEach(e => {
            if (!e.classList.contains("hidden")) {
                e.classList.add("hidden");
            }
        })
        account.classList.remove("hidden");
    })
})

function turnOnAndOffCandidatesEditing() {
    if (candidatesUpdate) {
        candidatesEditButton.classList.remove("blue-icon");
        candidatesUpdate = false;
    } else {
        candidatesEditButton.classList.add("blue-icon");
        candidatesUpdate = true;
    }
    if (highlightedCell) {
        highlightCell(document.getElementById(highlightedCell))
    }
}



function openAndCloseHamburger() {
    document.querySelectorAll(".menu-child").forEach(e => {
        if (!e.classList.contains("hidden")) {
            e.classList.add("transition", "hidden");
            setTimeout( () => {
                e.classList.remove("transition");
            }, 500)
        }
    })
    if (menu.classList.contains("hidden")) {
        
        menu.classList.remove("hidden");
        hamburger.innerHTML = '<i class="bi bi-x fs-1 fw-bold"></i>';
        pause = true
        clearInterval(interval);
    } else {
        menu.classList.add("hidden")
        hamburger.innerHTML = '<i class="bi bi-list fs-1 fw-bold"></i>';
        
        if (welcome.classList.contains("hidden")) {
            startTimer()
        }
    }
}

function openAndCloseWelcomeScreen() {
    if (welcome.classList.contains("hidden")) {
        welcome.classList.remove("hidden");
    } else {
        welcome.classList.add("hidden");
        clearInterval(interval)
    }
}

function closeHamburgerAndWelcome() {
    menu.classList.add("hidden");
    welcome.classList.add("hidden");
    startTimer()
    hamburger.innerHTML = '<i class="bi bi-list fs-1 fw-bold"></i>'
}


function openMenuPage(e) {
    document.querySelectorAll(".menu-child").forEach(e => {
        if (!e.classList.contains("hidden")) {
            e.classList.add("hidden");
        }
    })
    e.classList.remove("hidden")
}

function showAndHideClue() {
    if (cluePopup.classList.contains("hidden-popup")) {
        cluePopup.classList.remove("hidden-popup");
        showClueButton.innerHTML = "Hide Clue";
    } else {
        cluePopup.classList.add("hidden-popup");
        showClueButton.innerHTML = "Show Clue";
    }
}

function changeColourMode() {
    localStorage.setItem("darkMode", darkMode.checked);
    if (darkMode.checked) {
        document.querySelector('body').id = 'dark-mode';
    } else {
        document.querySelector('body').removeAttribute('id');
    }
}