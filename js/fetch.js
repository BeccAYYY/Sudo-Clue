

var url = "http://127.0.0.1/API/API/core.php";

var loggedIn = false;

spinner.classList.remove("hidden")
fetch(url + "?action=login_check", {
    credentials: "include"
})
.then(response => {
    if (response.ok) {
        anonymousUserProfile.classList.add("hidden");
        authenticatedUserProfile.classList.remove("hidden");
        localStorage.setItem("loggedIn", true);
        loggedIn = true;
    } else {
        localStorage.setItem("loggedIn", false);
    }
    spinner.classList.add("hidden")
    return response.json();
})
.then(data => {
    console.log('hi')
    if (typeof data !== undefined) {
        set_user_details(data.Data)
    }
})



async function get_user_details() {
    spinner.classList.remove("hidden")
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
        spinner.classList.add("hidden")
    })
}

function set_user_details(data) {
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
}




function formSubmit(form) {
    spinner.classList.remove("hidden")
    var formData = {};
    for (let i = 0; i < form.length; i++) {
        var input = form[i];
        formData[input.name] = input.value;
    };
    fetch(url + "?action=" + form.name, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (form.name == "login") {
            if (data.Message == "Successfully logged in.") {
                set_user_details(data.Data);
                authenticatedUserProfile.classList.remove("hidden");
                anonymousUserProfile.classList.add("hidden");
                account.classList.remove("hidden");
                loginPage.classList.add("hidden");
            } else {
                alert("Error");
            }
            loginUsername.value = "";
            loginPassword.value = "";
        }
    }) 
    spinner.classList.add("hidden")
}


function logout() {
    spinner.classList.remove("hidden")
    fetch(url + "?action=logout", {
        credentials: "include"
    })
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
        return response.json();
    })
    .then(data => {
        spinner.classList.add("hidden")
    })
}