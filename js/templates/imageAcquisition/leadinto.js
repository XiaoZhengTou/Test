define(['angular','moment','momentCN','ngMoment'],function(angular){
	
	publicFunction.addStyle('md-data-table.min.css');
	
	var app = angular.module("leadinto",['angularMoment']);
	
	app.run(function($http){
		$http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
	});
	
	
	app.controller("leadintoCtrl",['$scope','$http','$mdDialog','$mdMedia','$filter','$timeout','invoice',function ($scope,$http,$mdDialog,$mdMedia,$filter,$timeout,invoice){
		var bookmark;
		var timeout;
		
		$scope.queryConditions = [{label:"发票号码",name : "invoice_code"},{label : "销售方名称",name : "sales_unit_name"},{label : "开票日期", name : "invoice_date_start,invoice_date_end"}];
		
		$scope.maxDate = new Date();

		$scope.options = {debounce: 500};

		$scope.select = {queryCondition : {label: "发票号码",name : "invoice_code"}};
		
		$scope.selected = [];
		
		$scope.isOpen = false;
		
		
		if(invoice.selected){
			$scope.selected = invoice.selected;
		}
		
		$scope.query = {
			filter: "",
		    page_size: 5,
		    page_number: 1,
		    query_param: {}
		};
		
		invoice.invoice= null;
		invoice.invoice_code = null;
		
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
				console.log(response);
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
		
		$scope.selectedRow = function(event,invoice){
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		    $mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/imageAcquisition/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: event,
		      clickOutsideToClose:true,
		      locals: {
		           invoice: invoice
		      },
			  fullscreen: useFullScreen
		    });
		    
		    $scope.$watch(function() {
		      return $mdMedia('xs') || $mdMedia('sm');
		    }, function(wantsFullScreen) {
		      $scope.customFullscreen = (wantsFullScreen === true);
		    });
		    
		    
		    function DialogController($scope, $mdDialog,invoice) {
		    	$scope.invoice = invoice;
			  $scope.hide = function() {
			    $mdDialog.hide();
			  };
			  $scope.cancel = function() {
			    $mdDialog.cancel();
			  };
			}
		}
		

		$scope.confirm = function(){
			invoice.selected = $scope.selected;
			
			$scope.go("imageAcquisition/index");
		}
		
		
		
		$scope.announceClick = function(condition) {
		  $scope.select.queryCondition = condition;
		  $scope.query["query_param"] = {};
		};
		
	}]);
})