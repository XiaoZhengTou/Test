define(['angular','js/view/videoHistoryVersion/videoHistoryVersion.js'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var videoDec = angular.module('videoDec', ['videoHistoryVersion']);

	videoDec.run(function($http){
	
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
    })
	.config(function ($routeProvider, $locationProvider,$httpProvider) {
		
        $httpProvider.defaults.timeout = 5000;
        $routeProvider
            .when('/videoHistoryVersion/videoHistoryVersion', {
                templateUrl: 'view/videoHistoryVersion/videoHistoryVersion.html'
            })
            .otherwise({
                redirectTo: '/tasks/videoDec'
        });
    })
	.controller('videoDecCtrl', function($scope) {
		$scope.findHistoryVersion=function(){
			alert("查看历史版本")
		}
		
		$scope.selected=[];
		$scope.query={
			appdata:[
			{'name':'XXX.JPG','type':'发票','src':'img/home/ttt1.jpg'},
			{'name':'aaa.xlsx','type':'附件','src':'img/home/ttt1.jpg'},
			{'name':'ccc.docx','type':'合同','src':'img/home/ttt1.jpg'}
			],
			limit:5,
			page_number:1,
			total:25
		
		}
			
			
	});
	angular._LoadModule('videoDec');
	return videoDec;
});