

$(document).ready(function() {

var resultsList = $('#results');
var results = $('#results-div');
var resultsTitle = $('#results-title');


$('#home').on('click', function(){
  location.reload(true); 
});



$(function(){
  $('#search-form').submit(function(event){
    event.preventDefault();
    resultsTitle.empty();
    resultsList.empty();
    var searchTerm = $('#query').val();
    getRequest(searchTerm);
    $('#query').val('');
  });
});



// Search for a specified string.
function getRequest(searchTerm) {
  $.getJSON("https://www.googleapis.com/youtube/v3/search?part=snippet&q="+searchTerm+"&key=AIzaSyC9FSU2oeRDPj9AN9YZQ66AdKm8F6vdZls&maxResults=25", function(data){
    resultsTitle.append((data.items).length+' results for '+searchTerm+':');
    for (var i=0; i<(data.items).length; i++){
      var title = (data.items[i].snippet.title);
      var thumbnail = (data.items[i].snippet.thumbnails.default.url);
      var videoID = (data.items[i].id.videoId);
      console.log(data);
      resultsList.append("<li>"+title+"</li><li><a href='https://www.youtube.com/watch?v="+videoID+"'><img src='"+thumbnail+"'></a></li>");
    };
  });
};



});
