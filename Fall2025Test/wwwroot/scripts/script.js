

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


window.site.registerHandler(function () {
    $('#fetchBtn').off('click');
    $('#fetchBtn').on('click', function () {
        const pokemonName = $('#pokemonName').val().toLowerCase();
        if (pokemonName) {
            $.ajax({
                url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
                method: 'GET',
                success: function (response) {

                    let abilitiesHtml = '';
                    $.each(response.abilities, function (indexOrKey, value) {
                        const abilityName = value.ability.name;

                        if (indexOrKey === (response.abilities.length - 1)) {
                            abilitiesHtml += ` ${abilityName}`;
                        }
                        else {
                            abilitiesHtml += ` ${abilityName},`;
                        }
                    });

                    let typesHtml = '';
                    $.each(response.types, function (indexOrKey, value) {
                        const typeName = value.type.name;

                        if (indexOrKey === (response.types.length - 1)) {
                            typesHtml += ` ${typeName}`;
                        }
                        else {
                            typesHtml += ` ${typeName},`;
                        }
                    });

                    const pokemonData = `
                        <h3>${response.name.toUpperCase()}</h3>
                        <img src='${response.sprites.front_default}' alt='${response.name}'
                        <p></p>
                        <p>Height: ${response.height / 10} m</p>
                        <p>Weight: ${response.weight / 10} kg</p>
                        <p>Types: ${typesHtml}</p>
                        <p>Abilities: ${abilitiesHtml}</p>
                    `;

                    $('#pokemonInfo').html(pokemonData);
                },
                error: function () {
                    $('#pokemonInfo').html('<p>Pokemon not found. Please try again.</p>');
                }
            });
        } else {
            $('#pokemonInfo').html('<p>Please enter a Pokemon name or ID.</p>');
        }
    });
});


window.site.registerHandler(function () {
    $(document).ready(function () {
        $('#top-table-row-form').submit(function (event) {
            event.preventDefault();

            let courseNumber = $('#course-number').val();
            let courseName = $('#course-name').val();
            let time = $('#time').val();
            let teacher = $('#teacher').val();
            let credits = $('#credits').val();

            if (courseNumber.trim() != '' && courseName.trim() != '' && time.trim() != '' && teacher.trim() != '' && credits.trim() != '') {
                let newRow = `<tr>
                            <td>${courseNumber}</td>
                            <td>${courseName}</td>
                            <td>${time}</td>
                            <td>${teacher}</td>
                            <td>${credits}</td>
                            <td><button class="delete-btn">Delete</button><button class="edit-btn">Edit</button></td>
                          </tr>`;
                $('#table-one tbody').append(newRow);
            }

            $('#top-table-row-form')[0].reset();
            $('#modal-top').removeClass('edit-table-modal-visible-top').addClass('edit-table-modal-hidden-top');
        });

        $(document).on('click', '.delete-btn', function () {
            $(this).closest('tr').remove();
        });
    });
});


window.site.registerHandler(function () {
    $('#add-new-course-top').off('click');
    $('#add-new-course-top').on('click', function () {
        $('#modal-top').removeClass('edit-table-modal-hidden-top').addClass('edit-table-modal-visible-top');
    });
});


window.site.registerHandler(function () {
    $(document).ready(function () {
        $('#bottom-table-row-form').submit(function (event) {
            event.preventDefault();

            let gameName = $('#game-name').val();
            let genre = $('#genre').val();
            let price = $('#price').val();
            let developer = $('#developer').val();
            let releaseDate = $('#release-date').val();

            if (gameName.trim() != '' && genre.trim() != '' && price.trim() != '' && developer.trim() != '' && releaseDate.trim() != '') {
                let newRow = `<tr>
                            <td>${gameName}</td>
                            <td>${genre}</td>
                            <td>${price}</td>
                            <td>${developer}</td>
                            <td>${releaseDate}</td>
                            <td><button class="delete-btn">Delete</button><button class="edit-btn">Edit</button></td>
                          </tr>`;
                $('#table-two tbody').append(newRow);
            }

            $('#bottom-table-row-form')[0].reset();
            $('#modal-bottom').removeClass('edit-table-modal-visible-bottom').addClass('edit-table-modal-hidden-bottom');
        });

        $(document).on('click', '.delete-btn', function () {
            $(this).closest('tr').remove();
        });
    });
});


window.site.registerHandler(function () {
    $('#add-new-course-bottom').off('click');
    $('#add-new-course-bottom').on('click', function () {
        $('#modal-bottom').removeClass('edit-table-modal-hidden-bottom').addClass('edit-table-modal-visible-bottom');
    });
});


window.site.registerHandler(function () {
    $(document).on('click', '.edit-btn-top', function () {
        let tableRow = $(this).closest('tr');
        $('#modal-top-edit').removeClass('edit-table-modal-hidden-top').addClass('edit-table-modal-visible-top');
        $('#top-table-row-form-edit').off('submit');
        $('#top-table-row-form-edit').on('submit', function (event) {
            event.preventDefault();

            let courseNumber = $('#course-number-edit').val();
            let courseName = $('#course-name-edit').val();
            let time = $('#time-edit').val();
            let teacher = $('#teacher-edit').val();
            let credits = $('#credits-edit').val();

            if (courseNumber.trim() != '' && courseName.trim() != '' && time.trim() != '' && teacher.trim() != '' && credits.trim() != '') {
                let newRow = `<tr>
                            <td>${courseNumber}</td>
                            <td>${courseName}</td>
                            <td>${time}</td>
                            <td>${teacher}</td>
                            <td>${credits}</td>
                            <td><button class="delete-btn">Delete</button><button class="edit-btn-top">Edit</button></td>
                          </tr>`;
                tableRow.replaceWith(newRow);
            }

            this.reset();
            $('#top-table-row-form-edit')[0].reset();
            $('#modal-top-edit').removeClass('edit-table-modal-visible-top').addClass('edit-table-modal-hidden-top');
        });
    });
});


window.site.registerHandler(function () {
    $(document).on('click', '.edit-btn-bottom', function () {
        let tableRow = $(this).closest('tr');
        $('#modal-bottom-edit').removeClass('edit-table-modal-hidden-bottom').addClass('edit-table-modal-visible-bottom');
        $('#bottom-table-row-form-edit').off('submit');
        $('#bottom-table-row-form-edit').on('submit', function (event) {
            event.preventDefault();

            let gameName = $('#game-name-edit').val();
            let genre = $('#genre-edit').val();
            let price = $('#price-edit').val();
            let developer = $('#developer-edit').val();
            let releaseDate = $('#release-date-edit').val();

            if (gameName.trim() != '' && genre.trim() != '' && price.trim() != '' && developer.trim() != '' && releaseDate.trim() != '') {
                let newRow = `<tr>
                            <td>${gameName}</td>
                            <td>${genre}</td>
                            <td>${price}</td>
                            <td>${developer}</td>
                            <td>${releaseDate}</td>
                            <td><button class="delete-btn">Delete</button><button class="edit-btn-bottom">Edit</button></td>
                          </tr>`;
                tableRow.replaceWith(newRow);
            }

            this.reset();
            $('#bottom-table-row-form-edit')[0].reset();
            $('#modal-bottom-edit').removeClass('edit-table-modal-visible-bottom').addClass('edit-table-modal-hidden-bottom');
        });
    });
});

