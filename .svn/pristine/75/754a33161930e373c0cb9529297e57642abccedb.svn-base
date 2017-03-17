define(['angular'],function(angular){
	var app = angular.module('md.upload',[]);
	
	app.directive('upload',['uploadFile',function(uploadFile){
		return {
			restrict: 'E',
			template: "<div>" +
						"<input type='file' id='files' name='files[]' style='display:none;' multiple capture='camera'/>" +
						 '<div id="dropbox" ng-click="selected()">' +
								'<div class="dropbox-message" ng-class="{true: \'needsclick\'}[files.length > 0]">' +
							   		'将文件拖到此处或单击此处选择文件上传' +
							  	'</div>' +
								'<div class="preview" ng-repeat="f in files">' +
									'<span class="imageHolder">' +
										'<button  class="md-primary custom-btn-close" ng-click="remove({event: $event,index: $index,file: f})"><md-icon md-svg-src="img/icons/ic_close_24px.svg"></md-icon></button>' +
										'<img ng-src="{{f.base64}}"/>' +
									'</span>' +
								'</div>' +
						  '</div>' +
					   "</div>",
			replace: true,
			scope: {only: '@',handle: '&',drop: '@',files: '=',selected: '&',remove: '&'},
			controller: function($scope){
				this.only = eval($scope.only);
				this.drop = eval($scope.drop);
			},
			link: function(scope,element,attributes,controller){
				
				element.find("input").bind("change",function(changeEvent){
					uploadFile.addFile(changeEvent.target.files[0],scope.handle);
				});
				
				if(controller.drop){

					var dropbox = element[0].querySelector("#dropbox");
					
					dropbox.style.display = 'block';
					
					dropbox.addEventListener("dragenter", function(e){  
					    e.stopPropagation();  
					    e.preventDefault();  
					}, false);  
					dropbox.addEventListener("dragover", function(e){  
					    e.stopPropagation();  
					    e.preventDefault();  
					}, false);  
					dropbox.addEventListener("drop", function(e){  
					    e.stopPropagation();  
					    e.preventDefault();
						
						var files = e.target.files || e.dataTransfer.files;
						
						uploadFile.addFile(files[0],scope.handle); 
					}, false);
					
				}
				
			}
		}
	}]);
})