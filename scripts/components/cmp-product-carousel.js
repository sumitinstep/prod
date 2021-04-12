(function ($) {
	var cmpCardView = function () {
		$(document).ready(function () {
			//size all items the same
			$(window).resize(function () {
				var cmp = $('.cmp-product-carousel');
				if (cmp.length) {
					cmp.each(function () {
						var component = $(this);
						if(window.matchMedia("screen and (min-width: 0px)").matches) {
							items = 1;
							margin = 12;
						}

						if(window.matchMedia("screen and (min-width: 576px)").matches) {
							items = 2;
							margin = 12;
						}

						if(window.matchMedia("screen and (min-width: 960px)").matches) {
							items = 1;
							margin = 30;
						}

						if(window.matchMedia("screen and (min-width: 1160px)").matches){
							items = 2;
							margin = 30;
						}

						var carousel = component.find(".cmp-product-carousel__carousel");
							carousel.owlCarousel("destroy");
							carousel.owlCarousel({
								items: items,
								margin: margin,
								nav: true,
								responsive: false
								
							});

						//adjust mask show/hide

						if ( component.find('button.owl-next').hasClass('disabled') ){
							component.find('.cmp-product-carousel__mask-trailing').css('display', 'none');
						} else {
							component.find('.cmp-product-carousel__mask-trailing').css('display', 'block');
						}
						
						component.find('.owl-nav button').click(function(){
							if( component.find('button.owl-next').hasClass('disabled') ){
								component.find('.cmp-product-carousel__mask-trailing').css('display', 'none');
							}else{
								component.find('.cmp-product-carousel__mask-trailing').css('display', 'block');
							}
						});

						//adjust mask width

						component.find(".cmp-product-carousel__mask").css({"width":  component.find(".row").offset().left});
						component.find(".cmp-product-carousel__mask-trailing").css({"width": component.find(".row").offset().left  });
					});
				}
			}).resize();			
		});
	}();
})(jQuery);