function menuActive() {
    var nav = document.getElementById("topnavId");
    if (nav.className === "header-topnav") {
        nav.className += " responsive"

    } else {
        nav.className = "header-topnav"
    }
}