// In your Javascript (external .js resource or <script> tag)
jQuery(document).ready(function($) {
	

	var componentId = '.form-container';
	
	if ( jQuery(componentId).length > 0 )
	{

		jQuery(componentId+' .select2').select2();
		
		// submit
		jQuery(componentId+' .submit button').click(function(e){

			e.preventDefault();
			var result = validateForm(); 
			
			if (!result)
			{
				ajaxUrl = '/?rest_route=/jobs/v1/submit';
				
				//var data = new FormData(jQuery('#job-submission')[0]);
				//var postData = $(this).serializeArray();
				var fdata = new FormData(jQuery('#job-submission')[0]);
				//data.append('resume', $('input[name ="resume"]')[0].files[0]);
				//data.append('cover_letter', $('input[name ="cover_letter"]')[0].files[0]);
				jQuery('.submit button').text(text_please_wait);
				
				jQuery.ajax({
					url: ajaxUrl,
					mimeType:"multipart/form-data",
					data: fdata,
				    cache: false,
				    contentType: false,
				    processData: false,
				    method: 'POST',
				    dataType: 'json',
					success: function(jsonData) {
						var success = false;
						if(typeof jsonData.success != "undefined"){
							success = true;
						}
						if (success)
						{
							jQuery('#job-submission').hide();
							jQuery('#success-message').show();
							
							jQuery('#job-submission').removeClass('show-up');
							jQuery('body').attr('style','');
							
							var targetOffset = jQuery('div#success-message').offset().top-150;
							jQuery('html, body').animate({scrollTop: targetOffset}, 200);
							
							jQuery('.apply-button').hide();							
						}
						else
						{
							jQuery('.submit button').text(text_submit);
						}
						console.log(jsonData);
					}, 
					error: function(xhr, errorType, exception) {
						jQuery('.submit button').text(text_submit);
						console.log(xhr.responseText);
					}
				});
				
				
			}
			
        });

		// text field validate
		jQuery(componentId+' .input_text-field.field-required').each(function(){
			jQuery(this).focus(function(e){
				var id = jQuery(this).attr('id');
				validateFormField(id);
			});
			jQuery(this).focusout(function(e){
				var id = jQuery(this).attr('id');
				validateFormField(id);
			});
			jQuery(this).keypress(function(e){
				var id = jQuery(this).attr('id');
				validateFormField(id);
			});
			jQuery(this).change(function(e){
				var id = jQuery(this).attr('id');
				validateFormField(id);
			});
		});
		
		// select validate
		jQuery(componentId+' .multi_value_single_select-field.field-required').each(function(){
			jQuery(this).focus(function(e){
				var id = jQuery(this).attr('id');
				validateSelectFormField(id);
			});
			jQuery(this).focusout(function(e){
				var id = jQuery(this).attr('id');
				validateSelectFormField(id);
			});
			jQuery(this).click(function(e){
				var id = jQuery(this).attr('id');
				validateSelectFormField(id);
			});
			jQuery(this).change(function(e){
				var id = jQuery(this).attr('id');
				validateSelectFormField(id);
			});
		});

		// file upload button
		jQuery(componentId+' button.upload-button').each(function(){
			jQuery(this).click(function(e){
				
				e.preventDefault();
				jQuery(this).closest('.input-wrapper').find('.input_file-field').click();
			});
		});
		
		// file upload 
		jQuery(document).on('change', componentId+' .input_file-field' , function() {
			console.log(jQuery(this));
			if (jQuery(this).val() == '')
			{
				jQuery(this).closest('.input-wrapper').find('.filename').text('');	
	            jQuery(this).closest('.input-wrapper').removeClass('uploaded');
			}
			else
			{
				//var fileName = e.target.files[0].name;
	            //jQuery(this).closest('.input-wrapper').find('.filename').text(fileName);  
	            jQuery(this).closest('.input-wrapper').addClass('uploaded');
	            jQuery(this).closest('.input-wrapper').removeClass('show-error');
	            
			}
		}); 
		
		/*
		jQuery(componentId+' .input_file-field').change(function(e){

			alert('ssss');
			if (jQuery(this).get(0).files.length === 0)
			{
				jQuery(this).closest('.input-wrapper').find('.filename').text('');	
	            jQuery(this).closest('.input-wrapper').removeClass('uploaded');
			}
			else
			{
				var fileName = e.target.files[0].name;
	            jQuery(this).closest('.input-wrapper').find('.filename').text(fileName);  
	            jQuery(this).closest('.input-wrapper').addClass('uploaded');
			} 
        });*/
		
		jQuery('.apply-button').click(function(){
			jQuery('#job-submission').addClass('show-up');	
			jQuery('body').attr('style','height:100%;overflow:hidden;');	
		});
		
		jQuery('.form-content__close').click(function(){
			jQuery('#job-submission').removeClass('show-up');
			jQuery('body').attr('style','');	
		});
		
		
		// empty file upload 
		jQuery(componentId+' .resetfile').click(function(e){
			
			e.preventDefault();

			jQuery(this).closest('.input-wrapper').find('.filename').text('');	
            jQuery(this).closest('.input-wrapper').removeClass('uploaded');
            jQuery(this).closest('.input-wrapper').find('.input_file-field').val(null);

        });

	}
});

