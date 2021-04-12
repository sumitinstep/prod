// In your Javascript (external .js resource or <script> tag)
jQuery(function( $ ){

	$( document ).ready(function(){
		
		$( ".layout-fullwidth_image, .layout-no_image" ).each(function(index) {
			var imgurl = $(this).find('#accordion-1.acc-img').val();
			
			$(this).find('.cmp-accordion-card-images__wrapper').css('background-image', 'url('+imgurl+')');
			$(this).find('#accordion-1-copy.acc-card').show();
			$(this).find('.acc-button-1').parent().addClass('active');
			$(this).find('.acc-button-1').children('#acc-icon').addClass('active');			
		});
		
		$( ".layout-50_image" ).each(function(index) {
			var imgurl = $(this).find('#accordion-1.acc-img').val();

			$(this).find('.cmp-accordion-card-images__wrapper .right_50_image').css('background-image', 'url('+imgurl+')');
			$(this).find('#accordion-1-copy.acc-card').show();
			$(this).find('.acc-button-1').parent().addClass('active');
			$(this).find('.acc-button-1').children('#acc-icon').addClass('active');			
		});

	});
	
	$('.layout-fullwidth_image .accordion a').click(function(){

		$(this).closest('.cmp-accordion-card-images').find('.accordion').each(function(){
			$(this).removeClass('active');
		});

		$(this).closest('.cmp-accordion-card-images').find('.icons').each(function(){
			$(this).removeClass('active');
		});

		$(this).closest('.cmp-accordion-card-images').find('.acc-card, .acc-img').hide();

		var id = $(this).data('accordion-id');

		$(this).closest('.accordion').addClass('active');
		$(this).find('#acc-icon').addClass('active');

		$(this).closest('.cmp-accordion-card-images').find('#'+id+'-copy.acc-card').show();

		var imgurl = $(this).closest('.cmp-accordion-card-images').find('#'+id+'.acc-img').val();

		if ($(window).width() >= 1024)
		{			
			$(this).parents('.cmp-accordion-card-images__wrapper').css('background-image', 'url('+imgurl+')');
		
			var targetOffset = $(this).closest('.cmp-accordion-card-images').offset().top-50;
			$('html, body').animate({scrollTop: targetOffset}, 200);
		}
		else
		{
			var targetOffset = $(this).closest('.accordion').offset().top-50;
			$('html, body').animate({scrollTop: targetOffset}, 200);			
		}

		$(this).closest('.cmp-accordion-card-images__wrapper').css('background-image', 'url('+imgurl+')');
	});
	
	
	$('.layout-no_image .accordion a').click(function(){
		
		$(this).closest('.cmp-accordion-card-images').find('.accordion').each(function(){
			$(this).removeClass('active');
		});

		$(this).closest('.cmp-accordion-card-images').find('.icons').each(function(){
			$(this).removeClass('active');
		});

		$(this).closest('.cmp-accordion-card-images').find('.acc-card, .acc-img').hide();

		var id = $(this).data('accordion-id');

		$(this).closest('.accordion').addClass('active');
		$(this).find('#acc-icon').addClass('active');

		$(this).closest('.cmp-accordion-card-images').find('#'+id+'-copy.acc-card').show();

		var imgurl = $(this).closest('.cmp-accordion-card-images').find('#'+id+'.acc-img').val();

		if ($(window).width() >= 1024)
		{			
			// var targetOffset = $(this).closest('.cmp-accordion-card-images').offset().top-50;
			// $('html, body').animate({scrollTop: targetOffset}, 200);
		}
		else
		{
			var targetOffset = $(this).closest('.accordion').offset().top-50;
			$('html, body').animate({scrollTop: targetOffset}, 200);			
		}
	});
	
	
	$('.layout-50_image .accordion a').click(function(){
		
		$(this).closest('.cmp-accordion-card-images').find('.accordion').each(function(){
			$(this).removeClass('active');
		});

		$(this).closest('.cmp-accordion-card-images').find('.icons').each(function(){
			$(this).removeClass('active');
		});

		$(this).closest('.cmp-accordion-card-images').find('.acc-card, .acc-img').hide();

		var id = $(this).data('accordion-id');
		
		$(this).closest('.accordion').addClass('active');
		$(this).find('#acc-icon').addClass('active');

		$(this).closest('.cmp-accordion-card-images').find('#'+id+'-copy.acc-card').show();

		var imgurl = $(this).closest('.cmp-accordion-card-images').find('#'+id+'.acc-img').val();
		if ($(window).width() >= 1024)
		{			
			$(this).closest('.cmp-accordion-card-images__wrapper').find('.right_50_image').css('background-image', 'url('+imgurl+')');
			
			// var targetOffset = $(this).closest('.cmp-accordion-card-images').offset().top-50;
			// $('html, body').animate({scrollTop: targetOffset}, 200);
		}
		else
		{
			var targetOffset = $(this).closest('.accordion').offset().top-50;
			$('html, body').animate({scrollTop: targetOffset}, 200);			
		}

		$(this).closest('.cmp-accordion-card-images__wrapper').find('.right_50_image').css('background-image', 'url('+imgurl+')');
	});

});
