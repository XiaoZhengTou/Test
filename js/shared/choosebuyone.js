define(['angular','js/shared/viewer'],function(angular){
	var app = angular.module("chooseBuyOne",['picviewer']);
	
		app.directive('imageloaded', [
		    function () {
		        return {
		            restrict: 'A',
		
		            link: function(scope, element, attrs) {   
		                var cssClass = attrs.loadedclass;
		
		                element.bind('load', function (e) {
		                    angular.element(element).addClass(cssClass).parent().show();
		                });
		            }
		        }
		    }
		]);
		
		app.factory("$chooseBuyOne",['$http','$mdDialog','$mdMedia','$timeout','$filter',function($http,$mdDialog,$mdMedia,$timeout,$filter){
		
		this.show = function(options){

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/shared/choosebuyone.html',
		      parent: angular.element(document.body),
		      targetEvent: options.targetEvent,
		      locals: {
		        save: options.save
		      },
		      clickOutsideToClose:true,
		      fullscreen: useFullScreen
		 	});
		    
		    function DialogController($scope,$mdDialog,save){
		    	var bookmark;
		    	var timeout;
		    	
		    	$scope.queryConditions = [];
		    	
		    	$http({
					method: "get",
					url: activityTypeUrl + "docker/feetype/active/queryParentAndChild",
					headers: {
						'x-auth-token': sessionStorage.Token
					}
				}).success(function(response){
					console.log(response);
					if(response.data.data && response.data.data.length){
						$scope.queryConditions.push({label: "全部",name: ""});
						for(var i in response.data.data){
							$scope.queryConditions.push({label: response.data.data[i].fee_type_name,name: response.data.data[i].fee_type_name});
						}
					}
					
				});

				$scope.maxDate = new Date();
		
				$scope.options = {debounce: 500};
		
				$scope.select = {queryCondition : {label: "全部",name : ""}};
				
				$scope.selected = options.oldData();
				
				$scope.isOpen = false;
				
				$scope.query = {
					filter: {
						sortOrder: '1',
						page_number: 1,
			  			page_size: 5
					}
				};
		    	
		    	
		    	$scope.hide = function() {
				    $mdDialog.hide();
				};
				
				$scope.cancel = function() {
				    $mdDialog.cancel();
				};
				
				$scope.save = function(){
					save($scope.selected);
					$mdDialog.hide();
				};
				
				$scope.onPaginate = function(page, limit){
					$scope.query.filter._req = $scope.select.queryCondition.name;
					
					$scope.query.filter._sart = $scope.date_start ? $filter("date")($scope.date_start , 'yyyy-MM-dd'): '';
					$scope.query.filter._end = $scope.date_end? $filter("date")($scope.date_end , 'yyyy-MM-dd'): '';
					
					$http({
						method:'POST',
						//url:accoutntsUrl+'buy/note/pc/search',
						url: feelapplyUrl + "buy/note/pc/search",
						data: $scope.query.filter,
						headers: {
							'x-auth-token': sessionStorage.Token
						}
					}).success(function(response){
					    $scope.billingNotes = response.data;
					});
					
				    $scope.promise = $timeout(function (){
				    }, 2000);
				};
				
				
				$scope.removeFilter = function () {
				    $scope.filter.show = false;
				    
				    if($scope.filter.form.$dirty) {
				      $scope.filter.form.$setPristine();
				    }
				};
				
				
				$scope.announceClick = function(condition) {
				  $scope.select.queryCondition = condition;
				};
				
				$scope.$watch('select.queryCondition.name + date_start + date_end', function (newValue, oldValue){
					if(!oldValue) {
				      bookmark = $scope.query.filter.page_number;
				    }
				    
				    if(newValue !== oldValue) {
				      $scope.query.filter.page_number = 1;
				    }
				    
				    if(!newValue) {
				      $scope.query.filter.page_number = bookmark;
				    }
				    
				    if(!newValue) {
				      $scope.onPaginate();
				    }else{
				    	if (timeout){
				    		$timeout.cancel(timeout);
				    	}
					    	
					    timeout = $timeout(function(){
					    	$scope.onPaginate();
					    },1000);
				    }
				    
				});
				
		    }
		    
		}
		
		return this;
	}]);
})