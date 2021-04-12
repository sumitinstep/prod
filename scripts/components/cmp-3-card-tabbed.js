(function($)
{
	var cmp3CardTabbed = function()
	{
		$(document).ready(function()
		{
			var cmpClass = '.cmp-3-card-tabbed';
			var cmp = $(cmpClass);
			if (cmp.length)
			{
				cmp.each(function()
				{
					var cc = this;
					$(this).find(cmpClass + "__tab").click(function(e){
						e.preventDefault();
						var tab = $(this).find("a").data("tab");
						$(cc).find(cmpClass + "__tab").removeClass("active");
						$(cc).find(cmpClass + "__tab-container").removeClass("active");
						$(this).addClass("active");
						$("#" + tab).addClass("active");
					});


				});
			}
		});
	}();
})(jQuery);