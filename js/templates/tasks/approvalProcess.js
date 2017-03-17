define(['angular'], function(angular) {
	publicFunction.addStyle('tasks.css');
	var approvalProcess = angular.module('approvalProcess', []);
	approvalProcess.controller('approvalProcessCtrl', function($scope) {		

		$scope.query={
			selectState1:'true',	
			selectState2:'true',
			selectState3:'true',
			selectState4:'true',	
			selectState5:'true'	
		};
			
			
	});
	angular._LoadModule('approvalProcess');
	return approvalProcess;
});