// In your Javascript (external .js resource or <script> tag)
jQuery(document).ready(function($) {
	var componentId = '.cmp-webinar-filter ';
	
	if ( jQuery(componentId).length > 0 )
	{

		
		$(document).on('click', function(e) {		
			if( e.target.parentNode.classList != 'like-dropdown' && !$(e.target).closest('.filter-group').hasClass('active') ){
				$('.filter-group.active').addClass('close');
				$('.filter-group').removeClass('active');
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
		
		jQuery(componentId+' #filter-product .checkbox, '+componentId+' #filter-industry .checkbox, '+componentId+'   #filter-region .checkbox, '+componentId+'  #filter-solution .checkbox, '+componentId+'  #filter-language .checkbox, '+componentId+'  #sortby').change(function(){	
			
			copySelectedOptionFromDesktopToMobile();
			copySelectedSortFromDesktopToMobile();
			
			updateWebBrowserPath();
			updateFilterSelectedNumberWebinar();
			updateMobileFilterSelectedNumberWebinar();
			
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktop('#desktop-result', queryString);
			updateResultAreaMobile('#mobile-result', queryString, 1);
		});
		
		jQuery(componentId+' #keyword').keypress(function (e) {	
			if (e.which == 13) {
				
				e.preventDefault();
				
				
				  // update mobile keyword
				  var desktopKeyword=jQuery(this).val();
				  jQuery(componentId+" #mobile-keyword").val(desktopKeyword);
				
				  var queryString = jQuery('form#filter-bar').serialize();
				  updateResultAreaDesktop('#desktop-result', queryString);
				  updateResultAreaMobile('#mobile-result', queryString, 1);
				  
				  updateWebBrowserPath();
			 }
			
		});
		 
		jQuery(componentId+' #mobile-filter .checkbox').change(function(e){	
			updateMobileFilterSelectedNumberWebinar();
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
			//updateResultAreaDesktop('#desktop-result', queryString);
			//updateResultAreaMobile('#mobile-result', queryString, 1);
			
			//updateWebBrowserPath();
			
			
			
			var desktopKeyword=jQuery(componentId+" #keyword").val();
			jQuery(componentId+" #mobile-keyword").val(desktopKeyword);

			if (desktopKeyword=='')
			{
				jQuery('.keyword-div.autocomplete-openned').removeClass('autocomplete-openned');
				
				
				var queryString = jQuery('form#filter-bar').serialize();
				updateResultAreaDesktop('#desktop-result', queryString);
				updateResultAreaMobile('#mobile-result', queryString, 1);
				
				updateWebBrowserPath();
			}
			else
			{
				updateAutoCompleteDesktop();
			}
			
			
		}, 500));
		
		
		jQuery(componentId+" #mobile-keyword").keyup(delay(function (e) {
			
			// update mobile keyword
			//var desktopKeyword=jQuery(this).val();
			//jQuery(componentId+" #mobile-keyword").val(desktopKeyword);
			
			//var queryString = jQuery('form#filter-bar').serialize();
			//updateResultAreaDesktop('#desktop-result', queryString);
			//updateResultAreaMobile('#mobile-result', queryString, 1);
			
			//updateWebBrowserPath();

			var mobileKeyword=jQuery(componentId+" #mobile-keyword").val();
			jQuery(componentId+" #keyword").val(mobileKeyword);
			
			if (mobileKeyword=='')
			{
				jQuery('.mobile-keyword-div.autocomplete-openned').removeClass('autocomplete-openned');
				
				var queryString = jQuery('form#filter-bar').serialize();
				updateResultAreaDesktop('#desktop-result', queryString);
				updateResultAreaMobile('#mobile-result', queryString, 1);
				
				updateWebBrowserPath();
			}
			else
			{
				updateAutoCompleteMobile();
			}

		}, 500));
		
		jQuery(componentId+' #mobile-keyword').click(function(){
			
				var mobileKeyword=jQuery(componentId+" #mobile-keyword").val();
				if (mobileKeyword!='')
				{
					updateAutoCompleteMobile();
				}
		});
		jQuery(componentId+' #keyword').click(function(){
			
			var desktopKeyword=jQuery(componentId+" #keyword").val();
			if (desktopKeyword!='')
			{
				updateAutoCompleteDesktop();
			}

		});
		
		
		
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
			updateResultAreaDesktop('#desktop-result', queryString);
			updateResultAreaMobile('#mobile-result', queryString, 1);
			
			updateWebBrowserPath();
			
			
		}, 500));*/
		
		
		
		jQuery(componentId+" .autocomplete-close-button").click(function (e) {
			
			e.preventDefault();
			
			jQuery(componentId+" #keyword").val('');
			jQuery(componentId+" #mobile-keyword").val('');
			jQuery(componentId+' .keyword-div').removeClass('autocomplete-openned');
			
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktop('#desktop-result', queryString);
			updateResultAreaMobile('#mobile-result', queryString, 1);
			
			updateWebBrowserPath();
			updateFilterSelectedNumberWebinar();
			updateMobileFilterSelectedNumberWebinar(); 
			
	
		});
		jQuery(componentId+" .mobile-autocomplete-close-button").click(function (e) {
			
			e.preventDefault();
			
			jQuery(componentId+" #mobile-keyword").val('');
			jQuery(componentId+" #keyword").val('');
			jQuery(componentId+' .mobile-keyword-div').removeClass('autocomplete-openned');
			
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktop('#desktop-result', queryString);
			updateResultAreaMobile('#mobile-result', queryString, 1);
			
			updateWebBrowserPath();
			updateFilterSelectedNumberWebinar();
			updateMobileFilterSelectedNumberWebinar();
			
			jQuery(componentId+' #mobile-filter').removeClass('filter-showup');
			jQuery(componentId+' #mobile-filter').attr('style','');	
			jQuery(componentId+' #mobile-menu-bar').attr('style','');	
			

		});
		
		
	
		
		// click on apply button on mobile
		jQuery(componentId+' #mobile-filter #filter-option-done').click(function(event){
			
			event.preventDefault();
			
			copySelectedOptionFromMobileToDesktop();
			copySelectedSortFromMobileToDesktop();
			
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktop('#desktop-result', queryString);
			updateResultAreaMobile('#mobile-result', queryString, 1);
			
			updateWebBrowserPath();
			updateFilterSelectedNumberWebinar();
			updateMobileFilterSelectedNumberWebinar();
			
			jQuery(componentId+' #mobile-menu-bar .filter-button').click();
		});
		
		jQuery(componentId+' #mobile-filter #filter-option-clear').click(function(event){
			
			event.preventDefault();
			
			resetAllFilterWebinar();
			
			var queryString = jQuery('form#filter-bar').serialize();
			updateResultAreaDesktop('#desktop-result', queryString);
			updateResultAreaMobile('#mobile-result', queryString, 1);
			
			updateWebBrowserPath();
			updateFilterSelectedNumberWebinar();
			updateMobileFilterSelectedNumberWebinar();
			
			// close popup?
			//jQuery(componentId+' #mobile-menu-bar .filter-button').click();
		});
		
		
		jQuery(componentId+' #mobile-reset-filter,'+componentId+' #desktop-reset-filter').click(function(event){

			event.preventDefault();
			resetAllFilterWebinar();
			
			jQuery(componentId+' .menu-selected').each(function() {	
				jQuery(this).removeClass('menu-selected'); 
			});
			jQuery(componentId+' #filter-bar .active ').each(function() {	
				jQuery(this).removeClass('active'); 
			});
			//updateSelectedMobileDropdownText();
			
			updateWebBrowserPath();
			updateFilterSelectedNumberWebinar();
			updateMobileFilterSelectedNumberWebinar();
			
			var queryString = jQuery(componentId+'  form#filter-bar').serialize();
			updateResultAreaDesktop(componentId+'  #desktop-result', queryString, 1);
			updateResultAreaMobile(componentId+'  #mobile-result', queryString, 1);
		});
		
		jQuery(componentId+'  #filter-language').val(defaultLanguage);
		jQuery(componentId+'  #filter-language').next('.select2-container').addClass('language-dropdown');
		 
		updateWebBrowserPath();
		updateFilterSelectedNumberWebinar();
		updateMobileFilterSelectedNumberWebinar();
		
		var queryString = jQuery(componentId+'  form#filter-bar').serialize();
		updateResultAreaDesktop(componentId+'  #desktop-result', queryString, 1);
		updateResultAreaMobile(componentId+'  #mobile-result', queryString, 1);
	}

});




