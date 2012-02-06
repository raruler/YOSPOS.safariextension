var base = safari.extension.baseURI;

function isYOSPOS() {
	css = $("link[rel=stylesheet][title='YOSPOS']");
	return css.length > 0
}

if (isYOSPOS()) {
	safari.self.tab.dispatchMessage('getScanlines');
	if($('input[name=signature]').length > 0)
		safari.self.tab.dispatchMessage('getSignature');

	

}

/* Helper Functions */
function resizeScanlineScreen()
{
	$("body > div.scanlines-screen").css({ width: window.innerWidth + "px", height: window.innerHeight + "px" });
}

String.prototype.replaceAll = function (target, replacement) {
    var tx = this;
    var ix = tx.indexOf(target);
    while (ix != -1) {
        tx = tx.replace(target, replacement);
        ix = tx.indexOf(target);
    }
    return (tx);
}

/* Supporting code */
$(document).ready(function (x) {
    /* Fix for weird layout-breaking forums javascript (thanks Radium!) */
    $('.breadcrumbs:first-of-type').addClass('WindowTitle');

    /* Remove the crapload of NBSPs from the page list */
    if ($('.pages').html()) {
        $('.pages').html($('.pages').html().replaceAll('&nbsp;', ''));
    }

    /* Find that pesky online users */
    $('.online_users').last().addClass('bottomonline');

    /* Find the bottom bar on thread pages */
    if ($('#thread').html()) {
        $('.pages.bottom').addClass('thread');
    }

    /* Fix the Edit Post page's window title */
    if ($('form[action="editpost.php"]').html()) {
        $('form[action="editpost.php"] .standard th').html('<b>' + $('form[action="editpost.php"] .standard th').html() + '</b>');
    }
});
	
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
		}
	}
}

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



safari.self.addEventListener("message", messageHandler, false);
