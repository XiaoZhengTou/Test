define(['angular','libs/imageCropperDirective','libs/imageCropper'],function(angular){
	
	publicFunction.addStyle("image.css");
	
	var app = angular.module("imageAccess",['imageCropper']);
	
	app.controller("accessCtrl",['$scope',function($scope){
		$scope.imageUrl = "img/jiudian/default.jpg";
		$scope.showControls = true;
        $scope.fit = false;

        $scope.myButtonLabels = {
          rotateLeft: '<i class="iconfont">&#xe69c;</i>',
          rotateRight: '<i class="iconfont">&#xe69b;</i>',
          zoomIn: '<i class="iconfont">&#xe691;</i>',
          zoomOut: '<i class="iconfont">&#xe694;</i>',
          fit: '<i class="iconfont">&#xe697;</i>'
        };
        
        $scope.selectedRow = function(event,element){
        	//event.stopPropagation();
        	angular.element(event.target).parent().parent().parent().parent().parent().parent().children().removeClass("selected");
        	angular.element(event.target).parent().parent().parent().parent().parent().addClass("selected");
        	
        	$scope.imageUrl = element.base64;
        }
		
	}]);
	
	angular._LoadModule('imageAccess');
   	return app;
});