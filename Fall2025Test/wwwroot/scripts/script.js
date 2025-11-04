

// We need a MutationObserver because the scripts keeps loading before the elements, and it runs the entire script once when the page first loads.
// The MutationObserver runs the code every time the DOM changes/will actually let it run when we need it to.

// This is the code at the beginning of a script that makes a MutationObserver.

//window.site = (function () {
//    const handlers = [];

//    const observer = new MutationObserver(() => {
//        for (const fn of handlers) fn();
//    });

//    observer.observe(document.body, { childList: true, subtree: true });

//    function registerHandler(fn) {
//        handlers.push(fn);
//        $(document).ready(fn);
//    }

//    return { registerHandler };
//})();




// Whenever we want to add a JQuery function, we put it inside this code block:

//window.site.registerHandler(function () {
    // function goes here
//});



window.site = (function () {
    const handlers = [];

    const observer = new MutationObserver(() => {
        for (const fn of handlers) fn();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    function registerHandler(fn) {
        handlers.push(fn);
        $(document).ready(fn);
    }

    return { registerHandler };
})();


window.site.registerHandler(function () {
    $('#profilePicture').fadeIn(1000);
});

window.site.registerHandler(function () {
    $(document).off('click', '#hamburger');
    $(document).on('click', '#hamburger', function () {
        const navBar = $('#hamburger-nav');

        if (navBar.hasClass('hamburger-nav-bar-visible')) {
            navBar.removeClass('hamburger-nav-bar-visible').addClass('hamburger-nav-bar');
        } else {
            navBar.removeClass('hamburger-nav-bar').addClass('hamburger-nav-bar-visible');
        }
    });

    $(window).off('resize.hamburger');
    $(window).on('resize.hamburger', function () {
        const navBar = $('#hamburger-nav');
        if ($(window).width() >= 80 * 16) {
            navBar.removeClass('hamburger-nav-bar-visible').addClass('hamburger-nav-bar');
        }
    });

    const navBar = $('#hamburger-nav');
    if ($(window).width() >= 80 * 16) {
        navBar.removeClass('hamburger-nav-bar-visible').addClass('hamburger-nav-bar');
    }

    $(document).off('click', '#hamburger-nav a');
    $(document).on('click', '#hamburger-nav a', function () {
        const navBar = $('#hamburger-nav');
        navBar.removeClass('hamburger-nav-bar-visible').addClass('hamburger-nav-bar');
    });
});