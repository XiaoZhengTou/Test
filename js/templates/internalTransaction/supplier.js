define(['angular'], function(angular) {
	var supplier= angular.module('supplier', []);
	supplier.controller('supplierCtrl', function($scope) {
	
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
		
	})
	angular._LoadModule('supplier');
	return supplier;
});
















