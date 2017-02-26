var url = require('../lib/url');
var defaultRender = require('./default_renderer');

function hrefFixer(md, baseUrl) {
	var renderer = md.renderer.rules.link_open || defaultRender;
	
	md.renderer.rules.link_open = hrefFixerRenderer

	function hrefFixerRenderer(tokens, idx, options, env, self) {
		var token = tokens[idx];

		var attrIndex = token.attrIndex('href');
		if (attrIndex >= 0) {
			token.attrs[attrIndex][1] = url.toAbsoluteUri(token.attrs[attrIndex][1], baseUrl).toString();
		}

		return renderer(tokens, idx, options, env, self);
	}
}

module.exports = hrefFixer;