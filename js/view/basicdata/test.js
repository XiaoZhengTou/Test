define(['angular'], function (angular) {
    var test = angular.module('test', []);
    test.controller('ctrltest',['$scope',function($scope){
    	$scope.wuyu='hhii';
   }]);
   angular._LoadModule('test');
   return test;
});