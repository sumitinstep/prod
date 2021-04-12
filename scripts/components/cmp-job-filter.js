var meraki_currentJobRequest = null;

jQuery(document).ready(function($) {
	var componentId = '.cmp-job-filter ';

	if ( jQuery(componentId).length > 0 )
	{
		
		$(document).on('click', function(e) {		
			if( e.target.parentNode.classList != 'like-dropdown' && !$(e.target).closest('.filter-group').hasClass('active') ){
				$('.filter-group.active').addClass('close');
				$('.filter-group').removeClass('active');
				$('.keyword-div.autocomplete-openned').removeClass('autocomplete-openned');
				$('.mobile-keyword-div.autocomplete-openned').removeClass('autocomplete-openned');
			}
		});
 
		$('.filter-group').each(function(){
			$(this).click(function(){
				
				if( $(this).hasClass('active') ){
					$(this).removeClass('active');
					$(this).addClass('close');
				}else{
					$('.filter-group').removeClass('active');
					$('.filter-group').removeClass('close');
					$(this).addClass('active');
				}

			}); 
		});
		
		jQuery(componentId+' .select2').select2();
		
		jQuery(componentId+' #filter-employment-type .checkbox, '+componentId+' #filter-team .checkbox, '+componentId+'   #filter-location .checkbox, '+componentId+'  #sortby').change(function(){	
			
			copySelectedOptionFromDesktopToMobileJob();
			copySelectedSortFromDesktopToMobileJob();
			
			updateWebBrowserPathJob();
			updateFilterSelectedNumberJob();
			updateMobileFilterSelectedNumberJob();
			
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktopJob('#desktop-result', queryString);
			updateResultAreaMobileJob('#mobile-result', queryString, 1);
		});
		
		jQuery(componentId+' #keyword').keypress(function (e) {	
			if (e.which == 13) {
				
				e.preventDefault();
				
				
				  // update mobile keyword
				  var desktopKeyword=jQuery(this).val();
				  jQuery(componentId+" #mobile-keyword").val(desktopKeyword);
				
				  var queryString = jQuery('form#filter-bar').serialize();
				  updateResultAreaDesktopJob('#desktop-result', queryString);
				  updateResultAreaMobileJob('#mobile-result', queryString, 1);
				  
				  updateWebBrowserPathJob();
			 }
		});
		
		jQuery(componentId+' #mobile-keyword').keypress(function (e) {	
			if (e.which == 13) {
				
				e.preventDefault();
				
				
				  // update mobile keyword
				  var keyword=jQuery(this).val();
				  jQuery(componentId+" #keyword").val(keyword);
				
				  var queryString = jQuery('form#filter-bar').serialize();
				  updateResultAreaDesktopJob('#desktop-result', queryString);
				  updateResultAreaMobileJob('#mobile-result', queryString, 1);
				  
				  updateWebBrowserPathJob();
			 }
		});

		 
		jQuery(componentId+' #mobile-filter .checkbox').change(function(e){	
			updateMobileFilterSelectedNumberJob();
		});
		
		jQuery(componentId+' #mobile-menu-bar .filter-button').click(function(e){	
			
			e.preventDefault();

			var hasClass = jQuery(componentId+' #mobile-filter').hasClass('filter-showup');
			if (hasClass)
			{
				jQuery(componentId+' #mobile-filter').removeClass('filter-showup');
				jQuery(componentId+' #mobile-filter').attr('style','');	
				jQuery(componentId+' #mobile-menu-bar').attr('style','');	

			}
			else
			{
				jQuery(componentId+' #mobile-filter').addClass('filter-showup');			
			}	
			
		});
		
		jQuery(componentId+' #mobile-menu-bar .cmp-webinar-filter__close').click(function(e){	
			e.preventDefault();
			jQuery(componentId+' #mobile-filter').removeClass('filter-showup');
			jQuery(componentId+' #mobile-filter').attr('style','');	
			jQuery(componentId+' #mobile-menu-bar').attr('style','');	
		});

		
		jQuery(componentId+" #keyword").keyup(delay(function (e) {
			
			// update mobile keyword
			//var desktopKeyword=jQuery(this).val();
			//jQuery(componentId+" #mobile-keyword").val(desktopKeyword);
			
			//var queryString = jQuery('form#filter-bar').serialize();
			//updateResultAreaDesktopJob('#desktop-result', queryString);
			//updateResultAreaMobileJob('#mobile-result', queryString, 1);
			
			//updateWebBrowserPathJob();
			
			
			
			var desktopKeyword=jQuery(componentId+" #keyword").val();
			jQuery(componentId+" #mobile-keyword").val(desktopKeyword);
			
			if (desktopKeyword=='')
			{
				jQuery('.keyword-div.autocomplete-openned').removeClass('autocomplete-openned');
				
				var queryString = jQuery('form#filter-bar').serialize();
				updateResultAreaDesktopJob('#desktop-result', queryString);
				updateResultAreaMobileJob('#mobile-result', queryString, 1);
				
				updateWebBrowserPathJob();
			}
			else
			{
				updateAutoCompleteDesktopJob();
			}
			
			
		}, 500));
		
		
		jQuery(componentId+" #keyword").click(function (e) {
			
			var desktopKeyword=jQuery(componentId+" #keyword").val();
			jQuery(componentId+" #mobile-keyword").val(desktopKeyword);
			if (desktopKeyword=='')
			{
				jQuery('.keyword-div.autocomplete-openned').removeClass('autocomplete-openned');
			}
			else
			{
				updateAutoCompleteDesktopJob();
			}
		});
		
		jQuery(componentId+" #mobile-keyword").click(function (e) {
			
			jQuery('#filter-mobile-keyword').addClass('autocomplete-openned');
			
			var mobileKeyword=jQuery(componentId+" #mobile-keyword").val();
			if (mobileKeyword=='')
			{
				jQuery('.mobile-keyword-div.autocomplete-openned').removeClass('autocomplete-openned');
			}
			else
			{
				updateAutoCompleteMobileJob();
			}
		});
		
		
		
		jQuery(componentId+" #mobile-keyword").keyup(delay(function (e) {
			
			// update mobile keyword
			//var desktopKeyword=jQuery(this).val();
			//jQuery(componentId+" #mobile-keyword").val(desktopKeyword);
			
			//var queryString = jQuery('form#filter-bar').serialize();
			//updateResultAreaDesktopJob('#desktop-result', queryString);
			//updateResultAreaMobileJob('#mobile-result', queryString, 1);
			
			//updateWebBrowserPathJob();

			var mobileKeyword=jQuery(componentId+" #mobile-keyword").val();
			jQuery(componentId+" #keyword").val(mobileKeyword);
			
			if (mobileKeyword=='')
			{
				jQuery('.mobile-keyword-div.autocomplete-openned').removeClass('autocomplete-openned');
				
				var queryString = jQuery('form#filter-bar').serialize();
				updateResultAreaDesktopJob('#desktop-result', queryString);
				updateResultAreaMobileJob('#mobile-result', queryString, 1);
				
				updateWebBrowserPathJob();
			}
			else
			{
				updateAutoCompleteMobileJob();
			}

		}, 500));
		
		
		
		jQuery(componentId+' #mobile-keyword').click(delay(function (e) {

			var mobileKeyword=jQuery(componentId+" #mobile-keyword").val();
			if (mobileKeyword!='')
			{
				updateAutoCompleteMobileJob();
			}
		}, 500));
		
		jQuery(componentId+' #keyword').click(delay(function (e) {
			var desktopKeyword=jQuery(componentId+" #keyword").val();
			if (desktopKeyword!='')
			{
				updateAutoCompleteDesktopJob();
			}
		}, 500));

		
		jQuery(componentId+' .add-filter-button').click(function(){
			
			jQuery(componentId+' #mobile-filter').addClass('filter-showup');
			jQuery(componentId+' #mobile-filter').attr('style','display:flex!important');	
			jQuery(componentId+' #mobile-menu-bar').attr('style','display:flex!important');	

		});
		
		
		/*
		
		jQuery(componentId+" #mobile-keyword").keyup(delay(function (e) {
			
			// update mobile keyword
			var mobileKeyword=jQuery(this).val();
			jQuery(componentId+" #keyword").val(mobileKeyword);
			
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktopJob('#desktop-result', queryString);
			updateResultAreaMobileJob('#mobile-result', queryString, 1);
			
			updateWebBrowserPathJob();
			
			
		}, 500));*/
		
		
		
		jQuery(componentId+" .autocomplete-close-button").click(function (e) {
			
			e.preventDefault();
			
			jQuery(componentId+" #keyword").val('');
			jQuery(componentId+" #mobile-keyword").val('');
			jQuery(componentId+' .keyword-div').removeClass('autocomplete-openned');
			
			// refresh content and url
			updateWebBrowserPathJob();
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktopJob('#desktop-result', queryString);
			updateResultAreaMobileJob('#mobile-result', queryString, 1);		

			updateWebBrowserPathJob();
			updateFilterSelectedNumberJob();
			updateMobileFilterSelectedNumberJob();
	
		});
		jQuery(componentId+" .mobile-autocomplete-close-button").click(function (e) {
			
			e.preventDefault();
			
			jQuery(componentId+" #mobile-keyword").val('');
			jQuery(componentId+" #keyword").val('');
			jQuery(componentId+' .mobile-keyword-div').removeClass('autocomplete-openned');
			
			// refresh content and url
			updateWebBrowserPathJob();
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktopJob('#desktop-result', queryString);
			updateResultAreaMobileJob('#mobile-result', queryString, 1);
			
			updateWebBrowserPathJob();
			updateFilterSelectedNumberJob();
			updateMobileFilterSelectedNumberJob();
			
			jQuery(componentId+' #mobile-filter').removeClass('filter-showup');
			jQuery(componentId+' #mobile-filter').attr('style','');	
			jQuery(componentId+' #mobile-menu-bar').attr('style','');	

		});
		
		
	
		
		// click on apply button on mobile
		jQuery(componentId+' #mobile-filter #filter-option-done').click(function(event){
			
			event.preventDefault();
			
			copySelectedOptionFromMobileToDesktopJob();
			copySelectedSortFromMobileToDesktopJob();
			
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktopJob('#desktop-result', queryString);
			updateResultAreaMobileJob('#mobile-result', queryString, 1);
			
			updateWebBrowserPathJob();
			updateFilterSelectedNumberJob();
			updateMobileFilterSelectedNumberJob();
			
			jQuery(componentId+' #mobile-menu-bar .filter-button').click();
		});
		
		jQuery(componentId+' #mobile-filter #filter-option-clear').click(function(event){
			
			event.preventDefault();
			
			resetAllFilterJob();
			
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktopJob('#desktop-result', queryString);
			updateResultAreaMobileJob('#mobile-result', queryString, 1);
			
			updateWebBrowserPathJob();
			updateFilterSelectedNumberJob();
			updateMobileFilterSelectedNumberJob();
			
			// close popup?
			//jQuery(componentId+' #mobile-menu-bar .filter-button').click();
		});
		
		
		jQuery(componentId+' #mobile-reset-filter,'+componentId+' #desktop-reset-filter').click(function(event){

			event.preventDefault();
			resetAllFilterJob();
			
			jQuery(componentId+' .menu-selected').each(function() {	
				jQuery(this).removeClass('menu-selected'); 
			});
			jQuery(componentId+' #filter-bar .active ').each(function() {	
				jQuery(this).removeClass('active'); 
			});
			//updateSelectedMobileDropdownText();
			
			updateWebBrowserPathJob();
			updateFilterSelectedNumberJob();
			updateMobileFilterSelectedNumberJob();
			 
			var queryString = jQuery(componentId+'  form#filter-bar').serialize();
			updateResultAreaDesktopJob(componentId+'  #desktop-result', queryString, 1);
			updateResultAreaMobileJob(componentId+'  #mobile-result', queryString, 1);
		});
		
		


		//jQuery(componentId+'  #filter-language').val(defaultLanguage);
		///jQuery(componentId+'  #filter-language').next('.select2-container').addClass('language-dropdown');
		updateWebBrowserPathJob();
		updateFilterSelectedNumberJob();
		updateMobileFilterSelectedNumberJob();
		
		var queryString = jQuery(componentId+'  form#filter-bar').serialize();
		updateResultAreaDesktopJob(componentId+'  #desktop-result', queryString, 1);
		
		updateResultAreaMobileJob(componentId+'  #mobile-result', queryString, 1);
	}

});




