var MarkdownIt = require('markdown-it');

var http = require('./lib/http');
var url = require('./lib/url');
var dom = require('./lib/dom');
var log = require('./lib/log');
var hrefFixer = require('./markdown/href_fixer');
var imageFixer = require('./markdown/image_fixer');

var DEFAULT_OPTIONS = require('./opts');

function load(opts, callback) {
	opts = Object.assign({}, DEFAULT_OPTIONS, opts);

	var sourceUrl = url.normalizeSourceUri(opts.source).toString();
	
	return http.get(sourceUrl, opts.synchronous, function (err, text) {
		if (err) {
			return log.callbackOrError(callback, err);
		}

		var md = new MarkdownIt();
		hrefFixer(md, sourceUrl);
		imageFixer(md, sourceUrl);

		var html = md.render(text);

		if (!opts.target) {
			// Return html string
			return callback && callback(null, html);
		}

		// Load html into the DOM
		var targetEl = dom.findElement(opts.target);
		if (!targetEl) {
			return log.callbackOrError(callback, new Error("Couldn't find target element: " + opts.target));
		}

		targetEl.innerHTML = html;
		return callback && callback(null, targetEl, html);
	});
}

function autoLoad(path, target) {
	//TODO
}

module.exports = {
	load: load,
	autoLoad: autoLoad
};