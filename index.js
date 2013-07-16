/*globals Autocomplete */

(function (Autocomplete) {
  var search = document.getElementById('search');

  var init = function () {
    var ac = new Autocomplete(search, {
      chars: 2,
      source: autocompleteSource
    });
  };

  var autocompleteSource = function (searchTerm, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
      var resultsArray = JSON.parse(e.target.response);
      callback(resultsArray);
    };
    xhr.open("get", "?search=" + searchTerm, true);
    xhr.send();
  };

  init();

}(Autocomplete));
