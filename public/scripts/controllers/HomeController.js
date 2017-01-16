angular
  .module('keeping-time')
  .controller('HomeController', HomeController)

HomeController.$inject = ['$http', '$routeParams'];

var cardChoices = [
  [{content: 'Love',
    image: 'https://ritexpress.files.wordpress.com/2013/12/music-love-heart-notes.jpg',
    path: '/genre/1'
  },{
    content: 'Happy',
    image: 'https://thirtyroses.files.wordpress.com/2014/08/music-makes-me-happy-by-plastickheart.jpg',
    path: '/genre/2'
  },{
    content: 'Sad',
    image: 'https://miserableowlman.files.wordpress.com/2012/11/sad-music.jpg',
    path: '/genre/3'
  }],
  [{content: 'Fake Plastic Trees by Radiohead',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51slAqhhVPL.jpg',
    path: '/song/1'
  },{
    content: 'Empire by Bring me the Horizon',
    image: 'http://product-images.highwire.com/9990961/bring-me-the-horizon-sempiternal-magnet.jpg',
    path: '/song/2'
  },{
    content: 'Misunderstood by Wilco',
    image: 'http://nerdist.com/wp-content/uploads/2015/07/Wilco-Yankee-Hotel-Foxtrot-07232015.jpg',
    path: '/song/3'
  }]
]

function HomeController ($http, $routeParams){
  console.log('the home is out of control');
  vm = this;
  console.log($routeParams.genre)
  vm.cards = cardChoices[$routeParams.genre||0]
}
