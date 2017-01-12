angular
  .module('tunely', ['ngRoute'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/home',
      controllerAs: 'homeCtrl',
      controller: 'HomeController'
    })
    .when('/:id', {
      templateUrl: 'templates/song',
      controllerAs: 'songCtrl',
      controller: 'SongController'
    })

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
  });
}
