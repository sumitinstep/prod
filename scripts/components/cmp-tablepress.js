(function($) {

    $(document).ready(function() {


		$("#tab-title-compare").on("click", function(){ 
			
			var checkexist = setInterval(function() {
				
				if ($('.tablepress').length) {
					$('.tablepress').DataTable().columns.adjust().draw();
					clearInterval(checkexist);
				}

			}, 100);
		}); 

		
    	    	
    	var isProductPageWithTable = $('.single-product table.tablepress').length > 0 ? true : false;
    	if (isProductPageWithTable)
    	{
    		var dataAttr = meraki_product_title;
        	dataAttr = dataAttr.toLowerCase().trim();
        	var highlightedClass = 'highlighted';
        	
    		var table = $('.single-product table.tablepress');
    		if (tablepress_layout=='column')
    		{
    			table.find('thead tr th').each(function() {
    		        var text = this.innerText;
    		        var cleanText = $(this).text().toLowerCase().trim();
    		        if (dataAttr==cleanText)
    		        {
    		        	// should be highlighted 
    		        	var classList = $(this).attr('class');
    		            var classArr = classList.split('/\s+/');

    		            table.find('.'+classArr[0]).each(function() {
    		            	$(this).addClass(highlightedClass);
    		            });     		        	
    		        }
    		    });
    		}
    		if (tablepress_layout=='row')
    		{
    			table.find('.column-1').each(function() {
    		        var text = this.innerText;
    		        var cleanText = $(this).text().toLowerCase().trim();
    		        if (dataAttr==cleanText)
    		        {
    		        	// should be highlighted 
    		        	$(this).closest('tr').addClass(highlightedClass);
    		        }
    		    });
    		}
    	}    	
    });
    
})(jQuery);