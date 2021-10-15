

hamburger.addEventListener("click", openAndCloseHamburger);
newGameButton.addEventListener("click", () => {
    newGame();
    closeHamburgerAndWelcome();
});
clearGameButton.addEventListener("click", closeHamburgerAndWelcome);
difficultyButton.addEventListener("click", () => openMenuPage(difficulty));
difficultyMainButton.addEventListener("click", () => openMenuPage(difficulty));
leaderboardButton.addEventListener("click", () => openMenuPage(leaderboard));
accountButton.addEventListener("click", () => openMenuPage(account));
registerButton.addEventListener("click", () => openMenuPage(register));
registerLinkText.addEventListener("click", () => openMenuPage(register));
loginButton.addEventListener("click", () => openMenuPage(login));
loginLinkText.addEventListener("click", () => openMenuPage(login));
mainUsername.addEventListener("click", () => openMenuPage(account));
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
});





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
        account.classList.remove("hidden")
    })
})


function openAndCloseHamburger() {
    if (menu.classList.contains("hidden")) {
        menu.classList.remove("hidden");
        hamburger.innerHTML = '<i class="bi bi-x fs-1 fw-bold"></i>';
        pause = true
    } else {
        menu.classList.add("hidden")
        hamburger.innerHTML = '<i class="bi bi-list fs-1 fw-bold"></i>';
        document.querySelectorAll(".menu-child").forEach(e => {
            if (!e.classList.contains("hidden")) {
                e.classList.add("transition", "hidden");
                setTimeout( () => {
                    e.classList.remove("transition");
                }, 500)
            }
        })
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
    }
}

function closeHamburgerAndWelcome() {
    menu.classList.add("hidden");
    welcome.classList.add("hidden");
    startTimer()
}


function openMenuPage(e) {
    document.querySelectorAll(".menu-child").forEach(e => {
        if (!e.classList.contains("hidden")) {
            e.classList.add("hidden");
        }
    })
    e.classList.remove("hidden")
}