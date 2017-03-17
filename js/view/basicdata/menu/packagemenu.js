/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    publicFunction.removeStyle('archive.css');
    var test = angular.module('packagemenu', []);
    test.controller('packagemenuCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$mdToast,ztreeFactory,$location){

        $scope.tarmenu = {
            id:'',
            parentName:'',
            parent_id:'',
            name:'',
            description:'',
            url:'',
            visible:''
        };

        $scope.package_name='';
        $scope.package_saas_id='';
        $scope.package_id='';
        $scope.selected = [];
        $scope.list = [];

        var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().packagemenu_name != null && $location.search().packagemenu_name != undefined){
                $scope.package_name=$location.search().packagemenu_name.name;
                $scope.package_saas_id=$location.search().packagemenu_name.saas_id;
                $scope.package_id=$location.search().packagemenu_name.id;
                getapp1()
            }else{
                $location.path("/package")
            }
        });

        function getapp1(){
            if($scope.package_id == '' ||$scope.package_id == null ||$scope.package_id == undefined){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/package"
            }else{
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/product/menu/'+$scope.package_id,
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&& $scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){

                            var goodsdata = data.data.menuList;
                            ztreeFactory.packageemenu($scope,goodsdata);

                        }else if(data.code=='0401'){
                            if(data.msg == '未登录.'){
                                $cookies.remove("managerId");
                                $cookies.remove("tenantId");
                                $cookies.remove("JSESSION");
                                $cookies.remove("userId");
                                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                            }

                        }else if(data.code=='6666'){

                        }else{
                            alert(data.msg)
                        }

                    })
                    .error(function(data, status, headers, config) {
                        //alert(status)
                    });
            }
        }

        var watch2 = $scope.$watch('selectNode',function(newValue,oldValue, scope){
            if($scope.selectNode !=undefined){
                var treeObj = $.fn.zTree.getZTreeObj("qqq");
                //if($scope.selectNode.checked == true){
                //}else if($scope.selectNode.checked == false){
                //    var idx =  $scope.selected.indexOf($scope.selectNode);
                //    if (idx > -1) {
                //    }
                //}

                //treeObj = $.fn.zTree.getZTreeObj("qqq");
                $scope.selected=treeObj.getCheckedNodes(true);
            }
        },true);

        var watch3 = $scope.$watch('selected',function(newValue,oldValue, scope){
            if($scope.selected !=undefined){
                if(newValue.length < oldValue.length){
                    var result = [];
                    for(var i = 0; i < oldValue.length; i++){
                        var obj = oldValue[i];
                        var num = obj.id;
                        var isExist = false;
                        for(var j = 0; j < newValue.length; j++){
                            var aj = newValue[j];
                            var n = aj.id;
                            if(n == num){
                                isExist = true;
                                break;
                            }
                        }
                        if(!isExist){
                            result.push(obj);
                        }
                    }
                    var treeObj = $.fn.zTree.getZTreeObj("qqq");
                    for(var h=0;h<result.length;h++){
                        var node = treeObj.getNodeByTId(result[h].tId);
                        treeObj.checkNode(node, false, true);

                        if(node.status == 'old'){
                            node.status = "deleted";
                        }else if(node.status == 'added'){
                            node.status = "";
                        }
                        treeObj.updateNode(node);
                    }


                }else if(oldValue.length < newValue.length){
                    var result = [];
                    for(var i = 0; i < newValue.length; i++){
                        var obj = newValue[i];
                        var num = obj.id;
                        var isExist = false;
                        for(var j = 0; j < oldValue.length; j++){
                            var aj = oldValue[j];
                            var n = aj.id;
                            if(n == num){
                                isExist = true;
                                break;
                            }
                        }
                        if(!isExist){
                            result.push(obj);
                        }
                    }
                    var treeObj = $.fn.zTree.getZTreeObj("qqq");
                    //treeObj.checkNode(node, false, true);

                    for(var h=0;h<result.length;h++){
                        var node = treeObj.getNodeByTId(result[h].tId);
                        if(node.status == 'deleted'){
                            node.status = "old";
                        }else if(node.status == ''){
                            node.status = "added";
                        }
                        treeObj.updateNode(node);
                    }



                }
            }
        },true);


        $scope.add = function(ev,item) {
            $scope.list=[];
            var treeObj = $.fn.zTree.getZTreeObj("qqq");
            var nodes = treeObj.transformToArray(treeObj.getNodes());
            for(var i=0;i<nodes.length;i++){
                if(nodes[i].status == 'added'){
                    nodes[i]._state = nodes[i].status;
                    nodes[i].mid = nodes[i].id;
                    $scope.list.push(nodes[i])
                }
                if(nodes[i].status == 'deleted'){
                    nodes[i]._state = nodes[i].status;
                    nodes[i].mid = nodes[i].id;
                    $scope.list.push(nodes[i])
                }
            }
            if($scope.list == []){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/package"
            }else{
                var getconfig = {
                    method: 'PUT',
                    url: APP_CONFIG.CDP_URL+'/docker/product/',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data:{
                        pid:$scope.package_id,
                        menuList:$scope.list
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&& $scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){
                            alert('修改成功！');
                            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/package"
                        }else if(data.code=='0401'){
                            if(data.msg == '未登录.'){
                                $cookies.remove("managerId");
                                $cookies.remove("tenantId");
                                $cookies.remove("JSESSION");
                                $cookies.remove("userId");
                                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                            }

                        }else if(data.code=='6666'){

                        }else{
                            alert(data.msg)
                        }

                    })
                    .error(function(data, status, headers, config) {
                        //alert(status)
                    });
            }

        };

        $scope.back = function(){
            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/package"
        }
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    angular._LoadModule('packagemenu');
    return test;
});