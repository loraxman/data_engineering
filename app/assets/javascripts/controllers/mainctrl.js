    // create the module and name it freemdm
        // also include ngRoute for all our routing needs
var dataeng = angular.module('dataeng', ['ngRoute','ui.bootstrap']);
dataeng.controller('IndexController', function($scope , $http, $routeParams) {
    
 	$http({method: 'GET', url:'job_api_index'}).
	success(function(data, status, headers, config) {
		console.log(data);
	       $scope.jobs = data; 
//	       console.log($scope.datatype_curr);           
	});
});

