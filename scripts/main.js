angular.module('Main', [])
  .controller('MainController',
    function($scope, $http, $filter){

      /*
      * Set the sort direction properties for each column
      * */
      $scope.sortDir = {};
      $scope.sortDir['firstName'] = true;
      $scope.sortDir['lastName'] = true;
      $scope.sortDir['age'] = true;

      /*
      * Get the data
      * */
      $scope.collection = $http({
          method: 'GET',
          url: './data.json'
        })
        .success(function(response) {
          $scope.collection = response.collection;
        });

      /*
      * Toggle the sort direction each time a column header is clicked
      * */
      $scope.isReverse = function(colName) {
        return $scope.sortDir[colName] = !$scope.sortDir[colName];
      };
      /*
      * Sort method called from the react component sortIt method
      * */
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

          /*
          * Watch for changes to the data model (store)
          * */
          scope.$watch('collection', function(newVal, oldVal) {
            if (newVal && newVal.length) {
              /*
              * Render the react component
              * */
              ReactDOM.render(React.createElement(SortTable, {store:scope}), el[0]);
            }
          });

        }
      }
    }
  ]);
