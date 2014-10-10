var url = "//www.youtube.com/embed/";

function showResponse(response) {
   
    var i;
    for (i=1; i <= 10; i++)
    {
        $('<iframe />');
        $('<iframe />', {
            name: 'frame'+i,
            id: 'frame'+i,
            width: 560,
            height: 315,
            src: url + JSON.parse(JSON.stringify(response.items[i].id.videoId))
        }).appendTo('#vids');
    }
}

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyCR5In4DZaTP6IEZQ0r1JceuvluJRzQNLE');
    search("The Weaboos");
}

function search(tags) {
    var request = gapi.client.youtube.search.list({
        part: 'id',
        q: tags,
        type: "video",
        maxResults: 25,
        order: "viewCount"
    });
    request.execute(onSearchResponse);
}

function onSearchResponse(response) {
    showResponse(response);
}

$(document).ready(function(){

    $('.youtube-search').submit( function(event){
        var tags = $(this).find("input[name='search']").val();
        $('#vids').empty();
        search(tags);
    });
});