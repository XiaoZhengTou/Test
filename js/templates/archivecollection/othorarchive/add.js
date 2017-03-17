define(['angular','js/shared/menutree'],function(angular){
	var othorArchiveApp = angular.module("othorAdd",['md.menuTree']);
	
	othorArchiveApp.controller("addOthorArchiveCtrl",["$scope","$http","$filter","$mdDialog","$rootScope",function($scope,$http,$filter,$mdDialog,$rootScope){
		$scope.target = "catalogue";
		$scope.catalogue = "false";
		
		if($rootScope.othorArchive){
			$scope.othorArchive = angular.copy($rootScope.othorArchive);
			$rootScope.othorArchive = null;
			$scope.othorArchive.creation_date = $filter("date")(new Date($scope.othorArchive.creation_date.replace(/-/g,"/")),"yyyy-MM-dd");
		}else{
			$scope.othorArchive = {
				creation_date: $filter("date")(new Date(),"yyyy-MM-dd"),
				status: 1
			};
		}
		
		$scope.uploadAttachment = function(){
			$rootScope.archives_id = $scope.othorArchive.archives_id;
			
			$scope.go('imageAcquisition/index');
		}
		
		$scope.save = function(){
			delete $scope.othorArchive.category_name;
			delete $scope.othorArchive.company_name;

			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionOther/add',
				data: $scope.othorArchive
			}).success(function(response){
			   
			   $scope.go("othorArchive/index");
			});
		}
		
		$scope.submit = function(){
			$scope.othorArchive.status = 2;
			
			delete $scope.othorArchive.category_name;
			delete $scope.othorArchive.company_name;
			
			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionOther/updateArchive',
				data: $scope.othorArchive
			}).success(function(response){
				$scope.go("othorArchive/index");
			});
		}
		
		$scope.invalid = function(){
			$scope.othorArchive.status = 3;
			
			delete $scope.othorArchive.category_name;
			delete $scope.othorArchive.company_name;
			
			$http({
				method: "POST",
				url: archiveUrl + 'archive/collectionOther/updateArchive',
				data: $scope.othorArchive
			}).success(function(response){
				$scope.go("othorArchive/index");
			});
		}
		
	}]);
});