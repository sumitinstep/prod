(function($) {
    var updateWebinarTimezone = function () {
        $(".webinar-info").each(function() {
            try {
                var webinarPt = $(this).find("[name='webinar-pt']").val();
                var mm = (new moment(webinarPt)).tz(moment.tz.guess());
                

                if($("body").hasClass("single-webinars")) {
                    $(this).find(".webinar-date").text(mm.format("dddd, MMMM D")); 
                } else {
                    $(this).find(".webinar-date").text(mm.format("ddd MMM D")); 
                }
                $(this).find(".webinar-time").text(mm.format("h:mm A z"));
            } catch(e) {
                //do nothing, leave date/time as is from server
            }
        });
    }
    $(document).ready(function() {
        updateWebinarTimezone();
        $("body").on("webinarFilterLoadComplete", function(){  
            updateWebinarTimezone();
        });
    });
    
})(jQuery);