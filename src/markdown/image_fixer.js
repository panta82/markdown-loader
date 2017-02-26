var url = require('../lib/url');
var defaultRender = require('./default_renderer');

function imageFixer(md, baseUrl) {
	var renderer = md.renderer.rules.image || defaultRender;

	md.renderer.rules.image = imageFixerRenderer;

	function imageFixerRenderer(tokens, idx, options, env, self) {
		var token = tokens[idx];

		var attrIndex = token.attrIndex('src');
		if (attrIndex >= 0) {
			token.attrs[attrIndex][1] = url.toAbsoluteUri(token.attrs[attrIndex][1], baseUrl).toString();
		}

		return renderer(tokens, idx, options, env, self);
	}
}

module.exports = imageFixer;