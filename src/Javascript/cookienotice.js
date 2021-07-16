if (localStorage.getItem("noticeis") == "Disabled") {
    document.getElementById("hideablecookiebanner").style.display = "none";

} else {
    document.getElementById("hideablecookiebanner").style.display = "block";
}

function cookiehide() {
    localStorage.setItem("noticeis", "Disabled");
    document.getElementById("hideablecookiebanner").style.display = "none";
};

function cookieshow() {
    localStorage.setItem("noticeis", "Enabled");
    document.getElementById("hideablecookiebanner").style.display = "block";
};
