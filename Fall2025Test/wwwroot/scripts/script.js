

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