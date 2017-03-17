(function (window, angular, undefined) {

	angular.module("md.menuTree",[]);
	
	
	angular.module("md.menuTree").directive('menuTree', function ($http,$timeout) {  
	    return {
	        restrict: 'A',
	        replace: true,
	        scope: {target: "=",model: "=",query: "=",catalogue: "="},
	        link: function (scope, element, attrs){
	        	var target;
	        	
	        	$timeout(function(){
	        		target = angular.element(document.getElementById(scope.target));
	        		
	        		target.bind("focus",showMenu);
	        	},200);
	        	
	        	var zTree;
	        	var setting = {
	        		view: {
	        			dblClickExpand: false,
						showLine: false,
						showIcon: function(treeId, treeNode) {
							return !treeNode.isParent;
						}
					},
					edit: {
						enable: false,
						showRemoveBtn: false,
						showRenameBtn: false
					},
					data: {
						simpleData: {
							enable: true
						}
					},
					callback: {
						beforeClick: beforeClick,
						onClick: onClick
					}
				};
				
				
				function beforeClick(treeId, treeNode) {
					var check = (treeNode && !treeNode.isParent);
					if (!check) alert("只能选择城市...");
					return check;
				}
				
				function onClick(e, treeId, treeNode){
					var nodes = zTree.getSelectedNodes();
					
					var array = [],
						str ="";

					function getCatalogue(node){
						if(node !== null){
							array.push(node.name);
							getCatalogue(node.getParentNode());
						}
					}
					
					if(eval(scope.catalogue)){
						getCatalogue(nodes[0]);
						array.reverse();
						str = array.join("-");
					}else{
						str = nodes[0].name;
					}
					
					
					
					scope.$apply(function(){
						scope.model = str;
						scope.query = nodes[0].id;
					});
					
					element.parent().fadeOut("fast");
				}
				
				function showMenu() {
					var cityOffset = target.offset();
					element.parent().css({left:cityOffset.left + "px", top:cityOffset.top + target.outerHeight() + "px"}).slideDown("fast");
		
					angular.element(document.body).bind("mousedown", onBodyDown);
				}
				function hideMenu() {
					element.parent().fadeOut("fast");
					angular.element(document.body).unbind("mousedown", onBodyDown);
				}
				function onBodyDown(event) {
					if (!(event.target.id == "menuBtn" || event.target.id == element.parent().attr("id") || $(event.target).parents("#" + element.parent().attr("id")).length>0)) {
						hideMenu();
					}
				}
				
				$http({
					method: "POST",
					url: archiveUrl + "archive/category/list"
				}).success(function(response){
					console.log(response);
					var zNodes = response.data.categories;

				    $.fn.zTree.init(element, setting, zNodes);

				    zTree = $.fn.zTree.getZTreeObj(attrs.id);
				});
				
				function showIconForTree(treeId, treeNode){
					return !treeNode.isParent;
				};
		
				
	        }  
	    };  
	});
	
	
})(window,angular)