function clearNumberOfResultsWebinar(){
	var componentId = '.cmp-webinar-filter ';
	jQuery(componentId+' .number_of_results').remove();
	jQuery(componentId+' span#display_number_of_results').text('0');

}
function updateNumberOfResultWebinar(){
	var componentId = '.cmp-webinar-filter ';
	var number_of_results = jQuery(componentId+'  #number_of_results').val();
	jQuery(componentId+'  span#display_number_of_results').text(number_of_results);
	jQuery(componentId+'  .number_of_results').remove();
}

function updateFilterSelectedNumberWebinar(){
	var componentId = '.cmp-webinar-filter ';
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


function copySelectedOptionFromMobileToDesktop(){
	var componentId = '.cmp-webinar-filter ';
	
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
	updateWebBrowserPath();
	updateFilterSelectedNumberWebinar();
	updateMobileFilterSelectedNumberWebinar();
	
	var queryString = jQuery(componentId+'  form#filter-bar').serialize();
	updateResultAreaDesktop(componentId+'  #desktop-result', queryString, 1);
	updateResultAreaMobile(componentId+'  #mobile-result', queryString, 1);
}

function copySelectedSortFromDesktopToMobile(){
	var componentId = '.cmp-webinar-filter ';
	var selected = jQuery(componentId+ ' #sortby').val();
	var id = 'sortby-'+selected;
	jQuery(componentId+ '#'+ id).prop("checked", true);
}

function copySelectedSortFromMobileToDesktop(){
	var componentId = '.cmp-webinar-filter ';
	var selected = jQuery(componentId+ ' input.sortby-mobile:checked').val();
	jQuery(componentId + ' #sortby').val(selected);
	jQuery(componentId + ' #sortby').select2().trigger('change');
	
}

function copySelectedOptionFromDesktopToMobile(){
	var componentId = '.cmp-webinar-filter ';
	
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
	updateWebBrowserPath();
	updateFilterSelectedNumberWebinar();
	updateMobileFilterSelectedNumberWebinar();
	
	var queryString = jQuery(componentId+'  form#filter-bar').serialize();
	updateResultAreaDesktop(componentId+'  #desktop-result', queryString, 1);
	updateResultAreaMobile(componentId+'  #mobile-result', queryString, 1);
}

function updateMobileFilterSelectedNumberWebinar(){

	var componentId = '.cmp-webinar-filter ';
	var n_items = jQuery(componentId + ' #mobile-filter .my-menu input.checkbox:checked').length;
	var n_lang_items = jQuery(componentId + ' #mobile-filter .my-menu #mobile-menu-language input.checkbox:checked').length;
	if (defaultLanguage!='en'){
		n_items = n_items - n_lang_items;
	}
	
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
		
		if (defaultLanguage!='en'){
			sub_n_items = sub_n_items - n_lang_items;
		}
		
		if (sub_n_items > 0)
			jQuery(this).find('.selected-checkbox-number').text('('+sub_n_items+')');
		else
			jQuery(this).find('.selected-checkbox-number').text('');
	}); 

}

