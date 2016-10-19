var app = angular.module('myApp');

app.controller('CloseSectionCtrl', ['$scope', 'Data', function($scope, Data) {
    $scope.Data = Data;



    var vm = this;

    vm.isSectionClose = false;
    vm.closeSections = function(argument) {
        var z = $scope.Data.status.length;
        if ($scope.content.offerCalculationPerReceiverPointSet == true) {
            if (vm.isSectionClose == true) {


                for (var i = 0; i < z; i++) {
                    $scope.Data.status[i] = 'glyphicon-plus-sign';
                    $scope.Data.isHide[i] = true;
                }


            } else {

                for (var i = 0; i < z; i++) {
                    $scope.Data.status[i] = 'glyphicon-minus';
                    $scope.Data.isHide[i] = false;
                }

            }
        } else if ($scope.content.offerCalculationPerReceiverPointSet == false) {
            if (vm.isSectionClose == true) {


                for (var i = 0; i < z; i++) {
                    $scope.Data.status[i] = 'glyphicon-plus-sign';
                    $scope.Data.isHide[i] = true;
                }


            } else {

                for (var i = 0; i < z; i++) {
                    $scope.Data.status[i] = 'glyphicon-minus';
                    $scope.Data.isHide[i] = false;
                }

            }
        }
    }



}]);
