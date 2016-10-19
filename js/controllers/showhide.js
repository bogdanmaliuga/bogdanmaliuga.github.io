var app = angular.module('myApp');


app.controller('ShowHideController', ['$scope', 'Data', function($scope, Data) {
    $scope.Data = Data;
    $scope.Data.isHide = false;
    $scope.Data.status = 'glyphicon-minus';
    var vm = this;

    vm.showhide = function() {
        if ( $scope.Data.isHide == false) {
             $scope.Data.isHide = true;
             $scope.Data.status= 'glyphicon-plus-sign';



        } else {
             $scope.Data.isHide = false;
            $scope.Data.status = 'glyphicon-minus';
        }

    }



    vm.statusSummary = 'glyphicon-minus';
    vm.isSummaryHide = false;
    vm.showhideSumary = function() {
        if (vm.isSummaryHide == false) {
            vm.isSummaryHide = true;
            vm.statusSummary = 'glyphicon-plus-sign'
        } else {
            vm.isSummaryHide = false;
            vm.statusSummary = 'glyphicon-minus';
        }
    };



}]);

app.controller('ShowHideCalculationCtrl', ['$scope', function($scope) {
    var vm = this;

    vm.statusCalculation = 'glyphicon-minus';
    vm.isCalculationHide = false;
    vm.showhideCalculation = function() {


        if (vm.isCalculationHide === false) {
            vm.isCalculationHide = true;
            vm.statusCalculation = 'glyphicon-plus-sign';
        } else {
            vm.isCalculationHide = false;
            vm.statusCalculation = 'glyphicon-minus';
        }

    };

}]);