function clearNumberOfResultJob(){
	var componentId = '.cmp-job-filter ';
	jQuery(componentId+' .number_of_results').remove();
	jQuery(componentId+' span#display_number_of_results').text('0');

}
function updateNumberOfResultJob(){
	var componentId = '.cmp-job-filter ';
	var number_of_results = jQuery(componentId+'  #number_of_results').val();
	jQuery(componentId+'  span#display_number_of_results').text(number_of_results);
	jQuery(componentId+'  .number_of_results').remove();
}

function updateFilterSelectedNumberJob(){
	var componentId = '.cmp-job-filter ';
	jQuery(componentId + ' fieldset.filter-dropdown').each(function(){
		var n_items = jQuery(this).find(' input.checkbox:checked').length;
		if (n_items > 0)
		{
			jQuery(this).closest('.filter-group').find('span.like-dropdown__count').text('('+n_items+')');
		}
		else
		{
			jQuery(this).closest('.filter-group').find('span.like-dropdown__count').text('');
		}
	});	
}


function copySelectedOptionFromMobileToDesktopJob(){
	var componentId = '.cmp-job-filter ';
	
	// reset options on desktop
	jQuery(componentId+ ' #filter-bar input.checkbox:checked').each(function(){
		var desktopElementID = jQuery(this).attr('id');
		if (desktopElementID != null)
		{
			jQuery(componentId+ ' #'+desktopElementID).prop("checked", false);
		}
	});
	
	// sync option
	jQuery(componentId+ ' #mobile-filter .my-menu input.checkbox:checked').each(function(){
		var mobileElementID = jQuery(this).attr('id');
		if (mobileElementID != null)
		{
			var desktopElementID = mobileElementID.replace("mobile-", "");
			jQuery(componentId+ '#'+desktopElementID).prop("checked", true);
		}
	});
	
	// refresh contents
	updateWebBrowserPathJob();
	updateFilterSelectedNumberJob();
	updateMobileFilterSelectedNumberJob();
	
	var queryString = jQuery(componentId+'  form#filter-bar').serialize();
	updateResultAreaDesktopJob(componentId+'  #desktop-result', queryString, 1);
	updateResultAreaMobileJob(componentId+'  #mobile-result', queryString, 1);
}

