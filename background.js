// Add a listener to the background task to listen for messages.
chrome.extension.onMessage.addListener(function(msg, _, sendResponse) {

  // If this is to get the imdb information.
  if (msg.hasOwnProperty('get_imdb')) {

    // Get the IMDB information.
    $.get('http://www.imdb.com/search/title', {
      'title': encodeURIComponent(msg.get_imdb.title),
      'title_type': 'feature'
    }, function(data) {
      // Make sure links reference imdb.
      data = data.replace(/(\<a\s+href\=['"])(\/)/g, '$1http://imdb.com/');
      sendResponse(data);
    });

    // Return true to keep the page awake until the response is sent.
    return true;
  }
});