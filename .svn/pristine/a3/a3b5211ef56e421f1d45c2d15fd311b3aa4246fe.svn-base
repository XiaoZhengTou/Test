/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('area', []);
    test.controller('areaCtrl',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element,$timeout, $q,$mdToast){

        $scope.filter = {
            options: {
                debounce: 500
            }
        };
        $scope.removeFilter = removeFilter;
        $scope.query={
            filter:''
        };
        function removeFilter() {
            $scope.filter.show = false;
            $scope.query.filter = '';
        }

        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: false,
            decapitate: false,
            largeEditDialog: false
        };
        $scope.selected = [];
        $scope.getDesserts = function() {
            getapp1();
            $scope.promise = $timeout(function () {

            }, 1000);
        };

        $scope.clearFilter = function () {
            $scope.search = {
                area_name:'',
                pin_yin:'',
                hot_city_flag:'',
                status:'ALL',
                parent_area_name:'',
                full_path:''
            };
            getapp1();
        };

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:''
        };

        //$scope.pagesize = '5';
        //$scope.pageindex = '1';
        $scope.search = {
            area_name:'',
            pin_yin:'',
            hot_city_flag:'',
            status:'ALL',
            parent_area_name:'',
            full_path:''
        };

        //搜索
        $scope.search_area = function(){
                getapp1('1',$scope.pagesize);

        };

        getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/area/page',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    page_number:parseInt($scope.query.page),
                    page_size:parseInt($scope.query.limit),
                    area_name:$scope.search.area_name == ''? undefined:$scope.search.area_name,
                    pin_yin:$scope.search.pin_yin == ''? undefined:$scope.search.pin_yin,
                    hot_city_flag:$scope.search.hot_city_flag == ''? undefined:$scope.search.hot_city_flag,
                    active_flag:$scope.search.status == 'ALL'? undefined:$scope.search.status,
                    parent_area_name:$scope.search.parent_area_name == ''? undefined:$scope.search.parent_area_name,
                    full_path:$scope.search.full_path == ''? undefined:$scope.search.full_path
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        $scope.appdata = data.data.info;
                        $scope.query.total = data.data.totalRow;
                        $scope.query.limit = data.data.pageSize;
                        $scope.query.page = data.data.pageNumber;

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

        $scope.editstatus = function(item,status){
            var sta='';
            if(status == 'N'){
                sta='Y'
            }else if(status == 'Y'){
                sta='N'
            }
            var getconfig = {
                method: 'PUT',
                url: APP_CONFIG.JIEBAO_URL+'/docker/area',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    region_type_code:item.region_type_code,
                    pin_yin:item.pin_yin,
                    area_desc:item.area_desc,
                    area_id:item.area_id,
                    parent_area_id:item.parent_area_id,
                    area_code:item.area_code,
                    area_name:item.area_name,
                    parent_area_name:item.parent_area_name,
                    hot_city_flag:item.hot_city_flag,
                    is_travel_city:item.is_travel_city,
                    active_flag:sta
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        getapp1($scope.pageindex,$scope.pagesize);
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
        };

        $scope.add = function(ev) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/basicdata/area-dialog1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(item)
                                .position('top right')
                                .hideDelay(1500)
                        );
                    }
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
            function DialogController1($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.numberChips=[];
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    if($scope.searchText==undefined && $scope.selectedItem == undefined){
                        $scope.searchText = '';
                        $scope.selectedItem='';
                    }
                    if( $scope.searchText!=''&& $scope.selectedItem == null){
                        alert('请选择正确的上级区域！')
                    }else {
                        var getconfig = {
                            method: 'POST',
                            url: APP_CONFIG.JIEBAO_URL+'/docker/area',
                            headers: {
                                'x-auth-token': $cookies.get("JSESSION")
                            },
                            data: $scope.area
                        };
                        $http(getconfig)
                            .success(function (data, status, headers, config) {
                                $scope.content = headers('x-auth-token');
                                if ($scope.content != '' && $scope.content != null) {
                                    $cookies.put('JSESSION', $scope.content);
                                }
                                if (data.code == '0000') {
                                    //alert('新增成功！');
                                    $mdDialog.hide('新增成功！');
                                    getapp1(pageindex, pagesize);
                                } else if (data.code == '6666') {

                                } else {
                                    alert(data.msg)
                                }

                            })
                            .error(function (data, status, headers, config) {
                                //alert(status)
                            });
                    }
                };

                $scope.searchText = '';
                $scope.selectedItem='';
                $scope.querySearch   = function() {
                    if($scope.searchText !='' && $scope.searchText != undefined){
                        var data1=[];
                        var url=APP_CONFIG.JIEBAO_URL+'/docker/area/likeName/'+$scope.searchText;
                        ajaxrequest(url,"get",false,createxml1(),c,document);
                        function ajaxrequest(url,methodtype,con,parameter,functionName,obj){
                            var xmlhttp=getajaxHttp();
                            xmlhttp.onreadystatechange=function(){
                                if(xmlhttp.readyState==4){
                                    functionName(xmlhttp,obj);
                                    if(  (xmlhttp.getResponseHeader('x-auth-token')!=null) ){
                                        document.cookie="JSESSION="+xmlhttp.getResponseHeader('x-auth-token');
                                    }
                                }
                            };
                            xmlhttp.open(methodtype,url,con);
                            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
                            if($cookies.get("JSESSION") !=''){
                                xmlhttp.setRequestHeader('x-auth-token', $cookies.get("JSESSION"));
                            }
                            xmlhttp.send(parameter);
                        }
                        function createxml1(){
                            return '';
                        }
                        function c(xmlhttp,obj){
                            //document.getElementById('aaaaa').value=xmlhttp.responseText;
                            data1 = eval('(' + xmlhttp.response + ')').data;
                        }
                        function getajaxHttp() {
                            var xmlHttp;
                            try {
                                // Firefox, Opera 8.0+, Safari
                                xmlHttp = new XMLHttpRequest();
                            } catch (e) {
                                // Internet Explorer
                                try {
                                    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                                } catch (e) {
                                    try {
                                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                                    } catch (e) {
                                        alert("您的浏览器不支持AJAX！");
                                        return false;
                                    }
                                }
                            }
                            return xmlHttp;
                        }
                        //return data1;
                        var results = $scope.searchText ? data1.filter( createFilterFor($scope.searchText) ) : data1, deferred;
                        return results;
                    }else{
                        return []
                    }
                };
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(state) {
                        return (state.area_name.indexOf(lowercaseQuery) === 0);
                    };
                }

                $scope.$watch('selectedItem',function(newValue,oldValue, scope){
                    if($scope.selectedItem != '' && $scope.selectedItem != null){
                        $scope.area.parent_area_id=$scope.selectedItem.area_id;
                        $scope.area.parent_area_name=$scope.selectedItem.area_name;
                    }else{
                        $scope.area.parent_area_id='';
                        $scope.area.parent_area_name='';
                    }
                });

                $scope.area = {
                    "region_type_code": "",
                    "pin_yin": "",
                    "parent_area_id": '',
                    "area_code": "",
                    "area_name": "",
                    "parent_area_name": '',
                    "hot_city_flag": "",
                    "active_flag": "",
                    "is_travel_city": ''
                };
            }
        };

        $scope.edit = function(ev,item) {
            var pageindex = $scope.pageindex;
            var pagesize = $scope.pagesize;
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/basicdata/area-dialog2.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        $mdToast.show(
                            $mdToast.simple()
                                .textContent(item)
                                .position('top right')
                                .hideDelay(1500)
                        );
                    }
                });
            $scope.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                $scope.customFullscreen = (wantsFullScreen === true);
            });
            function DialogController2($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.numberChips=[];
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    if($scope.searchText==undefined && $scope.selectedItem == undefined){
                        $scope.searchText = '';
                        $scope.selectedItem='';
                    }
                    if( $scope.searchText!=''&& $scope.selectedItem == null){
                        alert('请选择正确的上级区域！')
                    }else{
                        var getconfig = {
                            method: 'PUT',
                            url: APP_CONFIG.JIEBAO_URL+'/docker/area',
                            headers: {
                                'x-auth-token': $cookies.get("JSESSION")
                            },
                            data:{
                                "region_type_code": $scope.area.region_type_code,
                                "pin_yin": $scope.area.pin_yin,
                                "area_id": $scope.area.area_id,
                                "parent_area_id": $scope.area.parent_area_id,
                                "area_code": $scope.area.area_code,
                                "area_name": $scope.area.area_name,
                                "parent_area_name": $scope.area.parent_area_name,
                                "hot_city_flag": $scope.area.hot_city_flag,
                                "full_path": $scope.area.full_path,
                                "active_flag": $scope.area.active_flag,
                                "is_travel_city": $scope.area.is_travel_city
                            }
                        };
                        $http(getconfig)
                            .success(function(data, status, headers, config) {
                                $scope.content=headers('x-auth-token');
                                if($scope.content!=''&&$scope.content!=null){
                                    $cookies.put('JSESSION', $scope.content);
                                }
                                if(data.code=='0000'){
                                    //alert('修改成功！');
                                    $mdDialog.hide('修改成功！');
                                    getapp1(pageindex,pagesize);
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

                $scope.delete = function(){
                    var getconfig = {
                        method: 'DELETE',
                        url: APP_CONFIG.JIEBAO_URL+'/docker/area/'+$scope.area.area_id,
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
                                //alert('删除成功！');
                                $mdDialog.hide('删除成功！');
                                getapp1(pageindex,pagesize);
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
                };

                if(item.parent_area_name !='' && item.parent_area_name!=undefined){
                    $scope.searchText = item.parent_area_name;
                    $scope.selectedItem={area_name: item.parent_area_name,area_id:item.parent_area_id};
                }else{
                    $scope.searchText = '';
                    $scope.selectedItem='';
                }
                $scope.querySearch   = function() {
                    if($scope.searchText !='' && $scope.searchText != undefined){
                        var data1=[];
                        var url=APP_CONFIG.JIEBAO_URL+'/docker/area/likeName/'+$scope.searchText;
                        ajaxrequest(url,"get",false,createxml1(),c,document);
                        function ajaxrequest(url,methodtype,con,parameter,functionName,obj){
                            var xmlhttp=getajaxHttp();
                            xmlhttp.onreadystatechange=function(){
                                if(xmlhttp.readyState==4){
                                    functionName(xmlhttp,obj);
                                    if(  (xmlhttp.getResponseHeader('x-auth-token')!=null) ){
                                        document.cookie="JSESSION="+xmlhttp.getResponseHeader('x-auth-token');
                                    }
                                }
                            };
                            xmlhttp.open(methodtype,url,con);
                            xmlhttp.setRequestHeader('Content-Type','application/json;charset=UTF-8');
                            if($cookies.get("JSESSION") !=''){
                                xmlhttp.setRequestHeader('x-auth-token', $cookies.get("JSESSION"));
                            }
                            xmlhttp.send(parameter);
                        }
                        function createxml1(){
                            return '';
                        }
                        function c(xmlhttp,obj){
                            data1 = eval('(' + xmlhttp.response + ')').data;
                        }
                        function getajaxHttp() {
                            var xmlHttp;
                            try {
                                // Firefox, Opera 8.0+, Safari
                                xmlHttp = new XMLHttpRequest();
                            } catch (e) {
                                // Internet Explorer
                                try {
                                    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                                } catch (e) {
                                    try {
                                        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                                    } catch (e) {
                                        alert("您的浏览器不支持AJAX！");
                                        return false;
                                    }
                                }
                            }
                            return xmlHttp;
                        }
                        //return data1;
                        var results = $scope.searchText ? data1.filter( createFilterFor($scope.searchText) ) : data1, deferred;
                        return results;
                    }else{
                        return []
                    }
                };
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(state) {
                        return (state.area_name.indexOf(lowercaseQuery) === 0);
                    };
                }

                var j=0;
                $scope.$watch('selectedItem',function(newValue,oldValue, scope){
                    if($scope.selectedItem != '' && $scope.selectedItem != null){
                        $scope.area.parent_area_id=$scope.selectedItem.area_id;
                        $scope.area.parent_area_name=$scope.selectedItem.area_name;

                    }else{
                        $scope.area.parent_area_id='';
                        $scope.area.parent_area_name='';
                    }
                });

                $scope.area = {
                    "region_type_code": item.region_type_code,
                    "pin_yin": item.pin_yin,
                    "area_id": item.area_id,
                    "parent_area_id": item.parent_area_name,
                    "area_code": item.area_code,
                    "area_name": item.area_name,
                    "parent_area_name":item.parent_area_name,
                    "hot_city_flag": item.hot_city_flag,
                    "active_flag": item.active_flag,
                    "is_travel_city": item.is_travel_city
                };
            }
        };

        //批量失效(查询时候要重置)
        $scope.selected1 = [];
        $scope.batch_failure = function(){
            console.log("parent", $scope.selected1);
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/area/batchDelete',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:$scope.selected1
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&&$scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        getapp1($scope.pageindex,$scope.pagesize);
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
        };

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    test.controller('areaCtrl1',function($scope, $log, $mdDialog, $mdMedia,NgTableParams,$http,$cookies,$filter,$element){
        $scope.draftSelectcheck = false;

        $scope.$watch('draftSelectcheck',function(newValue,oldValue, scope){
            $scope.$emit("draftSelectcheckChange", $scope.draftSelectcheck);
        });

        $scope.$on("draftSelectcheckChange1", function (event, msg) {
            $scope.draftSelectcheck = msg;
        });
    });
    angular._LoadModule('area');
    return test;
});