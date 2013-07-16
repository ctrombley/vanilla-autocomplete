if (!Function.prototype.debounce) {
	Function.prototype.debounce = function(threshold, execAsap) {
		var func = this, timeout;

		if (typeof this !== "function")
			throw new TypeError("Can't debounce a non-function");

		return function () {
			var obj = this, args = arguments;
			function delayed() {
				if (!execAsap)
					func.apply(obj, args);
				timeout = null;
			}

			if (timeout)
				clearTimeout(timeout);
			else if (execAsap) 
				func.apply(obj, args);

			timeout = setTimeout(delayed, threshold || 100);
		};
	};
}

if (!Function.prototype.bind) {
	Function.prototype.bind = function (oThis) {
		if (typeof this !== "function") 
			throw new TypeError("Can't bind a non-function");

		var aArgs = Array.prototype.slice.call(arguments, 1), 
			fToBind = this, 
			fNOP = function () {},
			fBound = function () {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}
