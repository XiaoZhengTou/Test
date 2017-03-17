define(['angular','libs/imageCropper','libs/imageCropperDirective','libs/ng-sortable','js/templates/imageAcquisition/leadinto','js/shared/chooseinvoice','js/shared/choosebuyone.js'],function(angular){
	
	publicFunction.addStyle("image.css");
	
	var app = angular.module("imageAcquisition",['imageCropper','as.sortable','leadinto','chooseInvoice','chooseBuyOne']);
	
	app.run(function($http){
		//$http.defaults.headers.common["X-Auth-Tokey"] = sessionStorage.Token;
		//$http.defaults.headers.common["Content-Type"] = "application/json";
	}).config(function($routeProvider,$locationProvider,$httpProvider){
		$httpProvider.defaults.timeout = 5000;
		
		$routeProvider.when('/imageAcquisition/leadinto',{
			templateUrl: "templates/imageAcquisition/leadinto.html"
		});
	});

	app.directive('myupload', function($compile,invoice){
		return {
			restrict: "E",
			template: "<input type='file' id='files' name='files[]' style='display:none;' multiple capture='camera'/>",
			link: function postLink(scope, element, attributes){
				var i = 0;
				element.bind("change",function(changeEvent){
					var reader = new FileReader();
					var a;
					reader.onload = function(loadEvent){
						
						
						scope.$apply(function () {
							invoice.base64 = loadEvent.target.result;
								
							scope.itemsList.items.push({id: scope.index,options: "删除",name: changeEvent.target.files[0].name, type: '发票',base64: loadEvent.target.result,isIntroduced: false});
							scope.uploadFiles.push({id: scope.index,options: "删除",name: changeEvent.target.files[0].name, type: '发票',base64: loadEvent.target.result,isIntroduced: false});
							console.log(scope.index);
							scope.index++;
					   });
					}
					
					if(typeof(changeEvent.target.files[0]) === 'object'){
						reader.readAsDataURL(changeEvent.target.files[0]);
					}
				});
			}
		}
	});
	
	app.controller("imageCtrl",['$scope','$http','invoice','$chooseInvoice','$chooseBuyOne',function($scope,$http,invoice,$chooseInvoice,$chooseBuyOne){
		
		$scope.imageUrl = '';
		$scope.showControls = true;
        $scope.fit = false;
        $scope.index = 0;
        
        $scope.uploadFiles = [];

	    $scope.itemsList = {
	        items: []
	    };
	    
	    if(invoice.index){
	    	$scope.index = invoice.index;
	    }
	    
	    if(invoice.itemsList){
	    	//$scope.itemsList.items = invoice.itemsList;
	    	$scope.uploadFiles = invoice.itemsList;
	    	$scope.itemsList.items = $scope.itemsList.items.concat($scope.uploadFiles);
	    }
	    
	    if(invoice.selected){
	    	for(var i in invoice.selected){
	    		invoice.selected[i].id = $scope.index;
	    		$scope.itemsList.items.push({id: $scope.index,options: "删除",name: invoice.selected[i].imagename, type: '发票',invoice: invoice.selected[i],isIntroduced: true});
	    		console.log($scope.index);
	    		$scope.index++;
	    	}
	    }
	    
	    $scope.menuItems = [{text:'发票',id: 1},{text:'附件',id: 2},{text:'合同',id: 3}];
	    
        $scope.sortableOptions = {
	        containment: '#table-container',
	        containerPositioning: 'relative'
	    };
        

        $scope.myButtonLabels = {
          rotateLeft: '<i class="iconfont">&#xe69c;</i>',
          rotateRight: '<i class="iconfont">&#xe69b;</i>',
          zoomIn: '<i class="iconfont">&#xe691;</i>',
          zoomOut: '<i class="iconfont">&#xe694;</i>',
          fit: '<i class="iconfont">&#xe697;</i>'
        };
        
        $scope.selectedRow = function(event,element){
        	angular.element(event.target).parent().parent().parent().parent().parent().parent().children().removeClass("selected");
        	angular.element(event.target).parent().parent().parent().parent().parent().addClass("selected");
        	
        	if(element.isIntroduced){
        		$http({
					method: "POST",
					url: "http://10.16.30.77:8080/sdatt/attachment/downloadFile",
					data: {
							filepath: element.invoice.imagepath,
							filetype: element.invoice.imagetype
						}
				}).success(function(response){
					$scope.imageUrl = element.base64 =  "data:image/" + response.filetype + ";base64," + response.content;
					element.isIntroduced = false;
				});
        	}else{
        		$scope.imageUrl = element.base64;
        	}
        }
        
        $scope.remove = function(event,id){
        	event.stopPropagation();

        	var list1 = [];
        	var list2 = [];
        	var list3 = [];
        	
        	for(var i in $scope.itemsList.items){
        		if(id != $scope.itemsList.items[i].id){
        			list1.push($scope.itemsList.items[i]);
        		}
        	}
        	
        	$scope.itemsList.items = list1;
        	
        	for(var i in $scope.uploadFiles){
        		if(id != $scope.uploadFiles[i].id){
        			list2.push($scope.uploadFiles[i]);
        		}
        	}
        	
        	$scope.uploadFiles = list2;
        	
        	
        	for(var i in invoice.selected){
        		if(id != invoice.selected[i].id){
        			list3.push(invoice.selected[i]);
        		}
        	}
        	
        	invoice.selected = list3;
        }
        
        $scope.upload = function(){
        	document.getElementById("files").click();
        }
        
        this.openMenu = function($mdOpenMenu, ev) {
	      originatorEv = ev;
	      $mdOpenMenu(ev);
	    };
	    
	    this.checkType = function(event,d,item){
	    	d.type = item.text;
	    }
	    
	    $scope.onIntroduced = function(){
	    	invoice.itemsList = $scope.uploadFiles;
	    	invoice.index = $scope.index;
	    	$scope.go('/imageAcquisition/leadinto');
	    }
	    
	    
	    $scope.confirm = function(event){
	    	/*$chooseInvoice.show({save: function (selected) {
				具体的业务实现
		      },
			  targetEvent: event,
			});*/
			
			$chooseBuyOne.show({save: function(seleted){},targetEvent: event});
	    }
	}]);
	
	
	angular._LoadModule('imageAcquisition');
   	return app;
})