function copySelectedSortFromDesktopToMobileJob(){
	var componentId = '.cmp-job-filter ';
	var selected = jQuery(componentId+ ' #sortby').val();
	var id = 'sortby-'+selected;
	jQuery(componentId+ '#'+ id).prop("checked", true);
}

function copySelectedSortFromMobileToDesktopJob(){
	var componentId = '.cmp-job-filter ';
	var selected = jQuery(componentId+ ' input.sortby-mobile:checked').val();
	jQuery(componentId + ' #sortby').val(selected);
	jQuery(componentId + ' #sortby').select2().trigger('change');
	
}

function copySelectedOptionFromDesktopToMobileJob(){
	var componentId = '.cmp-job-filter ';
	
	// reset options on mobile
	jQuery(componentId+ ' #mobile-filter .my-menu input.checkbox:checked').each(function(){
		var mobileElementID = jQuery(this).attr('id');
		jQuery(componentId+ ' #'+mobileElementID).prop("checked", false);		
	});
	
	// sync option
	jQuery(componentId+ ' #filter-bar input.checkbox:checked').each(function(){
		var desktopElementID = jQuery(this).attr('id');
		if (desktopElementID != null)
		{
			var mobileElementID = 'mobile-'+desktopElementID;
			jQuery(componentId+ ' #'+mobileElementID).prop("checked", true);
		}
	});
	
	// refresh contents
	updateWebBrowserPathJob();
	updateFilterSelectedNumberJob();
	updateMobileFilterSelectedNumberJob();
	
	var queryString = jQuery(componentId+'  form#filter-bar').serialize();
	updateResultAreaDesktopJob(componentId+'  #desktop-result', queryString, 1);
	updateResultAreaMobileJob(componentId+'  #mobile-result', queryString, 1);
}

