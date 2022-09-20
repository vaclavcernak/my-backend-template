import {Tooltip} from 'bootstrap';
import LazyLoad from 'vanilla-lazyload'; // https://github.com/verlok/vanilla-lazyload
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/sortable';
import 'select2';
import 'jquery-datetimepicker'; // https://www.jqueryscript.net/time-clock/Clean-jQuery-Date-Time-Picker-Plugin-datetimepicker.html


$(document).ready(function () {
    ScrollbarCheck();

    $('.toggle-fullscreen').click(function () {
        $(this).toggleClass('toggled');
        toggleFullScreen();
        if ( $(this).parents('.modal-dialog').length > 0) {
            console.log($(this).parents('.modal-dialog'));
            $(this).parents('.modal-dialog').toggleClass('full-screen');
        }
    });

    $(".sortable").sortable({
        cursor: "move"
    });
});

// vanilla-lazyload
let lazyLoadInstance = new LazyLoad();
lazyLoadInstance.update();


// LOGIN FLIP CARD
$('.flip-card-btn').click(function (e) {
    e.preventDefault();
    $(this).closest('.flip-card').toggleClass('flipped');
});

// MAIN MENU

$(function () {

    const mainNav = $('#mainNav'),
        hamMenuBtnMax = $('#hamMenuBtnMax');

    $(window).on('load resize', function () {

        mainNav.find('.on-minimized').click(function () {
            mainNav.toggleClass("minimized");
            topBarTitleCrop();

            if ($(window).width() < 1200 && $(window).width() > 767.5) {
                $(document).mouseup(function (e) {
                    if (!mainNav.is(e.target) && mainNav.has(e.target).length === 0) {
                        mainNav.addClass("minimized");
                        topBarTitleCrop();
                    }
                });
            }
        });

        if ($(window).width() < 1200 && $(window).width() > 767.5) {

            let isMouseHover = false,
                mainNavEl = document.getElementById("mainNav"),
                timeout = 500;

            mainNavEl.addEventListener("mouseleave", function (event) {
                isMouseHover = false
                setTimeout(function () {
                    if (!isMouseHover && !hamMenuBtnMax.hasClass("active")) {
                        mainNav.removeClass("maximized");
                    }
                }, timeout)
            }, false);

            mainNavEl.addEventListener("mouseover", function (event) {
                isMouseHover = true
                setTimeout(function () {
                    if (isMouseHover) {
                        mainNav.addClass("maximized");
                    }
                }, timeout)
            }, false);


            mainNav.addClass("minimized");

            hamMenuBtnMax.click(function () {
                $(this).toggleClass("active");
                mainNav.toggleClass("locked");
                topBarTitleCrop();
                accordionTitleCrop();
            });


        } else if ($(window).width() > 1200) {

            hamMenuBtnMax.click(function () {
                mainNav.toggleClass("minimized");
                topBarTitleCrop();
            });

        } else if ($(window).width() < 767.5) {

            hamMenuBtnMax.click(function () {
                mainNav.removeClass("mobile-opened");
                topBarTitleCrop();
            });
        }

    });

    $('#mainNav .has-submenu a').click(function () {
        ScrollbarCheck();
        $(this).parent('.has-submenu').toggleClass('active');
    });

    $('#mobileButtonHamburger').click(function () {
        mainNav.addClass("mobile-opened");
    });

});

// check if element has vertical scrollbar
function ScrollbarCheck() {
    const scrollbareds = document.querySelectorAll(".scrollbared");


    setTimeout(function () {
        scrollbareds.forEach(function (scrollbared) {
            if (scrollbared.scrollHeight > scrollbared.clientHeight) {
                scrollbared.classList.add("has-scrollbar")
            } else {
                scrollbared.classList.remove("has-scrollbar")
            }
        });
    }, 1)
}


function toggleFullScreen() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

// SHWO FRONTEND BUTTON

$('.show-frontend--has-list').click(function () {
    let button = $(this);
    button.toggleClass('active');

    $(document).mouseup(function (e) {
        if (!button.is(e.target) && button.has(e.target).length === 0) {
            button.removeClass('active');
        }
    });
});

