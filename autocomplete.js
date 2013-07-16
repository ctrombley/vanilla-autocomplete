var Autocomplete = (function () {
	function Autocomplete(el, options) {
		this.el = el;
		this.options = {};

		this.options.chars = options.chars || 1;
		this.options.delay = options.delay || 100;
		this.options.resultsLimit = options.resultsLimit || 10;

		this.autocomplete = options.source.debounce(this.options.delay);
		this.onAutocompleteEnd = onAutocompleteEnd.bind(this);

		init.call(this);
	};

	var onAutocompleteEnd = function (results) {
		removeResults.call(this);

		if (results.length === 0)
			return false;

		var resultsNode = document.createElement('ul');
		resultsNode.className = 'autocomplete-results';
		resultsNode.style.top = this.el.offsetTop + this.el.offsetHeight;
		resultsNode.style.left = this.el.offsetLeft;
		resultsNode.style.width = this.el.scrollWidth;

		for (var i = 0; i < results.length && i < this.options.resultsLimit; i++) {
			var listItem = document.createElement('li');
			var textNode = document.createTextNode(results[i]);
			listItem.appendChild(textNode);
			resultsNode.appendChild(listItem);
		}

		this.resultsNode = resultsNode;
		this.el.parentNode.insertBefore(resultsNode, search.nextSibling);
	};

	var removeResults = function() {
		if (this.resultsNode !== undefined && this.resultsNode !== null) {
			this.el.parentNode.removeChild(this.resultsNode);
			this.resultsNode = undefined;
		}
	}

	var init = function () {
		var self = this;

		this.el.setAttribute('autocomplete', 'off');
		this.el.addEventListener('keyup', function (e) {
			if (e.keyCode == 38) { } // up
			if (e.keyCode == 40) { } // down

			if (self.el.value.length < self.options.chars) {
				removeResults.call(self);
				return;
			}

			self.autocomplete(self.el.value, self.onAutocompleteEnd);
		});
	};

	return Autocomplete;
}());
