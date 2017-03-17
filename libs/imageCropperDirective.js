//module.exports = function(angular, Cropper) {
  //require('./angular-image-cropper.scss');
  angular
    .module('imageCropper',[])
    .directive('imageCropper', function() {
      return {
        restrict: 'E',
        scope: {
          centerOnInit: '@',
          checkCrossOrigin: '@',
          cropCallback: '&',
          api: '&',
          fitOnInit: '@',
          height: '@',
          imageUrl: '=',
          showControls: '@',
          watermarked: '@',
          width: '@',
          zoomStep: '@',
          actionLabels: '&'
        },
        //bindToController: true,
        //controllerAs: 'vm',
        controller: function($scope,$element) {
          var self = this;
          
          this.imageUrl = $scope.imageUrl;
          // Get action labels.
          this.actionLabels = $scope.actionLabels();

          // Get callback.
          this.apiCallback = $scope.api();
          this.cropCallback = $scope.cropCallback();

          // Eval for boolean values.
          this.fitOnInit = eval($scope.fitOnInit);
          this.centerOnInit = eval($scope.centerOnInit);
          this.checkCrossOrigin = eval($scope.checkCrossOrigin);
          this.showControls = eval($scope.showControls);
          this.width = eval($scope.width);
          this.height = eval($scope.height);
          this.watermarked = eval($scope.watermarked);

          this.init = function() {
            this.target = this.element;
            this.api = new Cropper(self);
          }
          
          
          $scope.$watch('imageUrl',function(newObj, oldObj){

							if(newObj == undefined || newObj == '')return;
          		
          		self.imageUrl = newObj;
          		
          		self.api.originalUrl = newObj;
          		self.api.elements.image.style.display = 'block';
          		self.api.loadImage();
          });
          
          
          
          
          
        },
        'link': function(scope, element, attributes, controller) {
          controller.element = element[0];
          controller.init();
        }
      };
    });
//};
