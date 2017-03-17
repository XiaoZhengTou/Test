define(['angular','js/shared/menutree'],function(angular){
	var addFormApp = angular.module("addForm",['md.menuTree']);
	
	addFormApp.controller("addFormCtrl",["$scope","$http","$filter","$mdDialog","$rootScope",function($scope,$http,$filter,$mdDialog,$rootScope){
		
		$scope.target = "catalogue";
		$scope.catalogue = "false";
		
		$http({
			method: "GET",
			url: activityTypeUrl + "docker/currencies/queryAllBrief"
		}).success(function(response){
			if(response.data){
				$scope.currency = response.data;
			}
		});
		
		
		if($rootScope.archive){
			$scope.archive = angular.copy($rootScope.archive);
			$rootScope.archive = null;
			$scope.archive.creation_date = $scope.archive.creation_date ? $filter("date")(new Date($scope.archive.creation_date.replace(/-/g,"/")),"yyyy-MM-dd") : null;
		}else{
			$scope.archive = {
				creation_date: $filter("date")(new Date(),"yyyy-MM-dd"),
				status: 1
			};
		}
		
		var date = new Date();
		
		$scope.years = [];
		$scope.years.push(date.getFullYear() -1);
		$scope.years.push(date.getFullYear());
		
		$scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
		
		$scope.uploadAttachment = function(){
			$rootScope.archives_id = $scope.archive.archives_id;
			
			$scope.go('imageAcquisition/index');
		}
		
		$scope.save = function(){
			delete $scope.archive.category_name;
			delete $scope.archive.company_name;
			
			console.log($scope.archive);
			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionReport/add',
				data: $scope.archive
			}).success(function(response){
			   
			   $scope.go('accountingForm/index');
			});
		}
		
		$scope.submit = function(){
			$scope.archive.status = 2;
			
			delete $scope.archive.category_name;
			delete $scope.archive.company_name;
			
			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionReport/updateArchive',
				data: $scope.archive
			}).success(function(response){
			   $scope.go('accountingForm/index');
			});
		}
		
		$scope.invalid = function(){
			$scope.archive.status = 3;
			
			delete $scope.archive.category_name;
			delete $scope.archive.company_name;
			
			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionReport/updateArchive',
				data: $scope.archive
			}).success(function(response){
			   $scope.go('accountingForm/index');
			});
		}
		
	}]);
});