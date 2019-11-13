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


// $(document).ready(function() {
//     $("#haderId").on("click", "a", function(event) {
//         event.preventDefault();
//         var id = $(this).attr('href'),
//             top = $(id).offset().top;
//         $('body,html').animate({ scrollTop: top }, 1500);
//     });
// });