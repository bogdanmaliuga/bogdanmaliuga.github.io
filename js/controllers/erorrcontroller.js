var app=angular.module('myApp');

app.controller('ErrorController', ['$scope', 'errorCode','message','close', function($scope,errorCode,message,close) {

  $scope.close = function(result) {
 	  close(result, 500); // close, but give 500ms for bootstrap to animate
  };

  $scope.errorCode= "Błąd";
  $scope.message=message;


}]);
