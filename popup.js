$(function() {

  // Say we are loading.
  $('body').addClass('ui-loading');

  // Get the playlist.
  $.get('https://gdata.youtube.com/feeds/api/users/trailers/playlists', {
    'v': 2,
    'alt': 'json'
  }, function(playlist) {

    // Remove the loading cursor.
    $('body').removeClass('ui-loading');

    // Get the list.
    var list = $('#home ul'),
        item = null,
        a = null,
        entry = null,
        image = null,
        title = null,
        desc = null;

    // Iterate through our playlist.
    for (var i in playlist.feed.entry) {

      // Get the entry from the playlist.
      entry = playlist.feed.entry[i];

      // Create the list item.
      item = $(document.createElement('li'));

      // Set the link item, and bind to the click event.
      a = $(document.createElement('a')).attr({
        'href': '#'
      }).click((function(url) {
        return function(event) {
          event.preventDefault();
          chrome.tabs.create({'url': url});
        };
      })(entry.link[1].href));

      // Get the title.
      title = $(document.createElement('h3')).attr({
        'class': 'ui-li-heading'
      }).text(entry.title.$t);

      // Get the description.
      desc = $(document.createElement('p')).attr({
        'class': 'ui-li-desc'
      }).text(entry.summary.$t);

      // Get the image.
      image = $(document.createElement('img')).attr({
        'src': entry.media$group.media$thumbnail[0].url,
        'class': 'ui-li-thumb ui-corner-all'
      });

      // Add the item to the list.
      list.append(item.append(a.append(image).append(title).append(desc)));
    }

    // Create the listview
    list.listview('refresh');
  });
});
