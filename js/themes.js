const themeSwitch = document.getElementById('themeSwitch');
if (themeSwitch) {
    initTheme(); // on page load, if user has already selected a specific theme -> apply it

    themeSwitch.onclick = (event) => {
        resetTheme(); // update color theme
    };

    function initTheme() {
        const darkThemeSelected = (localStorage.getItem('themeSwitch') !== null && localStorage.getItem('themeSwitch') === 'dark');
        // update body data-theme attribute
        darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') : document.body.removeAttribute('data-theme');
    };

    function resetTheme() {
        if (!document.body.getAttribute('data-theme')) { // dark theme has been selected
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('themeSwitch', 'dark'); // save theme selection 
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.removeItem('themeSwitch'); // reset theme selection 
        }
    };
}