var MarkdownIt = require('markdown-it');

var http = require('./lib/http');
var url = require('./lib/url');
var hrefFixer = require('./markdown/href_fixer');
var imageFixer = require('./markdown/image_fixer');

function load(source, target) {
	var sourceUrl = url.normalizeSourceUri(source).toString();
	
	var text = http.get(sourceUrl);
	
	var md = new MarkdownIt();
	hrefFixer(md, sourceUrl);
	imageFixer(md, sourceUrl);

	var html = md.render(text);
	
	var targetEl;
	if (typeof target === 'string') {
		targetEl = document.getElementById(target);
		if (!targetEl) {
			throw new Error("Couldn't find element with name \"" + target + '"');
		}
	} else {
		targetEl = target;
	}
	targetEl.innerHTML = html;
}

function autoLoad(path, target) {
	//TODO
}

module.exports = {
	load: load,
	autoLoad: autoLoad
};