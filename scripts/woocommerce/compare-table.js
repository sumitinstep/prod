(function($)
{
	var compareTable = function()
	{
		$(document).ready(function()
		{
			var cmp = $('.compare-table');
			if (cmp.length)
			{
				cmp.each(function()
				{
					// Set image height based on arkup attributes (if set)
					// Needed because Woocommerce has set height:auto and Merakit has inline height
					$(this).find('img').each(function() {
						var self = $(this);
						var h = self.attr('height');
						h = h ? h + 'px' : 'auto';
						self.css('height', h);
					});

					// Remove hrefs because these are pulled from old data
					$(this).find('a').each(function() {
						var self = $(this);
						self.removeAttr('href');
					});
				});
			}
		});

		// Support deep-linking to product tabs
		// Click hashchange not added to tab links because woocommerce auto-clicks the description on page load
		$(window).on('load', function(event)
		{
			var hash = window.location.hash;
			if (hash.startsWith('#tab-'))
			{
				var panel = $('li[aria-controls="' + hash.substring(1) + '"]');
				var tab = $('a[href="' + hash + '"]');

				if (panel.length && tab.length)
				{
					tab.trigger('click');

					$([document.documentElement, document.body]).animate(
					{
						scrollTop: panel.offset().top - 120
					}, 500);
				}
			}
		});
	}();
})(jQuery);
