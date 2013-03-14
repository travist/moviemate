$(function() {

  // Get the trailers from the markup.
  var trailers = $('span.video-title:contains("Official Trailer")');
  if (trailers.length > 0) {

    // Get the movie name from the trailer.
    var movieName = trailers[0].innerHTML.replace(/\s+\-?\s+Official Trailer.*/, '');

    // Get the IMDB result
    chrome.extension.sendMessage({'get_imdb': {
      'title': movieName
    }}, function(response) {

      // Add the image.
      var image = $(document.createElement('div')).attr({
        'class': 'playlist-imdb-image'
      }).append($('table.results tr td.image', response).eq(0).html());

      // Add the info.
      var info = $(document.createElement('div')).attr({
        'class': 'playlist-imdb-info'
      }).append($('table.results tr td.title', response).eq(0).html());

      // Add the imdb information after the playlist actions.
      $('#playlist-actions').after($(document.createElement('div')).attr({
        'class': 'playlist-imdb'
      }).append(image).append(info));
    });
  }
});
