var app = angular.module('myApp');

app.controller('CloseSectionCtrl', ['$scope','Data', function($scope,Data) {
   $scope.Data=Data;
   $scope.Data.isHide=false;
   $scope.Data.status='glyphicon-minus';
   var vm=this;

   vm.isSectionClose=false;
   vm.closeSections=function (argument) {
       if($scope.content.offerCalculationPerReceiverPointSet==true){
            if(vm.isSectionClose==true){
                $scope.Data.status='glyphicon-plus-sign';
                $scope.Data.isHide=true;
                
            }
            else{
               $scope.Data.status='glyphicon-minus';
                $scope.Data.isHide=false ;
            }
       }
       else if($scope.content.offerCalculationPerReceiverPointSet==false){
        if(vm.isSectionClose==true){
                $scope.Data.status='glyphicon-plus-sign';
                $scope.Data.isHide=true;
            }
            else{
               $scope.Data.status='glyphicon-minus';
                $scope.Data.isHide=false ;
            }
       }
    }



}]);
