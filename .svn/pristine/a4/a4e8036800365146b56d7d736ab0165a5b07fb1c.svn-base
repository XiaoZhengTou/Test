define(['angular'],function(angular){
	var app = angular.module("chooseInvoice",[]);

	angular.module('chooseInvoice')
		.factory("$chooseInvoice",['$http','$mdDialog','$mdMedia','$timeout',function($http,$mdDialog,$mdMedia,$timeout){
		
		this.show = function(options){

			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/shared/chooseinvoice.html',
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
				
				$scope.queryConditions = [{label:"发票号码",name : "invoice_code"},{label : "销售方名称",name : "sales_unit_name"},{label : "开票日期", name : "invoice_date_start,invoice_date_end"}];
				
				$scope.maxDate = new Date();
		
				$scope.options = {debounce: 500};
		
				$scope.select = {queryCondition : {label: "发票号码",name : "invoice_code"}};
				
				$scope.selected = [];
				
				$scope.isOpen = false;
				
				$scope.query = {
					filter: "",
				    page_size: 5,
				    page_number: 1,
				    query_param: {}
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
				
				$scope.onPaginate = function(page, limit) {
					if($scope.select.queryCondition.name !== "invoice_date_start,invoice_date_end"){
						if($scope.query.filter == ""){
							delete $scope.query["query_param"][$scope.select.queryCondition.name];
						}else{
							if($scope.query.filter != undefined)
								$scope.query["query_param"][$scope.select.queryCondition.name] = $scope.query.filter;
						}
					}else{
						angular.forEach($scope.select.queryCondition.name.split(","),function(data,index,array){
							
							if($scope[data] != undefined)
								$scope.query["query_param"][data] = $filter("date")($scope[data],"yyyy-MM-dd");
							
						})
					}
					
					$http({
						method: "POST",
						url: piaojiaTestUrl + 'queryInvWallet',
						data: $scope.query
					}).success(function(response){
						$scope.invoices = response.data;
					});
					
				    $scope.promise = $timeout(function (){
				    }, 2000);
				};
				
				
				$scope.removeFilter = function () {
				    $scope.filter.show = false;
				    $scope.query["query_param"] = {};
				    $scope.query.filter = '';
				    $scope.invoice_date_start = null;
				    $scope.invoice_date_end = null;
				    
				    if($scope.filter.form.$dirty) {
				      $scope.filter.form.$setPristine();
				    }
				};
				
				
				$scope.announceClick = function(condition) {
				  $scope.select.queryCondition = condition;
				  $scope.query["query_param"] = {};
				};
				
				$scope.$watch('query.filter + invoice_date_start + invoice_date_end', function (newValue, oldValue){
					if(!oldValue) {
				      bookmark = $scope.query.page_number;
				    }
				    
				    if(newValue !== oldValue) {
				      $scope.query.page_number = 1;
				    }
				    
				    if(!newValue) {
				      $scope.query.page_number = bookmark;
				    }
				    
				    if(!newValue) {
				      $scope.onPaginate();
				    }else{
				    	if (timeout){
				    		$timeout.cancel(timeout);
				    	}
					    	
					    timeout = $timeout(function(){
					    	$scope.onPaginate();
					    },2000);
				    }
				    
				});
				
				
				
		    }
		    
		}
		
		return this;
	}]);
})