// TOP-BAR BUTTONS + WINDOWS

$('.top-bar__button').click(function () {
    let window = $(this).next('.top-bar__button__window'),
        windowHeight = window.height(),
        windowWrapper = window.parent('.top-bar__button-wrapper'),
        button = $(this);

    button.toggleClass('active');
    window.toggle();

    ScrollbarCheck();

    if (button.hasClass('add-actions')) { // ADD NEW ACTIONS
        window.toggleClass('show-one-row');
        window.find('.show-more').click(function () {
            $(this).hide();
            window.height(windowHeight);
        });
    }

    $(document).mouseup(function (e) {
        if (!windowWrapper.is(e.target) && windowWrapper.has(e.target).length === 0) {
            window.hide();
            window.removeClass('show-one-row');
            button.removeClass('active');
        }
    });
});

// NOTIFICATION SETTINGS

$('.notification-settings-link').click(function (e) {
    e.preventDefault();
    $('.notifications-window__backside').toggleClass('active');
});

// NOTIFY ICONS

$('.notify-icon').click(function (e) {
    e.preventDefault();
    $(this).toggleClass('active');
});

// TOP-BAR SEARCH

$(document).ready(function () {

    let topBarSearchWindow = $("#topBarSearchWindow"),
        topBarSearchInput = $("#topBarSearchInput"),
        topBarSearchInputBtnMobile = $("#topBarSearchInputBtnMobile");

    topBarSearchInput.click(function () {

        if ($(window).width() > 575.5) {

            topBarSearchWindow.show();

            $(document).mouseup(function (e) {
                if (!topBarSearchWindow.is(e.target) && topBarSearchWindow.has(e.target).length === 0) {
                    topBarSearchWindow.hide();
                }
            });

        }
    });

    $(window).on('load resize', function () {

        $("#topBarSearchInputBtn").click(function () {
            if ($(window).width() < 575.5) {

                topBarSearchInput.show();
                topBarSearchWindow.show();
                topBarSearchInputBtnMobile.show();

                topBarSearchInputBtnMobile.click(function (e) {
                    e.preventDefault();
                    topBarSearchInput.hide();
                    topBarSearchWindow.hide();
                    topBarSearchInputBtnMobile.hide();
                });
            }
        });
    });
});


// WARNINGS
$(".warning__close").click(function () {
    $(this).closest(".warning").fadeOut();
});

// LANGUAGE SWITCHER
$("#languageSwitcherActive").click(function () {

    let languageSwitcher = $("#languageSwitcher"),
        $this = $(this);

    languageSwitcher.toggleClass('opened');

    $(document).mouseup(function (e) {
        if (!$this.is(e.target) && $this.has(e.target).length === 0) {
            languageSwitcher.removeClass('opened');
        }
    });
});

// search input
$(function () {
    let searchInput = $(".search-input input[type='search']");

    searchInput.focusin(function () {
        $(this).next(".dropdown-menu").show();
    });
    searchInput.focusout(function () {
        $(this).next(".dropdown-menu").hide();
    });
});

// Multiple select
$(document).ready(function () {
    $('.multiple-select-input').select2({
        width: '100%'
    });
});


// Select2 select
$(document).ready(function () {
    $('.form-select2').each(function () {

        if ($(this).hasClass('form-select2--search')) {
            $(this).select2({
                width: '100%'
            });

        } else {
            $(this).select2({
                width: '100%',
                minimumResultsForSearch: Infinity
            });
        }
    })
});

const $el = $('.form-select2--search').select2()

$el.on('select2:open', () => {
    const searchInput = $el.data('select2').$dropdown.find('.select2-search__field')[0];
    if (searchInput) searchInput.focus();
})

// tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl)
})

// grid filter example - for test purpose only

$(document).ready(function () {
    $('#ch-image').click(function () {
        $(".cell--image").toggle();
    });
    $('#ch-id').click(function () {
        $(".cell--id").toggle();
    });
    $('#ch-sku').click(function () {
        $(".cell--sku").toggle();
    });
    $('#ch-title').click(function () {
        $(".cell--title").toggle();
    });
    $('#ch-brand').click(function () {
        $(".cell--brand").toggle();
    });
    $('#ch-status').click(function () {
        $(".cell--status").toggle();
    });
    $('#ch-updated').click(function () {
        $(".cell--updated").toggle();
    });
    $('#ch-text-set').click(function () {
        $(".cell--text-set").toggle();
    });
});

