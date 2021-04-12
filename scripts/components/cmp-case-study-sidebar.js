(function($) {
    $(document).ready(function() {
        $(window).resize(function() {
            $(".single-case_studies #sidebar").each(function() {
                $(this).css({"min-height": $(this).find(".post-case_studies__sidebar-sticky").outerHeight()});
            });
        }).resize();
    });
})(jQuery);