document.querySelectorAll("[name=username]").forEach(input => {
    input.setAttribute("pattern", "([0-9]|[a-z]|[A-Z]|[ \-_]){1,40}")
    input.setAttribute("minlength", "1")
    input.setAttribute("maxlength", "8")
    input.addEventListener("change", (e) => {
        if (/^([0-9]|[a-z]|[A-Z]|[ \-_]){1,40}$/.test(e.target.value)) {
            e.target.style.border = "3px solid green"
        } else {
            e.target.style.border = "3px solid red"
        }
    })
})

document.querySelectorAll("[name=password], [name=old-password]").forEach(input => {
    input.setAttribute("pattern", "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}")
    input.setAttribute("minlength", "8")
    input.setAttribute("maxlength", "30")
    input.addEventListener("change", (e) => {
        if (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(e.target.value)) {
            e.target.style.border = "3px solid green"
        } else {
            e.target.style.border = "3px solid red"
        }
        changeSubmitButton(e.target.parentNode.parentNode)
    })
})

document.querySelectorAll("[name=password2]").forEach(input => {
    input.setAttribute("pattern", "(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}")
    input.setAttribute("minlength", "8")
    input.setAttribute("maxlength", "30")
    input.addEventListener("change", (e) => {
        if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(e.target.value)) {
            e.target.style.border = "3px solid red"
        } else if (e.target.value !== e.target.parentNode.parentNode.querySelector("[name=password").value) {
            e.target.style.border = "3px solid red"
        } else {
            e.target.style.border = "3px solid green"
        }
        changeSubmitButton(e.target.parentNode.parentNode)
    })
})

function changeSubmitButton(form) {
    var test = Array.from(form.querySelectorAll("input")).map(input => input.checkValidity())
    console.log(form.querySelectorAll("[name=password2]"))
    if (test.includes(false)) {
        form.querySelector(".submit-button").classList.add("cant-submit")
    } else if (form.querySelectorAll("[name=password2]").length == 1 && form.querySelector("[name=password2]") !== form.querySelector("[name=password]")) {
        form.querySelector(".submit-button").classList.add("cant-submit")
    } else {
        form.querySelector(".submit-button").classList.remove("cant-submit")
    }
}