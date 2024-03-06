import {Tooltip} from 'bootstrap';
import LazyLoad from 'vanilla-lazyload'; // https://github.com/verlok/vanilla-lazyload
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/sortable';
import 'select2';
import 'jquery-datetimepicker'; // https://www.jqueryscript.net/time-clock/Clean-jQuery-Date-Time-Picker-Plugin-datetimepicker.html
import IMask from 'imask';
import {isVisible} from "bootstrap/js/src/util";


$(document).ready(function () {
    ScrollbarCheck();

    $('.toggle-fullscreen').click(function () {
        $(this).toggleClass('toggled');
        toggleFullScreen();
        if ( $(this).parents('.modal-dialog').length > 0) {
            $(this).parents('.modal-dialog').toggleClass('full-screen');
        }
    });

    $(".sortable").sortable({
        cursor: "move"
    });

    $(".sortable-table").sortable({
        cursor: "move",
        handle: ".row-drag-btn",
        axis: "y"
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

        mainNav.find('.on-minimized:not("#hamMenuBtnMin")').click(function () {
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
                navTabsResponsive();
            });


        } else if ($(window).width() > 1200) {

            let isMouseHover = false,
                mainNavEl = document.getElementById("mainNav"),
                timeout = 500,
                pin =  $('.button--hamburger i.pin'),
                unpin =  $('.button--hamburger i.unpin');

            pin.toggleClass('pin unpin');
            unpin.toggleClass('pin unpin');

            hamMenuBtnMax.click(function () {
                mainNav.toggleClass("minimized");
                topBarTitleCrop();
                pin.toggleClass('pin unpin');
                unpin.toggleClass('pin unpin');
            });

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
                if (mainNav.hasClass("minimized")) {
                    setTimeout(function () {
                        if (isMouseHover) {
                            mainNav.addClass("maximized");
                        }
                    }, timeout)
                }
            }, false);

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

$('.top-bar__button, .dropdown-button').click(function () {
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

    $(document).on('click', function (e) {
        if (!window.is(e.target) && !button.is(e.target) && button.has(e.target).length === 0) {
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
    $('.multiple-select-input').each(function () {
        $(this).select2({
            width: '100%',
            dropdownAutoWidth : true,
            dropdownParent: $(this).parent()
        });
    })
});

// Select with tags
$(document).ready(function () {
    $('.form-select2-tags').each(function () {
        $(this).select2({
            width: '100%',
            dropdownAutoWidth : true,
            dropdownParent: $(this).parent(),
            tags: true
        });
    })
});

$(document).on('select2:open', () => {
    document.querySelector('.select2-container--open .select2-search__field').focus();
});

function select2init() {
    $('.form-select2').each(function () {

        let width = '100%';
        if ($(this).hasClass('autowidth')) {
            width = 'resolve';
        }

        if ($(this).hasClass('form-select2--search')) {
            $(this).select2({
                width: width,
                dropdownParent: $(this).parent()
            });
        }

        if ($(this).hasClass('form-select2--countries')) {
            $(this).select2({
                width: width,
                minimumResultsForSearch: Infinity,
                dropdownParent: $(this).parent(),
                templateResult: function (e) {
                    var $span = $("<span class='flag'><img src='assets/images/flag-" + e.id + ".png' alt=''><span class='name'>" + e.text + "</span></span>");
                    return $span;
                },
                templateSelection: function (e) {
                    var $span = $("<span class='flag'><img src='assets/images/flag-" + e.id + ".png' alt=''><span class='name'>" + e.text + "</span></span>");
                    return $span;
                }
            });

        } else {
            $(this).select2({
                width: width,
                minimumResultsForSearch: Infinity,
                dropdownParent: $(this).parent()
            });
        }
    })
}


// Select2 select
$(document).ready(function () {
    select2init();
});

const $el = $('.form-select2--search').select2();

$el.on('select2:open', () => {
    const searchInput = $el.data('select2').$dropdown.find('.select2-search__field')[0];
    if (searchInput) searchInput.focus();
})

// tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new Tooltip(tooltipTriggerEl, {
        sanitize: false,
        html: true
    })
})

// Close tooltip on click outside
$(document).on('click', function (e) {
    if (!$(e.target).closest('.tooltip').length && !$(e.target).closest('[data-bs-toggle="tooltip"]').length) {
        $('[data-bs-toggle="tooltip"]').tooltip('hide');
    }
});

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
    $('#ch-category').click(function () {
        $(".cell--category").toggle();
    });
    $('#ch-inventory').click(function () {
        $(".cell--inventory").toggle();
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
$('.datetimepicker-input').datetimepicker({});

// datepicker
$('.datepicker-input').datetimepicker({
    timepicker: false,
    defaultTime: false,
    format:'j.n.Y',

});

// Horizontal menu JS if cannot fit the display width
function navTabsResponsive() {

    let sum = 0,
        navTabs = $('.nav-tabs-responsive'),
        offset = 65;

    navTabs.each(function (i) {
        let navTabsItem = $(this).find('.item'),
            navTabsNextNav = $(this).find('.nav-tabs__next__nav'),
            navTabsNextBtn = $(this).find('.nav-tabs__next__btn'),
            width = $(this).width();

        _navTabsWidth();

        width = navTabs.width();
        let widthMinusBtn = width - offset;

        if ($(this).hasClass('vertical-menu')) {
            widthMinusBtn = width;
        }

        navTabsItem.each(function (i) {
            sum += $(this).innerWidth();
            if (sum > (widthMinusBtn)) {
                navTabsNextNav.append($(this).clone().attr( "data-index", i ));
                $(this).addClass('toggleMe');
            } else {
                navTabsNextNav.append($(this).clone().attr( "data-index", i ).addClass('toggleMe'));
            }
        });

        navTabsNextNav.find('.nav-link').click(function () { // fix
            $(this).removeClass("active");
        });

        if (sum > (widthMinusBtn)) {
            navTabsNextBtn.addClass('active');
        }

        $(window).on('resize', function () {
            sum = 0
            width = navTabs.width();
            let widthMinusBtn = width - offset;

            if ($(this).hasClass('vertical-menu')) {
                widthMinusBtn = width;
            }

            _navTabsWidth();

            navTabsItem.each(function (i) {
                sum += $(this).innerWidth();
                if (sum > (widthMinusBtn)) {
                    $(this).addClass('toggleMe');
                    navTabsNextNav.find(`[data-index='${i}']`).removeClass('toggleMe');
                } else {
                    $(this).removeClass('toggleMe');
                    navTabsNextNav.find(`[data-index='${i}']`).addClass('toggleMe');
                }
            });

            if (sum > (widthMinusBtn)) {
                navTabsNextBtn.addClass('active');
            } else {
                navTabsNextBtn.removeClass('active');
            }

        });

        navTabsItem.click(function () {
            select2init();
        });
    });

    function _navTabsWidth() {
        let actions = navTabs.next('.actions')

        if (actions.length > 0  && $(window).width() > 574.5) {
            navTabs.css('width',navTabs.width() - actions.width());
        }
    }
}
$(document).ready(function () {
    navTabsResponsive();
});

$('.nav-tabs__next__btn').click(function () {
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
    }, 1)
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
        target = button.next('.mobile-actions'),
        faded = target.next('.fade-modal-actions');

    if ($(window).width() > 767.5) {
        target.toggle();
    } else {
        target.slideDown(200);
        faded.fadeToggle(200);
    }
});

$(document).on('click', function (e) {
    if (!$(e.target).closest('.actions-button').length && !$(e.target).closest('.mobile-actions').length) {
        $('.mobile-actions').hide();
    }
});

$('.mobile-actions .has-submenu').click(function (e) {
    e.preventDefault();
    let button = $(this),
        window = button.next('.expanding-list');

    button.toggleClass('active');
    window.slideToggle(200);
});


$('.right-panel-toggle-btn').click(function () {
    if ($(window).width() > 1200) {
        $('#mainWrapper').toggleClass("no-rightPanel");
        $('.right-panel-toggle').toggleClass("show-me");
    }
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
        if (target) {
            target.toggle();
        }
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

// modal actions in mobile
$(function() {
    if ($(window).width() < 768) {
        $('.modal .actions-button').click(function() {
            let actions = $(this).next('.mobile-actions');

            actions.slideDown(200);
            actions.siblings('.fade-modal-actions').fadeIn(200);
        });

        $('.modal .mobile-actions').click(function() {
            $(this).slideUp(200);
            $(this).siblings('.fade-modal-actions').fadeOut(200);
        });

        $('.fade-modal-actions').click(function() {
            $(this).fadeOut(200);
            $(this).siblings('.mobile-actions').slideUp(200);
        });
    }
});

// grid th hover
$(function() {
    $('.thead-tr th').mouseenter(function() {
        let i = $(this).index() + 1,
            sibling = $(this).parent().siblings('.thead-tr').find('th:nth-child(' + i + ')');
        $(this).addClass('hover');
        sibling.addClass('hover');
        $(this).mouseleave(function() {
            $(this).removeClass('hover');
            sibling.removeClass('hover');
        })
        sibling.mouseleave(function() {
            sibling.removeClass('hover');
        })
    });
});

// input masks
$(function() {
    if ( $('.imask-number').length > 0) {
        let maskOptions = {
            mask: Number,
            thousandsSeparator: ' '
        };

        $('.imask-number').each(function () {
            let mask = IMask(this, maskOptions);
        })
    }
});

$(function() {
    var element = document.querySelector('.form-control--multidimensional');

    if ( element ) {
        var maskOptions = {
            mask: '0,00 {x} 0,00 {x} 0,00',
        };
        var mask = IMask(element, maskOptions);
    }
});

$(function() {
    $('.btn--expanding').click(function () {
        let button = $(this),
            window = button.find('.expanding-list');

        window.toggle();

        $(document).on('click', function (e) {
            if (!window.is(e.target) && !button.is(e.target) && button.has(e.target).length === 0) {
                window.hide();
                window.removeClass('show-one-row');
                button.removeClass('active');
            }
        });
    });
});

$(function() {
    $('.input-number-wrapper').append( $( "<div class='input-arrows'><button class='input-arrow input-arrow--plus'></button><button class='input-arrow input-arrow--minus'></button>" ) );
});


$(function() {
    $('.toggle-row-check-input').on('change', function () {
        $(this).closest('.input-row').next('.toggle-input-row').toggleClass('hidden', !this.checked);
    });
});


// input-w-arrows

$(function () {
    var plusButton = $(".input-arrow--plus");
    var minusButton = $(".input-arrow--minus");

    plusButton.click(function () {
        var inputElement = $(this).parent().prev();
        inputElement.val(parseFloat(inputElement.val()) + 1);
    });

    minusButton.click(function () {
        var inputElement = $(this).parent().prev();
        inputElement.val(Math.max(parseFloat(inputElement.val()) - 1, 0));
    });
});