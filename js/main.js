function menuActive() {
    var nav = document.getElementById("topnavId");
    if (nav.className === "topnav") {
        nav.className += " responsive"

    } else {
        nav.className = "topnav"
    }
}