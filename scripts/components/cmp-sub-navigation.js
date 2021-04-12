(function($) {
    window.cmpSubNavigation = {
        config: { init: false },
        isScrolling : false,
        componentClass : undefined,
        isAnchorNav : true,
        currentScroll : 0,
        scrollHandler : undefined,
        init : function() {
            var _ = this;
            if(_.config.init) return;

            _.config.init = true;
            _.componentClass = ".cmp-sub-navigation";
            _.currentScroll = window.scrollY;
            _.isAnchorNav = $(_.componentClass).data("subnav-anchor") == true ? true : false;

            $(_.componentClass + "__wrapper").hide();

            $(_.componentClass + " .desktop .cmp-sub-navigation__items-item").click(function() { return _.item_click(this); });
            $(_.componentClass + " .mobile .cmp-sub-navigation__items-select").click(function() { return _.mobileMenu_toggle(); });
            $(_.componentClass + " .cmp-sub-navigation__dropdown .cmp-sub-navigation__items-item a").click(function(e) {  _.mobileItem_click(this); });

            $(window).resize(function() { _.window_resize() });

            _.startScrolling();

            //force sticky if component had sticky on load
            if( $(_.componentClass).hasClass("sticky") ) {
                $(_.componentClass + "__wrapper").css({"top" : $(".cmp-header").outerHeight() });
            }

            //delay setting sticky after page load then click anchor link if exists
            setTimeout(function() {
              $(_.componentClass + "__wrapper").show();
              _.setNavigationSticky(false);
              if(window.location.hash.startsWith("#")) {
                anchorId = window.location.hash;
                if ( anchorId != "#tabs" ) {
                    $("[href='" + anchorId + "']").parent().click();
                }
            }
            }, 250);
        },
        startScrolling : function() {
            var _ = this;
            _.scrollHandler = setInterval(function() { 
                if(_.pauseScrolling) return;
                if(window.scrollY == _.currentScroll) {
                    if(_.isScrolling) {
                        _.setActiveTabOnScroll();
                        _.isScrolling = false;
                    }
                    return;
                } else {
                    _.isScrolling = true;
                    _.currentScroll = window.scrollY;
                    _.setNavigationSticky(false);
                }
             }, 50);
        },
        pauseScrolling: false,
        
        setActiveTabOnScroll : function() {
            
            var _ = this;
            
            if(!_.isScrolling) return;
            if(_.isAnchorNav == false) return;

            //find bottom most anchor that scrolled above halfway
            var tabs = $(".cmp-sub-navigation-anchor");
            var lastTab = null;

            tabs.each(function(){
                var sectionOffset = $(this).offset().top - window.scrollY;
                
                //sectionOffset > _.getHeaderHeight() &&
                if( sectionOffset < $(window).height() / 2) {
                    lastTab = $(this);
                    
                }
            });

            if(lastTab != null) { 
                _.setActiveItem("#" + lastTab.attr("id"));
            }
            else {
                $(_.componentClass + "__items-item.active").removeClass("active");
            }
        },

        setActiveItem : function(anchorId) {
            var _ = this;
            if(_.isAnchorNav == false) return;
            
            $(_.componentClass + "__items-item.active").removeClass("active");
            var anchor = $(_.componentClass + "__items-item a[href='" + anchorId + "']");
            anchor.closest("li").addClass("active");

            $(_.componentClass + "__items-select strong").html( anchor.html() );
        },

        item_click : function(control) {
            var _ = this;
            _.isScrolling = false;
            _.pauseScrolling = true;
            
            
            var anchorId = $(control).find("a").attr("href");
            var anchor = $(anchorId);
            
            //force compact header
            $(".cmp-header").addClass("compact");
            _.setNavigationSticky(true);

            var offset =  $(".cmp-header").outerHeight() + $(_.componentClass + "__wrapper").outerHeight();
            
            $("html,body").animate({"scrollTop": $(anchorId + " ~ div," + anchorId + " ~ span").first().offset().top - offset},500, function() { 
                _.setActiveItem(anchorId);
                
                _.isScrolling = false;
                _.currentScroll = window.scrollY;
                _.pauseScrolling = false;
            });
            
            return false;
        },

        mobileItem_click : function(control) {
            var _ = this;
            var anchorId = $(control).attr("href");
            var anchor = $(anchorId);

            _.setNavigationSticky(true);
            var offset =  $(".cmp-header").outerHeight() + $(_.componentClass + "__wrapper").outerHeight();
            _.pauseScrolling = true;
            _.mobileMenu_toggle(true); 
                //_.isScrolling = true;
            _.setActiveItem(anchorId);

            $("html,body").animate({"scrollTop": $(anchorId + " ~ div," + anchorId + " ~ span").first().offset().top - offset},500, function() { 
                _.pauseScrolling = false;
                _.isScrolling = false;
                _.currentScroll = window.scrollY;
                
            });
            
            return false;
        },

        mobileMenu_toggle : function(forceClose) { 
            var _ = this;
            //console.log(_.componentClass);
            if( $(_.componentClass + " .mobile").hasClass("open") || forceClose ) {
                $(_.componentClass + " .mobile").removeClass("open");
                $(_.componentClass + "__dropdown").hide();
                
                $("body").css({"overflow" : "auto"});
                
            } else {
                $(_.componentClass + " .mobile").addClass("open");
                $(_.componentClass + "__dropdown").show();
                $("body").css({"overflow" : "hidden"});

            }
            _.resizeDropdown();
            
        },
        window_resize : function() {
            var _ = this;

            _.resizeDropdown();
            _.setNavigationSticky(false);
        },

        resizeDropdown : function() {
            var _ = this;
            
            if( $(_.componentClass + " .mobile").hasClass("open") ) {
                if(window.matchMedia("screen and (min-width: 960px)").matches) {
                    //close the menu if open and screen resized past 960px;
                    _.mobileMenu_toggle(true);
                    return;
                } 
                $(_.componentClass + "__dropdown").css({
                    "height" : ($(window).height() - $(_.componentClass + "__dropdown").position().top ) });
            } else {
                $(_.componentClass + "__dropdown").css({
                    "height" : 0
                });
            }
        },

        setNavigationSticky: function(force) {
            var _ = this;
            var primaryNav = $(".cmp-header");
            var anchorNav = $(_.componentClass);
            
            if((anchorNav.offset().top - window.scrollY) <= primaryNav.outerHeight() || force) {
                $("body").addClass("anchor-nav-sticky");
                anchorNav.addClass("sticky"); 
                $(_.componentClass + "__wrapper").css({"top" : primaryNav.outerHeight() });
            } else {
                anchorNav.removeClass("sticky");
                $("body").removeClass("anchor-nav-sticky");
                $(_.componentClass + "__wrapper").css({"top" : 0 });
            }
        },

        //hide nav items for anchors that don't exist / maybe disable?
        checkAnchors : function() {
            var _ = this;
            $(_.componentClass + "__items-item").each(function() {
                var anchor = $(this).find("a").attr("href");
                if(anchor != undefined && anchor.length > 0 && $(anchor).length == 0) {
                    $(this).hide();
                }

            });
        }

    };

    $(document).ready(function() {
        if($(".cmp-sub-navigation").length > 0) {
            window.cmpSubNavigation.init();
        }
    });
})(jQuery);