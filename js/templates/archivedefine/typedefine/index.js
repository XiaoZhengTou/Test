define(['angular'],function(angular){
	publicFunction.addStyle('archive.css');
	
	var app = angular.module("typeDefine",[]);
	
	app.directive('ztree', function ($http) {  
	    return {  
	        require: '?ngModel',  
	        restrict: 'A',
	        link: function ($scope, element, attrs, ngModel){
	        	
	        	var setting = {
	        		view: {
	        			dblClickExpand: false,
						showLine: false,
						showIcon: showIconForTree
					},
					edit: {
						enable: true,
						showRemoveBtn: false,
						showRenameBtn: false
					},
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						beforeDrag: beforeDrag,
						beforeDrop: beforeDrop,
						onRightClick: OnRightClick,
						onClick: function (event, treeId, treeNode, clickFlag){
							var str = [];
							
							str.push(treeNode.name);
							
							getParent(treeNode);
							
							str.reverse();
							treeNode.categories = str.join("-");
							
							str.pop();
							treeNode.subHeadings = str.join("-");
							
							function getParent(node){
								if(node.getParentNode() != null){
									var parent = node.getParentNode();
									str.push(parent.name);
									getParent(parent);
								}
							}
 
	                        ngModel.$setViewValue(treeNode);
	                    }
					}
				};
				
									
				var zTree, rMenu;
				
				$http({
					method: "POST",
					url: archiveUrl + "archive/category/list"
				}).success(function(response){
					console.log(response);
					zNodes = response.data.categories;


				    $.fn.zTree.init(element, setting, zNodes);
				    zTree = $.fn.zTree.getZTreeObj("ztree");
					rMenu = $("#rMenu");
				});
				
				function showIconForTree(treeId, treeNode) {
					return !treeNode.isParent;
				};
		
				function beforeDrag(treeId, treeNodes) {
					for (var i=0,l=treeNodes.length; i<l; i++) {
						if (treeNodes[i].drag === false) {
							return false;
						}
					}
					return true;
				}
				
				function beforeDrop(treeId, treeNodes, targetNode, moveType) {
					var result = targetNode ? targetNode.drop !== false : true;
						
						var parent = treeNodes[0].getParentNode();
						var parentId = null;
						
						if(moveType == "inner"){
							parentId = targetNode.id;
						}

						if(result){
							$http({
						      	method: 'POST',
						      	url: archiveUrl + "archive/category/update",
						      	data: {
						      		id: treeNodes[0].id,
						      		parent_id: parentId,
						      	}
						    }).success(function(response){
						     	
						     	if(parent && parent.children.length == 0){
						     		document.getElementById(parent.tId + "_ico").style = "";
						     	}
						     	
						     });
						}
					return result;
				}
				
				function OnRightClick(event, treeId, treeNode) {
					if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
						zTree.cancelSelectedNode();
						showRMenu("root", event.clientX, event.clientY);
					} else if (treeNode && !treeNode.noR) {
						var str = [];
							
						str.push(treeNode.name);
						
						getParent(treeNode);
						
						str.reverse();
						treeNode.categories = str.join("-");
						
						str.pop();
						treeNode.subHeadings = str.join("-");
						
						function getParent(node){
							if(node.getParentNode() != null){
								var parent = node.getParentNode();
								str.push(parent.name);
								getParent(parent);
							}
						}
						
						
						ngModel.$setViewValue(treeNode);
						zTree.selectNode(treeNode);
						showRMenu("node", event.clientX, event.clientY);
					}
				}
		
				function showRMenu(type, x, y) {
					$("#rMenu ul").show();
					if (type=="root") {
						$("#m_del").hide();
						$("#m_edit").hide();
					} else {
						$("#m_del").show();
						$("#m_edit").show();
					}
					rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});
		
					$("body").bind("mousedown", onBodyMouseDown);
				}
				function hideRMenu() {
					if (rMenu) rMenu.css({"visibility": "hidden"});
					$("body").unbind("mousedown", onBodyMouseDown);
				}
				function onBodyMouseDown(event){
					if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
						rMenu.css({"visibility" : "hidden"});
					}
				}
		
				
	        }  
	    };  
	});


	app.controller('typeCtrl', function ($scope,$timeout,$mdDialog,$http){
		var zTree, rMenu;
		
		$timeout(function(){zTree = $.fn.zTree.getZTreeObj("ztree");},500);
		rMenu = $("#rMenu");
		
		function onBodyMouseDown(event){
			if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
				rMenu.css({"visibility" : "hidden"});
			}
		}
		function hideRMenu() {
			if (rMenu) rMenu.css({"visibility": "hidden"});
			$("body").unbind("mousedown", onBodyMouseDown);
		}
		
		$scope.addTreeNode = function(ev) {
			hideRMenu();
			
			var archive = {};

			$mdDialog.show({
		      controller: DialogController,
		      controllerAs: 'dialog',
		      templateUrl: 'templates/archivedefine/typedefine/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals:{archive: archive,title: '新增'},
		      fullscreen: false
		    })
		    .then(function(answer) {
		    	
		    	if (zTree.getSelectedNodes()[0]){
					archive.parent_id = zTree.getSelectedNodes()[0].id;
			  	}
		    	
			      $http({
			      	method: 'POST',
			      	url: archiveUrl + "archive/category/add",
			      	data: archive
			      }).success(function(response){
			      	console.log(response);
			      	  
			      	  archive.id = response.data.id;
				      if (zTree.getSelectedNodes()[0]){
				      		angular.element(document.getElementById(zTree.getSelectedNodes()[0].tId + "_ico")).css({width:'0px',height:'0px'});
				      		zTree.getSelectedNodes()[0].isParent = true;
							zTree.addNodes(zTree.getSelectedNodes()[0], archive);
					  } else {
							zTree.addNodes(null, archive);
					  }
			      });

		    }, function(){

		    });
		}
		
		function DialogController($scope, $mdDialog,archive,title){
			$scope.archive = archive;
			$scope.title = title;
			
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
		
		$scope.editTreeNode = function(ev) {
			hideRMenu();

			var temp = angular.copy($scope.archive);

			$mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/archivedefine/typedefine/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      locals:{archive: $scope.archive,title: '编辑'},
		      fullscreen: false
		    })
		    .then(function(answer) {
		    	
			      $http({
			      	method: 'POST',
			      	url: archiveUrl + "archive/category/update",
			      	data: {
			      		id: $scope.archive.id + "",
			      		name: $scope.archive.name,
			      		borrow_able: $scope.archive.borrow_able,
			      		borrow_limit: $scope.archive.borrow_limit,
			      		description: $scope.archive.description,
			      		keep_limit: $scope.archive.keep_limit,
			      		renew_limit: $scope.archive.renew_limit,
			      		status: $scope.archive.status
			      	}
			      }).success(function(response){
			      	
			      	zTree.getSelectedNodes()[0].name = $scope.archive.name;
			      	var array = $scope.archive.categories.split("-");
			      	array.pop();
			      	array.push($scope.archive.name)
			      	zTree.getSelectedNodes()[0].categories = array.join("-");
					zTree.getSelectedNodes()[0].subHeadings = $scope.archive.subHeadings;
			      	
			      	$.fn.zTree._z.view.setNodeName(zTree.setting, zTree.getSelectedNodes()[0]);
			     });

		    }, function(){
		    	$scope.archive = angular.copy(temp);
		    });
		}
		
		
		$scope.removeTreeNode = function(ev) {
			hideRMenu();
			var nodes = zTree.getSelectedNodes();
			if (nodes && nodes.length>0) {
				if (nodes[0].children && nodes[0].children.length > 0) {
					/*var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
					if (confirm(msg)==true){
						zTree.removeNode(nodes[0]);
					}*/
					
					
					$mdDialog.show(
				      $mdDialog.alert()
				        .parent( angular.element(document.body))
				        .clickOutsideToClose(true)
				        .title('提示')
				        .textContent('父节点不能删除，必须先删除所有子节点。')
				        .ariaLabel('Alert Dialog Demo')
				        .ok('确认')
				        .targetEvent(ev)
				    );
					
					
					
					
				}else if(zTree.getSelectedNodes()[0].status == "1"){
					$mdDialog.show(
				      $mdDialog.alert()
				        .parent( angular.element(document.body))
				        .clickOutsideToClose(true)
				        .title('提示')
				        .textContent('生效的目录不能删除。')
				        .ariaLabel('Alert Dialog Demo')
				        .ok('确认')
				        .targetEvent(ev)
				    );
				}else {
					$http({
				      	method: 'POST',
				      	url: archiveUrl + "archive/category/del",
				      	headers:{'Content-Type': undefined},
						transformRequest: function(data) {
						    var formData = new FormData();
						    formData.append("id",zTree.getSelectedNodes()[0].id);
						    return formData;
						}
				     }).success(function(response){
				      	console.log(response);
				      	$scope.archive = {};
				      	zTree.removeNode(nodes[0]);
				     });
				}
			}
			
			
			
		}
		
		
		
		
	});
	
	
	angular._LoadModule('typeDefine');
    return app;
})