/**
 * Created by luozs on 2016-6-4.
 */
define(['angular', 'require'], function (angular) {
    var aa='';
    var setting ='';
    var setting2 ='';
    var setting3 ='';
    var element1='';
    var element2='';
    var element3='';
    angular.module('ztreeModule', []).factory('ztreeFactory', ['$http','$cookies','$location', function ($http,$cookies,$location) {
        return {
            pemenu2: function ($scope,data11) {
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/tenantorg/getTenantOrgs',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&&$scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){


                            var old=data.data;
                            for(var i=0;i<old.length;i++){
                                for(var j=0;j<data11.length;j++){
                                    if(old[i].id == data11[j].id){
                                        old[i].checked = true;
                                    }
                                }
                            }


                            $.fn.zTree.init(element3, setting3,old);

                        }else{
                            alert(data.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });

            },
            pemenu1: function ($scope,data11) {
                $scope.selected=[];
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/tenantorg/getTenantOrgs',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&&$scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){

                            //var old=data.data;
                            ////old[0].checked=true;
                            //$.fn.zTree.init(element, setting2,old);

                            var old=data.data;
                            for(var i=0;i<old.length;i++){
                                for(var j=0;j<data11.length;j++){
                                    if(old[i].id == data11[j].id){
                                        old[i].checked = true;
                                    }
                                }
                            }


                            $.fn.zTree.init(element2, setting2,old);

                            var treeObj = $.fn.zTree.getZTreeObj("qqq4");
                            $scope.selected=treeObj.getCheckedNodes(true);

                        }else{
                            alert(data.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });

            },
            pemenu: function ($scope,data11) {
                $scope.selected=[];
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/menu',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&&$scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){

                            var old=data.data.menus;
                            for(var i=0;i<old.length;i++){
                                old[i].status = '';
                                for(var j=0;j<data11.length;j++){
                                    if(old[i].id == data11[j].id){
                                        old[i].checked = true;
                                        old[i].grant_id = data11[j].grant_id;
                                        old[i].status = 'old'
                                    }
                                }
                            }

                            $.fn.zTree.init(element2, setting2,old);

                            var treeObj = $.fn.zTree.getZTreeObj("qqq1");
                            $scope.selected=treeObj.getCheckedNodes(true);

                        }else{
                            alert(data.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });

            },
            packageemenu: function ($scope,data11) {
                $scope.selected=[];
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/menu',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&&$scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){

                            var old=data.data.menus;
                            for(var i=0;i<old.length;i++){
                                old[i].status = '';
                                for(var j=0;j<data11.length;j++){
                                    if(old[i].id == data11[j].id){
                                        old[i].checked = true;
                                        old[i].status = 'old';
                                    }
                                }
                            }

                            $.fn.zTree.init(element2, setting2,old);

                            var treeObj = $.fn.zTree.getZTreeObj("qqq");
                            $scope.selected=treeObj.getCheckedNodes(true);

                        }else{
                            alert(data.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });

            },
            load: function (scope) {
                //aa= org;
                //$.fn.zTree.init(element1, setting, aa);

                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/menu',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        scope.content=headers('x-auth-token');
                        if(scope.content!=''&&scope.content!=null){
                            $cookies.put('JSESSION', scope.content);
                        }
                        if(data.code=='0000'){
                            $.fn.zTree.init(element1, setting, data.data.menus);
                        }else if(data.code =='B99997'){

                        }else if(data.code=='B99995'){
                            scope.showaddorguser = false;
                        }else{
                            alert(data.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });
            }
        };
    }])
        .directive('tree', ['$http','$cookies','$location', function ($http,$cookies,$locatio) {
        return {
            require: '?^ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                element1=element;
                setting = {
                    view: {
                        dblClickExpand: false,
                        showLine: false,
                        showIcon: showIconForTree
                    },
                    data: {
                        key: {
                            title: "t",
                            manager:$cookies.get("managerId")
                        },
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        onClick: function (event, treeId, treeNode, clickFlag) {
                            //alert(treeNode.id)
                            scope.$apply(function () {
                                ngModel.$setViewValue(treeNode);
                                //ztreeFactory.load1(treeNode.id,$scope);
                            });
                        }
                    }
                };
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/menu',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        scope.content=headers('x-auth-token');
                        if(scope.content!=''&&scope.content!=null){
                            $cookies.put('JSESSION', scope.content);
                        }
                        if(data.code=='0000'){
                            $.fn.zTree.init(element, setting, data.data.menus);
                        }else if(data.code =='B99997'){

                        }else if(data.code=='B99995'){
                            scope.showaddorguser = false;
                        }else{
                            alert(data.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });
                function showIconForTree(treeId, treeNode) {
                    return !treeNode.isParent;
                };

                //var aa=[{"orgName":"2223","orgParent":"13696080688447488","fullPath":"13696080688447488/18855093407318016","isManage":"N","operable":true,"visible":true,"id":"18855093407318016","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"2222","orgParent":"13696080688447488","fullPath":"13696080688447488/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"14445748036829184","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"租户2","fullPath":"13696080688447488","isManage":"N","operable":true,"visible":true,"id":"13696080688447488","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"1111","orgParent":"13696080688447488","fullPath":"13696080688447488/14418611254853632","isManage":"N","operable":true,"visible":true,"id":"14418611254853632","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"23254","orgParent":"14445748036829184","fullPath":"13696080688447488/15238122606428160/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"15987824864002048","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"}]
                //$.fn.zTree.init(element, setting, aa);
            }
        }
    }])
        .directive('tree2', ['$http','$cookies','$location', function ($http,$cookies,$locatio) {
            return {
                require: '?^ngModel',
                restrict: 'A',
                link: function (scope, element, attrs, ngModel) {
                    element1=element;
                    setting = {
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
                            key: {
                                title: "t",
                                manager:$cookies.get("managerId")
                            },
                            simpleData: {
                                enable: true
                            }
                        },
                        callback: {
                            beforeDrag: beforeDrag,
                            beforeDrop: beforeDrop,
                            onRightClick: OnRightClick,
                            onClick: function (event, treeId, treeNode, clickFlag) {
                                //alert(treeNode.id)
                                scope.$apply(function () {
                                    ngModel.$setViewValue(treeNode);
                                    //ztreeFactory.load1(treeNode.id,$scope);
                                });
                            }
                        }
                    };
                    var zTree, rMenu;
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/menu',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            scope.content=headers('x-auth-token');
                            if(scope.content!=''&&scope.content!=null){
                                $cookies.put('JSESSION', scope.content);
                            }
                            if(data.code=='0000'){
                                $.fn.zTree.init(element, setting, data.data.menus);
                                zTree = $.fn.zTree.getZTreeObj("tree11");
                                rMenu = $("#rMenu");
                            }else if(data.code =='B99997'){

                            }else if(data.code=='B99995'){
                                scope.showaddorguser = false;
                            }else{
                                alert(data.msg)
                            }
                        })
                        .error(function(data, status, headers, config) {

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
                            //var getconfig = {
                            //    method: 'PUT',
                            //    url: APP_CONFIG.CDP_URL+'/docker/menu/'+$scope.menudefine.id,
                            //    headers: {
                            //        'x-auth-token': $cookies.get("JSESSION")
                            //    },
                            //    data:{
                            //        parent_id:$scope.menudefine.parent_id,
                            //        name:$scope.menudefine.name,
                            //        description:$scope.menudefine.description,
                            //        url:$scope.menudefine.url,
                            //        visible:$scope.menudefine.visible
                            //    }
                            //};
                            $http({
                                method: 'PUT',
                                url: APP_CONFIG.CDP_URL+'/docker/menu/'+treeNodes[0].id,
                                data: {
                                    parent_id: parentId
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
                            $("#m_add").show();
                            $("#m_add1").hide();
                        } else {
                            $("#m_add").hide();
                            $("#m_add1").show();
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

                    //var aa=[{"orgName":"2223","orgParent":"13696080688447488","fullPath":"13696080688447488/18855093407318016","isManage":"N","operable":true,"visible":true,"id":"18855093407318016","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"2222","orgParent":"13696080688447488","fullPath":"13696080688447488/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"14445748036829184","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"租户2","fullPath":"13696080688447488","isManage":"N","operable":true,"visible":true,"id":"13696080688447488","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"1111","orgParent":"13696080688447488","fullPath":"13696080688447488/14418611254853632","isManage":"N","operable":true,"visible":true,"id":"14418611254853632","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"23254","orgParent":"14445748036829184","fullPath":"13696080688447488/15238122606428160/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"15987824864002048","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"}]
                    //$.fn.zTree.init(element, setting, aa);
                }
            }
        }])
        .directive('tree1', ['$http','$cookies','$location', function ($http,$cookies,$locatio) {
            return {
                require: '?^ngModel',
                restrict: 'A',
                link: function (scope, element, attrs, ngModel) {
                    element2=element;
                    setting2 = {
                        view: {
                            dblClickExpand: false,
                            showLine: false,
                            showIcon: showIconForTree
                        },
                        async: {
                            enable: false
                        },
                        data: {
                            key: {
                                title: "t",
                                manager:$cookies.get("managerId")
                            },
                            simpleData: {
                                enable: true
                            }
                        },
                        callback: {

                            onCheck: function (event, treeId, treeNode, clickFlag) {
                                //alert(treeNode.id)
                                scope.$apply(function () {
                                    ngModel.$setViewValue(treeNode);
                                    //ztreeFactory.load1(treeNode.id,$scope);
                                });
                            }
                        },
                        check:{
                            chkStyle:'checkbox',
                            chkboxType: { "Y" : "p", "N" : "s" },
                            enable:true
                        }
                    };
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.CDP_URL+'/docker/menu',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            scope.content=headers('x-auth-token');
                            if(scope.content!=''&&scope.content!=null){
                                $cookies.put('JSESSION', scope.content);
                            }
                            if(data.code=='0000'){
                                var old=data.data.menus;
                                //old[0].checked=true;
                                $.fn.zTree.init(element, setting2,old);

                            }else if(data.code =='B99997'){

                            }else if(data.code=='B99995'){
                                scope.showaddorguser = false;
                            }else{
                                alert(data.msg)
                            }
                        })
                        .error(function(data, status, headers, config) {

                        });

                    function showIconForTree(treeId, treeNode) {
                        return !treeNode.isParent;
                    };
                    //var aa=[{"orgName":"2223","orgParent":"13696080688447488","fullPath":"13696080688447488/18855093407318016","isManage":"N","operable":true,"visible":true,"id":"18855093407318016","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"2222","orgParent":"13696080688447488","fullPath":"13696080688447488/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"14445748036829184","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"租户2","fullPath":"13696080688447488","isManage":"N","operable":true,"visible":true,"id":"13696080688447488","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"1111","orgParent":"13696080688447488","fullPath":"13696080688447488/14418611254853632","isManage":"N","operable":true,"visible":true,"id":"14418611254853632","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"23254","orgParent":"14445748036829184","fullPath":"13696080688447488/15238122606428160/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"15987824864002048","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"}]
                    //$.fn.zTree.init(element, setting, aa);
                }
            }
        }])
    .directive('tree3', ['$http','$cookies','$location', function ($http,$cookies,$locatio) {
        return {
            require: '?^ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                element2=element;
                setting2 = {
                    view: {
                        dblClickExpand: false,
                        showLine: false,
                        showIcon: showIconForTree
                    },
                    async: {
                        enable: false
                    },
                    data: {
                        key: {
                            title: "org_name",
                            manager:$cookies.get("managerId"),
                            name: "org_name"
                        },
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "org_parent"
                        }
                    },
                    callback: {

                        onCheck: function (event, treeId, treeNode, clickFlag) {
                            //alert(treeNode.id)
                            //scope.$apply(function () {
                            //    ngModel.$setViewValue(treeNode);
                            //    //ztreeFactory.load1(treeNode.id,$scope);
                            //});
                            ngModel.$setViewValue(treeNode);
                        }
                    },
                    check:{
                        chkStyle:'checkbox',
                        chkboxType: { "Y" : "", "N" : "" },
                        enable:true
                    }
                };
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/tenantorg/getTenantOrgs',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        scope.content=headers('x-auth-token');
                        if(scope.content!=''&&scope.content!=null){
                            $cookies.put('JSESSION', scope.content);
                        }
                        if(data.code=='0000'){
                            //var old=data.data;
                            ////old[0].checked=true;
                            //$.fn.zTree.init(element, setting2,old);

                        }else if(data.code =='B99997'){

                        }else if(data.code=='B99995'){
                            scope.showaddorguser = false;
                        }else{
                            alert(data.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });

                function showIconForTree(treeId, treeNode) {
                    return !treeNode.isParent;
                };
                //var aa=[{"orgName":"2223","orgParent":"13696080688447488","fullPath":"13696080688447488/18855093407318016","isManage":"N","operable":true,"visible":true,"id":"18855093407318016","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"2222","orgParent":"13696080688447488","fullPath":"13696080688447488/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"14445748036829184","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"租户2","fullPath":"13696080688447488","isManage":"N","operable":true,"visible":true,"id":"13696080688447488","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"1111","orgParent":"13696080688447488","fullPath":"13696080688447488/14418611254853632","isManage":"N","operable":true,"visible":true,"id":"14418611254853632","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"23254","orgParent":"14445748036829184","fullPath":"13696080688447488/15238122606428160/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"15987824864002048","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"}]
                //$.fn.zTree.init(element, setting, aa);
            }
        }
    }])
    .directive('tree4', ['$http','$cookies','$location', function ($http,$cookies,$locatio) {
        return {
            require: '?^ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, ngModel) {
                element3=element;
                setting3 = {
                    view: {
                        dblClickExpand: false,
                        showLine: false,
                        showIcon: showIconForTree
                    },
                    async: {
                        enable: false
                    },
                    data: {
                        key: {
                            title: "org_name",
                            manager:$cookies.get("managerId"),
                            name: "org_name"
                        },
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "org_parent"
                        }
                    },
                    callback: {

                        onClick: function (event, treeId, treeNode, clickFlag) {
                            //alert(treeNode.id)
                            //scope.$apply(function () {
                            //    ngModel.$setViewValue(treeNode);
                            //    //ztreeFactory.load1(treeNode.id,$scope);
                            //});
                            ngModel.$setViewValue(treeNode);
                        }
                    }
                };
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/tenantorg/getTenantOrgs',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        scope.content=headers('x-auth-token');
                        if(scope.content!=''&&scope.content!=null){
                            $cookies.put('JSESSION', scope.content);
                        }
                        if(data.code=='0000'){
                            //var old=data.data;
                            ////old[0].checked=true;
                            //$.fn.zTree.init(element, setting2,old);

                        }else if(data.code =='B99997'){

                        }else if(data.code=='B99995'){
                            scope.showaddorguser = false;
                        }else{
                            alert(data.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });

                function showIconForTree(treeId, treeNode) {
                    return !treeNode.isParent;
                };
                //var aa=[{"orgName":"2223","orgParent":"13696080688447488","fullPath":"13696080688447488/18855093407318016","isManage":"N","operable":true,"visible":true,"id":"18855093407318016","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"2222","orgParent":"13696080688447488","fullPath":"13696080688447488/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"14445748036829184","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"租户2","fullPath":"13696080688447488","isManage":"N","operable":true,"visible":true,"id":"13696080688447488","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"1111","orgParent":"13696080688447488","fullPath":"13696080688447488/14418611254853632","isManage":"N","operable":true,"visible":true,"id":"14418611254853632","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"},{"orgName":"23254","orgParent":"14445748036829184","fullPath":"13696080688447488/15238122606428160/14445748036829184","isManage":"N","operable":true,"visible":true,"id":"15987824864002048","createTimestamp":"Jul 4, 2016 4:33:26 PM","modifyTimestamp":"Jul 4, 2016 4:33:26 PM"}]
                //$.fn.zTree.init(element, setting, aa);
            }
        }
    }]);
});