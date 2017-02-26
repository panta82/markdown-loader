function findElement(idOrEl) {
	if (typeof idOrEl === 'string') {
		var el = document.getElementById(idOrEl);
		if (!el) {
			
		}
		return el;
	}
	
	return idOrEl;
}

function findByAttributes(attributes, rootElement) {
	rootElement = rootElement || document;
	var selector = attributes.map(a => '[' + a + ']').join(',');
	var nodeList = rootElement.querySelectorAll(selector);
	
	var results = [];
	for (var i = 0; i < nodeList.length; i++) {
		var result = {
			element: nodeList[i]
		};
		for (var j = 0; j < result.element.attributes.length; j++) {
			var attr = result.element.attributes[j];
			if (attributes.indexOf(attr.name) >= 0) {
				result[attr.name] = attr.value;
			}
		}
		results.push(result);
	}
	return results;
}

module.exports = {
	findElement: findElement,
	findByAttributes: findByAttributes
};