/* Helpers */
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
    if ($('.breadcrumbs').html()) {
        $('.breadcrumbs:first-of-type').addClass('WindowTitle');
    }

    /* Remove the crapload of NBSPs from the page list */
    try {
        $('.pages').html($('.pages').html().replaceAll('&nbsp;', ''));
    } catch (e) { }

    /* Find that pesky online users */
    if ($('.online_users').html()) {
        $('.online_users').last().addClass('bottomonline');
    }

    /* Find the bottom bar on thread pages */
    if ($('#thread').html() && $('.pages.bottom').html()) {
        $('.pages.bottom').addClass('thread');
    }

	/* Find the bottom breadcrumb bar */
	if ($('.mainbodytextlarge').length > 1) {
		$('.mainbodytextlarge').last().addClass('bottomLinks');
	}

    /* Fix the Edit Post page's window title */
    if ($('form[action="editpost.php"]').html()) {
        $('form[action="editpost.php"] .standard th').html('<b>' + $('form[action="editpost.php"] .standard th').html() + '</b>');
    }

    /* Find ratings and apply classes to them to simplify replacement */
    $('td.rating img').each(function (idx) {
        var src = $(this).attr('src');
        if (src.match(/\/5stars/i)) {
            $(this).addClass('r5');
        } else if (src.match(/\/4stars/i)) {
            $(this).addClass('r4');
        } else if (src.match(/\/3stars/i)) {
            $(this).addClass('r3');
        } else if (src.match(/\/2stars/i)) {
            $(this).addClass('r2');
        } else if (src.match(/\/1star/i)) {
            $(this).addClass('r1');
        }
    });

    /* Replace title bar text with shorter equivalents */
    $('.WindowTitle a').each(function (idx) {
		if ($(this).text().match(/The Something Awful Forums/i)) {
			$(this).text('SA Forums');
		} else if ($(this).text().match(/Serious Hardware \/ Software Crap/i)) {
            $(this).text('SH/SC');
        }
    });
});