$(document).ready(function () {
    // Single Page Nav for highlighting nav items
    $("#tmMainNav").singlePageNav();

    // Carousel in Our Work section
    $(".tm-gallery").slick({
        dots: true,
        infinite: false,
        arrows: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1600,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 1200,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 991,
                settings: {
                    arrows: false,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ],
    });

    // Image Pop Up
    $(".tm-gallery").magnificPopup({
        delegate: "a", // child items selector, by clicking on it popup will open
        type: "image",
        gallery: { enabled: true },
    });

    $(".navbar-toggler").on("click", function (e) {
        $(".tm-sidebar").toggleClass("show");
        e.stopPropagation();

        if (document.querySelector(".show") !== null) {
            $(".MenuButton").removeClass("fa-bars").addClass("fa-times");
        } else if (document.querySelector(".show") === null) {
            $(".MenuButton").removeClass("fa-times").addClass("fa-bars");
        }
    });
    $(window).on("click", function () {
        if (document.querySelector(".show") !== null) {
            $(".MenuButton").removeClass("fa-bars").addClass("fa-times");
        } else if (document.querySelector(".show") === null) {
            $(".MenuButton").removeClass("fa-times").addClass("fa-bars");
        }
    });

    $("html").click(function (e) {
        var sidebar = document.getElementById("tmSidebar");

        if (!sidebar.contains(e.target)) {
            $(".tm-sidebar").removeClass("show");
        }
    });

    $("#tmMainNav .nav-link").click(function (e) {
        $(".tm-sidebar").removeClass("show");
    });
});


$("#contact-us-form").submit(function (event) {

    try {

        if ($("#subject").val() == "0") {
            Notiflix.Report.Failure('Error', 'Please select an email subject', 'OK');
            return;
        }

        if (!$("#name").val()) {
            Notiflix.Report.Failure('Error', 'Please provide your name', 'OK');
            return;
        }

        if (!$("#email").val()) {
            Notiflix.Report.Failure('Error', 'Please provide your email', 'OK');
            return;
        }

        if (!$("#message").val()) {
            Notiflix.Report.Failure('Error', 'Please provide your email message', 'OK');
            return;
        }

        Notiflix.Loading.Pulse("Sending your email...");

        var e = {};
        e.subject = $("#subject").val();
        e.name = $("#name").val();
        e.email = $("#email").val();
        e.message = $("#message").val();

        var jsonString = JSON.stringify(e);
        var strData = jsonString.replace(/\"/g, '\\"');

        $.ajax({
            type: "POST",
            url: "../connect/api.asmx/ContactUsEmail",
            contentType: "application/json; charset=utf-8",
            data: '{strData: "' + strData + '"}',
            dataType: "json",
            success: function (response) {

                Notiflix.Loading.Remove();

                var data = typeof response.d == "string" ? eval("(" + response.d + ")") : response.d;

                if (data[0] === "Success") {

                    $('#contact-us-form')[0].reset();
                    Notiflix.Report.Success('Thanks!', 'We will get in touch with you soon.', 'OK');
                   
                }
                else {
                    Notiflix.Report.Failure('Error', data[1], 'OK');
                }
            },

            failure: function (e) {
                Notiflix.Loading.Remove();
            }
        });


    } catch (ex) {
        Notiflix.Loading.Remove();
        Notiflix.Report.Failure('Error', ex.message, 'OK');
    }
});


