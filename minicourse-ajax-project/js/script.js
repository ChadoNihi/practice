
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var streetInpt = document.getElementById('street').value;
    var cityInpt = document.getElementById('city').value;
    var cityInptUpCase = cityInpt.toUpperCase();
    var streetImgUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location='+streetInpt+', '+cityInpt+'';

    // clear out old data before new request
    $wikiElem.text("");

    $greeting.text(streetInpt.capitalizeFirstLetter()+' '+cityInptUpCase);

    $body.append('<img class="bgimg" src="'+streetImgUrl+'">');
    
    $.getJSON('http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityInpt+'&api-key=5828d57e5b06d95802b3fbfad604fe6a:12:72276419',
        function(data){
            var dataArr = data.response.docs;
            var nytArticlesUlInners = '';
            dataArr.forEach(function(obj) {
                var liInners = '<a href="'+obj.web_url+'">'+obj.headline.main+'</a><p>'+obj.snippet+'</p>';
                nytArticlesUlInners += '<li class="article">'+liInners+'</li>';
            });
            $nytHeaderElem.append(document.createTextNode(' for '+cityInptUpCase));
            $nytElem.html(nytArticlesUlInners);
    }).error(function(){
        $nytHeaderElem.append(document.createTextNode(' Could Not Be Loaded'));
    });

    var wikiTimeout = setTimeout(function(){
        $wikiElem.text();
    }, 8000);
    $.ajax('http://en.wikipedia.org/w/api.php?action=opensearch&search='+cityInpt+'&format=json',
        {
            dataType: 'jsonp',
            success: function(response) {
                var wikiUlInners = '';
                var titles = response[1];
                var urls = response[3];

                for(var i=0, len=titles.length; i<len; ++i){
                    wikiUlInners += '<li><a href="'+urls[i]+'">'+titles[i]+'</a></li>'
                }

                $wikiElem.html(wikiUlInners);
                clearTimeout(wikiTimeout);
            }
        });

    return false;
};

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$('#form-container').submit(loadData);

// loadData();
