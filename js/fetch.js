

var url = "http://127.0.0.1/api/api/core.php";

var loggedIn = false;

fetch(url + "?action=login_check", {
    credentials: "include"
})
.then(response => {
    if (response.ok) {
        anonymousUserProfile.classList.add("hidden");
        authenticatedUserProfile.classList.remove("hidden");
        localStorage.setItem("loggedIn", true);
        loggedIn = true;
        get_user_details();
    } else {
        localStorage.setItem("loggedIn", false);
    }
    return response.json();
})



async function get_user_details() {
    fetch(url + "?action=get_user_details", {
        credentials: "include"
    })
    .then(response => response.json())
    .then(data => {
        document.querySelectorAll(".username").forEach(div => {
            div.innerHTML = data.username;
        })
        totalGames.innerHTML = data.totalGames;
        completedGames.innerHTML = data.completedGames;
        averageTime.innerHTML = data.averageTime;
        if (averageTime.innerHTML == "") {
            averageTime.innerHTML = "-"
        }
        bestTime.innerHTML = data.bestTime;
        if (bestTime.innerHTML == "") {
            bestTime.innerHTML = "-"
        }
        lbValue.innerHTML = data.completedGames;
        console.log(data)
    })
}
