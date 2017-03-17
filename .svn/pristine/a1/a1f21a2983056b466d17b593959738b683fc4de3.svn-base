define(['angular','libs/imageCropperDirective','libs/imageCropper','js/shared/upload'],function(angular){
	
	var app = angular.module('add',['imageCropper','md.upload']);
	
	app.controller("addCtrl",['$scope','$http','$timeout','$filter','$mdDialog','$mdMedia','invoice','uploadFile',function($scope, $http, $timeout,$filter,$mdDialog,$mdMedia,invoice,uploadFile){
		$scope.invoice = null;
		//$scope.files = [];
		$scope.image = null;
		$scope.isExist = false;
		$scope.imageUrl = '';
		
		$scope.fileHandle = function(){
		   $scope.files = uploadFile.files;
	       
	       var file = $scope.files.pop();
	       
	       var reader = new FileReader();
	       
			reader.onload = function(loadEvent){
				$scope.$apply(function () {
					invoice.base64 = $scope.imageUrl = loadEvent.target.result;
					
					$scope.image = {
							"oper_type": "add",
							"source_filename": file.name,
							"file_type": file.name.split('.')[1],
							"filecontent":loadEvent.target.result.split(',')[1]
						}
			   });
			}
			
			if(typeof(file) === 'object'){
				reader.readAsDataURL(file);
			}
	       
		}

		if(invoice.invoice){
			console.log(invoice.invoice);
			$scope.invoice = invoice.invoice;
			
			if(invoice.base64){
				$scope.imageUrl = invoice.base64;
			}else if(invoice.invoice.image_id){
				$http.get("http://10.16.30.77:8080/sdatt/attachment/getImage/" + invoice.invoice.image_id).success(function(respose){
					
					if(respose.data.attPic.length > 0){
						$http({
							method: "POST",
							url: "http://10.16.30.77:8080/sdatt/attachment/downloadFile",
							data: {
								filepath: respose.data.attPic[0].file_path,
								filetype: respose.data.attPic[0].file_type
							}
						}).success(function(respose){
							console.log(respose);
							
							$scope.imageUrl = invoice.base64 = "data:image/" + respose.filetype + ";base64," + respose.content;
						});
					}
					
				});
			}
			
			
		}
			
		
		$scope.upload = function(){
			document.getElementById("files").click();
		}
        
        $scope.showControls = true;
        $scope.fit = false;
        

        $scope.myButtonLabels = {
          rotateLeft: '<i class="iconfont">&#xe69c;</i>',
          rotateRight: '<i class="iconfont">&#xe69b;</i>',
          zoomIn: '<i class="iconfont">&#xe691;</i>',
          zoomOut: '<i class="iconfont">&#xe694;</i>',
          fit: '<i class="iconfont">&#xe697;</i>'
        };
		
		$scope.save = function(ev){
			
			if($scope.image == null || $scope.image == undefined){
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .clickOutsideToClose(true)
			        .title('提示')
			        .textContent('请先上传发票！')
			        .ok('关闭')
			        .targetEvent(ev)
			    );
			    
			    return;
			}
			
			if($scope.invoice == null || $scope.invoice == undefined){
				$mdDialog.show(
			      $mdDialog.alert()
			        .parent(angular.element(document.body))
			        .clickOutsideToClose(true)
			        .title('提示')
			        .textContent('请填写发票信息！')
			        .ok('关闭')
			        .targetEvent(ev)
			    );
			    
			    return;
			}
			
			$scope.invoice["invoice_date"] = $scope.invoice.dateString ?  $filter("date")($scope.invoice.dateString,"yyyy-MM-dd") : $filter("date")(new date(),"yyyy-MM-dd")
			
			$http({
				method: "POST",
				url: piaojiaTestUrl + "wallet/save",
				data: {
						"source_system": "InvWallet",
						"oper_type": "add",
						"invoice": $scope.invoice,
						"image": $scope.image
					}
			}).success(function(response){
				console.log(response);
				$scope.invoice["invoice_id"] = response.data["image_id"];
				invoice.invoice = $scope.invoice;
				$scope.image = null;
			}).error(function(data,status,headers,config){
				console.log(data);
				console.log(status);
				console.log(headers);
				console.log(config);
			});
		}
		
		
		
		$scope.delete = function(){
			if($scope.invoice !== undefined && $scope.invoice["invoice_id"] !== undefined){
				
				$http({
					method: "POST",
					url: piaojiaTestUrl + "wallet/save",
					data: {
						"source_system": "InvWallet",
						"oper_type": "del",
						"invoice": {"invoice_id": $scope.invoice["invoice_id"]}
					  }
				}).success(function(response){

					$scope.image = null;
					$scope.invoice = null;
					invoice.invoice = null;
				}).error(function(data,status,headers,config){
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
				});
				
			}
		}
		
		 $scope.discernInvoice = function(){
		 	$http({
		 		method: "POST",
		 		url: "http://10.16.30.77:8080/sdinv/ocrFp",
		 		data: {'base64':$scope.imageUrl.split(',')[1]}
		 	}).success(function(response){
		 		
		 		console.log(response);
		 		$scope.invoice = response.data;
		 		invoice.invoice = response.data;
		 	})
		 }
		
		$scope.checkInvoice = function(){
			invoice.invoice_code = $scope.invoice.invoice_code;
			$scope.go('/invoicesfolder/check');
		}
		
	}]);

});