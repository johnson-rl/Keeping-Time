angular
  .module('keeping-time')
  .directive('ktGenreCard', GenreCard);

function GenreCard(){
  var directive = {
    //'A' == attribute, 'E' == element, 'C' == class, 'M' == comment
    restrict : 'E',
    replace : true,
    templateUrl :  "/directives/genre-card.html",
    scope : {
        path: '@',
        image: '@',
        content: '@'
    }
  };
  return directive;
  console.log('genre-card directive returned')
}
