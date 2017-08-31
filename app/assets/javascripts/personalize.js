console.log('have this file');

var doneFeeding = false;
var currentAnimationIntervalId;
//var currentTimeoutId;
var queue = [];
var doubleCheckSet = new Set();

var loadNextFeedPage = function() {
  var request = pegasus('/feed');

  request.then(
    function(data, xhr) { // success handler
      // do something useful like
      console.log('xhr is', xhr);
      console.log('data is', data);
      //clearTimeout(currentTimeoutId);
      //currentTimeoutId = setTimeout(loadNextFeedPage, 100);

      if (data == null) {
        doneFeeding = true;
      } else {
        loadNextFeedPage();
      }
    },
    function(data, xhr) { // error handler
      console.error(data, xhr.status);
      //clearTimeout(currentTimeoutId);
      doneFeeding = true;
    }
  );

};

loadNextFeedPage();

var domReady = function(callback) {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

domReady(function() {
  // begin
  //currentAnimationIntervalId = window.setInterval(doMyThing, 3000);
});

