(function($){
    window.CmpJobLocationMap = {
        config : { init : false},
        baseClass : undefined,
        isMobile : false,
        navMargin : 0,
        init : function() {
            var _ = this;
            if(_.config.init) return;
            
            _.baseClass = ".cmp-job-location-map";
            _.config.init = true;

            $(_.baseClass + "__navigation-control").click(function(e) { _.nav_control_click(this); });
            $(_.baseClass + "__map-item").click(function(e) { e.stopPropagation(); _.map_item_click(this); return false;});
            $(_.baseClass + "__navigation-item").click(function(e) { e.stopPropagation(); _.nav_item_click(this); return false;});

            $(_.baseClass + "__navigation-container").swipe({
                swipe: function(e, direction) {
                    _.navigation_touch(_, e, direction);
                }
            });

            $(window).resize(function() {
                _.window_resize();
            }).resize();

            
            //activate first location
            _.navigateTo($(_.baseClass + "__navigation-item").first().data("office-id"));
        },

        navigateTo : function(officeId) {
            var _ = this;
            //remove active classes
            var currentActive = $(_.baseClass + "__navigation-item.active");
            $(_.baseClass + "__map-item.active").removeClass("active");
            $(_.baseClass + "__navigation-item.active").removeClass("active");
            //add active class to items
            $(_.baseClass + "__map-item[data-office-id='" + officeId + "']").addClass("active");

            var navItem = $(_.baseClass + "__navigation-item[data-office-id='" + officeId + "']");
            navItem.addClass("active");

            var navItemLeft = navItem.position().left;
            var navItemRight = navItem.position().left + navItem.outerWidth(true);
            
                        
            if(_.isMobile) {
                _.navMargin = -1 * navItemLeft - 12;
                var mapItemX = $(_.baseClass + "__map-item.active").position().left;

                $(_.baseClass + "__map-col").animate({
                    scrollLeft : mapItemX - ($(window).width() - $(_.baseClass + "__map-item.active").outerWidth()) / 2
                }, 250);
            } else {
                if(navItemRight + 12 > $(_.baseClass + "__navigation-container").outerWidth()) {
                    if(currentActive.position().left > navItemLeft) {
                        _.navMargin += navItem.outerWidth(true);
                    } else {
                        _.navMargin -= navItem.outerWidth(true);
                    }

                } else {
                    _.navMargin = 0;
                }

            }
            
            $(_.baseClass + "__navigation").animate({ "margin-left" : _.navMargin },250);

            $(".job-location-section").not("[data-office-id='" + officeId + "']").fadeOut(250)
            $(".job-location-section[data-office-id='" + officeId + "']").fadeIn(250);

            //enable / disble nav controls if there's no next or previous button
            $(_.baseClass + "__navigation-control.next").prop("disabled", navItem.next().length == 0 );
            $(_.baseClass + "__navigation-control.previous").prop("disabled", navItem.prev().length == 0);
            
        },

        map_item_click : function(control) {
            var _ = this;
            var officeId = $(control).data("office-id");
            _.navigateTo(officeId);
        },

        nav_item_click : function(control) {
            var _ = this;
            var officeId = $(control).data("office-id");
            _.navigateTo(officeId);
        },

        nav_control_click : function(control) {
            var _ = this;
            if($(control).hasClass("previous")) {
                var prev = $(_.baseClass + "__navigation-item.active").prev();
                if(prev.length > 0) {
                    _.navigateTo(prev.data("office-id"));
                }
            } else {
                var next = $(_.baseClass + "__navigation-item.active").next();
                if(next.length > 0) {
                    _.navigateTo(next.data("office-id"));
                }
            }
        },

        navigation_touch : function(_, e, direction) {

            switch(direction) {
                case "right":
                    var prev = $(_.baseClass + "__navigation-item.active").prev();
                    if(prev.length > 0) {
                        _.navigateTo(prev.data("office-id"));
                    }
                    
                    break;
                case "left" : 
                    var next = $(_.baseClass + "__navigation-item.active").next();
                    if(next.length > 0) {
                        _.navigateTo(next.data("office-id"));
                    }

                    break;
            }
            
            return true;
        },
        
        window_resize : function() {
            var _ = this;

            var itemWidth = 0;
            
            if(window.matchMedia("screen and (max-width: 767px)").matches) {
                _.isMobile = true;
                $(_.baseClass + "__navigation-item").css({ 
                    "width" : $( _.baseClass + "__navigation-container").outerWidth() 
                });
            } else {
                _.isMobile = false;
                $(_.baseClass + "__navigation li").css({ "width" : "auto"});
            }

            $(_.baseClass + "__navigation li").each(function() {
                itemWidth += $(this).outerWidth(true);
            });

            $(_.baseClass + "__navigation").css({"width" : itemWidth });
        }

    }

    $(document).ready(function() {
        if( $(".cmp-job-location-map").length > 0 ) {
            $(".job-location-section").hide();
            window.CmpJobLocationMap.init();
        }
    });

})(jQuery);