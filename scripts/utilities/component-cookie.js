function set_cookie(name, value) {
	var date = new Date(),
	expires = 'expires=';
    date.setDate(date.getDate() + 1);
    expires += date.toGMTString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/';
}

function get_cookie(name) {
   var value = "; " + document.cookie;
   var parts = value.split("; " + name + "=");
   if (parts.length == 2) return parts.pop().split(";").shift();
}

function set_serialize_cookie(name, value) {	
	var configCookieName = 'cmp_config';
	var oldCookie = get_cookie(configCookieName);
	var obj = null;
	if ((typeof oldCookie == 'undefined') || oldCookie=='' || oldCookie=='""')
	{ 
		obj = {};
	}
	else
	{
		try {
			obj = JSON.parse(oldCookie);
	    } catch(e) {
	    	obj = {};
	    	//console.log(e);
	    }			
	}
	
	obj[name] = value;
	myStringValue = JSON.stringify(obj); 
	//myStringValue = escape(myStringValue);
	//alert(myStringValue);
	
	
	var date = new Date(),
	expires = 'expires=';
    date.setDate(date.getDate() + 1);
    expires += date.toGMTString();
    document.cookie = configCookieName + '=' + myStringValue + '; ' + expires + '; path=/';
}
 
function get_serialize_cookie(name) {
	var configCookieName = 'cmp_config';
	var myString = get_cookie(configCookieName);
	//myString = unescape(myString);
	
	var obj = null;
	if ( (typeof myString == 'undefined') || myString == '')
	{
		obj = {};
	}
	else
	{
		try {
			obj = JSON.parse(myString);
	    } catch(e) {
	    	obj = {};
	    	//console.log(e);
	    }
	}
	
	if (typeof obj ==='object' && name in obj)
	{
		return obj[name];
	}
	else
	{
		return '';
	}
}