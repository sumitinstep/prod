(function($)
{
	var cmpLanguageSwitcher = function()
	{
		$(document).ready(function()
		{
			var cmp = $('.cmp-language-switcher');
			if (cmp.length)
			{
				cmp.on('click', '.cmp-language-switcher__selector', function(event)
				{
					event.preventDefault();
					cmp.toggleClass('active');
				});

				$('body').on('click', function(event)
				{
					if (!$(event.target).closest('.cmp-language-switcher').length)
					{
						cmp.removeClass('active');
					}
				});
			}
		});
	}();
})(jQuery);