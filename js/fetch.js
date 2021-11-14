
var url = "http://127.0.0.1/API/API/core.php";

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
    })
}



function formSubmit(form) {
    var formData = {};
    for (let i = 0; i < form.length; i++) {
        var input = form[i];
        formData[input.name] = input.value;
    };
    console.log(formData);
    fetch(url + "?action=" + form.name, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {response.json()})
    .then(data => console.log(data)) 
}


function logout() {
    fetch(url + "?action=logout")
    .then(response => {
        if (response.ok) {
            localStorage.setItem("loggedIn", false);
            anonymousUserProfile.classList.remove("hidden");
            authenticatedUserProfile.classList.add("hidden");
            document.querySelectorAll(".username").forEach(div => {
                div.innerHTML = "Guest";
            })
            totalGames.innerHTML = 0;
            completedGames.innerHTML = 0;
            averageTime.innerHTML = "-";
            bestTime.innerHTML = "-";
            lbValue.innerHTML = 0;
        } else {
            //error that it didn't work
        }
    })
    
}