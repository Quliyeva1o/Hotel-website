window.addEventListener('scroll', function() {
    var navActive = document.querySelector("#nav-scroll");
    if (window.scrollY >= 50) {
        navActive.classList.add('nav-active');
    } else {
        navActive.classList.remove('nav-active');
    }
});





