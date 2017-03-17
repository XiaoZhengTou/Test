/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular','js/view/choosecitys.js','js/server/json/hotelCitys.js','js/view/personalexp/expensesecond.js','js/view/personalexp/expensethird.js','js/shared/choosebuyone.js',
    'js/shared/receving.js','js/shared/ruzhangdanwei.js','js/shared/budgets.js'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('expensefirst', ['muchoosecitys','mdHotelCitys','expensesecond','expensethird','chooseBuyOne','md.receving','md.ruzhangdanwei','mdbudgets']);
    test.config(function ($routeProvider, $locationProvider,$httpProvider) {
        $httpProvider.defaults.timeout = 5000;
        $routeProvider
            .when('/expense/expensesecond', {
                templateUrl:  'view/personalexp/expensesecond.html'
            })
            .when('/expense/expensethird', {
                templateUrl: 'view/personalexp/expensethird.html'
            })
            .otherwise({
                redirectTo: '/expense/expensefirst'
            });
    }).controller('expensefirstCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$element,$mdToast,$timeout,jdPublic,$mdEditDialog,hotelCitys,$location,expPublic,$chooseBuyOne){
        $scope.breadcrumbs.crumbs='个人报销';
        $scope.breadcrumbs.crumbs1='报销申请';
        $scope.layout.activeItem='报销申请';
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
            largeEditDialog: true
        };
        $scope.selected = [];
        $scope.getDesserts = function() {
            getapp1();
            $scope.promise = $timeout(function () {

            }, 1000);
        };
        $scope.appdata=[];
        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1,
            total:'',
            assistance_fee:'',
            currency_code:'',
            conversion_rate:'',
            fee_apply:[],
            loan_info:[],
            currencydata:[],
            totalbuy:0,
            reason_desc:'',
            totalass:0
        };
        $scope.receving = {};
        $scope.ruzhangdanwei = {};

        //获取货币
        getcurrency();
        function getcurrency(){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.JIEBAO_URL+'/docker/currencies/query',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    active_flag:'Y'
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        $scope.query.currencydata=data.data;

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

        //获取指定币种汇率
        $scope.getrate = function(code){
            for(var g=0;g<$scope.appdata.length;g++){
                $scope.changebzf(g);
            }
            if(code == 'CNY'){
                $scope.query.conversion_rate = 1;
            }else{
                var getconfig = {
                    method: 'POST',
                    url: APP_CONFIG.JIEBAO_URL+'/docker/rates/page',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data:{
                        page_number:1,
                        page_size:10000,
                        from_currency:'CNY',
                        to_currency:code,
                        conversion_type: 'CORPORATE',
                        conversion_date:$filter('date')(new Date(), "yyyy-MM-01"),
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&& $scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){

                            $scope.query.conversion_rate = data.data.data[0].conversion_rate;

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
            $scope.todos=[];
            $scope.query.totalbuy = 0
        };

        //获取默认收款方
        getDefaultReceiver();
        function getDefaultReceiver(){
            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL+ '/cm/userCenter/getDefaultReceiver',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {

                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        $scope.receving = data.data;

                    }else if(data.code=='6666'){

                    }else{
                        //alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
        }

        //获取默认入账单位
        getDefaultCompany();
        function getDefaultCompany(){
            var getconfig = {
                method: 'GET',
                url:  APP_CONFIG.SMART_URL+ '/cm/userCenter/getDefaultConfig',
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
                        $scope.ruzhangdanwei = data.data.company;

                    }else if(data.code=='6666'){

                    }else{
                        //alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
        }

        //关联申请单
        $scope.chooseEA = function(ev,item1) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/personalexp/personalfirst-dialog1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        $scope.query.fee_apply = item;
                        for(var i=0;i<$scope.query.fee_apply.length;i++){
                            var flag = true;
                            for(var j=0;j<$scope.appdata.length;j++){
                                if($scope.appdata[j].fee_apply_id == $scope.query.fee_apply[i].fee_apply_id ){
                                    flag = false;
                                }
                            }
                            if(flag == true){
                                getapp1($scope.query.fee_apply[i].fee_apply_id)
                            }

                        }
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
                    $mdDialog.hide($scope.selected);
                };

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: true,
                    decapitate: false,
                    largeEditDialog: false
                };
                $scope.selected = item1;
                $scope.getDesserts = function() {
                    getapp1();
                    $scope.promise = $timeout(function () {

                    }, 1000);
                };

                $scope.query = {
                    order: 'name',
                    limit: 5,
                    page: 1,
                    total:''
                };

                getapp1();
                function getapp1(page,size){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/ea/feeApply/listMyFeeApply',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            page_number:parseInt($scope.query.page),
                            page_size:parseInt($scope.query.limit),
                            query_param: {
                                //"reason_desc": "12121",
                                //"apply_name": '申请人姓名',
                                //"apply_by": 1212,
                                //"begin_date": '2015-10-01',
                                //"end_date": '2016-01-01',
                                //"fee_apply_code": 'EA12121',
                                //"eco_type_id": 121,
                                //"fee_type_id": 12

                            }
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

            }
        };
        //根据EA单获取行程
        function getapp1(id){
            var getconfig = {
                method: 'POST',
                url: APP_CONFIG.SMART_URL+'/ea/feeApply/getFeeApplyById',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data:{
                    "fee_apply_id": id
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){
                        for(var i=0;i<data.data.emseaapplyh.emseaapplytravelds.length;i++){
                            var dd=data.data.emseaapplyh.emseaapplytravelds[i];
                            //$scope.appdata.push(data.data.emseaapplyh.emseaapplytravelds[i])
                            var aa=(data.data.emseaapplyh.emseaapplytravelds[i].travel_persons).split(",");
                            var bb=(data.data.emseaapplyh.emseaapplytravelds[i].travel_persons_name).split(",");
                            var cc=[];
                            var ee={
                                lodging_days:'',
                                assistance_days:''
                            };
                            if(aa.length == bb.length){
                                for(var j=0;j<aa.length;j++){
                                    cc.push({
                                        person_id:aa[j],
                                        person_name:bb[j]
                                    })
                                }
                            }
                            var ff=aa.length;
                            if(dd.start_date != null && dd.start_date != undefined && dd.end_date != null && dd.end_date != undefined){
                                var day = 24 * 60 * 60 *1000;
                                var dateArr = (dd.start_date.split(" "))[0].split("-");
                                var checkDate = new Date();
                                checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
                                var checkTime = checkDate.getTime();

                                var dateArr2 = (dd.end_date.split(" "))[0].split("-");
                                var checkDate2 = new Date();
                                checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
                                var checkTime2 = checkDate2.getTime();

                                var aaa = (checkTime2 - checkTime)/day;
                                if(aaa >=0){
                                    ee.lodging_days = parseInt(aaa) ;
                                    ee.assistance_days = parseInt(aaa) +1 ;
                                    $scope.dayerror = false;
                                }else{
                                    ee.lodging_days = '';
                                    ee.assistance_days = '';
                                    $scope.dayerror = true;
                                }
                            }

                            $scope.appdata.push({
                                fee_apply_id:id,
                                fee_travel_id:data.data.emseaapplyh.emseaapplytravelds[i].apply_travel_id,
                                from_area_name:data.data.emseaapplyh.emseaapplytravelds[i].from_area_name,
                                from_area_code:data.data.emseaapplyh.emseaapplytravelds[i].from_area_code,
                                to_area_names:data.data.emseaapplyh.emseaapplytravelds[i].to_area_names,
                                to_area_codes:data.data.emseaapplyh.emseaapplytravelds[i].to_area_codes,
                                start_date:dd.start_date.split(" ")[0].replace(/-/g,"/") == ''? null:new Date(dd.start_date.split(" ")[0].replace(/-/g,"/")),
                                end_date:dd.end_date.split(" ")[0].replace(/-/g,"/") == ''? null:new Date(dd.end_date.split(" ")[0].replace(/-/g,"/")),
                                lodging_days:ee.lodging_days,
                                assistance_days:ee.assistance_days,
                                person:cc,
                                travel_person_count:ff
                            });
                        }

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

        var watch1 = $scope.$watch('query.fee_apply',function(newValue,oldValue, scope){
            if(newValue.length < oldValue.length){
                for(var i=0;i<oldValue.length;i++){
                    var h=0;
                    for(var j=0;j<newValue.length;j++){
                        if(newValue[j].fee_apply_id == oldValue[i].fee_apply_id){
                            h++;
                        }
                    }
                    if(h != 0 ){

                    }else{
                        for(var g=$scope.appdata.length-1; g>=0;g--){
                            if($scope.appdata[g].fee_apply_id == oldValue[i].fee_apply_id){
                                $scope.appdata.splice(g,1)
                            }
                        }
                    }
                }
            }
        },true);

        $scope.asserror = false;
        $scope.checkass = function(i){
            if(i>$scope.query.totalass){
                $scope.asserror = true;
            }else{
                $scope.asserror = false;
            }
        };

        //关联借款单
        $scope.chooseLM = function(ev,item1) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/personalexp/personalfirst-dialog2.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        $scope.query.loan_info = item;
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
                    $mdDialog.hide($scope.selected11);
                };

                $scope.options = {
                    rowSelection: true,
                    multiSelect: true,
                    autoSelect: true,
                    decapitate: false,
                    largeEditDialog: false
                };
                $scope.selected11 = item1;
                $scope.getDesserts = function() {
                    getapp1();
                    $scope.promise = $timeout(function () {

                    }, 1000);
                };

                $scope.query = {
                    order: 'name',
                    limit: 5,
                    page: 1,
                    total:''
                };

                getapp1();
                function getapp1(page,size){
                    var getconfig = {
                        method: 'POST',
                        url: APP_CONFIG.SMART_URL+'/lm/loan/listMyLoan',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data:{
                            page_number:parseInt($scope.query.page),
                            page_size:parseInt($scope.query.limit),
                            order_by: 'loan_info_code',
                            query_param: {
                                biz_flag: "0",
                                status: "DHK",
                                //reason_desc : null,
                                //loan_info_code : null,
                                //fee_apply_code : null,
                                //apply_date : new Date(moment().add(-3,'month').format('YYYY-MM-DD')),
                                //expected_repay_date : new Date()
                            }
                        }
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.appdata = data.data.datalist;
                                $scope.query.total = data.data.page.totalRow;
                                $scope.query.limit = data.data.page.pageSize;
                                $scope.query.page = data.data.page.pageNumber;

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
        };

        //补助费
        $scope.changebzf = function(i){
            if($scope.appdata[i].from_area_code != '' && $scope.appdata[i].to_area_codes != '' && $scope.appdata[i].assistance_days != '' && $scope.appdata[i].person.length>0){
                var ids='';
                for(var b=0;b<$scope.appdata[i].person.length;b++){
                    if(b==0){
                        ids = $scope.appdata[i].person[b].person_id
                    }else{
                        ids = ids +','+ $scope.appdata[i].person[b].person_id
                    }
                }

                var getconfig = {
                    method: 'POST',
                    url: 'http://10.73.37.67:8080/smart-expense-web/sm/EmsSmExpenseStdH/getBzf',
                    //url: APP_CONFIG.SMART_URL+'/sm/EmsSmExpenseStdH/getBzf',
                    headers: {
                        'x-auth-token':$cookies.get("JSESSION")
                    },
                    data:{
                        areaCode:$scope.appdata[i].to_area_codes,
                        isDeduct:'false',
                        userIds:ids
                    }
                };
                $http(getconfig)
                    .success(function(data1, status, headers, config) {
                        if(data1.code=='0000'){

                            var bzf=data1.data.list;
                            var av_amount=parseFloat(data1.data.av_amount);

                            var aa1=[];
                            $scope.totalass =0;
                            for(var q=0;q<bzf.length;q++){
                                if(bzf[q].currency_code == $scope.query.currency_code){

                                    bzf[q].rateerror = false;
                                    $scope.totalass = av_amount;

                                }else{
                                    var bb=false;
                                    for(var e=0;e<aa1.length;e++){
                                        if(bzf[q].currency_code == aa1[e]){
                                            bb=true
                                        }
                                    }
                                    if(bb == false){
                                        if(bzf[q].currency_code != undefined && bzf[q].currency_code != null){
                                            aa1.push(bzf[q].currency_code)
                                        }else{
                                            bzf[q].rateerror = true;
                                            //alert(bzf[q].billingDesc+'不存在对应的币种！')
                                        }
                                    }
                                }
                            }

                            if(aa1 !=[] && aa1.length != 0){
                                var getconfig = {
                                    method: 'POST',
                                    url: APP_CONFIG.JIEBAO_URL+'/docker/rates/getrates',
                                    headers: {
                                        'x-auth-token': 'a42600b7-ff3b-4fe6-843d-7e4c9cb8623b'
                                    },
                                    data:{
                                        conversion_type: 'CORPORATE',
                                        conversion_date:$filter('date')(new Date(), "yyyy-MM-01"),
                                        from_currency:aa1,
                                        to_currency:$scope.query.currency_code
                                    }
                                };
                                $http(getconfig)
                                    .success(function(data2, status, headers, config) {
                                        if(data2.code=='0000'){
                                            var rates = data2.data.info;
                                            $scope.totalass = 0;
                                            for(var w=0;w<bzf.length;w++){

                                                if(bzf[w].currency_code == $scope.query.currency_code){

                                                    bzf[w].rateerror = false;
                                                    $scope.totalass = av_amount;
                                                }else{
                                                    for(var q=0;q<rates.length;q++){
                                                        if(rates[q].from_currency == bzf[w].currency_code && rates[q].to_currency == $scope.query.currency_code){
                                                            if(rates[q].conversion_rate != 0 && rates[q].conversion_rate != null && rates[q].conversion_rate != undefined){
                                                                bzf[w].rateerror = false;

                                                                $scope.totalass = av_amount * rates[q].conversion_rate;

                                                            }else{
                                                                bzf[w].rateerror = true;
                                                                $scope.totalass = 0;
                                                            }

                                                        }else{
                                                            bzf[w].rateerror = true;
                                                            $scope.totalass = 0;
                                                        }
                                                    }
                                                }
                                            }
                                            $scope.appdata[i].totalass = parseFloat($scope.totalass);
                                        }else if(data2.code=='6666'){

                                        }else{
                                            alert(data2.msg)
                                        }

                                    })
                                    .error(function(data, status, headers, config) {
                                        //alert(status)
                                    });
                            }

                            $scope.appdata[i].totalass = parseFloat($scope.totalass);
                            //$scope.query.totalass = parseFloat($scope.totalass) *$scope.appdata[i].person.length +$scope.query.totalass;

                        }else{
                            alert(data1.msg)
                        }
                    })
                    .error(function(data, status, headers, config) {

                    });
            }
        };

        var watch2 = $scope.$watch('appdata',function(newValue,oldValue, scope){
            $scope.query.totalass = 0;
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].from_area_code != '' && $scope.appdata[i].to_area_codes != '' && $scope.appdata[i].assistance_days != '' && $scope.appdata[i].person.length>0 &&
                    $scope.dayerror == false && $scope.dayerror1 == false && $scope.dayerror2 == false && $scope.appdata[i].totalass!= undefined){
                    $scope.query.totalass = parseFloat($scope.appdata[i].totalass) *$scope.appdata[i].person.length * $scope.appdata[i].assistance_days +$scope.query.totalass;
                }
            }

        },true);

        //行程明细
        $scope.addtrip1 = function(){
            $scope.appdata.push({
                fee_travel_id:'',
                from_area_name:'',
                from_area_code:'',
                to_area_names:'',
                to_area_codes:'',
                start_date:new Date(),
                end_date:new Date(),
                lodging_days:0,
                assistance_days:1,
                person:[],
                travel_persons:'',
                travel_persons_name:'',
                travel_person_count:''
            });
            $scope.daywarn = false;
            for(var i=0;i<$scope.appdata.length;i++){
                for(var j=i+1;j<$scope.appdata.length;j++){
                    var dateArr1 = $filter('date')($scope.appdata[i].start_date, "yyyy-MM-dd").split("-");
                    var checkDate1 = new Date();
                    checkDate1.setFullYear(dateArr1[0], dateArr1[1]-1, dateArr1[2]);

                    var dateArr2 = $filter('date')($scope.appdata[i].end_date, "yyyy-MM-dd").split("-");
                    var checkDate2 = new Date();
                    checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);

                    var dateArr3 = $filter('date')($scope.appdata[j].start_date, "yyyy-MM-dd").split("-");
                    var checkDate3 = new Date();
                    checkDate3.setFullYear(dateArr3[0], dateArr3[1]-1, dateArr3[2]);

                    var dateArr4 = $filter('date')($scope.appdata[j].end_date, "yyyy-MM-dd").split("-");
                    var checkDate4 = new Date();
                    checkDate4.setFullYear(dateArr4[0], dateArr4[1]-1, dateArr4[2]);

                    if(checkDate1 <= checkDate3){
                        if(checkDate2 >= checkDate3){
                            $scope.daywarn = true;
                        }
                    }else if(checkDate1 > checkDate3){
                        if(checkDate1 <= checkDate4){
                            $scope.daywarn = true;
                        }
                    }
                }
            }
        };

        $scope.dayerror = false;
        $scope.dayerror1 = false;
        $scope.dayerror2 = false;
        $scope.daywarn = false;

        $scope.delete = function(item,i){
            $scope.appdata.splice(i,1)
            $scope.daywarn = false;
            for(var i=0;i<$scope.appdata.length;i++){
                for(var j=i+1;j<$scope.appdata.length;j++){
                    var dateArr1 = $filter('date')($scope.appdata[i].start_date, "yyyy-MM-dd").split("-");
                    var checkDate1 = new Date();
                    checkDate1.setFullYear(dateArr1[0], dateArr1[1]-1, dateArr1[2]);

                    var dateArr2 = $filter('date')($scope.appdata[i].end_date, "yyyy-MM-dd").split("-");
                    var checkDate2 = new Date();
                    checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);

                    var dateArr3 = $filter('date')($scope.appdata[j].start_date, "yyyy-MM-dd").split("-");
                    var checkDate3 = new Date();
                    checkDate3.setFullYear(dateArr3[0], dateArr3[1]-1, dateArr3[2]);

                    var dateArr4 = $filter('date')($scope.appdata[j].end_date, "yyyy-MM-dd").split("-");
                    var checkDate4 = new Date();
                    checkDate4.setFullYear(dateArr4[0], dateArr4[1]-1, dateArr4[2]);

                    if(checkDate1 <= checkDate3){
                        if(checkDate2 >= checkDate3){
                            $scope.daywarn = true;
                        }
                    }else if(checkDate1 > checkDate3){
                        if(checkDate1 <= checkDate4){
                            $scope.daywarn = true;
                        }
                    }
                }
            }
        };

        $scope.choosecity1 = function(event,item,type,i){
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'templates/shared/choosecitys.html',
                parent: angular.element(document.body),
                targetEvent: event,
                clickOutsideToClose: true
            })
                .then(function(answer) {
                    if(type == '1'){
                        item.from_area_name = answer.text;
                        item.from_area_code = answer.cityId;
                    }else if(type == '2'){
                        item.to_area_names = answer.text;
                        item.to_area_codes = answer.cityId;
                    }
                    $scope.changebzf(i);
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
            function DialogController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    //根据传过来的ng-model进行赋值
                    $mdDialog.hide(answer);
                };
                $scope.citys = hotelCitys.citys;
                $scope.search = null;
                $scope.onSearch = function(search) {

                    if (search == '') {
                        $scope.search = null;
                    }
                    console.log(search);
                };
            }
        };

        $scope.edit_start_date = function (event, item,i) {
            if(item.end_date != null && item.end_date != undefined){
                var day = 24 * 60 * 60 *1000;
                var dateArr = $filter('date')(item.start_date, "yyyy-MM-dd").split("-");
                var checkDate = new Date();
                checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
                var checkTime = checkDate.getTime();
                //var checkTime = $filter('date')(item.start_date, "yyyy-MM-dd").getTime();

                var dateArr2 = $filter('date')(item.end_date, "yyyy-MM-dd").split("-");
                var checkDate2 = new Date();
                checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
                var checkTime2 = checkDate2.getTime();
                //var checkTime2 = item.end_date.getTime();

                var aaa = (checkTime2 - checkTime)/day;
                if(aaa >=0){
                    item.lodging_days = parseInt(aaa) ;
                    item.assistance_days = parseInt(aaa) +1 ;
                    //$scope.changebzf(i);
                    item.date_error = false;
                    item.lodging_days_error = false;
                    item.assistance_days_error = false;
                }else{
                    item.lodging_days = '';
                    item.assistance_days = '';
                    item.date_error = true;
                    item.lodging_days_error = false;
                    item.assistance_days_error = false;
                }
            }
            $scope.daywarn = false;
            for(var i=0;i<$scope.appdata.length;i++){
                for(var j=i+1;j<$scope.appdata.length;j++){
                    var dateArr1 = $filter('date')($scope.appdata[i].start_date, "yyyy-MM-dd").split("-");
                    var checkDate1 = new Date();
                    checkDate1.setFullYear(dateArr1[0], dateArr1[1]-1, dateArr1[2]);

                    var dateArr2 = $filter('date')($scope.appdata[i].end_date, "yyyy-MM-dd").split("-");
                    var checkDate2 = new Date();
                    checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);

                    var dateArr3 = $filter('date')($scope.appdata[j].start_date, "yyyy-MM-dd").split("-");
                    var checkDate3 = new Date();
                    checkDate3.setFullYear(dateArr3[0], dateArr3[1]-1, dateArr3[2]);

                    var dateArr4 = $filter('date')($scope.appdata[j].end_date, "yyyy-MM-dd").split("-");
                    var checkDate4 = new Date();
                    checkDate4.setFullYear(dateArr4[0], dateArr4[1]-1, dateArr4[2]);

                    if(checkDate1 <= checkDate3){
                        if(checkDate2 >= checkDate3){
                            $scope.daywarn = true;
                        }
                    }else if(checkDate1 > checkDate3){
                        if(checkDate1 <= checkDate4){
                            $scope.daywarn = true;
                        }
                    }
                }
            }
            $scope.dayerror = false;
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].date_error == true){
                    $scope.dayerror = true;
                }
            }
            $scope.dayerror2 = false;
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].assistance_days_error == true){
                    $scope.dayerror2 = true;
                }
            }
            $scope.dayerror1 = false;
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].lodging_days_error == true){
                    $scope.dayerror1 = true;
                }
            }
        };

        $scope.edit_end_date = function (event, item,i) {
            if(item.start_date != null && item.start_date != undefined){
                var day = 24 * 60 * 60 *1000;
                var dateArr = $filter('date')(item.start_date, "yyyy-MM-dd").split("-");
                var checkDate = new Date();
                checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
                var checkTime = checkDate.getTime();
                //var checkTime = item.start_date.getTime();

                var dateArr2 = $filter('date')(item.end_date, "yyyy-MM-dd").split("-");
                var checkDate2 = new Date();
                checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
                var checkTime2 = checkDate2.getTime();
                //var checkTime2 = item.end_date.getTime();

                var aaa = (checkTime2 - checkTime)/day;
                if(aaa >=0){
                    item.lodging_days = parseInt(aaa);
                    item.assistance_days = parseInt(aaa) +1 ;
                    //$scope.changebzf(i);
                    item.date_error = false;
                    item.lodging_days_error = false;
                    item.assistance_days_error = false;
                }else{
                    item.lodging_days = '';
                    item.assistance_days = '';
                    item.date_error = true;
                    item.lodging_days_error = false;
                    item.assistance_days_error = false;
                }
            }
            $scope.daywarn = false;
            for(var i=0;i<$scope.appdata.length;i++){
                for(var j=i+1;j<$scope.appdata.length;j++){
                    var dateArr1 = $filter('date')($scope.appdata[i].start_date, "yyyy-MM-dd").split("-");
                    var checkDate1 = new Date();
                    checkDate1.setFullYear(dateArr1[0], dateArr1[1]-1, dateArr1[2]);

                    var dateArr2 = $filter('date')($scope.appdata[i].end_date, "yyyy-MM-dd").split("-");
                    var checkDate2 = new Date();
                    checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);

                    var dateArr3 = $filter('date')($scope.appdata[j].start_date, "yyyy-MM-dd").split("-");
                    var checkDate3 = new Date();
                    checkDate3.setFullYear(dateArr3[0], dateArr3[1]-1, dateArr3[2]);

                    var dateArr4 = $filter('date')($scope.appdata[j].end_date, "yyyy-MM-dd").split("-");
                    var checkDate4 = new Date();
                    checkDate4.setFullYear(dateArr4[0], dateArr4[1]-1, dateArr4[2]);

                    if(checkDate1 <= checkDate3){
                        if(checkDate2 >= checkDate3){
                            $scope.daywarn = true;
                        }
                    }else if(checkDate1 > checkDate3){
                        if(checkDate1 <= checkDate4){
                            $scope.daywarn = true;
                        }
                    }
                }
            }
            $scope.dayerror = false;
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].date_error == true){
                    $scope.dayerror = true;
                }
            }
            $scope.dayerror2 = false;
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].assistance_days_error == true){
                    $scope.dayerror2 = true;
                }
            }
            $scope.dayerror1 = false;
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].lodging_days_error == true){
                    $scope.dayerror1 = true;
                }
            }
            //event.stopPropagation();
            //var end_date='';
            //if(item.end_date != null && item.end_date != undefined){
            //    end_date=item.end_date.toString();
            //    end_date =  end_date.replace(/-/g,"/");
            //}
            //var dialog = {
            //    modelValue: end_date == ''? null:new Date(end_date),
            //    placeholder: 'Add a comment',
            //    save: function (input) {
            //        item.end_date=$filter('date')(input.$modelValue, "yyyy-MM-dd");
            //        if(item.start_date != null && item.start_date != undefined){
            //            var day = 24 * 60 * 60 *1000;
            //            var dateArr = item.start_date.split("-");
            //            var checkDate = new Date();
            //            checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
            //            var checkTime = checkDate.getTime();
            //
            //            var dateArr2 = item.end_date.split("-");
            //            var checkDate2 = new Date();
            //            checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
            //            var checkTime2 = checkDate2.getTime();
            //
            //            var aaa = (checkTime2 - checkTime)/day;
            //            if(aaa >=0){
            //                item.lodging_days = parseInt(aaa);
            //                item.assistance_days = parseInt(aaa) +1 ;
            //                $scope.dayerror = false;
            //            }else{
            //                item.lodging_days = '';
            //                item.assistance_days = '';
            //                $scope.dayerror = true;
            //            }
            //        }
            //    },
            //    type:'date',
            //    targetEvent: event,
            //    title: '修改到达时间'
            //};
            //var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            //promise.then(function (ctrl) {});
        };

        $scope.edit_lodging_days = function (item) {
            if(item.start_date != null && item.start_date != undefined && item.end_date != null && item.end_date != undefined){
                var day = 24 * 60 * 60 *1000;
                var dateArr = $filter('date')(item.start_date, "yyyy-MM-dd").split("-");
                var checkDate = new Date();
                checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
                var checkTime = checkDate.getTime();
                //var checkTime = item.start_date.getTime();

                var dateArr2 = $filter('date')(item.end_date, "yyyy-MM-dd").split("-");
                var checkDate2 = new Date();
                checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
                var checkTime2 = checkDate2.getTime();
                //var checkTime2 = item.end_date.getTime();

                var aaa = (checkTime2 - checkTime)/day;
                if(aaa >=0){
                    if(item.lodging_days <= parseInt(aaa)){
                        item.lodging_days_error = false;
                    }else{
                        item.lodging_days_error = true;
                    }
                }else{
                    item.lodging_days_error = true;
                }
            }
            $scope.dayerror1 = false;
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].lodging_days_error == true){
                    $scope.dayerror1 = true;
                }
            }
        };

        $scope.edit_assistance_days = function (item,i) {
            if(item.start_date != null && item.start_date != undefined && item.end_date != null && item.end_date != undefined){
                var day = 24 * 60 * 60 *1000;
                var dateArr = $filter('date')(item.start_date, "yyyy-MM-dd").split("-");
                var checkDate = new Date();
                checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
                var checkTime = checkDate.getTime();
                //var checkTime = item.start_date.getTime();

                var dateArr2 = $filter('date')(item.end_date, "yyyy-MM-dd").split("-");
                var checkDate2 = new Date();
                checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
                var checkTime2 = checkDate2.getTime();
                //var checkTime2 = item.end_date.getTime();

                var aaa = (checkTime2 - checkTime)/day;
                if(aaa >=0){
                    if( item.assistance_days <= parseInt(aaa) +1){
                        item.assistance_days_error = false;
                        //$scope.changebzf(i);
                    }else{
                        item.assistance_days_error = true;
                    }
                }else{
                    item.assistance_days_error = true;
                }
            }
            $scope.dayerror2 = false;
            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].assistance_days_error == true){
                    $scope.dayerror2 = true;
                }
            }
        };

        $scope.addperson = function(ev,item) {
            $mdDialog.show({
                controller: DialogController4,
                templateUrl: 'templates/shared/organization4.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: true
            }).then(function(answer) {
                //截取传过来的ng-model
                //$parse(modeldata.model).assign(scope, answer);
                if (answer) {
                    //item.person_id = answer.user_id;
                    //item.person = answer.user_full_name
                    var aa=true;
                    for(var i=0;i<item.person.length;i++){
                        if(answer.user_id == item.person[i].person_id){
                            aa = false
                        }
                    }
                    if(aa == true){
                        item.person.push({
                            person_id:answer.user_id,
                            person_name:answer.user_full_name
                        })
                    }

                }
            }, function() {

            });
        };
        function DialogController4($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };

            $scope.getDate = function(pid) {
                // pid=(pid==null?"":pid;
                console.log(pid);
                var url = APP_CONFIG.CDP_URL+'/docker/tenantorg/queryOrgUsersByOrgId?org_id=' + pid;
                //console.log(publicmodel.Token);
                //$http.defaults.headers.common["x-auth-token"] = publicmodel.TokenOrg;
                $http({
                    method: 'GET',
                    url: url,
                    headers: {
                        'x-auth-token':$cookies.get("JSESSION")
                    },
                }).success(function(data, status, headers, config) {
                    console.log(data);
                    if (data.code == "0000") {
                        $scope.orgData = data;
                    } else {
                        //$mdDialog.show(
                        //    $mdDialog.alert()
                        //        .parent(angular.element(document.body))
                        //        .clickOutsideToClose(true)
                        //        .title('提示信息')
                        //        .textContent('访问服务器异常：' + data.code + data.msg)
                        //        .ariaLabel('提示信息')
                        //        .ok('确定')
                        //);
                        alert(data.msg)
                    }
                }).error(function(data, status, headers, config) {});

            };
            $scope.getDate("");
            $scope.onSearch = function(key) {
                if (key) {
                    key = encodeURIComponent(encodeURIComponent(key));
                    if (key) {
                        var url = APP_CONFIG.CDP_URL+'/docker/userinfo/queryUserListByName?user_name=' + key;
                        console.log(url);
                        $http({
                            method: 'GET',
                            url: url,
                            headers: {
                                'x-auth-token':$cookies.get("JSESSION")
                            },
                        }).success(function(data, status, headers, config) {
                            console.log(data);
                            $scope.orgData = {
                                data: {
                                    users: data.data.list,
                                }
                            };
                            console.log($scope.orgData);
                        }).error(function(data, status, headers, config) {});
                    }
                } else {
                    $scope.getDate("");
                }

            }

        }

        //消费记录
        $scope.todos=[];
        $scope.chooseBuy = function(event){

            $chooseBuyOne.show({
                save: function(seleted){
                    var aa=[];
                    $scope.query.totalbuy=0;
                    for(var i=0;i<seleted.length;i++){
                        if(seleted[i].currencyCode == $scope.query.currency_code){

                            for(var k=0;k<$scope.query.currencydata.length;k++){
                                if(seleted[i].currencyCode == $scope.query.currencydata[k].currency_code){
                                    seleted[i].currency_name=$scope.query.currencydata[k].currency_name;
                                }
                            }
                            seleted[i].rateerror = false;
                            seleted[i].amount1 = seleted[i].amount;
                            seleted[i].currency_code = seleted[i].currencyCode;
                            seleted[i].conversion_rate = 1;
                            $scope.query.totalbuy = $scope.query.totalbuy +seleted[i].amount1;
                            $scope.todos=seleted;
                        }else{
                            var bb=false;
                            for(var e=0;e<aa.length;e++){
                                if(seleted[i].currencyCode == aa[e]){
                                    bb=true
                                }
                            }
                            if(bb == false){
                                if(seleted[i].currencyCode != undefined && seleted[i].currencyCode != null){
                                    aa.push(seleted[i].currencyCode)
                                }else{
                                    seleted[i].rateerror = true;
                                    alert(seleted[i].billingDesc+'不存在对应的币种！')
                                }
                            }
                        }

                    }

                    if(aa !=[] && aa.length != 0){
                        var getconfig = {
                            method: 'POST',
                            url: APP_CONFIG.JIEBAO_URL+'/docker/rates/getrates',
                            headers: {
                                'x-auth-token': $cookies.get("JSESSION")
                            },
                            data:{
                                conversion_type: 'CORPORATE',
                                conversion_date:$filter('date')(new Date(), "yyyy-MM-01"),
                                //from_currency:'CNY',
                                //to_currency:['JPq']
                                from_currency:aa,
                                to_currency:$scope.query.currency_code
                            }
                        };
                        $http(getconfig)
                            .success(function(data, status, headers, config) {
                                $scope.content=headers('x-auth-token');
                                if($scope.content!=''&& $scope.content!=null){
                                    $cookies.put('JSESSION', $scope.content);
                                }
                                if(data.code=='0000'){
                                    var rates = data.data.info;
                                    $scope.query.totalbuy = 0 ;
                                    for(var i=0;i<seleted.length;i++){

                                        if(seleted[i].currencyCode == $scope.query.currency_code){

                                            for(var k=0;k<$scope.query.currencydata.length;k++){
                                                if(seleted[i].currencyCode == $scope.query.currencydata[k].currency_code){
                                                    seleted[i].currency_name=$scope.query.currencydata[k].currency_name;
                                                }
                                            }
                                            seleted[i].rateerror = false;
                                            seleted[i].amount1 = seleted[i].amount;
                                            seleted[i].currency_code = seleted[i].currencyCode;
                                            seleted[i].conversion_rate = 1;
                                        }else{
                                            for(var q=0;q<rates.length;q++){
                                                if(rates[q].from_currency == seleted[i].currencyCode && rates[q].to_currency == $scope.query.currency_code){
                                                    if(rates[q].conversion_rate != 0 && rates[q].conversion_rate != null && rates[q].conversion_rate != undefined){
                                                        seleted[i].rateerror = false;
                                                        seleted[i].amount1 = seleted[i].amount * rates[q].conversion_rate;
                                                        for(var k=0;k<$scope.query.currencydata.length;k++){
                                                            if(seleted[i].currencyCode == $scope.query.currencydata[k].currency_code){
                                                                seleted[i].currency_name=$scope.query.currencydata[k].currency_name;
                                                            }
                                                        }
                                                        seleted[i].currency_code = seleted[i].currencyCode;
                                                        seleted[i].conversion_rate = rates[q].conversion_rate;

                                                    }else{
                                                        seleted[i].rateerror = true;
                                                        seleted[i].amount1 = 0;
                                                        for(var k=0;k<$scope.query.currencydata.length;k++){
                                                            if(seleted[i].currencyCode == $scope.query.currencydata[k].currency_code){
                                                                seleted[i].currency_name=$scope.query.currencydata[k].currency_name;
                                                            }
                                                        }
                                                        seleted[i].currency_code = seleted[i].currencyCode;
                                                        seleted[i].conversion_rate = rates[q].conversion_rate;
                                                    }

                                                }else{
                                                    seleted[i].rateerror = true;
                                                    seleted[i].amount1 = 0;
                                                    for(var k=0;k<$scope.query.currencydata.length;k++){
                                                        if(seleted[i].currencyCode == $scope.query.currencydata[k].currency_code){
                                                            seleted[i].currency_name=$scope.query.currencydata[k].currency_name;
                                                        }
                                                    }
                                                    seleted[i].currency_code = seleted[i].currencyCode;
                                                    seleted[i].conversion_rate = rates[q].conversion_rate;
                                                }
                                            }
                                        }
                                        $scope.query.totalbuy = $scope.query.totalbuy +seleted[i].amount1;
                                    }
                                    $scope.todos=seleted;
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

                    //console.log(seleted);
                },
                oldData:function(){
                    var aa=[];
                    for(var i=0;i<$scope.todos.length;i++){
                        aa.push($scope.todos[i])
                    }
                    return aa
                },
                targetEvent: event
            });
        };

        getfoemtemplateid();
        function getfoemtemplateid(){
            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL+ '/cm/formTemplate/getFormTemplates',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    "module_type": "EC",
                    "order_type": 'CL'
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                        expPublic.form_template_id = data.data.info[0].form_template_id;
                        expPublic.form_template_name = data.data.info[0].form_template_name;
                        expPublic.order_template_id = data.data.info[0].order_template_id;
                        expPublic.order_template_name = data.data.info[0].order_template_name;
                        //$scope.formTemplate.order_template_id = data.data.info[0].order_template_id;
                        //$scope.formTemplate.order_template_name = data.data.info[0].order_template_name;

                    }else if(data.code=='6666'){

                    }else{
                        alert(data.msg)
                    }

                })
                .error(function(data, status, headers, config) {
                    //alert(status)
                });
        }

        //下一步
        $scope.next = function(){
            var currentUser = publicFunction.localGet("user")['data']['user'];
            var aa=false;

            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].from_area_code != null && $scope.appdata[i].from_area_code !='' && $scope.appdata[i].from_area_code != undefined){
                    $scope.appdata[i].from_area_code_error = false
                }else{
                    $scope.appdata[i].from_area_code_error = true;
                    aa=true;
                }

                if($scope.appdata[i].to_area_codes != null && $scope.appdata[i].to_area_codes !='' && $scope.appdata[i].to_area_codes != undefined){
                    $scope.appdata[i].to_area_codes_error = false
                }else{
                    $scope.appdata[i].to_area_codes_error = true;
                    aa=true;
                }

                if($scope.appdata[i].start_date != null && $scope.appdata[i].start_date !='' && $scope.appdata[i].start_date != undefined){
                    $scope.appdata[i].start_date_error = false
                }else{
                    $scope.appdata[i].start_date_error = true;
                    aa=true;
                }

                if($scope.appdata[i].end_date != null && $scope.appdata[i].end_date !='' && $scope.appdata[i].end_date != undefined){
                    $scope.appdata[i].end_date_error = false
                }else{
                    $scope.appdata[i].end_date_error = true;
                    aa=true;
                }

                if($scope.appdata[i].person.length >0 ){
                    $scope.appdata[i].person_error = false
                }else{
                    $scope.appdata[i].person_error = true;
                    aa=true;
                }
            }

            var rateerrorr=false;
            for(var k=0;k<$scope.todos.length;k++){
                if($scope.todos[k].rateerror == false){
                    rateerrorr = true;
                }
            }

            if(aa == true || $scope.todos.length == 0 || rateerrorr == false){
                alert('请正确填写');

            }else{
                expPublic.reim_date = $filter('date')(new Date(), "yyyy-MM-dd");
                expPublic.apply_by =currentUser['userId'];
                expPublic.apply_name = currentUser['userName'];
                expPublic.org_id = '1';
                expPublic.org_name = "IT管理部";
                expPublic.assistance_fee = $scope.query.assistance_fee;
                expPublic.total = $scope.query.totalbuy;

                //for(var j=0;j<$scope.query.receiver.length;j++){
                //    if($scope.query.receiver[j].id == $scope.query.receiver_id){
                //        expPublic.receiver = $scope.query.receiver[j].receiver;
                //        expPublic.bank_name = $scope.query.receiver[j].bank_name;
                //        expPublic.bank_account = $scope.query.receiver[j].bank_account;
                //    }
                //}
                expPublic.receiver = $scope.receving.receiver;
                expPublic.bank_name = $scope.receving.bank_name;
                expPublic.bank_account = $scope.receving.bank_account;

                //for(var j=0;j<$scope.query.company.length;j++){
                //    if($scope.query.company[j].company_id == $scope.query.company_id){
                //        expPublic.company_id = $scope.query.company[j].company_id;
                //        expPublic.ou_id = $scope.query.company[j].external_org_id;
                //        expPublic.proxy_user = $scope.query.company[j].proxy_user;
                //    }
                //}

                expPublic.company_id = $scope.ruzhangdanwei.company_id;
                expPublic.ou_id = $scope.ruzhangdanwei.ou_id;
                expPublic.proxy_user = $scope.ruzhangdanwei.proxy_user;
                expPublic.sensitive_info = $scope.query.reason_desc;

                //for(var j=0;j<$scope.query.fee_apply.length;j++){
                //    if(j == 0){
                //        expPublic.sensitive_info = $scope.query.fee_apply[j].reason_desc
                //    }else{
                //        expPublic.sensitive_info = expPublic.sensitive_info+','+$scope.query.fee_apply[j].reason_desc
                //    }
                //}
                for(var i=0;i<$scope.query.currencydata.length;i++){
                    if($scope.query.currency_code == $scope.query.currencydata[i].currency_code){
                        expPublic.currency_code=$scope.query.currencydata[i].currency_code;
                        expPublic.currency_name=$scope.query.currencydata[i].currency_name;
                    }
                }

                for(var i=0;i<$scope.appdata.length;i++){
                    var aa='',bb='';
                    for(var h=0;h<$scope.appdata[i].person.length;h++){
                        if(h==0){
                            aa =  $scope.appdata[i].person[h].person_id;
                            bb =  $scope.appdata[i].person[h].person_name;
                        }else{
                            aa =  aa+','+$scope.appdata[i].person[h].person_id;
                            bb =  bb+','+$scope.appdata[i].person[h].person_name;
                        }
                    }

                    expPublic.emsecfeetravels.push({
                        fee_travel_id:$scope.appdata[i].fee_travel_id,
                        from_area_name:$scope.appdata[i].from_area_name,
                        from_area_code:$scope.appdata[i].from_area_code,
                        to_area_names:$scope.appdata[i].to_area_names,
                        to_area_codes:$scope.appdata[i].to_area_codes,
                        start_date:$filter('date')($scope.appdata[i].start_date, "yyyy-MM-dd"),
                        end_date:$filter('date')($scope.appdata[i].end_date, "yyyy-MM-dd"),
                        travel_days:$scope.appdata[i].assistance_days,
                        travel_persons:aa,
                        travel_persons_name:bb,
                        travel_person_count:$scope.appdata[i].person.length
                    });
                    //expPublic.emsecfeedetails.push({
                    //    fee_travel_id:$scope.appdata[i].fee_travel_id,
                    //    from_area_name:$scope.appdata[i].from_area_name,
                    //    from_area_code:$scope.appdata[i].from_area_code,
                    //    to_area_name:$scope.appdata[i].to_area_names,
                    //    to_area_code:$scope.appdata[i].to_area_codes,
                    //    start_date:$scope.appdata[i].start_date,
                    //    end_date:$scope.appdata[i].end_date,
                    //    assistance_days:$scope.appdata[i].assistance_days,
                    //    lodging_days:$scope.appdata[i].lodging_days,
                    //    travel_person_ids:aa,
                    //    travel_person_names:bb
                    //});
                }

                for(var k=0;k<$scope.todos.length;k++){
                    if($scope.todos[k].rateerror == false){
                        expPublic.emsecfeedetails.push({
                            fee_category_code:$scope.todos[k].feeCategoryCode,
                            eco_type_id:$scope.todos[k].ecoTypeId,
                            amount:$scope.todos[k].amount,
                            currency_code:$scope.todos[k].currency_code,
                            currency_name:$scope.todos[k].currency_name,
                            conversion_rate:$scope.todos[k].conversion_rate,
                            happen_date:$scope.todos[k].happenDate,
                            happen_address:$scope.todos[k].happenAddress,
                            billing_desc:$scope.todos[k].billingDesc,
                            settlement_type:$scope.todos[k].settlementType
                        });
                        expPublic.fee_buy.push($scope.todos[k])
                    }else{

                    }
                }
                //expPublic.fee_buy = $scope.todos;

                expPublic.fee_apply = $scope.query.fee_apply;
                for(var i=0;i<$scope.query.fee_apply.length;i++){
                    getapp1($scope.query.fee_apply[i].fee_apply_id)
                }
                console.log(expPublic);
                $location.path("/expense/expensesecond")
            }
        };

        expPublic.reim_date=null;
        expPublic.apply_by='';
        expPublic.apply_name='';
        expPublic.org_id='';
        expPublic.org_name='';
        expPublic.order_type='CL';
        expPublic.pay_type='NORMAL_PAY';
        expPublic.form_template_id='';
        expPublic.form_template_name='';
        expPublic.order_template_id='';
        expPublic.order_template_name='';
        expPublic.biz_flag= 0;
        expPublic.company_id='';
        expPublic.ou_id='';
        expPublic.proxy_user='';
        expPublic.receiver='';
        expPublic.bank_name='';
        expPublic.bank_account='';
        expPublic.assistance_fee=0;
        expPublic.currency_code='';
        expPublic.currency_name='';
        expPublic.payment_method='WIRE';
        expPublic.is_instalments_pay='N';
        expPublic.need_app_loan= "";
        expPublic.need_input_tax='';
        expPublic.sensitive_info= "";
        expPublic.apply_reim_amount=0;

        expPublic.emsecfeetravels= [];
        expPublic.emsecfeebudgets=[];
        expPublic.emsecfeeloans=[];
        expPublic.emsecinvoicetaxrs=[];
        expPublic.emsecfeedetails=[];

        expPublic.fee_apply=[];
        expPublic.fee_buy=[];
        expPublic.total=0;
        expPublic.totaltax='';

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    }).factory('expPublic',function(){
        return {
            reim_date:null,
            apply_by:'',
            apply_name:'',
            org_id:'',
            org_name:'',
            order_type:'CL',
            pay_type:'NORMAL_PAY',
            form_template_id:'',
            form_template_name:'',
            order_template_id:'',
            order_template_name:'',
            biz_flag: 0,
            company_id:'',
            ou_id:'',
            proxy_user:'',
            receiver:'',
            bank_name:'',
            bank_account:'',
            assistance_fee:0,
            currency_code:'',
            currency_name:'',
            payment_method:'WIRE',
            is_instalments_pay:'N',
            need_app_loan: "",
            need_input_tax:'',
            sensitive_info: "",
            apply_reim_amount:0,

            emsecfeetravels: [],
            emsecfeebudgets:[],
            emsecfeeloans:[],
            emsecinvoicetaxrs:[],
            emsecfeedetails:[],

            fee_apply:[],
            fee_buy:[],
            total:0,
            totaltax:''

        };
    });

    angular._LoadModule('expensefirst');
    return test;
});