function updateMobileFilterSelectedNumberJob(){

	var componentId = '.cmp-job-filter ';
	var n_items = jQuery(componentId + ' #mobile-filter .my-menu input.checkbox:checked').length;
	
	
	// update number in clear button
	// update number in main filter button
	if (n_items > 0)
	{
		jQuery(componentId + ' #mobile-filter #filter-option-clear #selected-checkbox-number').text('('+n_items+')');
		jQuery(componentId + ' #mobile-filter .filter-button .selected-checkbox-number').text('('+n_items+')');
		
		
		
	}
	else
	{
		jQuery(componentId + ' #mobile-filter #filter-option-clear #selected-checkbox-number').text('');
		jQuery(componentId + ' #mobile-filter .filter-button .selected-checkbox-number').text('');

	}
	
	// update number in each filter group
	jQuery(componentId + ' #mobile-filter ul.my-nav > li').each(function(){
		
		var sub_n_items = jQuery(this).find(' input.checkbox:checked').length;
		
		if (sub_n_items > 0)
			jQuery(this).find('.selected-checkbox-number').text('('+sub_n_items+')');
		else
			jQuery(this).find('.selected-checkbox-number').text('');
	}); 

}

function updateWebBrowserPathJob(){
	
	var baseUrl = window.location.origin;
	var pathArray = window.location.pathname;
	var componentId = '.cmp-job-filter ';
	
	var sort = jQuery(componentId+' #sortby').val();
	if (sort=='') sort = 'most-recent';
	var finalURL = baseUrl+pathArray+'?sortby='+sort;

	//finalURL = getDropdownWebBrowserPath(finalURL, componentId, 'filter-employment-type', ' #filter-employment-type ')
	finalURL = getDropdownWebBrowserPathJob(finalURL, componentId, 'filter-team', ' #filter-team ')
	finalURL = getDropdownWebBrowserPathJob(finalURL, componentId, 'filter-location', ' #filter-location ')
	
	var keyword = jQuery(componentId+' #keyword').val();
	if (keyword!='')
	{
		filterStr = '&keyword='+keyword;
		finalURL = finalURL+filterStr;
	}

	// update url 
	//history.pushState({}, null, finalURL); // with history
	window.history.replaceState({}, null, finalURL); // no history
}

