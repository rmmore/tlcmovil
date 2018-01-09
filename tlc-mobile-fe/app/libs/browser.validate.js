var browserCompatible = true;

if(!!$.browser.msie && $.browser.versionNumber < 9) {
	
	browserCompatible = false;
	
	$('.msg_version').removeClass('hide');
	
}