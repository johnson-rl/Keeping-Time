angular
  .module('keeping-time')
  .controller('HomeController', HomeController)

HomeController.$inject = ['$http', '$routeParams', '$location'];

//Genres and Categories go here
var cardChoices = [
  {content: 'Love',
    image: 'https://ritexpress.files.wordpress.com/2013/12/music-love-heart-notes.jpg',
    path: '/genre/Love'
  },{
    content: 'Happy',
    image: 'https://thirtyroses.files.wordpress.com/2014/08/music-makes-me-happy-by-plastickheart.jpg',
    path: '/genre/Happy'
  },{
    content: 'Sad',
    image: 'https://miserableowlman.files.wordpress.com/2012/11/sad-music.jpg',
    path: '/genre/Sad'
  }
]
// //Old Seed data
// [{content: 'Fake Plastic Trees by Radiohead',
//   image: 'https://images-na.ssl-images-amazon.com/images/I/51slAqhhVPL.jpg',
//   path: '/song/1'
// },{
//   content: 'Empire by Bring me the Horizon',
//   image: 'http://product-images.highwire.com/9990961/bring-me-the-horizon-sempiternal-magnet.jpg',
//   path: '/song/2'
// },{
//   content: 'Misunderstood by Wilco',
//   image: 'http://nerdist.com/wp-content/uploads/2015/07/Wilco-Yankee-Hotel-Foxtrot-07232015.jpg',
//   path: '/song/3'
// }]

function HomeController ($http, $routeParams, $location){
  console.log('the home is out of control');
  vm = this;
  vm.cards = cardChoices
  vm.spotify = []
  vm.songSearch = ''

  vm.spotifySearch = function(){
    if (vm.songSearch){
    vm.searchString = encodeURIComponent(vm.songSearch)
    console.log('submitted', vm.searchString)
    // console.log(path)
    // $location.path('/genre/'+path)
      spotify()
    } else{
      vm.cards = cardChoices
    }
  }

  function spotify (){
    var searchTerm = $routeParams.genre || vm.searchString
    $http({
      method: 'GET',
      url: 'https://api.spotify.com/v1/search?limit=6&type=track&q='+searchTerm,
    }).then(function(json){
      // console.log(json)
      json.data.tracks.items.forEach(function(track){
        var newTrack = {}
        newTrack.uri = "https://embed.spotify.com/?uri="+track.uri;
        newTrack.content = track.name+' by '+track.artists[0].name;
        newTrack.image = track.album.images[0].url;
        newTrack.path = '/song/'+track.uri;
        vm.spotify.push(newTrack);
      })
      vm.cards = vm.spotify
      console.log('songs',vm.spotify);
      vm.spotify = []
    });
  }
  if($routeParams.genre){spotify()}
}
