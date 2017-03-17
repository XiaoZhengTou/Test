define(['angular'],function(angular){
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('archive.css');
	var app = angular.module("warehouse",[]);
	
	app.controller("wareCtrl",["$scope","$http","$timeout","$mdDialog",function($scope,$http,$timeout,$mdDialog){
		$scope.selected = [];
		$scope.query = {
		    page_size: 5,
		    page_number: 1,
		    query_param: {}
		};
		
		$scope.onPaginate = function(page, limit) {
			
			$http({
				method: "POST",
				url: archiveUrl + 'archive/queryWareHouse',
				data: $scope.query
			}).success(function(response){
				console.log(response);
				$scope.filingCabinets = response.data;
			});
			
		    $scope.promise = $timeout(function (){
		    }, 2000);
		};
		
		$scope.onPaginate();
		
		
		$scope.showAdd = function(ev){
			$scope.filingCabinet = {status:1};
			
			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/archivedefine/warehousemanagement/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals:{
		      	filingCabinet:$scope.filingCabinet,
		      	title: '新增',
		      	array: []
		      },
		      fullscreen: false
		    })
		    .then(function(answer){
		    	console.log($scope.filingCabinet);
		    	
		    	$http({
		    		method: "POST",
		    		url: archiveUrl + "archive/addWareHouse",
		    		data: $scope.filingCabinet
		    	}).success(function(response){
		    		console.log(response);
		    		$scope.onPaginate();
		    	})
		    	
		    }, function() {
		    });
		}
		
		
		$scope.editDialog = function(ev,filingCabinet){
			$scope.filingCabinet = filingCabinet;
			
			var array = [];
			
			array[0] = $scope.filingCabinet.name;
			array[1] = $scope.filingCabinet.columnindex;
			array[2] = $scope.filingCabinet.layerindex;
			array[3] = $scope.filingCabinet.faceindex;
			
			
			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/archivedefine/warehousemanagement/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals:{
		      	filingCabinet:$scope.filingCabinet,
		      	title: '编辑',
		      	array: array
		      },
		      fullscreen: false
		    })
		    .then(function(answer){
		    	
		    	$http({
		    		method: "POST",
		    		url: archiveUrl + "archive/addWareHouse",
		    		data: $scope.filingCabinet,
		    	}).success(function(response){
		    		console.log(response);
		    		$scope.onPaginate();
		    	})
		    	
		    }, function() {
		    });
		}
		
		
		function DialogController($scope, $mdDialog,filingCabinet,title,array){
			$scope.filingCabinet = filingCabinet;
			$scope.title = title;
			var array = array;
			
			$scope.onBlur = function(key,value){
				array[key] = value;
				$scope.filingCabinet.code = array.join("-");
			}
			
		    $scope.hide = function() {
		      $mdDialog.hide();
		    };
		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };
		    $scope.answer = function(answer) {
		      $mdDialog.hide(answer);
		    };
		}
		
		$scope.fail = function(id){
			$http({
	    		method: "POST",
	    		url: archiveUrl + "archive/batchUpdateWareHouse",
	    		data: [id],
	    	}).success(function(response){
	    		console.log(response);
	    		$scope.onPaginate();
	    	});
		}
		
		$scope.batchFail = function(){
			var array = [];
			for(var i in $scope.selected){
				array.push($scope.selected[i].id);
			}
			
			$http({
	    		method: "POST",
	    		url: archiveUrl + "archive/batchUpdateWareHouse",
	    		data: array,
	    	}).success(function(response){
	    		console.log(response);
	    		$scope.selected = [];
	    		$scope.onPaginate();
	    	});
		}
		
		$scope.batchAdd = function(ev){
			$scope.batch = {};
			
			$mdDialog.show({
		      controller: batchDialogController,
		      templateUrl: 'templates/archivedefine/warehousemanagement/batchDialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals:{
		      	batch:$scope.batch
		      },
		      fullscreen: false
		    })
		    .then(function(answer){
		    	
		    	console.log($scope.batch);
		    	
		    	$http({
		    		method: "POST",
		    		url: archiveUrl + "archive/batchAddWareHouse",
		    		data: $scope.batch,
		    	}).success(function(response){
		    		console.log(response);
		    		$scope.onPaginate();
		    	})
		    	
		    }, function() {
		    });
		}
		
		
		function batchDialogController($scope, $mdDialog,batch){
			$scope.batch = batch;
			
		    $scope.hide = function() {
		      $mdDialog.hide();
		    };
		    $scope.cancel = function() {
		      $mdDialog.cancel();
		    };
		    $scope.answer = function(answer) {
		      $mdDialog.hide(answer);
		    };
		}
		
		
	}]);
	
	angular._LoadModule('warehouse');
    return app;
});