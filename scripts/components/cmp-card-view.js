(function ($) {
	var cmpCardView = function () {
		$(document).ready(function () {
			//size all items the same

			$(window).resize(function () {
				
				var cmp = $('.cmp-card-view');
				
				if (cmp.length) {
					
					var cardCookie = get_serialize_cookie('card-view-item');
					var componentCookie = get_serialize_cookie('card-view-id')
					
					cmp.each(function () {

						$(this).find('.owl-item').each(function(i){
							$(this).val(i);
						});
						
						if( componentCookie == $(this).attr('id') && cardCookie ){	
							console.log('cardCookie'+cardCookie);
							$(this).find('.cmp-card-view__content-row').trigger("to.owl.carousel", (cardCookie));
						}

						var maxHeight = 0;
						$(this).find(".cmp-card-view__item-block").each(function () {
							if ($(this).outerHeight() > maxHeight) {
								maxHeight = $(this).outerHeight();
							}
						});
						$(this).find(".cmp-card-view__item-block").css({ "height": maxHeight });
						var carousel = $(this).find(".cmp-card-view__content-row");

						//if ($(window).width() < 960) {
						if(!window.matchMedia("screen and (min-width: 960px)").matches) {

							carousel.owlCarousel({
								items: 1,
								nav: true,
								responsive: {
									0: {
										items: 1
									},
									600: {
										items: 1
									},
									959: {
										items: 1
									}
								}
							});

							//link controls here

						} else {
							carousel.owlCarousel('destroy');
						}

						$(this).find('.owl-nav button').click(function(){
							
								var cardId = $(this).closest('.cmp-card-view').find('.owl-item.active').val();
								var componentId = $(this).closest('.cmp-card-view').attr('id');

								console.log(componentId);

								set_serialize_cookie('card-view-item',cardId );
								set_serialize_cookie('card-view-id',componentId );

						});
						
						$(this).find('.owl-dots button').click(function(){
							
								var cardId = $(this).index();
								var componentId = $(this).closest('.cmp-card-view').attr('id');

								set_serialize_cookie('card-view-item',cardId );
								set_serialize_cookie('card-view-id',componentId );
								
						});

					});
				}
				
			}).resize();	
			
			
			
		});
	}();
})(jQuery);
