define(['angular'],function(angular){
	var app = angular.module("check",[]);
	
	app.controller("checkInvoiceCtrl",['$scope','$http','invoice',function($scope,$http,invoice){
		$scope.fields = [];
		$scope.obj = {};//{xhfswdjh: '0000009'};
		$scope.codeImage = "";
		$scope.session = "";
		$scope.invoiceTypeId = "";
		$scope.result = "";
		
		$http({
			method: 'GET',
			url: customsUrl + 'getInvoiceByFpdm',
			params:{fpdm: invoice.invoice_code}
		}).success(function(response){
			console.log(response);
			var array = response.cityIterator[0].invoiceTypeIterator[0].inputFields.split(';');
			$scope.invoiceTypeId = response.cityIterator[0].invoiceTypeIterator[0].invoiceTypeId;
			
			$http({
				method: 'GET',
				url: customsUrl + "getYzm",
				params: {"typeId": $scope.invoiceTypeId}
			}).success(function(response){
				console.log(response);
				$scope.session = response.session;
				$scope.codeImage = "data:image/gif;base64," + response.base64;
			});
			
			for(var field in array){
				var a = array[field].split("#");
				$scope.fields.push({
					label: a[0],
					field: a[1]
				})
			}
		});
		
		$scope.search = function(){
			
			$http({
				method: 'POST',
				url: customsUrl + "verify",
				data: {
					invoiceTypeId: $scope.invoiceTypeId,
					session: $scope.session,
					params: $scope.obj
				}
			}).success(function(response){
				$scope.result = response.content;
			});
			
		}
		
	}]);
})