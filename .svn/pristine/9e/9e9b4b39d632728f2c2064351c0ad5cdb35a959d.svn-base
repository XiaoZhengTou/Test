/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    publicFunction.removeStyle('archive.css');
    var test = angular.module('pemenu', []);
    test.controller('pemenuCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$mdToast,ztreeFactory,$location){

        $scope.selected = [];
        $scope.pedefine = {
            description:'',
            name:'',
            type:'功能角色',
            id:''
        };

        var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().pemenu_name != null && $location.search().pemenu_name != undefined){
                $scope.pedefine.name=$location.search().pemenu_name.name;
                $scope.pedefine.description=$location.search().pemenu_name.description;
                $scope.pedefine.id=$location.search().pemenu_name.id;
                if($location.search().pemenu_name.id == '' ||$location.search().pemenu_name.id == null ||$location.search().pemenu_name.id == undefined){
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
                }
                getapp1();
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
            }
        });


        function getapp1(){
            if($scope.pedefine.id == '' ||$scope.pedefine.id == null ||$scope.pedefine.id == undefined){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
            }else{
                var getconfig = {
                    method: 'GET',
                    url: APP_CONFIG.CDP_URL+'/docker/resource/queryResourceByType?principal_id='+$scope.pedefine.id+'&principal_type=1&resource_type=1',
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

                            var goodsdata = data.data.list;
                            ztreeFactory.pemenu($scope,goodsdata);

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
                var treeObj = $.fn.zTree.getZTreeObj("qqq1");
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
                    var treeObj = $.fn.zTree.getZTreeObj("qqq1");
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
                    var treeObj = $.fn.zTree.getZTreeObj("qqq1");
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
            $scope.list1=[];
            $scope.list2=[];
            var treeObj = $.fn.zTree.getZTreeObj("qqq1");
            var nodes = treeObj.transformToArray(treeObj.getNodes());
            for(var i=0;i<nodes.length;i++){
                if(nodes[i].status == 'added'){
                    nodes[i]._state = nodes[i].status;
                    $scope.list1.push(nodes[i].id)
                }
                if(nodes[i].status == 'deleted'){
                    nodes[i]._state = nodes[i].status;
                    $scope.list2.push(nodes[i].grant_id)
                }
            }
            if($scope.list1 == [] && $scope.list2 == []){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
            }else if($scope.list1 != [] && $scope.list2 != []){
                addbatch($scope.list1);
                deletebatch($scope.list2,'0');
            }else if($scope.list1 != [] && $scope.list2 == []){
                addbatch($scope.list1,'0');
            }else if($scope.list1 == [] && $scope.list2 != []){
                deletebatch($scope.list2,'0');
            }
        };

        function addbatch(item,i){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.CDP_URL+'/docker/resource/batchSaveForPrincipal',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    principal_id: $scope.pedefine.id,
                    principal_type: '1',
                    resource_ids:item,
                    resource_type:'1'
                }
            };
            $http(getconfig)
                .success(function (data, status, headers, config) {
                    $scope.content = headers('x-auth-token');
                    if ($scope.content != '' && $scope.content != null) {
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if (data.code == '0000') {

                        if(i=='0'){
                            alert('修改成功！');
                            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
                        }

                    } else if (data.code == '6666') {

                    } else {
                        alert(data.msg)
                    }

                })
                .error(function (data, status, headers, config) {
                    //alert(status)
                });
        }

        function deletebatch(item,i){
            var getconfig = {
                method: 'PUT',
                url: APP_CONFIG.CDP_URL+'/docker/resource/batchDeleteGrants',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: item
            };
            $http(getconfig)
                .success(function (data, status, headers, config) {
                    $scope.content = headers('x-auth-token');
                    if ($scope.content != '' && $scope.content != null) {
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if (data.code == '0000') {

                        if(i=='0'){
                            alert('修改成功！');
                            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
                        }

                    } else if (data.code == '6666') {

                    } else {
                        alert(data.msg)
                    }

                })
                .error(function (data, status, headers, config) {
                    //alert(status)
                });
        }

        $scope.back = function(){
            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/pedefine"
        }
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    angular._LoadModule('pemenu');
    return test;
});