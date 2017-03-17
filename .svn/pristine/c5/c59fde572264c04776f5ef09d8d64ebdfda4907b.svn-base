define(['angular','moment','momentCN','ngMoment','js/templates/invoicesfolder/add','js/templates/invoicesfolder/check'],function(angular){
	
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('invoicesfolder.css');
	
	var app = angular.module("invoicesfolder",['angularMoment','add','check']);
	
	app.config(function($routeProvider, $locationProvider,$httpProvider){
		$httpProvider.defaults.timeout = 5000;
		
		$routeProvider.when('/invoicesfolder/add',
			{
				templateUrl:'templates/invoicesfolder/add.html'
			})
			.when('/invoicesfolder/check',{
				templateUrl: 'templates/invoicesfolder/checkInvoice.html'
			});
	});
	
	
	app.controller("invoicesfolderCtrl",['$scope','$http','$mdDialog','$mdMedia','$filter','$timeout','invoice',function ($scope,$http,$mdDialog,$mdMedia,$filter,$timeout,invoice){
		var bookmark;
		var timeout = 0;
		
		$scope.queryConditions = [{label:"发票号码",name : "invoice_code"},{label : "销售方名称",name : "sales_unit_name"},{label : "开票日期", name : "invoice_date_start,invoice_date_end"}];
		
		$scope.maxDate = new Date();

		$scope.options = {debounce: 500};

		$scope.select = {queryCondition : {label: "发票号码",name : "invoice_code"}};
		
		$scope.isOpen = false;
		
		$scope.query = {
		    page_size: 5,
		    page_number: 1,
		    query_param: {}
		};
		
		invoice.invoice= null;
		invoice.base64= null;
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
						$scope.query["query_param"][data] = $filter("date")($scope[data],"yyyy-MM-dd") ;
					
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
		
		var timeout;
		  
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
		    	if (timeout) 
			    	$timeout.cancel(timeout);
			    	
			    timeout = $timeout(function(){
			    	$scope.onPaginate();
			    },2000);
		    }
		    
		    
		});

		
		
		$scope.announceClick = function(condition) {
		  $scope.select.queryCondition = condition;
		  $scope.query["query_param"] = {};
		};
		
				
		$scope.checkedInvoice = function(obj){
			invoice.invoice = obj;
			$scope.go("/invoicesfolder/add");
		};
		
	}]);
	
	angular._LoadModule('invoicesfolder');
   	return app;
})