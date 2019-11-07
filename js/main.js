function menuActive() {
    var nav = document.getElementById("topnavId");
    var header = document.getElementById("headerId");

    if (nav.className === "header-topnav", header.className === "header") {
        nav.className += " responsive"
        header.className += " responsive-header"



    } else {
        nav.className = "header-topnav"
        header.className = "header"
    }
}