var app = angular.module('myApp');

app.controller('ShowHideController', ['$scope', function($scope) {
    var vm = this;
    vm.status='glyphicon-minus';
    vm.isHide = false;
    vm.showhide = function(index) {
    	if(vm.isHide==false){
    		vm.isHide=true;
    		vm.status='glyphicon-plus-sign'
    	}
    	else{
    		vm.isHide=false;
    		vm.status='glyphicon-minus';
    	}
    }


}]);
