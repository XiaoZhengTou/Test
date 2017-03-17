define(['angular'],function(angular){
	var app = angular.module("add",[]);
	
	app.directive('tongyong', function () {
        return {
            restrict: 'EA',
            templateUrl: 'view/keepaccounts/ecoType1.html'
        }
    });
    app.directive('jiaotong', function () {
        return {
            restrict: 'EA',
            templateUrl: 'view/keepaccounts/ecoType2.html'
        }
    });
    app.directive('zhusu', function () {
        return {
            restrict: 'EA',
            templateUrl: 'view/keepaccounts/ecoType3.html'
        }
    });
	
	app.controller("addCtrl",['$scope','$mdMedia','$mdDialog','$filter','$http','$rootScope','uploadFile',function($scope,$mdMedia,$mdDialog,$filter,$http,$rootScope,uploadFile){
		$scope.categorys = $rootScope.categorys;
		$scope.currencys = $rootScope.currencys;
		
		var index;
		
		$scope.account = {
			id: "0",
			ifNeedReim: false,
			currencyCode: $scope.currencys[0],
			feeCategoryCode: $scope.categorys[0].id,
			feeCategoryName: $scope.categorys[0].node,
			ecoTypeId: 0,
			ecoTypeName: '早餐',
			categorychild: "餐饮>早餐"
		};
				
		$scope.$watch('account.feeCategoryCode',function(newValue,oldValue,scope){
			/*$scope.account.feeCategoryName = $scope.categorys[newValue - 1].node;
			$scope.account.ecoTypeId = 0;
			$scope.account.ecoTypeName = $scope.categorys[newValue - 1].child[0];
			$scope.account.categorychild = $scope.categorys[newValue - 1].node + ">" + $scope.categorys[newValue - 1].child[0];*/
			
			for(var i in $scope.categorys){
				if($scope.categorys[i].id == newValue){
					$scope.account.feeCategoryName = $scope.categorys[i].node;
					$scope.account.ecoTypeId = 0;
					$scope.account.ecoTypeName = $scope.categorys[i].child[0];
					$scope.account.categorychild = $scope.categorys[i].node + ">" + $scope.categorys[i].child[0];
					
					index = i;
					
					return;
				}
			}
		});
		
		
		$scope.$watch('account.ecoTypeId',function(newValue,oldValue,scope){
			$scope.account.categorychild = $scope.categorys[index].node + ">" + $scope.categorys[index].child[newValue];
			$scope.account.ecoTypeName = $scope.categorys[index].child[newValue];
		});
		
		
		//$scope.currencys = ['CNY', 'USD', 'EUR', 'HKD', 'GBP', 'JPY', 'KRW', 'CAD', 'AUD', 'CHF', 'SGD', 'MYR', 'IDR', 'NZD', 'VND', 'THB', 'PHP', 'RBL', 'DKK', 'RUB', 'SEK', 'NTD', 'ZAR', 'BRL'];

		$scope.files = [];
        $scope.data = [];
        
        $scope.addItem = function(){
		  	$scope.form.$setSubmitted();
		    
		    if($scope.form.$valid){
		    	$scope.account.happenAddress=$scope.account.happenAddress?$scope.account.happenAddress:$scope.account.fromAreaName;
				$scope.account.happenDate=$scope.account.datestring ? $filter('date')($scope.account.datestring, 'yyyy-MM-dd') : $filter('date')(new Date(), 'yyyy-MM-dd');
				$scope.account.startDate=$scope.account.startstring ? $filter('date')($scope.account.startstring, 'yyyy-MM-dd') : $filter('date')(new Date(), 'yyyy-MM-dd');
				$scope.account.endDate=$scope.account.endstring ? $filter('date')($scope.account.endstring, 'yyyy-MM-dd') : $filter('date')(new Date(), 'yyyy-MM-dd');
				
				
				console.log($scope.account);
				
		    	$http({
					method: 'POST',
					url: accoutntsUrl+'buy/note/create',
					data: $scope.account
				}).success(function(response){
					console.log(response);
					if($scope.data.length > 0){

						$http({
							method: 'POST',
							url: yingxiangUrl+'attachment/buyone/save',
							data: {
								"source_order_id": response.data.id,
								"source_system": "BuyOne",
								"image_list": $scope.data
							},
							headers:{'Content-Type': 'application/json'}
						}).success(function(response) {
							$scope.files.length = 0;
							$scope.data.length = 0;
							uploadFile.files.length = 0;
						});
					}
					
					$scope.go('/keepaccounts/index');
				});
		   }

	  	}
        
        
        $scope.openDialog = function(ev){
        	 var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        	 
        	 var tempData = angular.copy($scope.data);
        	 var tempFile = angular.copy($scope.files);
        	 
		    $mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/keepaccounts/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      locals: {
		           files: $scope.files,
		           data: $scope.data
		      },
		      clickOutsideToClose:true,
		      fullscreen: useFullScreen
		    }).then(function(answer){
		    }, function(){
		    	/*$scope.files.length = 0;
		    	$scope.data.length = 0;*/
		    	
		    	$scope.files = tempFile;
		    	$scope.data = tempData;
		    });
		    
		    $scope.$watch(function() {
		      return $mdMedia('xs') || $mdMedia('sm');
		    }, function(wantsFullScreen) {
		      $scope.customFullscreen = (wantsFullScreen === true);
		    });
        }
        
        function DialogController($scope,$mdDialog,files,data) {
		  $scope.hide = function(){
		    $mdDialog.hide();
		  };
		  
		  $scope.cancel = function(){
		    $mdDialog.cancel();
		  };
		  
		  $scope.selectFile = function(){
		  	document.getElementById("files").click();
		  }
		  
		  $scope.files = files;
		  $scope.data = data;
		  var i = 1;
		  
			$scope.fileHandle = function(){
		        var file = uploadFile.files.pop();
		        var reader = new FileReader();
		       
				reader.onload = function(loadEvent){
					$scope.$apply(function (){
						$scope.files.push({base64: loadEvent.target.result});
						
						$scope.data.push({
							  "oper_type": "add",
							  "image_id": "",
							  "image_index": i,
							  "source_filename": file.name,
							  "file_type": file.name.split('.')[1],
							  "filecontent": loadEvent.target.result.split(',')[1]
						});
						
						++i;
				   });
				}
				
				if(typeof(file) === 'object'){
					reader.readAsDataURL(file);
				}
			}
			$scope.save = function(){
			  	$mdDialog.hide("save");
			}
		
	        $scope.removeImg = function(event,index){
	          	event.stopPropagation();
	          	event.preventDefault();
	          	
	          	document.getElementById("files").value = null;
	          	$scope.files.splice(index,1);
	          	$scope.data.splice(index,1);
	        }
        }
		
	}])
})
