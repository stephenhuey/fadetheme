
var currentAnimationIntervalId;

var doneFeeding = false;
var queue = [];
var doubleCheckSet = new Set();

var loadNextFeedPage = function() {
  var request = pegasus('/feed');

  request.then(
    function(data, xhr) { // success handler
      // do something useful like
      console.log('xhr is', xhr);
      console.log('data is', data);

      if (data == null) {
        doneFeeding = true;

        console.log('total', queue.length);
        console.log('double check', doubleCheckSet.size);  // great, both ended up with a count of 433 one time I checked it!

      } else {
        queue = queue.concat(data);
        var urls = data.map(function(obj) {
          return obj['url'];
        });
        doubleCheckSet = new Set( urls.concat(Array.from(doubleCheckSet)) );
        loadNextFeedPage();
      }
    },
    function(data, xhr) { // error handler
      console.error(data, xhr.status);
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

