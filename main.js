angular.module('Main', [])
  .controller('MainController',
    function($scope, $http, $filter){
      $scope.collection = $http({
          method: 'GET',
          url: './data.json'
        })
        .success(function(response) {
          $scope.collection = response.collection;
        });

      $scope.sortDir = {};
      $scope.sortDir['firstName'] = true;
      $scope.sortDir['lastName'] = true;
      $scope.sortDir['age'] = true;

      $scope.isReverse = function(colName) {
        return $scope.sortDir[colName] = !$scope.sortDir[colName];
      };
      $scope.sortEntities = function(colName) {
        $scope.collection = $filter('orderBy')($scope.collection, colName, $scope.isReverse(colName));
      };

    }
  )
  .directive('ggtSortTable', [
    function() {
      return {
        restrict:'E',
        link: function(scope, el, attrs) {

          scope.$watch('collection', function(newVal, oldVal) {
            if (newVal && newVal.length) {
              ReactDOM.render(React.createElement(SortTable, {store:scope}), el[0]);

            }
          });



        }
      }
    }
  ]);