function validateSelectFormField(id){

	// reset all form field
	jQuery('.input-wrapper').removeClass('show-error');
	
	jQuery('select#'+id).closest('.input-wrapper').removeClass('show-error');
	jQuery('select#'+id).closest('.input-wrapper').removeClass('show-green');
	isError = false;
	if (jQuery('select#'+id).val()=='')
	{
		jQuery('select#'+id).closest('.input-wrapper').addClass('show-error');
		isError = true;
	}
	else
	{
		jQuery('select#'+id).closest('.input-wrapper').addClass('show-green');
	}
	return isError;
}

function validateFormField(id){

	// reset all form field
	jQuery('.input-wrapper').removeClass('show-error');
	
	jQuery('input#'+id).closest('.input-wrapper').removeClass('show-error');
	jQuery('input#'+id).closest('.input-wrapper').removeClass('show-green');
	isError = false;
	
	if (id=='email')
	{
		var email = jQuery('input#'+id).val();
		if (!validEmail(email))
		{
			jQuery('input#'+id).closest('.input-wrapper').addClass('show-error');
			isError = true;				
		}
		else
		{
			jQuery('input#'+id).closest('.input-wrapper').addClass('show-green');			
		}
	}
	else
	{
		if (jQuery('input#'+id).val()=='')
		{
			jQuery('input#'+id).closest('.input-wrapper').addClass('show-error');
			isError = true;
		}
		else
		{
			jQuery('input#'+id).closest('.input-wrapper').addClass('show-green');
		}
	}
	
	return isError;
}

function validateForm(){
	
	componentId = '.job-submission';
	isError = false;
	scrollTo = '';
	
	jQuery(componentId+' .required input').each(function(){
		jQuery(this).closest('.input-wrapper').removeClass('show-error');
		jQuery(this).closest('.input-wrapper').removeClass('show-green');
		var id = jQuery(this).closest('.input-wrapper').get(0).id;

		var result = validateFormField(id);
		
		if (result==true)
		{
			isError = true;
			if (scrollTo=='')
				scrollTo = id;		
		}
	});
	

	jQuery(componentId+' .required select').each(function(){
		jQuery(this).closest('.input-wrapper').removeClass('show-error');
		jQuery(this).closest('.input-wrapper').removeClass('show-green');
		var id = jQuery(this).closest('.input-wrapper').get(0).id;
		if (jQuery(this).val()=='')
		{
			//jQuery(this).closest('.input-wrapper').addClass('show-error');
			isError = true;
			if (scrollTo=='')
				scrollTo = id;	
		}
		else
		{
			jQuery(this).closest('.input-wrapper').addClass('show-green');
		}
	});

	jQuery(componentId+' .input_file-field').each(function(){
		jQuery(this).closest('.input-wrapper').removeClass('show-error');
		jQuery(this).closest('.input-wrapper').removeClass('show-green');
		var id = jQuery(this).closest('.input-wrapper').get(0).id;
		if (jQuery(this).val()=='')
		{
			jQuery(this).closest('.input-wrapper').addClass('show-error');
			isError = true;
			if (scrollTo=='')
				scrollTo = id;	
		}
		else
		{
			//jQuery(this).closest('.input-wrapper').addClass('show-green');
		}
	});

	if (scrollTo!='')
	{
		var targetOffset = jQuery('div#'+scrollTo).offset().top-150;
		jQuery('html, body').animate({scrollTop: targetOffset}, 200);
		jQuery('div#'+scrollTo+' input').focus();
		jQuery('div#'+scrollTo+' select').focus();
	}
	
	return isError;
}

function validEmail(email)
{
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

