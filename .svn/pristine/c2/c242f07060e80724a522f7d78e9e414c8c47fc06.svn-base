define(['angular'],function(angular){
	var app = angular.module("edit",[]);
    
    app.directive('tongyong2', function () {
        return {
            restrict: 'EA',
            templateUrl: 'view/keepaccounts/editType1.html'
        }
    });
    app.directive('jiaotong2', function () {
        return {
            restrict: 'EA',
            templateUrl: 'view/keepaccounts/editType2.html'
        }
    });
    app.directive('zhusu2', function () {
        return {
            restrict: 'EA',
            templateUrl: 'view/keepaccounts/editType3.html'
        }
    });
	
	app.controller("modifyCtrl",['$scope','$mdMedia','$mdDialog','$filter','$http','$rootScope','uploadFile','note',function($scope,$mdMedia,$mdDialog,$filter,$http,$rootScope,uploadFile,note){
		$scope.categorys = $rootScope.categorys;
		$scope.currencys = $rootScope.currencys;
		var index;
		$scope.account = {};

		$scope.editAccount = note.billingNote;
		
		$scope.editAccount.datestring = $scope.editAccount.happenDate ? new Date($scope.editAccount.happenDate.replace(/-/g,"/")) : '';
		$scope.editAccount.startstring = $scope.editAccount.startDate ? new Date($scope.editAccount.startDate.replace(/-/g,"/")) : '';
		$scope.editAccount.endstring = $scope.editAccount.endDate ? new Date($scope.editAccount.endDate.replace(/-/g,"/")) : '';
		
		$scope.$watch('editAccount.feeCategoryCode',function(newValue,oldValue,scope){
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
		
		$scope.$watch('editAccount.ecoTypeId',function(newValue,oldValue,scope){
			$scope.editAccount.categorychild = $scope.categorys[index].node + ">" + $scope.categorys[index].child[newValue];
			$scope.editAccount.ecoTypeName = $scope.categorys[index].child[newValue];
		});

		$scope.files = [];
        $scope.data = [];
        $scope.temp = [];
        $scope.deleteFiles = [];
        $scope.index = 0;
        
        $http.get(yingxiangUrl+'attachment/getAttList/' + $scope.editAccount.id).success(function (response) {
        	console.log(response);
			if(response.data.attVersion !== null && response.data.attVersion !== undefined){
				
				if(response.data.attVersion.AttPic.length >= 2){
					for(var i = 0 ; i < response.data.attVersion.AttPic.length -1; i++){
				   		
				   		for(var j = i+1 ; j < response.data.attVersion.AttPic.length; j++){
				   			var snap;
				   			
				   			if(response.data.attVersion.AttPic[i].image_index > response.data.attVersion.AttPic[j].image_index){
							     snap = response.data.attVersion.AttPic[j];
							     response.data.attVersion.AttPic[j] = response.data.attVersion.AttPic[i];
							     response.data.attVersion.AttPic[i] = snap;
							}
				   		}
				    }
				}
				
				
				for(var i = 0 ; i < response.data.attVersion.AttPic.length; i++){
					$scope.temp.push({
			   			image_id: response.data.attVersion.AttPic[i].image_id,
			   			base64: yingxiangUrl+'encrypt/thumbnail/'+ response.data.attVersion.AttPic[i].image_id
			   		});
			   		
			   		$scope.index = response.data.attVersion.AttPic[i].image_index;
				}
				
			   $scope.files = $scope.files.concat($scope.temp);
			}
		   
	    });
	    
	    $scope.modify = function(){
	    	$scope.form.$setSubmitted();
	    		
    		if($scope.form.$valid){
    			
    			$http({
					method: 'POST',
					url: accoutntsUrl+'buy/note/create',
					data: $scope.editAccount
				}).success(function(response){
					
					if($scope.deleteFiles.length > 0 || $scope.data.length > 0){
						$http({
							method: 'POST',
							url: yingxiangUrl+'attachment/buyone/save',
							data: {
								 "source_order_id": $scope.editAccount.id,
								 "source_system": "BuyOne",
								 "image_list": $scope.deleteFiles.concat($scope.data)
							},
							headers:{'Content-Type': 'application/json'}
						}).success(function(response){
							console.log(response);
							$scope.deleteFiles.length = 0;
							$scope.data.length = 0;
							
							
						});
					}
					
					$scope.go('/keepaccounts/index');
				});
    			
    		}
				  	
		}



		$scope.openDialog = function(ev){
        	 var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        	 
		    $mdDialog.show({
		      controller: editController,
		      templateUrl: 'templates/keepaccounts/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      locals: {
		           files: $scope.files,
		           data: $scope.data,
		           deletefiles: $scope.deleteFiles,
		           index: $scope.index
		      },
		      clickOutsideToClose:true,
		      fullscreen: useFullScreen
		    }).then(function(answer){
		    }, function(){
		    	$scope.files = angular.copy($scope.temp);
		    	$scope.data.length = 0;
		    });
		    
		    $scope.$watch(function() {
		      return $mdMedia('xs') || $mdMedia('sm');
		    }, function(wantsFullScreen) {
		      $scope.customFullscreen = (wantsFullScreen === true);
		    });
        }
        
        function editController($scope,$mdDialog,files,data,deletefiles,index) {
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
		  $scope.deletefiles = deletefiles;
		  var i = index;
		  
		$scope.fileHandle = function(){
	        var file = uploadFile.files.pop();
	        var reader = new FileReader();
	       
			reader.onload = function(loadEvent){
				$scope.$apply(function (){
					i++;
					
					$scope.files.push({"image_index": i,base64: loadEvent.target.result});
					
					$scope.data.push({
						  "oper_type": "add",
						  "image_id": "",
						  "image_index": i,
						  "source_filename": file.name,
						  "file_type": file.name.split('.')[1],
						  "filecontent": loadEvent.target.result.split(',')[1]
					});

			   });
			}
			
			if(typeof(file) === 'object'){
				reader.readAsDataURL(file);
			}
		}
		
		$scope.save = function(){
		  	$mdDialog.hide("save");
		}
	
        $scope.removeImg = function(event,index,file){
          	event.stopPropagation();
          	event.preventDefault();
          	
          	document.getElementById("files").value = null;
          	
          	$scope.files.splice(index,1);
          	
          	if(file.image_id != ""){
          		$scope.deletefiles.push({
				  "oper_type": "del",
				  "image_id": file.image_id
				});
          	}else{
          		var temp = []
          		for(var i in $scope.data){
          			if(file.image_index == $scope.data[i].image_index){
          				
          			}else{
          				temp.push($scope.data[i]);
          			}
          		}
          		
          		$scope.data = temp;
          	}
          	
        }
    }
		
	}])
})
