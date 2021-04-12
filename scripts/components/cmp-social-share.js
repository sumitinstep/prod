jQuery(document).ready(function(){

	jQuery(function( $ ){
		
		$('.facebook-share').click(shareOnFB);
		$('.twitter-share').click(shareOntwitter);
	
		$('.webinars-calendar').select2(); 
			
		$('.webinars-calendar').change(function(){
			
			$calendarType = $(this).val();
			if ($calendarType=='google')
			{
				addToGoogleCalendar();				
			}
			if ($calendarType=='outlook')
			{
				addToOutlookCalendar();				
			}
			if ($calendarType=='ical')
			{
				addToICalCalendar();				
			}
					
		});
		
	});
	
});

function addToGoogleCalendar(){

	selected = jQuery('input[name="live_webinars"]:checked').closest('.time-row').find('#gg-calendar-url').val();
	window.open(selected, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=480');
    
}

function addToICalCalendar(){

	url = jQuery('input[name="live_webinars"]:checked').closest('.time-row').find('#ics-url').val();
	window.location = url;
	
}

function addToOutlookCalendar(){

	selected = jQuery('input[name="live_webinars"]:checked').closest('.time-row').find('#outlook-url').val();
	window.open(selected, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=480');

}
		
function shareOnFB(){
    var shareUrl = window.location.href;
 	var url = "https://www.facebook.com/sharer/sharer.php?u="+shareUrl;
    window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=350,width=480');
    return false;
}

function shareOntwitter(){
    var shareUrl = window.location.href;
 	//var url = 'https://twitter.com/intent/tweet?url='+shareUrl+'&via=meraki';
 	var url = 'https://twitter.com/intent/tweet?url='+shareUrl+'&text='+twitterTitle;
	TwitterWindow = window.open(url, 'TwitterWindow',width=400,height=300);
	return false;
}