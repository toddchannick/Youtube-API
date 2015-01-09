$(document).ready(function() {
    
$('#search-form').submit(function(event) {
    event.preventDefault();
    // the search term
    var q = $('#query').val().trim();
 
    // container to display search results
    var $results = $('#results');
 
    var url = "http://gdata.youtube.com/feeds/api/videos/?v=2&alt=jsonc&callback=?"
 
    // set paid-content as false to hide movie rentals
    url = url + '&paid-content=false';
 
    // set duration as long to filter partial uploads
    url = url + '&duration=long';
 
    // order search results by view count
    url = url + '&orderby=viewCount';
 
    // we can request a maximum of 50 search results in a batch
    url = url + '&max-results=50';
 
    $.getJSON(url + "&q=" + q, function (json) {
 
      var count = 0;
 
      if (json.data.items) {
 
        var items = json.data.items;
        var html = "";
 
        items.forEach(function (item) {
 
          // Check the duration of the video, 
          // full-length movies are generally longer than 1 hour
          var duration = Math.round((item.duration) / (60 * 60));
 
          // Filter out videos that aren't in the Film or Movies category
          if ((duration > 1) && (item.category == "Movies" || item.category == "Film")) {
 
            // Include the YouTube Watch URL youtu.be 
            html += '<p><a href="http://youtu.be/' + item.id + '">';
 
            // Add the default video thumbnail (default quality)
            html += '<img src="http://i.ytimg.com/vi/' + item.id + '/default.jpg">';
 
            // Add the video title and the duration
            html += '<h2>' + item.title + ' ' + item.duration + '</h2></a></p>';
            count++;
          }
        });
      }
 
      // Did YouTube return any search results?
      if (count === 0) {
        $results.html("No videos found");
      } else {
        // Display the YouTube search results
        $results.html(html);
      }
    });
  });

});
