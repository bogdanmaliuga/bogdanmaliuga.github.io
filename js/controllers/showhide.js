var app = angular.module('myApp');


app.controller('ShowHideController', ['$scope', 'Data', function($scope, Data) {
    $scope.Data = Data;


    $scope.Data.status.push('glyphicon-minus');
    $scope.Data.isHide.push(false);
    var vm = this;

    vm.showhide = function(index) {
        if ($scope.Data.isHide[index] == false) {
            $scope.Data.isHide[index] = true;
            $scope.Data.status[index] = 'glyphicon-plus-sign';



        } else {
            $scope.Data.isHide[index] = false;
            $scope.Data.status[index] = 'glyphicon-minus';
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

app.controller('ShowHideSummaryCalculation', ['$scope', function($scope) {
    var vm = this;

    vm.statusSummaryCalculation = 'glyphicon-minus';
    vm.isSummaryCalcHide = false;
    vm.showhideSummaryCalculation = function() {


        if (vm.isSummaryCalcHide === false) {
           vm.isSummaryCalcHide = true;
            vm.statusSummaryCalculation = 'glyphicon-plus-sign';
        } else {
            vm.isSummaryCalcHide = false;
            vm.statusSummaryCalculation = 'glyphicon-minus';
        }

    };

}]);

app.controller('ShowHideOfertu', ['$scope', function($scope) {
    var vm = this;

    vm.statusOfertu = 'glyphicon-minus';
    vm.isOfertuHide = false;
    vm.showhideOfertu = function() {


        if (vm.isOfertuHide === false) {
           vm.isOfertuHide = true;
            vm.statusOfertu = 'glyphicon-plus-sign';
        } else {
            vm.isOfertuHide = false;
            vm.statusOfertu = 'glyphicon-minus';
        }

    };

}]);
