/*
(function($)
{
    var bs4Overlay = function()
    {
		$(document).ready(function()
		{
            $('body').append('<div id="bs4_overlay"></div><div id="bs4_toggle"><span class="toggle">Toggle Grid</span><span class="close">(Hide)</span></div>');

            var doc_height = $(document).height(),
                bs4_overlay = $('#bs4_overlay'),
                bs4_toggle = $('#bs4_toggle'),
                col_count = 12,
                col_html = '';

            for (var i = col_count - 1; i >= 0; i--)
            {
                col_html += '<div class="col-sm-1"><i></i></div>';
            }

            bs4_overlay.height(doc_height).append('<div class="container"><div class="row">'+col_html+'</div></div>');
            bs4_overlay.find('i').height(doc_height);

            bs4_toggle.on('click', '.toggle', function(event)
            {
                event.preventDefault();
                bs4_overlay.toggleClass('active');
            });

            bs4_toggle.on('click', '.close', function(event)
            {
                event.preventDefault();
                bs4_toggle.addClass('hidden');
            });
		});
    }();
})(jQuery);
*/