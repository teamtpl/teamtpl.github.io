function preloadFunc() {
    if (localStorage.getItem("canaccess") === null) {
        let person = prompt("Please enter duty24*7word", "");
        if (person != null) {
            if (person !== 'duty24*7') {
                alert("WRONG duty24*7WORD");
                window.open("https://www.google.com", "_self");
            } else {
                localStorage.setItem("canaccess", "true");
            }
        }
    }
}
window.onpaint = preloadFunc();