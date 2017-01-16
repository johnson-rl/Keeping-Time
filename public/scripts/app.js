console.log('app.js is not crazy')

angular
  .module('keeping-time', ['ngRoute'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home',
      controllerAs: 'homeCtrl',
      controller: 'HomeController'
    })
    .when('/song/:song', {
      templateUrl: 'templates/song',
      controllerAs: 'songCtrl',
      controller: 'SongController'
    })
    .when('/genre/:genre', {
      templateUrl: 'templates/home',
      controllerAs: 'songCtrl',
      controller: 'SongController'
    })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });
}
