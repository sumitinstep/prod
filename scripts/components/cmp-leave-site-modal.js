//Trigger leave site modal if cta url is going to lead to a page in a different language.
//attach to modal module when built
(function($) {
    function cmpLeaveSiteDialog_Close() {
        $(".cmp-leave-site-modal").fadeOut();
    }

    function cmpLeaveSiteDialog_Open() {
        $(".cmp-leave-site-modal").css({"display":"flex"});
    }

    $(document).ready(function() {

        //trigger
        $("body").on("click", "[data-diff-lang='true'] a,a[data-diff-lang='true']", function(e) {
        	if (!$(this).attr("href").startsWith("#"))
            {
	            e.preventDefault();
	            
	            window.cmpLeaveSiteModalUrl = $(this).attr("href");
	            window.cmpLeaveSiteModalTarget = $(this).attr("target");
	            
	            

	            if($(this).attr("id") == "seeall-mobile") {
	                window.cmpLeaveSiteModalUrl = default_url_base_en;
	            }
	
	            cmpLeaveSiteDialog_Open();
            }
        });

        $("body").on("click",".cmp-leave-site-modal",function(e) {
            cmpLeaveSiteDialog_Close();
        });

        $("body").on("keyup",function(e){
            switch(e.which) {
                case 27: cmpLeaveSiteDialog_Close();
            }
        });

        $(".cmp-leave-site-modal").on("click",".cmp-leave-site-modal__button-yes", function(e) {
            e.stopPropagation();
            
            if(window.cmpLeaveSiteModalTarget == "_blank") {
                window.open(window.cmpLeaveSiteModalUrl, window.cmpLeaveSiteModalTarget);
                cmpLeaveSiteDialog_Close();
            } else {
                window.location = window.cmpLeaveSiteModalUrl;
                cmpLeaveSiteDialog_Close();
            }
        });

        $(".cmp-leave-site-modal").on("click",".cmp-leave-site-modal__button-no", function(e) {
            cmpLeaveSiteDialog_Close();
        });

       


    });

})(jQuery);