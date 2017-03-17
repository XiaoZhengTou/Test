define(['angular','moment','momentCN','ngMoment','js/shared/upload','js/templates/keepaccounts/add','js/templates/keepaccounts/edit'/*,'libs/angular-file-upload.js'*/],function(angular){
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('keepaccounts.css');
	
	var app = angular.module('keepaccounts',['angularMoment','md.upload','add','edit'/*'angularFileUpload'*/]);
	
	app.config(function($routeProvider, $locationProvider,$httpProvider){
   		//$httpProvider.defaluts.timeout = 5000;
   		
   		$routeProvider.when('/keepaccounts/add', {
                templateUrl: 'templates/keepaccounts/add.html',
            }).when('/keepaccounts/edit', {
                templateUrl: 'templates/keepaccounts/edit.html',
            });
  	});
   
   
   
	app.controller("kcCtrl",['$scope','$http','$mdDialog','$mdMedia','$filter','$q','$rootScope','note'/*,'FileUploader'*/,function($scope,$http,$mdDialog,$mdMedia,$filter,$q,$rootScope,note/*,FileUploader*/){
		
		
		
		$http({
			method: "GET",
			url: activityTypeUrl + "docker/feetype/active/queryParentAndChild"
		}).success(function(response){
			$rootScope.categorys = [];
			
			if(response.data.data && response.data.data.length > 0){
				for(var i in response.data.data){
					var child = [];
					for(var j in response.data.data[i].childs){
						child.push(response.data.data[i].childs[j].fee_type_name);
					}
					
					$rootScope.categorys.push({id: response.data.data[i].fee_type_id,node: response.data.data[i].fee_type_name,child: child});
				}

				$scope.categorys = $rootScope.categorys;
			}
		});
		
		
		$http({
			method: "GET",
			url: activityTypeUrl + "docker/currencies/queryAllBrief"
		}).success(function(response){
			$rootScope.currencys = [];
			
			console.log(response);
			
			if(response.data && response.data.length > 0){
				for(var i in response.data){
					
					$rootScope.currencys.push(response.data[i].currency_code);
				}

				$scope.categorys = $rootScope.categorys;
			}
		});
		
		/*[{
			id: 1,
			node: '餐饮',
			child: ['早餐', '午餐', '晚餐', '饮料水果', '零食', '买菜原料', '夜宵', '油盐酱醋', '餐饮其它']
		}, {
			id: 2,
			node: '住宿',
			child: ['房租', '电费', '水费']
		}, {
			id: 3,
			node: '交通',
			child: ['打车', '公交', '加油', '停车费', '地铁', '火车', '长途汽车', '过路过桥', '保养维修', '飞机', '车款车贷']
		}, {
			id: 4,
			node: '通讯',
			child: ['手机充值']
		}, {
			id: 5,
			node: '补助',
			child: ['补助1', '补助2', '补助3', '补助4', '补助5', '补助6', '补助7', '补助8', '补助9', '补助10', '补助11', '补助12', '补助13', '补助14']
		}, {
			id: 6,
			node: '其它',
			child: ['其它']
		}];*/
		 
		 $scope.editRow = function(billingNote){
		 	console.log(billingNote);
		 	note.billingNote = billingNote;
		 	
		 	$scope.go('/keepaccounts/edit');
		 }
  
		  $scope.selected = [];
		  $scope.filter = {};
		  $scope.query = {
		    filter: {
		    	sortOrder: '1',
		    	_req: '',
			  	_sart: '',
			  	_end: '',
			  	page_number: 1,
			  	page_size: 5
			 }
		  };
		  
		  function success(desserts) {
		    $scope.desserts = desserts;
		  }
		  
		  /*$scope.addItem = function (event) {
		    $mdDialog.show({
		      clickOutsideToClose: true,
		      controller: 'addItemController',
		      controllerAs: 'ctrl',
		      focusOnOpen: false,
		      targetEvent: event,
		      templateUrl: 'view/keepaccounts/add.html',
		    }).then($scope.getDesserts);
		  };*/
		  
		  $scope.allSelected = [];
		  
		  $scope.delete = function (event) {
		   
		   $scope.allSelected.length = 0;
		   	
		   	for(var i in $scope.selected){
		   		$scope.allSelected.push({"id": $scope.selected[i].id});
		   	}

		   	$http({
        		method: 'POST',
				url: accoutntsUrl+'buy/note/del',
				data:{"billingNotes":$scope.allSelected}
       		}).success(function (response){
	        	 $q.all($scope.selected.forEach(function(dessert, index){
	        	 	$scope.selected.splice(index, 1);
	        	 })).then(function(){
	        	 	$http({
						method:'POST',
						url:accoutntsUrl+'buy/note/pc/search',
						data: $scope.query.filter
					}).success(function(response){
					    $scope.billingNotes = response.data;
					});
	        	 });

        	});
		   	
		  };
		  
		  $scope.search = function(){
			
			$scope.query.filter._sart = $scope.filter.startDate ? $filter("date")($scope.filter.startDate , 'yyyy-MM-dd'): '';
			$scope.query.filter._end = $scope.filter.startDate ? $filter("date")($scope.filter.endDate , 'yyyy-MM-dd'): '';
			
			$http({
				method:'POST',
				url:accoutntsUrl+'buy/note/pc/search',
				data: $scope.query.filter
			}).success(function(response){
				console.log(response);
			    $scope.billingNotes = response.data;
			});
		 }
		  
		  $scope.getData = function (){
		  	$scope.query.filter._sart = $scope.filter.startDate ? $filter("date")($scope.filter.startDate , 'yyyy-MM-dd'): '';
			$scope.query.filter._end = $scope.filter.startDate ? $filter("date")($scope.filter.endDate , 'yyyy-MM-dd'): '';
			
			$http({
				method:'POST',
				url:accoutntsUrl+'buy/note/pc/search',
				data: $scope.query.filter
			}).success(function(response){
				console.log(response);
			    $scope.billingNotes = response.data;
			});
		  }
		  
		  $scope.getData();
		  
	}]);
	

	angular._LoadModule('keepaccounts');
   	return app;
});