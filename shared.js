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
