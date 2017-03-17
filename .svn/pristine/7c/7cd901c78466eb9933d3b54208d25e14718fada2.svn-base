define(['angular','js/templates/internalTransaction/customer.js','js/templates/internalTransaction/supplier.js'], function(angular) {
	
	var internalList = angular.module('internalList', ['customer','supplier']);
	internalList.controller('internalListCtrl', function($scope, baseconfig , $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog) {
		$scope.selected = [];
		$scope.getDesserts = function() {
			getApp();
			$scope.promise = $timeout(function() {

			}, 1000);
		};

		$scope.query = {
			description: '',
			num: '',
			dec: '',
			order_code: '',
			currency: 'CNY',
			priority: "JJ",
			filter: {		
				priorityState: [{
					'id': 'JJ',
					'name': '紧急'
				}, {
					'id': 'YB',
					'name': '一般'
				}],
				currencys: baseconfig.currencys
			},
			limit: 5,
			page: 1,
			total: ''
		}

		$scope.taken = function() {
			alert("查询");
		}



		$scope.getCurrent = function() {
			getApp()
			

		}

		$scope.getComplete = function() {
			getApp()
		}

		
		

		getApp();
		function getApp(){

			 $scope.query.total = 251;
             $scope.query.limit = 5;
             $scope.query.page = 1;
		}

		
	})
	angular._LoadModule('internalList');
	return internalList;
});