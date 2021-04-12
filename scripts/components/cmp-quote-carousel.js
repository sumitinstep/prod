(function ($) {

	$(document).ready(function () {

		
		var cmp = $('.cmp-carousel-quote');
		
		if (cmp.length) {

			cmp.each(function () {

				var quote = $(this);
				var carousel = quote.find(".quote-carousel");
				
				carousel.owlCarousel({
					items : 1,
					nav : false,
					dots : false,
					animateOut: true,
					animateIn: true
				});  

				var quote_parent = $(this).find(".owl-item.active");
				$(this).find('span.first-stat').html( quote_parent.children().data('quote') );

				carousel.on('changed.owl.carousel', function(event) {
					setTimeout(function(){ 

						quote.find('span.first-stat').html( event.item.index + 1 );	

						var current_width = $(window).width();
						carousel.find('.owl-stage > .owl-item.active').attr('style','display:block;opacity:1;margin-left:0px;min-width:'+current_width+'px;width:'+current_width+'px');
						
					}, 600);
				});
				
				carousel.on("dragged.owl.carousel", function (event) {
				});
				
				cmp.find('.owl-stage > .owl-item').each(function(){
					if ($(this).index()>1)
					{
						var current_width = $(window).width();
						$(this).attr('style','display:block;opacity:0;margin-left:-50px;min-width:'+current_width+'px;width:'+current_width+'px;');
					}					
				});
				
				setTimeout(function(){ 
					
					quote.find('.owl-item.active .quote-sign-slide').attr('style','');
					var position_top = quote.find('.owl-item.active .quote-sign-slide').offset().top;
					var position_left = quote.find('.owl-item.active .quote-sign-slide').offset().left;
					quote.find('.owl-item.active .quote-sign-slide').hide();
					var ele = quote.find('.quote-sign');
					ele.attr('style','top:'+position_top+'px!important; left:'+position_left+'px!important;display:block!important;');
					
				}, 600);
				
				$(window).on('resize', function(){
					
					quote.find('.quote-sign').hide();
					setTimeout(function(){ 
						quote.find('.owl-item.active .quote-sign-slide').show();
						var position_top = quote.find('.owl-item.active .quote-sign-slide').offset().top;
						var position_left = quote.find('.owl-item.active .quote-sign-slide').offset().left;
						if (position_top >0)
						{
							var ele = quote.find('.quote-sign');
							ele.attr('style','top:'+position_top+'px!important; left:'+position_left+'px!important;display:block!important;');
						}
						quote.find('.owl-item.active .quote-sign-slide').each(function(){  $(this).hide();  });
					}, 1600);	
					
					carousel.find('.owl-item').each(function(){
						$(this).attr('style','');
					});
					
				});
				
				$(window).scroll(function() {
					quote.find('.quote-sign').hide();					
					quote.find('.owl-item.active .quote-sign-slide').show();
					var position_top = quote.find('.owl-item.active .quote-sign-slide').offset().top;
					var position_left = quote.find('.owl-item.active .quote-sign-slide').offset().left;
					var ele = quote.find('.quote-sign');
					ele.attr('style','top:'+position_top+'px!important; left:'+position_left+'px!important;display:block!important;');
					quote.find('.quote-sign-slide').each(function(){
						$(this).hide();
					});					
			    });
				
				
				$(this).find('.quote-nav__next').click(function() {
					var component = $(this).closest('.cmp-carousel-quote');
					component.find('.owl-item.active .quote-sign-slide').show();
					var position_top = $(this).closest('.cmp-carousel-quote').find('.owl-item.active .quote-sign-slide').offset().top;
					var position_left = $(this).closest('.cmp-carousel-quote').find('.owl-item.active .quote-sign-slide').offset().left;
					var ele = $(this).closest('.cmp-carousel-quote').find('.quote-sign');
					ele.attr('style','top:'+position_top+'px!important; left:'+position_left+'px!important;display:block!important;');
					$(this).closest('.cmp-carousel-quote').find('.quote-sign-slide').each(function(){
						$(this).hide();
					});

					var total_slide =  component.find('.owl-stage > .owl-item').length;
					var from_slide_number = component.find('.owl-stage > .owl-item.active').index();
					var real_from_slide_number = from_slide_number+1;
					var to = from_slide_number+1;
					var real_to = to+1;
					var current_width = $(window).width();
					var current_height = $(window).height();

					if (real_to <= total_slide)
					{
						component.removeClass('witheffect');
						
						component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.auhor1').attr('style','display:none;opacity:0;margin-left:-20px;');
						component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.position').attr('style','display:none;opacity:0;margin-left:-40px;');
						//component.find('.owl-stage > .owl-item:nth-child('+real_to+') blockquote').attr('style','display:block;opacity:0.3;margin-left: -30px;width:100%;');
						
						component.find('.owl-stage > .owl-item:nth-child('+real_from_slide_number+')').attr('style','opacity:1;margin-left:0px;min-width:'+current_width+'px;width:'+current_width+'px;');
						component.find('.owl-stage > .owl-item:nth-child('+real_to+')').attr('style','display:none;opacity:0;margin-left:-50px;min-width:'+current_width+'px;width:'+current_width+'px;');
						
						
						
						
						component.addClass('witheffect');  
						
						
						component.find('.owl-stage > .owl-item:nth-child('+real_from_slide_number+')').attr('style','opacity:0;margin-left:-50px;min-width:'+current_width+'px;width:'+current_width+'px;');
							
						setTimeout(function(){ 
							
							component.removeClass('witheffect');
							
							carousel.trigger('next.owl.carousel', [0]);	
	
							component.addClass('witheffect');
							
							component.find('.owl-stage > .owl-item:nth-child('+real_to+')').attr('style','display:block;opacity:0;margin-left:-50px;min-width:'+current_width+'px;width:'+current_width+'px;');
											
							setTimeout(function(){ 

								component.find('.owl-stage > .owl-item:nth-child('+real_to+')').attr('style','display:block;opacity:1;margin-left:0px;min-width:'+current_width+'px;width:'+current_width+'px;');
								
								component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.auhor1').attr('style','display:block;opacity:1;margin-left:-20px');
								component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.position').attr('style','display:block;opacity:1;margin-left:-40px');
								//component.find('.owl-stage > .owl-item:nth-child('+real_to+') blockquote').attr('style','display:block;opacity:0.5;margin-left: -20px;width:100%;');
								
								
								setTimeout(function(){ 
									
									component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.auhor1').attr('style','display:block;opacity:1;margin-left:0px');
									component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.position').attr('style','display:block;opacity:1;margin-left:0px');
									//component.find('.owl-stage > .owl-item:nth-child('+real_to+') blockquote').attr('style','display:block;opacity:1;margin-left: 0px;width:100%;');
									
								}, 100);
	
								component.find('.owl-stage > .owl-item:nth-child('+real_from_slide_number+')').attr('style','opacity:1;margin-left:0px;min-width:'+current_width+'px;width:'+current_width+'px;');
								
							}, 100);
							
						}, 400);
						
						
						setTimeout(function(){ 

							//component.removeClass('witheffect');
							
							//reset
							//component.find('.owl-item').each(function(){
							//	$(this).attr('style','');
							///});
						
						}, 2000);
					}
					 
					/*
					setTimeout(function(){ 
						ele.attr('style','top:'+position_top+'px!important; left:'+position_left+'px!important;display:block!important;');
					}, 800);
					*/
	 
				})

				$(this).find('.quote-nav__prev').click(function() {
					
					var component = $(this).closest('.cmp-carousel-quote');
					component.find('.owl-item.active .quote-sign-slide').show();
					var position_top = $(this).closest('.cmp-carousel-quote').find('.owl-item.active .quote-sign-slide').offset().top;
					var position_left = $(this).closest('.cmp-carousel-quote').find('.owl-item.active .quote-sign-slide').offset().left;
					var ele = $(this).closest('.cmp-carousel-quote').find('.quote-sign');
					ele.attr('style','top:'+position_top+'px!important; left:'+position_left+'px!important;display:block!important;');
					$(this).closest('.cmp-carousel-quote').find('.quote-sign-slide').each(function(){
						$(this).hide();
					});
					
					var from_slide_number = component.find('.owl-stage > .owl-item.active').index();
					var real_from_slide_number = from_slide_number+1;
					var to = from_slide_number-1;
					var real_to = to+1;
					var current_width = $(window).width();

					if (to>=0)
					{
					
						component.removeClass('witheffect');
						
						component.find('.owl-stage > .owl-item:nth-child('+real_from_slide_number+')').attr('style','opacity:1;margin-left:0px;min-width:'+current_width+'px;width:'+current_width+'px');
						component.find('.owl-stage > .owl-item:nth-child('+real_to+')').attr('style','display:none;opacity:0;margin-left:-50px;min-width:'+current_width+'px;width:'+current_width+'px');
						component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.auhor1').attr('style','display:none;opacity:0;margin-left:-20px;');
						component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.position').attr('style','display:none;opacity:0;margin-left:-50px;');
						//component.find('.owl-stage > .owl-item:nth-child('+real_to+') blockquote').attr('style','display:block;opacity:0.2;margin-left: -30px;width:100%;');
						
						
						component.addClass('witheffect');
						
						component.find('.owl-stage > .owl-item:nth-child('+real_from_slide_number+')').attr('style','opacity:0;margin-left:-50px;min-width:'+current_width+'px;width:'+current_width+'px');
						
						carousel.trigger('prev.owl.carousel', [0]);	
							
						//setTimeout(function(){ 
							//ele.attr('style','top:'+position_top+'px!important; left:'+position_left+'px!important;display:block!important;');
						//}, 800);

						setTimeout(function(){ 
							
							component.find('.owl-stage > .owl-item:nth-child('+real_from_slide_number+')').attr('style','display:none;opacity:0;margin-left:-50px;min-width:'+current_width+'px;width:'+current_width+'px');
							component.find('.owl-stage > .owl-item:nth-child('+real_to+')').attr('style','display:block;opacity:0;margin-left:-50px;min-width:'+current_width+'px;width:'+current_width+'px');
							//component.find('.owl-stage > .owl-item:nth-child('+real_to+') blockquote').attr('style','display:block;opacity:0.5;margin-left: -20px;width:100%;');
							
							component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.auhor1').attr('style','display:block;opacity:1;margin-left:-20px');
							component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.position').attr('style','display:block;opacity:1;margin-left:-40px');
						
							setTimeout(function(){ 
								
								component.find('.owl-stage > .owl-item:nth-child('+real_to+')').attr('style','display:block;opacity:1;margin-left:0px;min-width:'+current_width+'px;width:'+current_width+'px');

								component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.auhor1').attr('style','display:block;opacity:1;margin-left:0px');
								component.find('.owl-stage > .owl-item:nth-child('+real_to+') cite.position').attr('style','display:block;opacity:1;margin-left:0px');
								//component.find('.owl-stage > .owl-item:nth-child('+real_to+') blockquote').attr('style','display:block;opacity:1;margin-left: 0px;width:100%;');
								
							}, 200);
							
						}, 400);
					
					}
					
				})
				
			});
		}

	});

})(jQuery);
