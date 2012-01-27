document.addEventListener("beforeload", block219CSS, true);

var base = safari.extension.baseURI;

function block219CSS() {

   if (event.url.match(/\/css\/219\.css/i)) {
		var el = event.target;
		var css_file = safari.self.tab.canLoad(event, 'CSS_HACK');
		el.href = base + css_file;
		el.title = 'YOSPOS'
	}
}
 

