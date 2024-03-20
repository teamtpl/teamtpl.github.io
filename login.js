function preloadFunc() {
    if (localStorage.getItem("canaccess") === null) {
        let person = prompt("Please enter pass word", "");
        if (person != null) {
            if (person !== 'duty24*7') {
                alert("WRONG PASSWORD");
                window.open("https://www.google.com", "_self");
            } else {
                localStorage.setItem("canaccess", "true");
            }
        }
    }
}
window.onpaint = preloadFunc();