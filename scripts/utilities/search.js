(function ($) {
	var searchPage = function () {
		$(document).ready(function () {
			if ($('.page-search-results').length) {
				$('#search-order').change(function () {
					o = $(this).val();
                    s = getUrlParameter('s');
                    if (s != '') {
                        //keep user on localized search page (s param is already part of window.location.href )
                        window.location.href = window.location.href + '&o='+o;  //'?s='+s+
                    }
				});
                $(".search-input").on("change paste keyup", function () {
                    if ($(this).val() != '') {
                        $('.btn-clear').show();
                    } else {
                        $('.btn-clear').hide();
                    }
                });
                if ($('.search-input').length) {
                    if ($('.search-input').val() != '') {
                        $('.btn-clear').show();
                    } else {
                        $('.btn-clear').hide();
                    }
                }
                $(".btn-clear").click(function () {
                    $(".search-input").val('');
                    $('.btn-clear').hide();
                });
			}
		});
	}();
    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };
})(jQuery);

function loadmoreSearchPage(url)
{
	jQuery('.search-loadmore').show();
	jQuery('#loadmore-search-button').remove();
	
	jQuery.ajax(url, {
		success: function(data) {
			
			var newData = jQuery('<div>'+data+'</div>');
			newData.find('.loadmore-placeholder').remove();
			newData.find('.search-loadmore').remove();
			var newHtml = ''+newData.find('.section-result').html()+'';

			jQuery('.search-loadmore').hide();			
			jQuery('#loadmore-placeholder').before(newHtml);
			jQuery('.search-loadmore').hide();
		}, 

		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});
}