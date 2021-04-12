(function($)
{
	var leftNav = function()
	{
		$(document).ready(function()
		{
			var open = $('.open-left-nav'),
				nav = $('.left-nav');

			if (open.length && nav.length)
			{
				open.on('click', function(event)
				{
					event.preventDefault();
					nav.addClass('active');
				});
				nav.on('click', '.close', function(event)
				{
					event.preventDefault();
					nav.removeClass('active');
				});
			}
		});
	}();
})(jQuery);
