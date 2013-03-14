$(function() {

  // Say we are loading.
  $('body').addClass('ui-loading');

  var list = $('#home ul'),
      item = null,
      a = null,
      title = null,
      desc = null,
      image = null;

  // Get the playlist.
  $.get('https://gdata.youtube.com/feeds/api/users/trailers/playlists?v=2&alt=json', function(playlist) {

    // Iterate over each entry.
    $.each(playlist.feed.entry, function(index, entry) {

      // Create the list item.
      item = $(document.createElement('li'));

      // Set the link item, and bind to the click event.
      a = $(document.createElement('a')).click((function(url) {
        return function(event) {
          event.preventDefault();
          chrome.tabs.create({'url': url});
        };
      })(entry.link[1].href));

      // Get the title.
      title = $(document.createElement('h3')).text(entry.title.$t);

      // Get the description.
      desc = $(document.createElement('p')).text(entry.summary.$t);

      // Get the image.
      image = $(document.createElement('img')).attr({
        'src': entry.media$group.media$thumbnail[0].url
      });

      // Add the item to the list.
      list.append(item.append(a.append(image).append(title).append(desc)));
    });

    // Refresh the listview.
    list.listview('refresh');

    // Remove the loading cursor.
    $('body').removeClass('ui-loading');
  });
});
