if (Cookies.get("_cookienotice") == "Disabled") {
    window.addEventListener('load', function () {
        document.getElementById("hideablecookiebanner").style.display = "none";
        console.log("Cookie notice is hidden. use cookieshow() to enable");
      })
}
else {
    window.addEventListener('load', function () {
        document.getElementById("hideablecookiebanner").style.display = "block";
        console.log("Cookie notice is not. use cookiehide() to disable");
      })
}

function cookiehide() {
        Cookies.set('_cookienotice', 'Disabled');
        document.getElementById("hideablecookiebanner").style.display = "none";
        console.log("hid for the first time");
    };

function cookieshow() {
    Cookies.set('_cookienotice', 'Enabled');
    document.getElementById("hideablecookiebanner").style.display = "";
    console.log("unhid");
};