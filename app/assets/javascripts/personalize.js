// This is the chief entry point to the dynamic JS-based functionality in the personalized theme. See the end for the start!


var queue = []; // populated by server paging through all feed items from the API
var doneFeeding = false; // may not need this but could be handy to know
var ITEM_CLASS = '.item'; // used in the Rails view and CSS

/*
  This function to load additional pages from the feed API is the first thing to be called,
  and all of its requests can run asynchronously to the jobs that are removing and adding items
  on the page.  Once this is done recursively calling itself, it essentially self-terminates and
  leaves behind a few hundred items that can be used to replace images on the page with new ones.

  Note that pegagus is a lightweight AJAX library loaded from the vendor directory.
*/
var loadNextFeedPage = function() {
  var request = pegasus('/feed');
  request.then(
    function(data, xhr) { // success handler
      //console.log('data is', data);

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


/*
  This is where we fire off a couple of intervals that are repeatedly checking to see if there is an item
  viewable in the page that can be removed and also if there is an item that has essentially be removed that
  now needs to be replaced with one from the data queue we populated from additional calls to the feed API.
*/
var startAnimationCheckInterval = function() {
  // not actually using the internal IDs at the moment but could be handy
  removerId = window.setInterval(checkToSeeWhatNeedsToBeRemoved, 5000); // check every 5 seconds
  fillerId = window.setInterval(checkToSeeWhatNeedsToBeFilled, 250); // check 4 times per second
};

var checkToSeeWhatNeedsToBeRemoved = function() {
  var items = Array.from(document.querySelectorAll(ITEM_CLASS));
  var elemNeedsToBeRemoved = findAnyFullyLoadedItemCurrentlyInView(items);
  if (elemNeedsToBeRemoved) {
    fadeOutElem(elemNeedsToBeRemoved);
  }
};

var checkToSeeWhatNeedsToBeFilled = function() {
  var items = Array.from(document.querySelectorAll(ITEM_CLASS));
  var itemNeedsToBePopulated = findAnyBlankItem(items);
  if (itemNeedsToBePopulated) {
    fillAnyBlankItem(itemNeedsToBePopulated);
  }
};

var fillAnyBlankItem = function(elem) {
  var nextOne = getNextFeedItem();
  if (nextOne) {
    var children = Array.from(elem.children);
    var img = children[0];
    var paragraph = children[1];
    img.src = nextOne['original_image'];
    img.alt = nextOne['title'];
    paragraph.innerHTML = nextOne['title'];
    elem.dataset.url = nextOne['url'];
    addClickHandlerToItem(elem);
    fadeInElem(elem);
  }
};

var addClickHandlersToAllItems = function() {
  var allItems = Array.from(document.querySelectorAll(ITEM_CLASS));
  allItems.forEach(function(item) {
    addClickHandlerToItem(item);
  });
};

var getNextFeedItem = function() {
  return queue.shift(); // remove a feed item from the front of the queue
};


/*
             ~  THE START  ~
  This is where we get the party started with loading more data and replacing images with new ones!
                  Enjoy...
*/
loadNextFeedPage(); // can begin immediately, and will recursively call itself till it's done
domReady(addClickHandlersToAllItems);
domReady(startAnimationCheckInterval);