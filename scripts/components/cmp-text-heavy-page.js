(function($)
{
	var cmpTextHeavyPage = function()
	{
		$(document).ready(function()
		{
			var cmpClass = '.cmp-text-heavy';
			var cmp = $(cmpClass);
			if (cmp.length)
			{
				cmp.each(function()
				{
					var component = $(this);

					component.find(cmpClass + '__menu-item > a').click(function(e) {
						var href = $(this).attr("href");
						
						if(href.indexOf('#') == 0) {
							if( $(this).parent().hasClass("active") ) {
								$(this).parent().removeClass("active");
							} else {
								$(cmpClass + '__menu-item').removeClass("active");
								$(this).parent().addClass("active");
								$(cmpClass + '__section').hide();
								$(href).show();
							}						
							var headerHeight = $("header.cmp-header").outerHeight();

							window.history.replaceState(null, null, href);
							
							return false;							
							
						} 
												
						return true;
					});


					component.find(cmpClass + '__submenu-item > a').click(function(e) {
						var href = $(this).attr("href");
						if(href.indexOf('#') == 0) {
							//e.preventDefault();
							component.find(cmpClass + '__menu-container').removeClass("open");
							
							
							if(window.matchMedia("screen and (min-width: 960px)").matches) {
								$('html,body').animate({scrollTop: $(href).offset().top - 150 }, 500);
							} else {
								var headerHeight = $(".meraki-mobile-header").outerHeight() + 12;
								$('html,body').animate({scrollTop: $(href).offset().top - 1024 - headerHeight }, 500);
							}

							window.history.replaceState(null, null, href);

						} else {
							return true;
						}
					});

					
					var urlID = window.location.hash;
					var className = urlID.substring(1);

					

					if ( urlID ){

						$(cmpClass + '__menu-item > a.'+className ).parent().addClass("active");
						$(cmpClass + '__section').hide();
						$(cmpClass + '__section'+urlID).show();

						if ( $(cmpClass+ '__subection').attr('id', urlID) ){
							
							$(cmpClass + '__subsection'+urlID).parent().show();
							$(cmpClass + '__submenu-item > a.'+className ).parents(cmpClass + '__menu-item').addClass("active");
							$('html,body').animate({scrollTop: $(urlID).offset().top - 150 }, 500);
						
						}
					
					} else {
					
						$(cmpClass + '__menu-item').first().addClass('active');
						$(cmpClass + '__menu-mobile-control').click(function(e) { e.preventDefault(); $(this).parent().toggleClass("open"); });
					
					}

				});
			}
		});
	}();
})(jQuery);