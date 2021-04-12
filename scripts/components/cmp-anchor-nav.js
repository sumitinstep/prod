(function($) {
        //initial tab 
    window.cmpAnchorNav = {
        config: {init : false },
        isScrolling : false,
        firstAnchor : undefined,
        init : function(){
            var _ = this;
            
            if( _.config.init ) return;
            _.config.init = true;
            _.currentScroll = window.scrollY;
            _.firstAnchor = $(".anchor-navigation__tabs-tab").first().find("a").attr("href");
            

            setInterval(function() {
                if(window.scrollY == _.currentScroll) {
                    if(_.isScrolling) {
                        
                        _.setActiveTabOnScroll();
                        _.isScrolling = false;
                    } else {
                        return;
                    }
                } else {
                    _.isScrolling = true;
                    var show = false;
                    if(_.currentScroll > window.scrollY) {
                        show = true;
                    }
                    
                    _.currentScroll = window.scrollY;
                    _.setNavigationSticky(show);
                }

            }, 250);

            $(window).resize(function() {
                _.window_resize();
            }).resize();

            $(".anchor-navigation__tabs-tab a").click(function() {
                _.tab_onclick(this);   
                return false; 
            });

            $(".mobile .anchor-navigation__tabs").swipe({
                swipe: function(e, direction) {
                    _.navigation_touch(_, e, direction);
                }
            });

            $(".mobile .anchor-navigation__arrow").click(function() {
                _.mobileNavigation("next");
            });
            
            
            var anchor = _.firstAnchor;
            if(window.location.hash.startsWith("#")) {
                _.isScrolling = true;
                _.currentScroll = window.scrollY;
                anchor = window.location.hash;
            }
            _.setActiveTab(anchor);
            
        },

        
        window_resize : function() {
            if(true) {
                $(".mobile .anchor-navigation__tabs-tab").css({
                    "width": $(".mobile .anchor-navigation__tabs-wrapper").width()
                });
            }

        },

        setActiveTab : function(anchor) {
            var _ = this;
            
            var desktopTab = $(".desktop [href='" + anchor + "']").closest("li");
            var mobileTab = $(".mobile [href='" + anchor + "']").closest("li");            
            
            //if tab is currently active, exit to avoid re-animating
            if(desktopTab.hasClass("active")) return;

            //clear current active tab
           
            
            //animate indicator to new active tab
            $(".desktop .anchor-navigation__tabs-indicator").animate({
                 "width": desktopTab.width(),
                 "left": desktopTab.position().left + 12
            },250, function() { 
                $(".anchor-navigation__tabs-tab.active").removeClass("active");
                $(desktopTab).addClass("active"); 
            });


            //animate mobile navto new tab, adjust indicator, set new tab active
            $(".mobile .anchor-navigation__tabs").first().animate({
                "margin-left" : -1 * $(mobileTab).position().left
            },250, function() {
                    $(mobileTab).addClass("active");
                    $(".mobile .anchor-navigation__tabs-indicator").animate({
                        "width": mobileTab.find("a").width(),
                    },250);
                }
            );

        },
        
        tab_onclick: function(control) {
            //if($(control).closest("li").hasClass("active")) return;
            
            var _ = this;
            
            var anchor = $(control).attr("href");
            var offset =  100;

            if(! $(".anchor-navigation").hasClass("sticky")) {
                offset = 275;
            }
            
            _.isScrolling = true;

            $("html,body").animate({"scrollTop": $(anchor).offset().top - offset},500, function() { 
                _.setActiveTab(anchor);
                _.isScrolling = false;
                _.currentScroll = window.scrollY;
                _.setNavigationSticky();
            });


            return false;
        
        },

        setNavigationSticky: function(show) {
            var _ = this;
            var primaryNav = $(".cmp-header");
            var anchorNav = $(".anchor-navigation");
            
            if((anchorNav.offset().top - window.scrollY) <= primaryNav.outerHeight()) {
                $("body").addClass("anchor-nav-sticky");

                anchorNav.addClass("sticky"); //.css({top : primaryNav.outerHeight()});

                if(show) {
                    _.menu_show(false);
                } else {
                    _.menu_hide();
                }

            } else {
                _.menu_show(true);
               
            }
        },

        menu_show : function(unstick) {
            var _ = this;
            var primaryNav = $(".cmp-header");
            var anchorNav = $(".anchor-navigation");

            primaryNav.animate({ "top" : 0 }, 250);

            $(".anchor-navigation__wrapper").animate(
                {  top: primaryNav.outerHeight() },
                250,
                function() {
                    if(unstick) {
                        anchorNav.removeClass("sticky");
                        $("body").removeClass("anchor-nav-sticky");
                        _.setActiveTab(_.firstAnchor);
                    }
                }
            );
        },

        menu_hide : function() {
            var _ = this;
            var primaryNav = $(".cmp-header");
            var anchorNav = $(".anchor-navigation");
            
            primaryNav.animate({ "top" : -1 * primaryNav.outerHeight() }, 250, function() {
                        $("body").addClass("anchor-nav-sticky");
                        anchorNav.addClass("sticky"); //.css({top : primaryNav.outerHeight()});
                    });

            $(".anchor-navigation__wrapper").animate({top: 0}, 250);
        },

        currentScroll : undefined,

        setActiveTabOnScroll : function() {
            var _ = this;
           
            //find bottom most anchor that scrolled above halfway
            var tabs = $(".post-case_studies__detail-section");
            var lastTab = null;

            tabs.each(function(){
                var sectionOffset = $(this).offset().top - window.scrollY;
                
                //sectionOffset > _.getHeaderHeight() &&
                if( sectionOffset < $(window).height() / 2) {
                    lastTab = $(this);
                    
                }
            });

            if(lastTab != null) _.setActiveTab("#" + lastTab.attr("id"));
        },
        
        getHeaderHeight : function() {
            var _ = this;
            var height = $(".cmp-header").outerHeight();
            if($(".anchor-navigation").hasClass("sticky")) {
                height += $(".anchor-navigation__wrapper").outerHeight()
            }

            return height;
        },

        mobileNavigation : function(tab) {
            var _ = this;
            var activeTab = $(".mobile .anchor-navigation__tabs-tab.active");
            var newTab = null;
            switch(tab) {
                case "next":
                    newTab = activeTab.next();
                    break;
                case "prev" : 
                    newTab = activeTab.prev();
                    break;
            }

            if(newTab != null && newTab.length > 0) {
                var anchor = newTab.find("a").attr("href");
                var offset = _.getHeaderHeight() + 12;

                _.isScrolling = true;
                
                $("html,body").animate({"scrollTop": $(anchor).offset().top - offset },500, function() { 
                    _.setActiveTab(anchor);
                    _.isScrolling = false;
                    _.currentScroll = window.scrollY;
                });

                //_.setActiveTab(anchor);
            }
        },

        navigation_touch : function(_, e, direction) {
            
            switch(direction) {
                case "left":
                    _.mobileNavigation("next"); 
                    break;
                case "right" : 
                    _.mobileNavigation("prev"); 
                    break;
            }
            
            return true;
        },
    };

    $(document).ready(function() {
        if($(".anchor-navigation").length > 0) {
            window.cmpAnchorNav.init();
        }
    });
})(jQuery);