if (Cookies.get("_darkmode") == "Enabled") {
    $('body').addClass('dark');
    console.log("Cookie dark is set on load");
} else if (Cookies.get("_lightmode") == "Enabled") {
    $('body').removeClass('dark').addClass('light');
    console.log("Cookie light is set on load");
}

// On initial page load, there is not yet a cookie
// When the user clicks the button for the fist time, do this:
function darkmode() {
    if ($("body").hasClass("dark")) {
        // remove set darkmode cookie, add lightmode cookie
        Cookies.remove('_darkmode');
        Cookies.set('_lightmode', 'Enabled');
        // remove darkmode class and add lightmode class to body
        $('body').removeClass('dark').addClass('light');
        console.log("Setted Cookie dark");
    } else if ($("body").hasClass("light")) {
        // remove set darkmode cookie, add lightmode cookie
        Cookies.remove('_lightmode');
        Cookies.set('_darkmode', 'Enabled');
        // remove lightmode class and add darkmode class to body
        $('body').removeClass('light').addClass('dark');
        console.log("Setted Cookie light");
    } else {
        // create a cookie for darkmode state
        Cookies.set('_darkmode', 'Enabled');
        // add class to body
        $('body').addClass('dark');
        console.log("Setted Cookie dark for the first time");
    }
};