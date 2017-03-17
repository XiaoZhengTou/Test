define(['angular'], function(angular) {
	var receivables= angular.module('receivables', []);
	receivables.controller('receivablesCtrl', function($scope) {
	
		$scope.selected = [];
		$scope.queryTable = {
			appdata: [{
				'companyNum': '115',
				'companyName': '美的',
				'ERPVersion': '1.0.1'
			}, {
				'companyNum': '115',
				'companyName': '美的',
				'ERPVersion': '1.0.1'
			}, {
				'companyNum': '115',
				'companyName': '美的',
				'ERPVersion': '1.0.1'
			}],
			limit: 5,
			page_number: 1,
			total: 25

		};
		
		$scope.goList = function(){
			$scope.go("tasks/index");
		}
	})
	angular._LoadModule('chanpinxian');
	return chanpinxian;
});
















