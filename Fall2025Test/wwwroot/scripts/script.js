

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


window.site.registerHandler(function () {
    $('#search-table-one').on('keyup', function () {
        let value = $(this).val().toLowerCase();

        $('#table-one tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            $(this).addClass('table-highlight');
            if (!value) {
                $(this).removeClass('table-highlight');
            }
        });
    });
});


window.site.registerHandler(function () {
    $('#search-table-two').on('keyup', function () {
        let value = $(this).val().toLowerCase();

        $('#table-two tbody tr').filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
            $(this).addClass('table-highlight');
            if (!value) {
                $(this).removeClass('table-highlight');
            }
        });
    });
});

window.site.registerHandler(function () {
    $('#table-one th').off('click');
    $('#table-one th').on('click', function () {
        let table = $(this).closest('table');
        let tbody = table.find('tbody');
        let rows = tbody.find('tr').get();
        let columnIndex = $(this).index();
        let header = $(this).closest('#table-one th');

        if ($(header).hasClass('reverse-sorted')) {
            $(header).removeClass('reverse-sorted').addClass('sorted')
            rows.sort(function (a, b) {
                let aText = $(a).find('td').eq(columnIndex).text().toUpperCase();
                let bText = $(b).find('td').eq(columnIndex).text().toUpperCase();
                return aText.localeCompare(bText);
            });
        }
        else if ($(header).hasClass('sorted')) {
            $(header).removeClass('sorted').addClass('reverse-sorted')
            rows.sort(function (a, b) {
                let aText = $(a).find('td').eq(columnIndex).text().toUpperCase();
                let bText = $(b).find('td').eq(columnIndex).text().toUpperCase();
                return -aText.localeCompare(bText);
            });
        }

        $.each(rows, function (index, row) {
            tbody.append(row);
        });
    });
});


window.site.registerHandler(function () {
    $('#table-two th').off('click');
    $('#table-two th').on('click', function () {
        let table = $(this).closest('table');
        let tbody = table.find('tbody');
        let rows = tbody.find('tr').get();
        let columnIndex = $(this).index();
        let header = $(this).closest('#table-two th');

        if ($(header).hasClass('reverse-sorted')) {
            $(header).removeClass('reverse-sorted').addClass('sorted')
            rows.sort(function (a, b) {
                let aText = $(a).find('td').eq(columnIndex).text().toUpperCase();
                let bText = $(b).find('td').eq(columnIndex).text().toUpperCase();
                return aText.localeCompare(bText);
            });
        }
        else if ($(header).hasClass('sorted')) {
            $(header).removeClass('sorted').addClass('reverse-sorted')
            rows.sort(function (a, b) {
                let aText = $(a).find('td').eq(columnIndex).text().toUpperCase();
                let bText = $(b).find('td').eq(columnIndex).text().toUpperCase();
                return -aText.localeCompare(bText);
            });
        }

        $.each(rows, function (index, row) {
            tbody.append(row);
        });
    });
});


window.site.registerHandler(function () {
    const checkboxes = $('#drop-down-one input[type="checkbox"]');
    const rows = $('#table-one tbody tr');

    function filterTable() {
        const selectedCheckbox = checkboxes.filter(':checked').map(function () { return $(this).val().toUpperCase();}).get();

        rows.each(function () {
            const courseText = $(this).find('td:nth-child(1)').text().trim().toUpperCase();

            if (selectedCheckbox.length === 0 || selectedCheckbox.some((word) => courseText.includes(word))) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }

    checkboxes.on('change', filterTable);

    filterTable();
});


window.site.registerHandler(function () {
    const checkboxes = $('#drop-down-two input[type="checkbox"]');
    const rows = $('#table-two tbody tr');

    function filterTable() {
        const selectedCheckbox = checkboxes.filter(':checked').map(function () { return $(this).val().toUpperCase(); }).get();

        rows.each(function () {
            const courseText = $(this).find('td:nth-child(2)').text().trim().toUpperCase();

            if (selectedCheckbox.length === 0 || selectedCheckbox.some((word) => courseText.includes(word))) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }

    checkboxes.on('change', filterTable);

    filterTable();
});