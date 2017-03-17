define(['angular','moment','momentCN','ngMoment','js/templates/archivecollection/othorarchive/add'],function(angular){
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('archive.css');
	var app = angular.module("othorArchive",['angularMoment','othorAdd']);
	
		app.config(function($routeProvider, $locationProvider,$httpProvider){
		
			$routeProvider.when('/othorarchive/add',
			{
				templateUrl:'templates/archivecollection/othorarchive/add.html'
			});
		});
	
	app.controller("othorArchiveCtrl",["$scope","$http","$timeout","$mdDialog","$rootScope","$filter",function($scope,$http,$timeout,$mdDialog,$rootScope,$filter){
		$scope.selected = [];
		$scope.query = {
		    page_size: 5,
		    page_number: 1,
		    query_param: {}
		};
		
		$http({
			method: "GET",
			url: archiveUrl + "archive/collectionOther/findCompany"
		}).success(function(response){
			console.log(response);
			$rootScope.companies = response.data.companys;
		})
		
		
		var originatorEv;
	    this.openMenu = function($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
	    };
		
		$scope.reset = function(){
			$scope.query.query_param = {};
			$scope.dateStr = null;
		}
		
		$scope.onPaginate = function(page, limit) {
			console.log($scope.query);
			
			$scope.query.query_param.creation_date = $scope.dateStr ? $filter("date")($scope.dateStr ,"yyyy-MM-dd") : "";
			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionOther/query',
				data: $scope.query
			}).success(function(response){
				console.log(response);
				$scope.othorArchives = response.data;
			});
			
		    $scope.promise = $timeout(function (){
		    }, 2000);
		};
		
		$scope.onPaginate();
		
		$scope.editRow = function(othorArchive){
			$rootScope.othorArchive = othorArchive;
			$scope.go("/othorarchive/add");
		}
		
		$scope.batchSubmit = function(){
			
			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionOther/batchSubmit',
				data: $scope.selected
			}).success(function(response){
				console.log(response);
				$scope.selected = [];
				$scope.onPaginate();
			})
		}
		
		
	}]);
	
	angular._LoadModule('othorArchive');
    return app;
});