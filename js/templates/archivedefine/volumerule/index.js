define(['angular','js/shared/menutree'],function(angular){
	publicFunction.addStyle('md-data-table.min.css');
	publicFunction.addStyle('archive.css');
	var volumeRuleApp = angular.module("volumerule",["md.menuTree"]);
	
	volumeRuleApp.controller("volumeCtrl",["$scope","$http","$timeout","$mdDialog",function($scope,$http,$timeout,$mdDialog){
		$scope.selected = [];
		$scope.query = {
		    page_size: 5,
		    page_number: 1,
		    query_param: {}
		};
		
		$scope.target = "catalogue1";
		$scope.catalogue = "false";
		
		$scope.reset = function(){
			var ztree = $.fn.zTree.getZTreeObj("treeDemo1");
			ztree.cancelSelectedNode(ztree.getSelectedNodes()[0]);
			$scope.query.query_param = {};
		}
		
		$scope.onPaginate = function(page, limit) {
			$http({
				method: "POST",
				url: archiveUrl + 'archive/book/rule/query',
				data: $scope.query
			}).success(function(response){
				console.log(response);
				$scope.volumeRules = response.data;
			});
			
		    $scope.promise = $timeout(function (){
		    }, 2000);
		};
		
		$scope.onPaginate();
		
		
		$scope.showAdd = function(ev){
			$scope.volumerule = {status:1,cut_able:0};
			
			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/archivedefine/volumerule/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals:{
		      	volumerule:$scope.volumerule,
		      	title: '新增'
		      },
		      fullscreen: false
		    })
		    .then(function(answer){
		    	console.log($scope.volumerule);
		    	
		    	$http({
		    		method: "POST",
		    		url: archiveUrl + "archive/book/rule/add",
		    		data: $scope.volumerule
		    	}).success(function(response){
		    		console.log(response);
		    		$scope.onPaginate();
		    	});
		    	
		    }, function() {
		    });
		}
		
		
		$scope.editDialog = function(ev,volumerule){
			$scope.volumerule = volumerule;
			
			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/archivedefine/volumerule/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals:{
		      	volumerule:$scope.volumerule,
		      	title: '编辑'
		      },
		      fullscreen: false
		    })
		    .then(function(answer){
		    	
		    	$http({
		    		method: "POST",
		    		url: archiveUrl + "archive/book/rule/update",
		    		data: $scope.volumerule,
		    	}).success(function(response){
		    		console.log(response);
		    		$scope.onPaginate();
		    	})
		    	
		    }, function() {
		    });
		}
		
		
		function DialogController($scope, $mdDialog,volumerule,title){
			$scope.volumerule = volumerule;
			$scope.title = title;
			$scope.target2 = "catalogue";
			$scope.catalogue2 = "true";
			
			if($scope.volumerule.code == undefined){
				$http({
		    		method: "GET",
		    		url: archiveUrl + "archive/book/rule/code"
		    	}).success(function(response){
		    		console.log(response);
		    		$scope.volumerule.code = response.data.code;
		    	});
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
		
		$scope.invalid = function(id){
			$http({
	    		method: "POST",
	    		url: archiveUrl + "archive/book/rule/invalid/" + id
	    	}).success(function(response){
	    		console.log(response);
	    		$scope.onPaginate();
	    	});
		}
		
		$scope.batchInvalid = function(){
			var array = [];
			for(var i in $scope.selected){
				array.push($scope.selected[i].id);
			}
			
			$http({
	    		method: "POST",
	    		url: archiveUrl + "archive/book/rule/batch/invalid",
	    		data: array,
	    	}).success(function(response){
	    		console.log(response);
	    		$scope.selected = [];
	    		$scope.onPaginate();
	    	});
		}
		
		
	}]);
	
	angular._LoadModule('volumerule');
    return app;
});