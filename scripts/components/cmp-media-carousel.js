(function($)
{
	$(document).ready(function()
	{
		var cmp = $('.cmp-media-carousel');
		if (cmp.length)
		{
			cmp.each(function()
			{
				var active_index = 0;
				var media = $(this);
				var carousel = media.find('.media-carousel');

				var loop = media.attr('data-loop');
				loop = (loop == 'true') ? true : false;

				var owl = carousel.owlCarousel({
					items : 1,
					loop: loop,
					margin: 12,
					nav: false,
					onInitialized: custom_init,
					responsiveClass: true,
					responsive: {
						768: {
							margin: 24
						}
					}
				});

				function custom_init(event)
				{
					active_index = event.item.index;

					setTimeout(function()
					{ 
						playVideo(media, active_index, true);
					}, 800);
				}

				carousel.on('drag.owl.carousel, dragged.owl.carousel', function(event)
				{
					stopAllPlayer();
				});

				carousel.on('changed.owl.carousel', function(event)
				{
					active_index = event.item.index;
					stopAllPlayer();
					setTimeout(function()
					{ 
						playVideo(media, active_index, true);
					}, 800);
				});

				media.find('.icon-pause').on('click', function()
				{
					$(this).closest('.cmp-media-carousel__block').find('.video-image').fadeIn();
					$(this).closest('.cmp-media-carousel__block').find('.video-content').hide();
					stopAllPlayer();
				});

				media.find('.icon-play').on('click', function()
				{
					playVideo(media, active_index, false);
				});

			});	
		}
	});

	function playVideo(media, active_index, check_autoplay)
	{
		var active_item = media.find('.owl-item').eq(active_index);
		var autoplay = active_item.find('.video-block.autoplay').length;
		var play = true;

		if (check_autoplay && (autoplay == 0))
		{
			play = false;
		}

		if (play)
		{
			var vid_image = active_item.find('.video-image');
			var vid_content = active_item.find('.video-content');
			vid_image.hide();
			vid_content.show();
			
			var video_type = 'youtube'; 
			if (active_item.find('.video-block').hasClass('type-upload'))
			{
				video_type = 'upload'; 
			}
			if (active_item.find('.video-block').hasClass('type-wystia'))
			{
				video_type = 'wystia';						
			}
			
			if (video_type == 'youtube')
			{
				var video_id = active_item.find('.video-id').val();
				var html = ' <iframe class="iframe" src="https://www.youtube.com/embed/'+video_id+'?autoplay=1&enablejsapi=1&mute=1" frameborder="0" allowfullscreen"></iframe>';

				vid_content.html(html);
			}
			
			if (video_type == 'wystia')
			{
				var video_id = active_item.find('.video-id').val();	
				var html = ' <iframe src="//fast.wistia.net/embed/iframe/'+video_id+'?videoFoam=true&autoPlay=true&playerColor=67B346" allowtransparency="true" frameborder="0" scrolling="no" class="wistia_embed" name="wistia_embed" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width="100%" height="100%"></iframe><script src="//fast.wistia.net/assets/external/E-v1.js"></script>';

				vid_content.html(html);
			}
			
			if (video_type == 'upload')
			{
				var height = active_item.find('.cmp-media-carousel__image ').outerHeight();
				var width = active_item.find('.cmp-media-carousel__image ').width();
				var video_id = active_item.find('.upload-video-url').val();	
				var html = ' <video style="background-color:#000;" controls="controls" src="'+video_id+'" width="'+width+'" height="'+height+'"  videoHeight="100%"  videoWidth="100%"  autoplay>Your browser does not support the HTML5 Video element.</video>';

				vid_content.html(html);
				vid_content.find('.my-video').show();
			}
		}
	}

	function stopAllPlayer()
	{
		var all_blocks = $('.video-block');
		if (all_blocks.length)
		{
			all_blocks.each(function()
			{
				var video_type = 'youtube'; 
				if ($(this).closest('.video-block').hasClass('type-upload'))
				{
					video_type = 'upload'; 
				}
				if ($(this).closest('.video-block').hasClass('type-wystia'))
				{
					video_type = 'wystia';
				}

				if (video_type=='youtube')
				{
					$(this).find('iframe').remove();
					$(this).find('.video-content').hide();
				}
				if (video_type=='wystia')
				{
					$(this).find('.video-content').hide();
					$(this).find('iframe').remove();
				}
				if (video_type=='upload')
				{
					$(this).find('.video-content').hide();
					$(this).find('.video-content video').remove();
				}

				$(this).closest('.video-block').find('.video-image').show(); 
				$(this).closest('.video-block').find('.video-overlay').hide();
			});
		}
	}
	
})(jQuery);
