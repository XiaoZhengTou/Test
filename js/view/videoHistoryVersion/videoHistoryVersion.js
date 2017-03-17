define(['angular'], function(angular) {
	publicFunction.addStyle('md-data-table.min.css');
	var videoHistoryVersion = angular.module('videoHistoryVersion', []);
	videoHistoryVersion.controller('videoHistoryVersionCtrl', function($scope) {
		
		$scope.selected=[];
		$scope.query={
			appdata:
			[{'versionNum':'11111','updateTime':'2015-02-03 10:00','updatePeople':'张三'},
			{'versionNum':'22222','updateTime':'2015-02-03 10:00','updatePeople':'李四'},
			{'versionNum':'33333','updateTime':'2015-02-03 10:00','updatePeople':'王五'}],
			limit:5,
			page_number:1,
			total:25
		
		}
			
			
	});
	angular._LoadModule('videoHistoryVersion');
	return videoHistoryVersion;
});