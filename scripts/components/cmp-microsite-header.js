(function ($) {
    var cmpHeaderMicrosite = function () {
        $(document).ready(function () {
            $(".cmp-header-microsite").each(function () {
                $(window).scroll(function () {
                    var header = $(".cmp-header-microsite");
                    var scroll = $(window).scrollTop();
                    var scrollTest = 60;
                    if (header.hasClass("compact")) {
                        scrollTest = 0;
                    }
                    if (scroll <= scrollTest) {
                        header.removeClass("compact");
                        header.removeClass("fixed-top");
                    } else {
                        header.addClass("compact");
                        header.addClass("fixed-top");
                    }
                });

                $('.hash-link').click(function (event) {
                    event.preventDefault();
                });


                $(".toggle-mobile-nav").click(function (e) {
                    var nav = $(".meraki-mobile-nav")
                    var isActive = nav.hasClass("active")

                    if (isActive) {
                        nav.removeClass("active")
                        $(".cmp-header-microsite").removeClass("menu-open");
                        if ($(".cmp-header-microsite").hasClass("transparent-header")) {
                            $(".cmp-header-microsite .btn-demo").addClass("btn-secondary-white").removeClass("btn-primary-green");
                        }
                    } else {
                        nav.addClass("active")
                        $(".cmp-header-microsite").addClass("menu-open");
                        if ($(".cmp-header-microsite").hasClass("transparent-header")) {
                            $(".cmp-header-microsite .btn-demo").removeClass("btn-secondary-white").addClass("btn-primary-green");
                        }
                    }
                });

                $(".section__header").click(function (e) {
                    e.stopPropagation();
                    var section = $(this).parent()
                    var isActive = section.hasClass("active")

                    $(".section").removeClass("active")

                    if (!isActive) {
                        section.addClass("active");
                    } 
                    else {
                        section.removeClass("active");
                    }
                });

                $(window).scroll(function (event) {

                    var header = $(".cmp-header-microsite");
                    var btnDemo = $(".btn.demo");

                    if (header.hasClass("scroll-header")) {

                        var scroll = $(window).scrollTop();

                        var height = header.innerHeight();

                        if (scroll < 200) {
                            header.addClass("transparent-header");
                            if (!header.hasClass("menu-open")) {
                                btnDemo.removeClass("btn-primary-green");
                                btnDemo.addClass("btn-secondary-white");
                            }
                        } else {
                            header.removeClass("transparent-header")
                            header.removeClass("position-fixed");
                            if (!header.hasClass("menu-open")) {
                                btnDemo.addClass("btn-primary-green");
                                btnDemo.removeClass("btn-secondary-white");
                            }
                        }

                    }

                });

                $("body").click(function(e) {
                    $(".cmp-header-microsite .section.active").removeClass("active");
                });
            });
        });
    }();
})(jQuery);