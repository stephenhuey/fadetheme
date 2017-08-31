

var queue = []; // populated by server paging through all feed items from the API
var doneFeeding = false; // may not need this but could be handy to know
var currentAnimationIntervalId; // may not need this, but could be handy


var loadNextFeedPage = function() {
  var request = pegasus('/feed');
  request.then(
    function(data, xhr) { // success handler
      console.log('data is', data);

      if (data == null) {
        doneFeeding = true;
      } else {
        queue = queue.concat(data);
        loadNextFeedPage();
      }
    },
    function(data, xhr) { // error handler
      console.error(data, xhr.status);
      doneFeeding = true;
    }
  );
};


var domReady = function(callback) {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

var startAnimationCheckInterval = function() {
  currentAnimationIntervalId = window.setInterval(checkToSeeWhatImageTransitionsAreNeeded, 4500); // check 2 times per second
};

var checkToSeeWhatImageTransitionsAreNeeded = function() {

  var items = Array.from(document.querySelectorAll('.item'));
  //console.log('items', items);
  var itemNeedsToBePopulated = findAnyBlankItem(items);
  var elemNeedsToBeRemoved = findAnyFullyLoadedItemCurrentlyInView(items);
  if (elemNeedsToBeRemoved) {
    console.log('fading out', elemNeedsToBeRemoved);
    fadeOutElem(elemNeedsToBeRemoved);
  }
  if (itemNeedsToBePopulated) {
    console.log('turning on', itemNeedsToBePopulated);
    fillAnyBlankItem(itemNeedsToBePopulated);
  }
};

var findAnyBlankItem = function(elements) {
  var invisibleItems = elements.filter(function(elem) {
    var currentStyle = getComputedStyle(elem);
    return parseFloat(currentStyle.opacity) == 0.0;
  });

  if (invisibleItems.length > 0) {
    //return invisibleItems.pop(); // last one
    return pickFromArrayAtRandom(invisibleItems);
  } else {
    return null;
  }
};

var findAnyFullyLoadedItemCurrentlyInView = function(elements) {
  var fullyLoadedElements = elements.filter(function(elem) {
    var currentStyle = getComputedStyle(elem);
    return parseFloat(currentStyle.opacity) == 1.0;
  });

  console.log('num loaded', fullyLoadedElements.length);

  var inViewportAndFullyLoaded = fullyLoadedElements.filter(function(elem) {
    if (verge.inViewport(elem)) {
      return elem;
    };
  });

  console.log('in viewport', inViewportAndFullyLoaded);

  if (inViewportAndFullyLoaded.length > 0) {
    //return inViewportAndFullyLoaded.pop(); // last one
    return pickFromArrayAtRandom(inViewportAndFullyLoaded);
  } else {
    return null;
  }
};

var beginAnimating = function() {
    var elt = document.querySelector('.item');
    //console.log('elt is', elt);
    //fadeInElem(elt);
    var elements = document.querySelectorAll('.item');
    Array.prototype.forEach.call(elements, function(elt, i){
      console.log('elt is', elt);
      //var inV = verge.inViewport(elt);
      //console.log(inV);
      //fadeInElem(elt);
    });
    var chosen = elements[2];
    fadeOutElem(chosen);
    clearInterval(currentIntervalId);

};

var fillAnyBlankItem = function(elem) {
  fadeInElem(elem);
};

var fadeInElem = function(elem) {
  requestAnimationFrame(function() {
    elem.style.opacity = 1;
  });

};

var fadeOutElem = function(elem) {
  //elem.style.visibility = "visible";
  requestAnimationFrame(function() {
    elem.style.opacity = 0;
  });

};

var pickFromArrayAtRandom = function(arr) {
  return arr[ Math.floor( arr.length * Math.random() ) ];
};

var getNextFeedItem = function() {
  return queue.shift();
};

loadNextFeedPage(); // can begin immediately, and will recursively call itself till it's done
domReady(startAnimationCheckInterval);