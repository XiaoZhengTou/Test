define(['angular'], function(angular) {
	var remark= angular.module('remark', []);
	remark.controller('remarkCtrl', function($scope) {
	
		$scope.selected = [];
		$scope.queryTable = {
			appdata: [{
				'companyNum': '115',
				'companyName': '美的',
				'ERPVersion': '1.0.1',
				'ERPCompanyNum': '123'
			}, {
				'companyNum': '115',
				'companyName': '美的',
				'ERPVersion': '1.0.1',
				'ERPCompanyNum': '123'
			}, {
				'companyNum': '115',
				'companyName': '美的',
				'ERPVersion': '1.0.1',
				'ERPCompanyNum': '123'
			}],
			limit: 5,
			page_number: 1,
			total: 25

		};
		
		$scope.goList = function(){
			$scope.go("tasks/index");
		}
	})
	angular._LoadModule('remark');
	return remark;
});
















