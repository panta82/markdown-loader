module.exports = function defaultRenderer(tokens, idx, options, env, self) {
	return self.renderToken(tokens, idx, options);
};