// datepicker
$('.datepicker-input').datetimepicker({});

// Horizontal menu JS if cannot fit the display width
$(window).on('load resize', function () {
    let sum = 0,
        navTabs = $('#navTabs');
    const width = navTabs.width();

    navTabs.find('.nav-item').each(function () {
        sum += $(this).innerWidth();
        if (sum > (width - 40)) {
            $('#navTabsNextNav').append(this);
        }
    });
    if (sum > (width - 40)) {
        $('#navTabsNextBtn').addClass('active');
    }

    $('.nav-tabs__next__nav .nav-link').click(function () { // fix
        $(this).removeClass("active");
    });
});

$('#navTabsNextBtn').click(function () {
    let button = $(this),
        target = button.next('.nav-tabs__next__nav');

    button.toggleClass("hover");
    target.toggle();

    $(document).mouseup(function (e) {
        if (!button.is(e.target) && button.has(e.target).length === 0) {
            target.hide();
            button.removeClass("hover");
        }
    });
});

$(window).on('load resize', function () {
    topBarTitleCrop();
    accordionTitleCrop();
});

function topBarTitleCrop() {
    let topBar = $('.top-bar--product'),
        topBarRight = $('.top-bar__right'),
        topBarLeft = $('.top-bar__left'),
        spacer = 0;

    if ($(window).width() < 768) {
        spacer = 55;
    }

    setTimeout(function () {
        let diff = topBar.width() - topBarRight.width();
        topBarLeft.css('max-width', diff - spacer - 15); // 15 right margin
    }, 300)
}

function accordionTitleCrop() {
    let accHeader = $('main .accordion-header');

    accHeader.each(function () {
        let accHeaderRight = $(this).find('.accordion-header__right'),
            accTitle = $(this).find('.accordion-button__text'),
            accNotification = $(this).find('.accordion-button__notification'),
            notifWidth = 0;

        if (accNotification.length > 0) {
            notifWidth = 25;
        }

        let diff = $(this).width() - accHeaderRight.width() - notifWidth;
        accTitle.css('max-width', diff - 45); // 65 margins
    });

}

$('.top-bar-buttons .actions-button').click(function () {
    let button = $(this),
        target = button.next('.mobile-actions');

    button.toggleClass("hover");
    target.toggle();

    hideElIfClickOutside(button, target);
});


$('.right-panel-toggle-btn').click(function () {
    $('#rightPanel').toggleClass("active");
});

$('#topBarTitle').click(function () {
    $(this).toggleClass("show-full");
});


//dropdown list / links
$(function () {
    $('.dropdown-link').click(function () {
        let button = $(this),
            target = button.next(".dropdown-list");

        target.toggle();

        hideElIfClickOutside(button, target);
    });
});


function hideElIfClickOutside(button, target) {
    $(document).mouseup(function (e) {
        if (!button.is(e.target) && button.has(e.target).length === 0) {
            target.hide();
        }
    });
}

// product photos
$(function () {
    $('.btn-edit-open').click(function (e) {
        e.preventDefault();
        $(this).parents('.product-photo__item').addClass('editable');
    });

    $('.btn-edit-close').click(function (e) {
        e.preventDefault();
        $(this).parents('.product-photo__item').removeClass('editable');
    });
});

// subtable toggle
$(function () {
    $('.toggle-subtable').click(function () {
        let button = $(this),
            buttonIcon = button.find('.toggle-icon'),
            target = button.parents('tr').next('.toggle-subtable-row');

        buttonIcon.toggle();
        target.toggle();
    });
});

// dropdown next to all checkbox option in grid
$(function () {
    $('.checkbox-options__btn').click(function () {
        let button = $(this),
            target = button.next('.checkbox-options__options');

        target.toggle();

        hideElIfClickOutside(button, target);
    });
});
