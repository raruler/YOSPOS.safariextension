/* stop breaking the fucking tables with your stupid images yall */

// thanks to Paolo Bergantino, Nick Craver & Andrew Ramdsen
// http://stackoverflow.com/questions/965816/what-jquery-selector-excludes-items-with-a-parent-that-matches-a-given-selector/965962#965962
// http://stackoverflow.com/questions/3877027/jquery-callback-on-image-load-even-when-the-image-is-cached
// http://irama.org/news/2011/06/05/cached-images-have-no-width-or-height-in-webkit-e-g-chrome-or-safari/

jQuery.expr[':'].parents = function(a,i,m){
    return jQuery(a).parents(m[3]).length < 1;
};

$(".postbody img.img, .attachment img").one('load', function() {
	var img = this;
	
	setTimeout(function() {
		$(img).attr('original-width', $(img).width());
		$(img).attr('original-height', $(img).height());
		
		//$(img).css('max-width', '100% !important');
	}, 0);
}).each(function() {
	if(this.complete) $(this).load();
});

$(window).load( function () {
	
	$(".postbody img.img, .attachment img").css('max-width', '100% !important');
	$(".postbody img.img, .attachment img").each(function () {
		if ($(this).width() < $(this).attr('original-width')) {
			$(this).filter(":parents(a)")
				.after("<div style='font-size:10px; font-style:italic'>" + $(this).attr('original-width') + "x" + $(this).attr('original-height') + " image automatically resized - click for big</div>")
				.wrap("<a href='" + $(this).attr("src") + "' target='_blank' />")
				.css("border", "2px yellow solid")
		}
	});
});

/*
* jQuery.fn.maxSize( options / number );
*
* Put maxsize on images
*
* $('.element').maxSize({
*     width: 'maxWidth',
*     height: 'maxHeight'
* });
*
* Version 1.0.0
* www.labs.skengdon.com/maxSize
* www.labs.skengdon.com/maxSize/js/maxSize.min.js
*/
;(function($){$.fn.maxSize=function(options){if(typeof options!=='object'){var options={width:options,height:options}};return this.each(function(){$img=$(this);var F;var FW=0;var FH=0;if(options.width){FW=$img.width()/options.width;F=1;};if(options.height){FH=$img.height()/options.height;F=0;};if(FW&&FH){F=FW/FH;};if((F>=1)&&(FW>=1)){$(this).width(options.width);};if((F<=1)&&(FH>=1)){$(this).height(options.height);};});};})(jQuery);