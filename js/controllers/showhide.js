var app = angular.module('myApp');

app.controller('ShowHideController', ['$scope', function($scope) {
    var vm = this;
    vm.status='ukryj';
    vm.isHide = false;
    vm.showhide = function(index) {
    	if(vm.isHide==false){
    		vm.isHide=true;
    		vm.status='pokaż'
    	}
    	else{
    		vm.isHide=false;
    		vm.status='ukryj';
    	}
    }


}]);
