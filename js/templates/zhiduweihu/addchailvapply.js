define(['angular'], function(angular) {
	var app = angular.module('mdaddchailvapply', []);
	app.controller('addchalvctrl', ['$scope', '$mdMedia', '$mdDialog', '$location', '$routeParams', '$filter', '$http','uploadFile', function($scope, $mdMedia, $mdDialog, $location, $routeParams, $filter,  $http,uploadFile) {
		$scope.query = {
			"fee_apply_id": null,
			"apply_by": null,
			"apply_name": null,
			"org_id": null,
			"org_name": null,
			"apply_date": new Date(),
			"apply_amount": null,
			"currency_code": "CNY",
			"currency_name": "人民币",
			"order_type": "CL",
			"form_template_id": null,
			"form_template_name": null,
			"reason_desc": "",
			"need_loan": "N",
			"emseaapplyhexts": [],
			"applyUser": [],
			"order_template_id": null,
			"order_template_name": null,
			"emseaapplytravelds": [{
				"apply_travel_id": null,
				"fee_apply_id": null,
				"start_date": new Date(),
				"end_date": new Date(),
				"from_area_name": "",
				"from_area_code": "",
				"to_area_codes": null,
				"to_area_names": "",
				"travel_persons": null,
				"travel_persons_name": null,
				"trip_type": "0"
			}],

		};

		$scope.files = [];
		$scope.data = [];

		$scope.openDialog = function(ev){
			var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

			$mdDialog.show({
				controller: DialogController,
				templateUrl: 'templates/zhiduweihu/applyProcess.html',
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
				$scope.files.length = 0;
				$scope.data.length = 0;
			});

			$scope.$watch(function() {
				return $mdMedia('xs') || $mdMedia('sm');
			}, function(wantsFullScreen) {
				$scope.customFullscreen = (wantsFullScreen === true);
			});
		};
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

				$scope.files.splice(index,1);
				$scope.data.splice(index,1);
			}
		}
	}]);
});