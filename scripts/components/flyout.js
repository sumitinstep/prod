(function($) {
    $(document).ready(function() {
        $(".flyout").each(function() {
            var target = $(this).data("target");
            $(target).hide();

            $(this).click(function(e) {
                e.stopPropagation();
                $(target).toggle();
                return false;
            });

            $(target).click(function(e) {
                e.stopPropagation();
            });
        });

        $("body").click(function(e){
            $(".flyout").each(function() {
                var target = $(this).data("target");
                if($(target).is(":visible")) $(target).toggle();
            });
        });

        $("body").keydown(function(e) {
            switch(e.which) {
               case 27: 
                $(".flyout").each(function() {
                    var flyout = $(this).data("target");
                    if($(flyout).is(":visible")) $(flyout).toggle();
                });
                break;
            }

        });
        
    });

})(jQuery);