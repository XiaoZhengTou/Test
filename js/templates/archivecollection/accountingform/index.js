define(['angular','moment','momentCN','ngMoment','js/templates/archivecollection/accountingform/add'],function(angular){
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('archive.css');
	
	var form = angular.module("accountingform",['angularMoment','addForm']);
	
		form.config(function($routeProvider, $locationProvider,$httpProvider){
		
			$routeProvider.when('/accountingform/add',
			{
				templateUrl:'templates/archivecollection/accountingform/add.html'
			});
		});
	
	form.controller("formArchiveCtrl",["$scope","$http","$timeout","$mdDialog","$rootScope","$filter",function($scope,$http,$timeout,$mdDialog,$rootScope,$filter){
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
			if(response.data){
				$rootScope.companies = response.data.companys;
			}
		})
		
		
		var originatorEv;
	    this.openMenu = function($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
	    };
		
		$scope.reset = function(){
			$scope.query.query_param = {};
		}
		
		$scope.onPaginate = function(page, limit) {
			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionReport/query',
				data: $scope.query
			}).success(function(response){
				console.log(response);
				$scope.archives = response.data;
			});
			
		    $scope.promise = $timeout(function (){
		    }, 2000);
		};
		
		$scope.onPaginate();
		
		$scope.editRow = function(archive){
			$rootScope.archive = archive;
			$scope.go("/accountingform/add");
		}
		
		$scope.batchSubmit = function(){
			
			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionReport/batchSubmit',
				data: $scope.selected
			}).success(function(response){
				console.log(response);
				$scope.selected = [];
				$scope.onPaginate();
			})
		}
		
		
	}]);
	
	angular._LoadModule('accountingform');
    return form;
});