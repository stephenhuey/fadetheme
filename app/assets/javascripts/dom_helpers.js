/*
  These utilities mostly relate to helping with accessing DOM elements and their attributes and
  are primarily used by the personalize.js functions at the moment.
*/


// will invoke the callback as soon as the DOM is really ready
var domReady = function(callback) {
  if (document.readyState === "interactive" || document.readyState === "complete") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
};

var findAnyBlankItem = function(elements) {
  var invisibleItems = filterByOpacity(elements, 0.0); // fully transparent

  if (invisibleItems.length > 0) {
    return pickFromArrayAtRandom(invisibleItems);
  } else {
    return null;
  }
};


/*
 findAnyFullyLoadedItemCurrentlyInView checks 2 things:

 1) whether the item is loaded (our criteria is that it has an opacity of 1, and
 2) whether anyone can even see the element, e.g. if it's located somewhere else on the page, we don't want
    to remove it just yet because we want the viewer to have a chance to see it first in case they're the kind
    of viewer that is able to scroll the screen.

  Note the verge is a well-researched (so they say) tool for determining if an element is in the viewable portion
  of the page (the viewport).  Verge can be found in the vendor directory.
*/
var findAnyFullyLoadedItemCurrentlyInView = function(elements) {
  var fullyLoadedElements = filterByOpacity(elements, 1.0); // fully opaque
  //console.log('num loaded', fullyLoadedElements.length);

  var inViewportAndFullyLoaded = fullyLoadedElements.filter(function(elem) {
    if (verge.inViewport(elem)) {
      return elem;
    };
  });
  //console.log('in viewport', inViewportAndFullyLoaded);

  if (inViewportAndFullyLoaded.length > 0) {
    return pickFromArrayAtRandom(inViewportAndFullyLoaded);
  } else {
    return null;
  }
};

var filterByOpacity = function(elements, decimalNumber) {
  return elements.filter(function(elem) {
    var currentStyle = getComputedStyle(elem); // returned as a string so convert to a number
    return parseFloat(currentStyle.opacity) == decimalNumber;
  });
};


var fadeInElem = function(elem) {
  // uses CSS transition - check out the stylesheet!
  requestAnimationFrame(function() {
    elem.style.opacity = 1;
  });
};

var fadeOutElem = function(elem) {
  // uses CSS transition - check out the stylesheet!
  requestAnimationFrame(function() {
    elem.style.opacity = 0;
  });
};

var pickFromArrayAtRandom = function(arr) {
  return arr[ Math.floor( arr.length * Math.random() ) ]; // cute
};



