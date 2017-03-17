define(['angular'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var reviewedLog = angular.module('reviewedLog', []);
	reviewedLog.controller('reviewedLogCtrl', function($scope) {
		
		$scope.selected=[];
		$scope.query={
			appdata:
			[{'processSteps':'驳回','content':'凭证不正确','suggestion':'告别拖延君','operator':'李云龙',recordingTime:'2016-05-08 12:04:10'},
			{'processSteps':'驳回','content':'凭证不正确','suggestion':'告别拖延君','operator':'李云龙',recordingTime:'2016-05-08 12:04:10'},
			{'processSteps':'驳回','content':'凭证不正确','suggestion':'告别拖延君','operator':'李云龙',recordingTime:'2016-05-08 12:04:10'},
			{'processSteps':'驳回','content':'凭证不正确','suggestion':'告别拖延君','operator':'李云龙',recordingTime:'2016-05-08 12:04:10'}],
			limit:5,
			page_number:1,
			total:25
		
		}
			
			
	});
	angular._LoadModule('reviewedLog');
	return reviewedLog;
});