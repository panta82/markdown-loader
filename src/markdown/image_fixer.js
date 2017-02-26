var defaultRender = require('./default_renderer');

function imageFixer(md) {
	var renderer = md.renderer.rules.image || defaultRender;

	md.renderer.rules.image = imageFixerRenderer;

	function imageFixerRenderer(tokens, idx, options, env, self) {
		var token = tokens[idx];

		var attrIndex = token.attrIndex('src');
		if (attrIndex < 0) {
			return renderer(tokens, idx, options, env, self);
		}

		var attr = token.attrs[attrIndex];
		var url = attr[1];

		console.log(url);

		return renderer(tokens, idx, options, env, self);
	}
}

module.exports = imageFixer;