function getDropdownWebBrowserPathJob(finalURL, componentId, param, dropdownID)
{
	var n_items = jQuery(componentId+' '+dropdownID+' input.checkbox:checked').length;
	if (n_items > 0)
	{
		var filterStr = '&'+param+'=';
		var count = 0;
		jQuery(componentId+' '+dropdownID+' input.checkbox:checked').each(function(){
			var slug = jQuery(this).closest('li').find('input').val();
			filterStr = filterStr+slug;
			if (count<(n_items-1))
				filterStr = filterStr+',';
			count++;
		});		
		finalURL = finalURL+filterStr;
	}	
	return finalURL;	
}

/*
function refreshSolutionFilternStatus()
{
	var selected_solution = jQuery('.cmp-webinar-filter input#filter-solution').val();
	jQuery('.cmp-webinar-filter .filter-solution').each(function(index, value) {		  
		  var val = jQuery(this).val();
		  if (selected_solution==val)
		  {
			  jQuery(this).addClass('active');

		  }
		  else
		  {
			  jQuery(this).removeClass('active');
		  }
	});	
}*/


function updateResultAreaDesktopJob(targetArea, queryString, paged)
{
	var componentId = '.cmp-job-filter ';
	
	var postType = jQuery('.cmp-job-filter #filter-post-type').val();

	ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number='+paged+'&range='+10;

	jQuery('.cmp-job-filter .desktop-result .loading').show();
	jQuery('.cmp-job-filter .desktop-result .loading__icon').show();
	
	
	clearNumberOfResultJob();
	
	jQuery(targetArea).html('');
	
	meraki_currentJobRequest = jQuery.ajax(ajaxUrl, {

		beforeSend: function() {
			if (meraki_currentJobRequest != null) {
				meraki_currentJobRequest.abort();
			}
		},

		success: function(data) {
			
			jQuery(componentId+' .desktop-result .loading').hide();
		
			jQuery(targetArea).html(data);	
			jQuery(componentId+'  .desktop-result .to-expand').show();	
			jQuery(componentId+'  .desktop-result .to-expand').removeClass('to-expand');		
			
			//triggers webinar info script to convert date/time stamp
			//jQuery('body').trigger('webinarFilterLoadComplete');
			
			updateFilterSelectedJob();
			
			updateNumberOfResultJob(); 
		}, 

		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});

}

function updateResultAreaMobileJob(targetArea, queryString, paged)
{
	var componentId = '.cmp-job-filter ';
	
	var postType = jQuery(componentId+' #filter-post-type').val();
	
	
	ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number='+paged+'&range='+10;

	jQuery('.mobile-result .loading').show();
	jQuery('.mobile-result .loading__icon').show();
	
	
	clearNumberOfResultJob();
	
	jQuery(targetArea).html('');
	
	updateFilterSelectedJob();
	//updateSelectedMobileDropdownText();
	
	
	jQuery.ajax(ajaxUrl, {
		success: function(data) {
			
			jQuery('.mobile-result .loading').hide();
			
			jQuery(targetArea).html(data);
			var cmp_to_expand = jQuery(componentId+' .mobile-result .to-expand');
			cmp_to_expand.show();	
			cmp_to_expand.removeClass('to-expand');	

			//triggers webinar info script to convert date/time stamp
			// jQuery('body').trigger('webinarFilterLoadComplete')

            jQuery(componentId+'  .filterbar').on('click', function(e) {
				e.preventDefault();
				var targetOffset = jQuery('#mobile-filter').offset().top - 140;
                jQuery('html, body').animate({ scrollTop: targetOffset }, 400);
            });
	
			updateFilterSelectedJob();
			//updateSelectedMobileDropdownText();
			
			updateNumberOfResultJob();
			
			// scroll right button
			var cmp_table = jQuery(componentId+' .table-responsive');
			var scroll_right = cmp_table.find('#scrollright');
			cmp_table.animate({scrollLeft: 0}, 800);
			cmp_table.scroll(function() {
			    var scrollLeft = jQuery(this).scrollLeft();
			    if (scrollLeft<100)
			    {
			    	scroll_right.find('#scrollright').show();
			    }
			    else
			    {
			    	scroll_right.find('#scrollright').hide();
			    }
			    
			});
			
		
		},  

		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});
}



