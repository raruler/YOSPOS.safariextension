var base = safari.extension.baseURI;

function isYOSPOS() {
	css = $("link[rel=stylesheet][title='YOSPOS']");
	return css.length > 0
}

if (isYOSPOS()) {
	safari.self.tab.dispatchMessage('getMonochrome');
	safari.self.tab.dispatchMessage('getFontSmoothing');
	safari.self.tab.dispatchMessage('getScanlines');
	if($('input[name=signature]').length > 0)
		safari.self.tab.dispatchMessage('getSignature');
	
	
}

/* Helper Functions */
function resizeScanlineScreen()
{
	$("body > div.scanlines-screen").css({ width: window.innerWidth + "px", height: window.innerHeight + "px" });
}

	
/* Enable Various Functionality */

function enableSignature() {
	if($('input[name=signature]').length > 0)
		$('input[name=signature]')[0].checked = true
}

function switchCSS(stylesheet) {
	var link = $("<link>");
	link.attr({
		type: 'text/css',
		rel: 'stylesheet',
		href: base + stylesheet
		});
	$("head").append( link );
}

function enableScanlines(settings) {
	var lineIntensity = settings['line_intensity'];
	var lineHeight = settings['line_height'];
	var cornerIntensity = settings['corner_intensity']
	
	if($("body").data("scanlined") != undefined && $("body").data("scanlined")) {
		$('.scanlines-lines').remove();
		$('.scanlines-screen').remove();
		$("body").data("scanlined", false)
	}
	
	if($("body").data("scanlined") == undefined || !$("body").data("scanlined")) {
		$("body").data("scanlined", true)
		$("body").append(
			$("<div class='scanlines-lines'></div>")
			.css({
				backgroundImage: "-webkit-linear-gradient(bottom, rgba(0,0,0," + lineIntensity + ") 0%, rgba(0,0,0," + lineIntensity + ") 50%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100% )",
				backgroundSize: "100% " + lineHeight + "px"
			})
		);
		
		
		if (cornerIntensity > 0) {
			$("body").append(
				$("<div class='scanlines-screen'></div>")
				.css({
					backgroundImage: "-webkit-radial-gradient(center center, ellipse farthest-corner, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 50%,rgba(0, 0, 0, " + cornerIntensity + ") 100%)"
				})
			);
		
			resizeScanlineScreen();
		
			$(window).resize(resizeScanlineScreen);
		}
		
	}
}



function disableFontSmoothing() {
	$('body').addClass('noFontSmoothing');
}

function enableMonochrome() {
	$('body').addClass('monochrome');
}


/* Message Handlers */

function messageHandler(event) {
	if(isYOSPOS()) {
		switch(event.name) {
		case 'theme':
			var stylesheet = event.message;
			switchCSS(stylesheet);
			break;
		case 'scanlines':
			enableScanlines(event.message);
			break;
		case 'signature':
			enableSignature();
			break;
		case 'monochrome':
			enableMonochrome();
			break
		case 'fontsmoothing':
			disableFontSmoothing();
			break;
		}
	}
}

safari.self.addEventListener("message", messageHandler, false);

