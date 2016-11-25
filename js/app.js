angular.module('myApp', ['ui.bootstrap']).
controller('PaginationDemoCtrl', ["$scope", "$http", "$log", function($scope, $http, $log) {

    $scope.per = [10, 30, 60];
    $scope.sortType = 'id'; 
    $scope.sortReverse = true; 

    $http({
        method: 'GET',
        url: '../data/response.json',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }).then(function(response) {
        console.log(response);
        $scope.offers = response.data.offers;

        $scope.currentPage = response.data.metaData.currentPage + 1;
        $scope.size = response.data.metaData.size;
        $scope.pagesAmount = response.data.metaData.pagesAmount;
        $scope.recordsAmount = response.data.metaData.recordsAmount;



    });


    $scope.update = function() {
        console.log($scope.currentPage);
        console.log($scope.size);

    }
    $scope.pageChanged=function(){
      console.log($scope.currentPage);
        console.log($scope.size);
    }

}]);