function updateWebBrowserPath(){
	
	var baseUrl = window.location.origin;
	var pathArray = window.location.pathname;
	var componentId = '.cmp-webinar-filter ';
	
	var sort = jQuery(componentId+' #sortby').val();
	if (sort=='') sort = 'most-recent';
	var finalURL = baseUrl+pathArray+'?sortby='+sort;

	finalURL = getDropdownWebBrowserPath(finalURL, componentId, 'filter-product-family', ' #filter-product ')
	finalURL = getDropdownWebBrowserPath(finalURL, componentId, 'filter-industry', ' #filter-industry ')
	finalURL = getDropdownWebBrowserPath(finalURL, componentId, 'filter-region', ' #filter-region ')
	finalURL = getDropdownWebBrowserPath(finalURL, componentId, 'filter-solution', ' #filter-solution ')
	
	dropdownID = ' #filter-language ';
	param = 'filter-language';
	var n_items = jQuery(componentId+' '+dropdownID+' input.checkbox:checked').length;
	if (n_items > 0)
	{
		var filterStr = '&'+param+'=';
		var count = 0;
		jQuery(componentId+' '+dropdownID+' input.checkbox:checked').each(function(){
			var slug = jQuery(this).val();
			
			filterStr = filterStr+slug;
			if (count<(n_items-1))
				filterStr = filterStr+',';
			count++;
		});		
		finalURL = finalURL+filterStr;
	}	
	
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

function getDropdownWebBrowserPath(finalURL, componentId, param, dropdownID)
{
	var n_items = jQuery(componentId+' '+dropdownID+' input.checkbox:checked').length;
	if (n_items > 0)
	{
		var filterStr = '&'+param+'=';
		var count = 0;
		jQuery(componentId+' '+dropdownID+' input.checkbox:checked').each(function(){
			var slug = jQuery(this).closest('li').find('input.translate-slug').val();
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


function updateResultAreaDesktop(targetArea, queryString, paged)
{
	var componentId = '.cmp-webinar-filter ';
	
	var postType = jQuery('.cmp-webinar-filter #filter-post-type').val();

	ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number='+paged+'&range='+9;
	
	jQuery('.cmp-webinar-filter .desktop-result .loading').show();
	jQuery('.cmp-webinar-filter .desktop-result .loading__icon').show();
	
	
	clearNumberOfResultsWebinar();
	
	jQuery(targetArea).html('');
	
	jQuery.ajax(ajaxUrl, {
		success: function(data) {
			
			jQuery(componentId+' .desktop-result .loading').hide();
			jQuery(componentId+' .desktop-result .loading__icon').hide();

		
			jQuery(targetArea).html(data);	
			jQuery(componentId+'  .desktop-result .to-expand').show();	
			jQuery(componentId+'  .desktop-result .to-expand').removeClass('to-expand');		
			
			//triggers webinar info script to convert date/time stamp
			jQuery('body').trigger('webinarFilterLoadComplete');
			
			updateFilterSelected();
			
			updateNumberOfResultWebinar(); 
		}, 

		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});

}

function updateResultAreaMobile(targetArea, queryString, paged)
{
	var componentId = '.cmp-webinar-filter ';
	
	var postType = jQuery(componentId+' #filter-post-type').val();
	
	
	ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number='+paged+'&range='+6;

	jQuery('.mobile-result .loading').show();
	
	clearNumberOfResultsWebinar();
	
	jQuery(targetArea).html('');
	
	updateFilterSelected();
	//updateSelectedMobileDropdownText();
	
	
	jQuery.ajax(ajaxUrl, {
		success: function(data) {
			
			jQuery('.mobile-result .loading').hide();
			
			jQuery(targetArea).html(data);
			jQuery(componentId+'  .mobile-result .to-expand').show();	
			jQuery(componentId+'  .mobile-result .to-expand').removeClass('to-expand');	

			//triggers webinar info script to convert date/time stamp
			jQuery('body').trigger('webinarFilterLoadComplete')

            jQuery(componentId+'  .filterbar').on('click', function(e) {
				e.preventDefault();
				var targetOffset = jQuery('#mobile-filter').offset().top - 140;
                jQuery('html, body').animate({ scrollTop: targetOffset }, 400);
            });
	
			updateFilterSelected();
			//updateSelectedMobileDropdownText();
			
			updateNumberOfResultWebinar();
		}, 

		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});
}



function updateAutoCompleteDesktop()
{
	var componentId = '.cmp-webinar-filter ';
	
	var targetArea = componentId+' #autocomplete-desktop .autocomplete-content'
	var keyword =  jQuery(componentId+' #keyword').val();  
	
	var language_str = '';
	var language = jQuery(componentId+" #filter-language input:checkbox:checked").each(function(){
		language_str = language_str+'&filter-language[]='+jQuery(this).val();
	}); 
	
	if (keyword==''){
		jQuery(componentId+' #filter-bar .keyword-div').removeClass('autocomplete-openned');
		
	}	
	else
	{
		jQuery(componentId+' #filter-bar .keyword-div').addClass('autocomplete-openned');
	}
	
	var postType = jQuery(componentId+' #filter-post-type').val();

	//var queryString = '?posttype='+postType+language_str+'&keyword='+keyword;
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

function updateAutoCompleteMobile()
{

	var componentId = '.cmp-webinar-filter ';
	var targetArea = componentId+' #autocomplete-mobile .autocomplete-content'
	var keyword =  jQuery(componentId+' #keyword').val();  
	
	var language_str = '';
	var language = jQuery(componentId+" #filter-language input:checkbox:checked").each(function(){
		language_str = language_str+'&filter-language[]='+jQuery(this).val();
	}); 
	
	if (keyword==''){

		jQuery(componentId+' .mobile-keyword-div').removeClass('autocomplete-openned');
		
	}	
	else
	{
		jQuery(componentId+' .mobile-keyword-div').addClass('autocomplete-openned');
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


function resetAllFilterWebinar()
{
	var componentId = '.cmp-webinar-filter ';
	
	jQuery(componentId+' #filter-product .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	
	
	jQuery(componentId+' #filter-industry .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	
	
	jQuery(componentId+' #filter-region .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	
	
	jQuery(componentId+' #filter-solution .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});
	
	if (defaultLanguage=='en'){
		jQuery(componentId+' #filter-language .checkbox').each(function(index, value) {		  
			jQuery(this).prop("checked", false);	  
		});	
		
		jQuery(componentId+' #mobile-menu-language .checkbox').each(function(index, value) {		  
			jQuery(this).prop("checked", false);	  
		});	
	}
	
	jQuery(componentId+' #mobile-menu-industry .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	
	
	jQuery(componentId+' #mobile-menu-solution .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	
	
	jQuery(componentId+' #mobile-menu-product-family .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});	
	
	jQuery(componentId+' #mobile-menu-region .checkbox').each(function(index, value) {		  
		jQuery(this).prop("checked", false);	  
	});
	
	if (defaultLanguage=='en'){
		jQuery(componentId+' #filter-language .checkbox').each(function(index, value) {		  
			jQuery(this).prop("checked", false);	  
		});	
	}

	jQuery(componentId).removeClass('filter-selected');
}



/*
function updateSelectedMobileDropdownText(){
	
	var componentId = '.cmp-webinar-filter ';

	var productFamilySelected = jQuery(componentId+' #filter-product').val();
	var industrySelected = jQuery(componentId+'  #filter-industry').val();
	var regionSelected = jQuery(componentId+'  #filter-region').val();
	var languageSelected = jQuery(componentId+'  #filter-language').val();
	var solutionSelected = jQuery(componentId+'  #filter-solution').val();
	jQuery(componentId+'  #filter-language').next('.select2-container').addClass('language-dropdown');

	var arrow = '<span class="toggler"> <i class="fa fa-caret-down"></i></span>';
	
	jQuery(componentId+'  #mobile-menu-product-family > a').html(defaultProductFamilyLabel + arrow);
	jQuery(componentId+'  #mobile-menu-industry > a').html(defaultIndustryLabel + arrow);
	jQuery(componentId+'  #mobile-menu-region > a').html(defaultRegionLabel + arrow);
	jQuery(componentId+'  #mobile-menu-language > a').html(defaultLanguageLabel + arrow);
	jQuery(componentId+'  #mobile-menu-solution > a').html(defaultSolutionLabel + arrow);
		
	if (productFamilySelected!='')
	{
		dropdownText = jQuery(componentId+" #filter-product option:selected").text() + arrow;
		jQuery(componentId+'  #mobile-menu-product-family > a').html(dropdownText);
	}
	
	if (industrySelected!='')
	{
		dropdownText = jQuery(componentId+" #filter-industry option:selected").text()+ arrow;
		jQuery(componentId+' #mobile-menu-industry > a').html(dropdownText);
	}
	
	if (regionSelected!='')
	{
		dropdownText = jQuery(componentId+"  #filter-region option:selected").text()+ arrow;
		jQuery(componentId+' #mobile-menu-region > a').html(dropdownText);
	}
	
	if (languageSelected!='')
	{
		dropdownText = jQuery(componentId+"  #filter-language option:selected").text()+ arrow;
		jQuery(componentId+' #mobile-menu-language > a').html(dropdownText);
	}
	
	if (solutionSelected!='')
	{
		var dropdownText = jQuery(componentId+' #filter-solution-button-'+solutionSelected).text()+ arrow;
		jQuery(componentId+' #mobile-menu-solution > a').html(dropdownText);
	}

}*/


function updateFilterSelected(){
	
	var componentId = '.cmp-webinar-filter ';
	var n_items = jQuery(componentId + ' #filter-bar input.checkbox:checked').length;
	var n_lang_items = jQuery(componentId + '  #filter-bar #filter-group-language input.checkbox:checked').length;
	if (defaultLanguage!='en'){
		n_items = n_items - n_lang_items;
	}
	if (n_items<1)
	{
		jQuery(componentId).removeClass('filter-selected');
	}
	else
	{
		jQuery(componentId).addClass('filter-selected');		
	}
}

function desktopLoadmore()
{
	var componentId = '.cmp-webinar-filter ';
	
	var queryString = jQuery(componentId+' form#filter-bar').serialize();
	var page_number = jQuery(componentId+' .desktop-result #desktop-next_page').val();
	jQuery(componentId+' .desktop-result #desktop-next_page').remove();
	jQuery(componentId+' .desktop-result #loadmore-desktop').remove();

	jQuery(componentId+'  .desktop-result .loading').show();
	jQuery(componentId+'  .desktop-result .loading__icon').show();

	
	var postType = jQuery(componentId+'  #filter-post-type').val();
	
	ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number='+page_number+'&range='+9;

	jQuery.ajax(ajaxUrl, {
		success: function(data) {
			
			jQuery(componentId+'  .desktop-result .loading').hide();

			jQuery('<div>'+data+'<div>')
			
			var tofindEle = jQuery('<div>'+data+'</div>');
			tofindEle.find('#placeholder-loadmore').remove();
			var newData = tofindEle.html();
		
			jQuery(componentId+'  .desktop-result #placeholder-loadmore').before(newData);	
			jQuery(componentId+'  .desktop-result .to-expand').toggle('expand');	
			jQuery(componentId+'  .desktop-result .to-expand').removeClass('to-expand');	

			//triggers webinar info script to convert date/time stamp
			jQuery('body').trigger('webinarFilterLoadComplete')
		},
		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});
}

function mobileLoadmore() {
	
	var componentId = '.cmp-webinar-filter ';
	
	var queryString = jQuery(componentId+' form#filter-bar').serialize();
	
	
	var page_number = jQuery(componentId+'  .mobile-result #mobile-next_page').val();
	jQuery(componentId+'  .mobile-result #mobile-next_page').remove();
	jQuery(componentId+'  .mobile-result #loadmore-mobile').remove();
	
	jQuery('.mobile-result .loading').show();
	jQuery(componentId+' .mobile-result .loading__icon').show();

	var postType = jQuery(componentId+'  #filter-post-type').val();
	
	ajaxUrl = '/?rest_route=/'+postType+'/v1/getitems&'+queryString+'&page_number='+page_number+'&range='+6;
	
	jQuery.ajax(ajaxUrl, {
		success: function(data) {

			jQuery('.mobile-result .loading').hide();
			
			var tofindEle = jQuery('<div>'+data+'</div>');
			tofindEle.find('#placeholder-loadmore').remove();
			var newData = tofindEle.html();
			
			jQuery(componentId+'  .mobile-result #placeholder-loadmore').before(newData);
			jQuery(componentId+'  .mobile-result .to-expand').toggle('expand');	
			jQuery(componentId+'  .mobile-result .to-expand').removeClass('to-expand');
			
			//triggers webinar info script to convert date/time stamp
			jQuery('body').trigger('webinarFilterLoadComplete')
		},
		error: function() {
		//$('#notification-bar').text('An error occurred');
		}
	});
}

function webinar_keyword_search(mobile){
	
	var componentId = '.cmp-webinar-filter ';
	
	if (mobile!='mobile')
	{
		jQuery(componentId+' .keyword-div').removeClass('autocomplete-openned');
			
		// update mobile keyword
		var desktopKeyword = jQuery(componentId+" #keyword").val();
		jQuery(componentId+" #mobile-keyword").val(desktopKeyword);
		
		var queryString = jQuery('form#filter-bar').serialize();
		updateResultAreaDesktop('#desktop-result', queryString);
		updateResultAreaMobile('#mobile-result', queryString, 1);
		  
		updateWebBrowserPath();	
	}
	else
	{
		jQuery(componentId+' .mobile-keyword-div').removeClass('autocomplete-openned');
		
		// update mobile keyword
		var desktopKeyword = jQuery(componentId+" #mobile-keyword").val();
		jQuery(componentId+" #keyword").val(desktopKeyword);
		
		var queryString = jQuery('form#filter-bar').serialize();
		updateResultAreaDesktop('#desktop-result', queryString);
		updateResultAreaMobile('#mobile-result', queryString, 1);
		  
		updateWebBrowserPath();
	}
	
}


/*

jQuery(document).ready(function() {
	jQuery('.menu li:has(ul)').click(function(e) {
		e.preventDefault();

		if(jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery(this).find('ul').slideUp();
		} else {
			jQuery('.menu li ul').slideUp();
			jQuery('.menu li').removeClass('active');
			jQuery(this).addClass('active');
			jQuery(this).find('ul').slideDown();
		}
	});
	

	jQuery('.menu ul li a').click(function(e) {

		e.preventDefault();
		resetAllFilter();
		var filterId = jQuery(this).attr('href');
		var filterVal = jQuery(this).attr('alt');
		jQuery('#'+filterId).val(filterVal);
		
		var queryString = jQuery('form#filter-bar').serialize();
		updateResultAreaMobile('#mobile-result', queryString, 1);
		
	});
	
});

*/



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
	
	var componentId = '.cmp-webinar-filter ';
	
	
	jQuery(componentId+' .my-nav').mgaccordion();
	jQuery(componentId+' .my-nav2').mgaccordion({
		theme: 'tree',
	 	leaveOpen: true
	});
	
	jQuery(componentId+' .my-nav ul li a').click(function(e) {

		e.preventDefault();
		resetAllFilterWebinar();

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
		updateResultAreaMobile(componentId+'  #mobile-result', queryString, 1);
		jQuery(this).closest('li.dropdown').find('a.openItem').removeClass('openItem');
		jQuery(this).closest('li.dropdown').find('ul.submenu').hide();
		jQuery(this).closest('li.dropdown').find('ul.closed').removeClass('closed');
		
		var targetOffset = jQuery(componentId+'  .container_result').offset().top - 60;
		jQuery('html, body').animate({ scrollTop: targetOffset }, 400);
	 
	});
});
