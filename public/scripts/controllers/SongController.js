angular
  .module('keeping-time')
  .controller('SongController', SongController)

var songSearch = 'https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=JSON_CALLBACK&quorum_factor=1&apikey=d29a8b0803d58635d56bb6b66764f2d3'
var lyricSearch = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=JSON_CALLBACK&apikey=d29a8b0803d58635d56bb6b66764f2d3&track_id='
var translateQuery = 'https://translation.googleapis.com/language/translate/v2?target=fr&key=AIzaSyDN9w5iCC44NN-_bnoO7Yu8ZXnmHB_QmJg&q='
var trackID;
var lyrics;

SongController.$inject = ['$http', '$routeParams', '$location', '$sce'];

function SongController ($http, $routeParams, $location, $sce){
  var vm = this
  // console.log(recentlyFound, $routeParams.song)
  vm.song = recentlyFound.filter(function(track){return track.uri===$routeParams.song})[0]
  // console.log(vm.song)
  vm.song.translation = []
  vm.song.vocab = []
  vm.song.uri = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri='+$routeParams.song)
  console.log('song: ',vm.song.uri)

  $http({
    method: 'JSONP',
    url: songSearch+'&q_track='+encodeURIComponent(vm.song.track)+'&artist='+encodeURIComponent(vm.song.artist)
  }).then(function(json){
    trackID = json.data.message.body.track_list[0].track.track_id
    vm.findLyrics()
  })

  vm.findLyrics = function(){
    console.log('track ID used',trackID)
    $http({
      method: 'JSONP',
      url: lyricSearch+trackID
    }).then(function(json){
      vm.song.lyrics = json.data.message.body.lyrics.lyrics_body.split('\n').slice(0,-3)
      vm.song.lyrics.forEach(function(lyric){
      vm.translateLyrics(lyric)
      if(lyric!==""){
        var splitLyric = lyric.split(' ')
        vm.song.vocab.push(splitLyric[Math.round(Math.random()*(splitLyric.length-1))])
        // console.log(lyric, 'vocab', vm.song.vocab)
      }
      })
    })
  }
  vm.translateLyrics = function(translate){
    $http({
      method: 'GET',
      url: translateQuery+translate
    }).then(function(json){
      vm.song.translation.push(json.data.data.translations[0].translatedText.replace("&#39;","'"))
    })
  }
}
