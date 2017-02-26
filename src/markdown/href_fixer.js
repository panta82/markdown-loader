var defaultRender = require('./default_renderer');

function hrefFixer(md) {
	var renderer = md.renderer.rules.link_open || defaultRender;
	
	md.renderer.rules.link_open = hrefFixerRenderer

	function hrefFixerRenderer(tokens, idx, options, env, self) {
		var token = tokens[idx];

		var attrIndex = token.attrIndex('href');
		if (attrIndex < 0) {
			return renderer(tokens, idx, options, env, self);
		}

		var attr = token.attrs[attrIndex];
		var url = attr[1];

		console.log(url);

		return renderer(tokens, idx, options, env, self);
	}
}

module.exports = hrefFixer;