function updateAutoCompleteDesktopJob()
{
	var componentId = '.cmp-job-filter ';
	
	var targetArea = componentId+' #autocomplete-desktop .autocomplete-content'
	var keyword =  jQuery(componentId+' #keyword').val();  
	
	if (keyword==''){
		jQuery(componentId+' #filter-bar .keyword-div').removeClass('autocomplete-openned');
		
	}	
	else
	{
		jQuery(componentId+' #filter-bar .keyword-div').addClass('autocomplete-openned');
	}
	
	var postType = jQuery(componentId+' #filter-post-type').val();

	var queryString = jQuery(componentId+' form#filter-bar').serialize();
	var ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number=1&range=5&autocomplete=true';

	jQuery(componentId+'  .loading__icon').show();
	
	jQuery(targetArea).html(''); 	
	

	jQuery.ajax(ajaxUrl, {
		success: function(data) {
			
			jQuery(componentId+'  .loading__icon').hide();
		
			jQuery(targetArea).html(data);
		}, 

		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});
}

function updateAutoCompleteMobileJob()
{

	var componentId = '.cmp-job-filter ';
	var targetArea = componentId+' #autocomplete-mobile .autocomplete-content'
	var keyword =  jQuery(componentId+' #keyword').val();  
	

	if (keyword==''){

		jQuery(componentId+' .mobile-keyword-div').removeClass('autocomplete-openned');
		
	}	
	else
	{
		
		jQuery(componentId+' .mobile-keyword-div').addClass('autocomplete-openned');
		jQuery(componentId+' #filter-mobile-keyword').addClass('autocomplete-openned');
	}
	
	var postType = jQuery(componentId+' #filter-post-type').val();

	//var queryString = '?posttype='+postType+language_str+'&keyword='+keyword;
	var queryString = jQuery(componentId+' form#filter-bar').serialize();
	var ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number=1&range=5&autocomplete=true';

	
	jQuery(componentId+' .mobile_loading__icon').show();
	
	jQuery(targetArea).html('');
	
	
	jQuery.ajax(ajaxUrl, {
		success: function(data) {
			
			jQuery(componentId+' .mobile_loading__icon').hide();
		
			jQuery(targetArea).html(data);
		}, 

		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});
}


