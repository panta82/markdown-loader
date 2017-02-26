function findElement(idOrEl) {
	if (typeof idOrEl === 'string') {
		var el = document.getElementById(idOrEl);
		if (!el) {
			
		}
		return el;
	}
	
	return idOrEl;
}

module.exports = {
	findElement: findElement
};