function resetAllFilterJob()
{
	var componentId = '.cmp-job-filter ';
	
	//jQuery(componentId+' #filter-employment-type .checkbox').each(function(index, value) {		  
	//	jQuery(this).prop("checked", false);	  
	//});	
	
	jQuery(componentId+' #filter-location .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	
	
	jQuery(componentId+' #filter-team .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	

	//jQuery(componentId+' #mobile-menu-employment-type .checkbox').each(function(index, value) {		  
	//	jQuery(this).prop("checked", false);	  
	//});	
	
	jQuery(componentId+' #mobile-menu-location .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	
	
	jQuery(componentId+' #mobile-menu-team .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	
	
	jQuery(componentId).removeClass('filter-selected');
}


function updateFilterSelectedJob(){
	
	var componentId = '.cmp-job-filter ';
	var n_items = jQuery(componentId + ' #filter-bar input.checkbox:checked').length;
	if (n_items<1)
	{
		jQuery(componentId).removeClass('filter-selected');
	}
	else
	{
		jQuery(componentId).addClass('filter-selected');		
	}
}

function desktopLoadmoreJob()
{
	var componentId = '.cmp-job-filter ';
	
	var queryString = jQuery(componentId+' form#filter-bar').serialize();
	var page_number = jQuery(componentId+' .desktop-result #desktop-next_page').val();
	jQuery(componentId+' .desktop-result #desktop-next_page').remove();
	jQuery(componentId+' .desktop-result #loadmore-desktop').remove();

	
	jQuery(componentId+'  .desktop-result .loading').show();
	jQuery(componentId+'  .desktop-result .loading__icon').show();
	
	
	var postType = jQuery(componentId+'  #filter-post-type').val();
	
	ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number='+page_number+'&range='+10;

	jQuery.ajax(ajaxUrl, {
		success: function(data) {
			
			jQuery(componentId+'  .desktop-result .loading').hide();

			jQuery('<div>'+data+'<div>')
			
			var tofindEle = jQuery('<div>'+data+'</div>');
			tofindEle.find('#placeholder-loadmore').remove();
			tofindEle.find('.table-header').remove();
			var newData = tofindEle.html();
		
			jQuery(componentId+'  .desktop-result #placeholder-loadmore').before(newData);	
			jQuery(componentId+'  .desktop-result .to-expand').toggle('expand');	
			jQuery(componentId+'  .desktop-result .to-expand').removeClass('to-expand');	

			//triggers webinar info script to convert date/time stamp
			// jQuery('body').trigger('webinarFilterLoadComplete')
		},
		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});
}

function mobileLoadmoreJob() {
	
	var componentId = '.cmp-job-filter ';
	
	var queryString = jQuery(componentId+' form#filter-bar').serialize();
	
	
	var page_number = jQuery(componentId+'  .mobile-result #mobile-next_page').val();
	jQuery(componentId+'  .mobile-result #mobile-next_page').remove();
	jQuery(componentId+'  .mobile-result #loadmore-mobile').remove();
	
	jQuery('.mobile-result .loading').show();
	jQuery('.mobile-result .loading__icon').show();

	var postType = jQuery(componentId+'  #filter-post-type').val();
	
	ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number='+page_number+'&range='+10;
	
	jQuery.ajax(ajaxUrl, {
		success: function(data) {

			jQuery('.mobile-result .loading').hide();
			
			var tofindEle = jQuery('<div>'+data+'</div>');
			tofindEle.find('#placeholder-loadmore').remove();
			tofindEle.find('.table-header').remove();
			
			var newData = tofindEle.html();
			
			jQuery(componentId+'  .mobile-result #placeholder-loadmore').before(newData);
			jQuery(componentId+'  .mobile-result .to-expand').toggle('expand');	
			jQuery(componentId+'  .mobile-result .to-expand').removeClass('to-expand');
			
			//triggers webinar info script to convert date/time stamp
			// jQuery('body').trigger('webinarFilterLoadComplete')
		},
		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});
}

function job_keyword_search(mobile){
	
	var componentId = '.cmp-job-filter ';
	
	if (mobile!='mobile')
	{
		jQuery(componentId+' .keyword-div').removeClass('autocomplete-openned');
			
		// update mobile keyword
		var desktopKeyword = jQuery(componentId+" #keyword").val();
		jQuery(componentId+" #mobile-keyword").val(desktopKeyword);
		
		var queryString = jQuery('form#filter-bar').serialize();
		updateResultAreaDesktopJob('#desktop-result', queryString);
		updateResultAreaMobileJob('#mobile-result', queryString, 1);
		  
		updateWebBrowserPathJob();	
	}
	else
	{
		jQuery(componentId+' .mobile-keyword-div').removeClass('autocomplete-openned');
		
		// update mobile keyword
		var desktopKeyword = jQuery(componentId+" #mobile-keyword").val();
		jQuery(componentId+" #keyword").val(desktopKeyword);
		
		var queryString = jQuery('form#filter-bar').serialize();
		updateResultAreaDesktopJob('#desktop-result', queryString);
		updateResultAreaMobileJob('#mobile-result', queryString, 1);
		  
		updateWebBrowserPathJob();
	}
	
}





(function ($) {

	$.fn.mgaccordion = function (options) {

		var defaults = {
			theme: "flat",
			leaveOpen: false
		};

		var settings = $.extend({}, defaults, options);

		var openIcon, closeIcon;

		this.initialize = function () {
			/**
			 * silently exit if passed element is not a list
			 */
			if (!this.is('ul') && !this.is('ol')) {
				return;
			}
			this.addClass('mg-accordion');
			var theme = settings.theme;
			var leaveOpen = settings.leaveOpen;
			if (theme === 'tree') {
				this.addClass('mg-tree');
			} else {
				this.addClass('mg-flat');
			}
			$.each(this.find('li'), function () {
				var $this = $(this);
				if ($this.children('ul').length) {
					$this.addClass('dropdown')
						.children('a')
						.bind('click', function (e) {
							e.preventDefault();
							if (leaveOpen === false) {
								closeOther($(this));
							}
							$(this).siblings('ul.submenu').slideToggle(function () {
								$(this).toggleClass('closed', $(this).is(':visible'));
							});
							updateIcons($(this));
						}
						);
					$this.find('ul').addClass('submenu');
					if (theme === 'tree') {
						$this.children('a').prepend('<span class="toggler"><i class="fa fa-plus-circle"></i> </span>');
					} else {
						$this.children('a').append('<span class="toggler"> <i class="fa fa-caret-down"></i></span>');
					}
				}
			});

			return this;

		};

		var setIcons = function () {
			if (settings.theme === 'tree') {
				openIcon = '<span class="toggler"><i class="fa fa-plus-circle"></i> </span>';
				closeIcon = '<span class="toggler"><i class="fa fa-minus-circle"></i> </span>';
			} else if (settings.theme === 'flat') {
				openIcon = '<span class="toggler"><i class="fa fa-caret-down"></i> </span>';
				closeIcon = '<span class="toggler"> <i class="fa fa-caret-up"></i></span>';
			}
		}

		var closeOther = function (obj) {
			setIcons();
			var items = obj.parent().siblings().find('ul.submenu');
			if (settings.theme === 'flat') {
				items.each(function () {
					if ($(this).hasClass('closed')) {
						$(this).slideUp('slow')
							.parent()
							.find('a')
							.removeClass('openItem');
					}
				});
			} else {
				items.each(function () {
					if ($(this).hasClass('closed')) {
						$(this).slideUp('slow')
							.parent()
							.find('span.toggler')
							.replaceWith(openIcon);
					}
				});
			}
		}

		var updateIcons = function (obj) {
			if (settings.theme === 'flat') {
				if (obj.siblings('.submenu').hasClass('closed')) {
					obj.removeClass('openItem');
				} else {
					obj.addClass('openItem');
				}
			} else {
				if (obj.siblings('.submenu').hasClass('closed')) {
					obj.find('span.toggler').replaceWith(openIcon);
				} else {
					obj.find('span.toggler').replaceWith(closeIcon);
				}
			}
		}

		return this.initialize();

	};

}(jQuery));

function toTheRight(){
	var componentId = '.cmp-job-filter';
	var cmp_table = jQuery(componentId+' .table-responsive');
	var leftPos = cmp_table.scrollLeft();
	cmp_table.animate({scrollLeft: leftPos + 330}, 800);

	
} 


function delay(callback, ms) {
  var timer = 0;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback.apply(context, args);
    }, ms || 0);
  };
}

jQuery(document).ready(function () {
	
	var componentId = '.cmp-job-filter ';
	
	
	jQuery(componentId+' .my-nav').mgaccordion();
	jQuery(componentId+' .my-nav2').mgaccordion({
		theme: 'tree',
	 	leaveOpen: true
	});
	
	jQuery(componentId+' .my-nav ul li a').click(function(e) {

		e.preventDefault();
		resetAllFilterJob();

		if (jQuery(this).hasClass('menu-selected'))
		{
			jQuery(this).removeClass();
			var filterId = jQuery(this).attr('href');
			var filterVal = '';
			jQuery('#'+filterId).val(filterVal);
		}
		else
		{
			// reset all selected menu
			jQuery(componentId+'  .my-nav .menu-selected').each(function(index, value) {		  
				jQuery(this).removeClass('menu-selected');	  
			});	
			
			var filterId = jQuery(this).attr('href');
			var filterVal = jQuery(this).attr('alt');
			jQuery(componentId+'  #'+filterId).val(filterVal);
			jQuery(this).addClass('menu-selected');
		}
		
		var queryString = jQuery(componentId+'  form#filter-bar').serialize();
		updateResultAreaMobileJob(componentId+'  #mobile-result', queryString, 1);
		jQuery(this).closest('li.dropdown').find('a.openItem').removeClass('openItem');
		jQuery(this).closest('li.dropdown').find('ul.submenu').hide();
		jQuery(this).closest('li.dropdown').find('ul.closed').removeClass('closed');
		
		var targetOffset = jQuery(componentId+'  .container_result').offset().top - 60;
		jQuery('html, body').animate({ scrollTop: targetOffset }, 400);
	 
	});
});
