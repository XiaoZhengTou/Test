/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('expensethird', []);
    test.controller('expensethirdCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$element,$mdToast,$timeout,$mdEditDialog,$location,expPublic){
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
            fee_apply:[],
            totaltax:0,
            assistance_fee:'',
            totalpay:0,
            totalloan:0,
            totalbudget:0
        };

        //var budget_node_id='';
        //var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
        //    if($location.search().budget_node_id != null && $location.search().budget_node_id != undefined){
        //        budget_node_id=$location.search().budget_node_id;
        //        if($location.search().budget_node_id == ''){
        //            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/budget_edit_list"
        //        }
        //        getapp1();
        //    }else{
        //        window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/budget_edit_list"
        //    }
        //});

        //EA带来的不能删除，新增的可以删除！

        //消费记录
        $scope.todos=expPublic.fee_buy;
        $scope.query.totalpay = expPublic.assistance_fee + expPublic.total;
        expPublic.apply_reim_amount = expPublic.assistance_fee + expPublic.total;

        //预算明细
        $scope.query.totaltax = expPublic.totaltax;
        //根据EA单获取预算
        //getapp1("40276537911541760");
        $scope.query.fee_apply = expPublic.fee_apply;
        $scope.query.assistance_fee = expPublic.assistance_fee;
        for(var i=0;i<$scope.query.fee_apply.length;i++){
            getapp1($scope.query.fee_apply[i].fee_apply_id,$scope.query.fee_apply[i].reason_desc)
        }
        function getapp1(id,reason){
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
                        $scope.query.emseaapplyls = data.data.emseaapplyh.emseaapplyls;

                        var seleted=data.data.emseaapplyh.emseaapplyls;
                        var aa=[];
                        for(var i=0;i<seleted.length;i++){
                            if(seleted[i].currency_code == expPublic.currency_code){
                                seleted[i].budgeterror_rate = false;
                                $scope.appdata.push({
                                    fee_apply_id:id,
                                    fee_apply_code:data.data.emseaapplyh.fee_apply_code,
                                    budget_name:data.data.emseaapplyh.emseaapplyls[i].budget_name,
                                    budget_headers_id:data.data.emseaapplyh.emseaapplyls[i].budget_headers_id,
                                    budget_node_id:data.data.emseaapplyh.emseaapplyls[i].budget_node_id,
                                    budget_node_name:data.data.emseaapplyh.emseaapplyls[i].budget_node_name,
                                    busi_org_name:data.data.emseaapplyh.emseaapplyls[i].busi_org_name,
                                    busi_org_id:data.data.emseaapplyh.emseaapplyls[i].busi_org_id,
                                    fee_type_name:data.data.emseaapplyh.emseaapplyls[i].fee_type_name,
                                    fee_type_id:data.data.emseaapplyh.emseaapplyls[i].fee_type_id,
                                    eco_type_id:data.data.emseaapplyh.emseaapplyls[i].eco_type_id,
                                    eco_type_name:data.data.emseaapplyh.emseaapplyls[i].eco_type_name,
                                    currency_name:data.data.emseaapplyh.emseaapplyls[i].currency_name,
                                    currency_code:data.data.emseaapplyh.emseaapplyls[i].currency_code,
                                    approve_amount:seleted[i].approve_amount,
                                    sensitive_info:reason,
                                    budgeterror_rate:seleted[i].budgeterror_rate,
                                    flag:false
                                });
                            }else{
                                var bb=false;
                                for(var e=0;e<aa.length;e++){
                                    if(seleted[i].currency_code == aa[e]){
                                        bb=true
                                    }
                                }
                                if(bb == false){
                                    if(seleted[i].currency_code != undefined && seleted[i].currency_code != null){
                                        aa.push(seleted[i].currency_code)
                                    }else{
                                        seleted[i].budgeterror_rate = true;
                                        alert(seleted[i].budget_node_name+'不存在对应的币种！')
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
                                    from_currency:aa,
                                    to_currency:expPublic.currency_code
                                }
                            };
                            $http(getconfig)
                                .success(function(data1, status, headers, config) {
                                    $scope.content=headers('x-auth-token');
                                    if($scope.content!=''&& $scope.content!=null){
                                        $cookies.put('JSESSION', $scope.content);
                                    }
                                    if(data1.code=='0000'){
                                        var rates = data1.data.info;

                                        for(var i=0;i<seleted.length;i++){
                                            var rate='';
                                            if(seleted[i].currency_code == expPublic.currency_code){
                                                rate=seleted[i].approve_amount;
                                                seleted[i].budgeterror_rate = false;
                                            }else{
                                                for(var q=0;q<rates.length;q++){
                                                    if(rates[q].from_currency == seleted[i].currency_code && rates[q].to_currency == expPublic.currency_code){
                                                        if(rates[q].conversion_rate != 0 && rates[q].conversion_rate != null && rates[q].conversion_rate != undefined){
                                                            rate = rates[q].conversion_rate * seleted[i].approve_amount;
                                                            seleted[i].budgeterror_rate = false;
                                                        }else{
                                                            seleted[i].budgeterror_rate = true;
                                                            rate=0;
                                                        }
                                                    }else{
                                                        seleted[i].budgeterror_rate = true;
                                                        rate=0;
                                                    }
                                                }
                                            }
                                            $scope.appdata.push({
                                                fee_apply_id:id,
                                                fee_apply_code:data.data.emseaapplyh.fee_apply_code,
                                                budget_name:data.data.emseaapplyh.emseaapplyls[i].budget_name,
                                                budget_headers_id:data.data.emseaapplyh.emseaapplyls[i].budget_headers_id,
                                                budget_node_id:data.data.emseaapplyh.emseaapplyls[i].budget_node_id,
                                                budget_node_name:data.data.emseaapplyh.emseaapplyls[i].budget_node_name,
                                                busi_org_name:data.data.emseaapplyh.emseaapplyls[i].busi_org_name,
                                                busi_org_id:data.data.emseaapplyh.emseaapplyls[i].busi_org_id,
                                                fee_type_name:data.data.emseaapplyh.emseaapplyls[i].fee_type_name,
                                                fee_type_id:data.data.emseaapplyh.emseaapplyls[i].fee_type_id,
                                                eco_type_id:data.data.emseaapplyh.emseaapplyls[i].eco_type_id,
                                                eco_type_name:data.data.emseaapplyh.emseaapplyls[i].eco_type_name,
                                                currency_name:data.data.emseaapplyh.emseaapplyls[i].currency_name,
                                                currency_code:data.data.emseaapplyh.emseaapplyls[i].currency_code,
                                                approve_amount:rate,
                                                sensitive_info:reason,
                                                budgeterror_rate:seleted[i].budgeterror_rate,
                                                flag:false
                                            });
                                        }
                                        for(var i=0;i<$scope.appdata.length;i++){
                                            if($scope.appdata[i].budgeterror_rate == true){
                                                $scope.budgeterror_rate = true;
                                            }
                                        }

                                    }else if(data1.code=='0401'){
                                        if(data1.msg == '未登录.'){
                                            $cookies.remove("managerId");
                                            $cookies.remove("tenantId");
                                            $cookies.remove("JSESSION");
                                            $cookies.remove("userId");
                                            window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                                        }

                                    }else if(data1.code=='6666'){

                                    }else{
                                        alert(data1.msg)
                                    }

                                })
                                .error(function(data1, status, headers, config) {
                                    //alert(status)
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

        $scope.addtrip1 = function(ev,item1){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/personalexp/personalthird-dialog1.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item !='' && item != undefined){
                        for(var i=0;i<item.length;i++){
                            $scope.appdata.push(item[i]);

                            if(item[i].flag == true){
                                if( item[i].apply_reim_amount + $scope.query.totaltax > $scope.query.totalpay || item[i].apply_reim_amount >(item[i].budget_amount-item[i].fee_amount)){
                                    item[i].budgeterror_amount = true;
                                }else{
                                    item[i].budgeterror_amount = false;
                                }
                            }else if(item[i].flag == false){
                                if( item[i].apply_reim_amount + $scope.query.totaltax > $scope.query.totalpay || item[i].apply_reim_amount >(item[i].approve_amount)){
                                    item[i].budgeterror_amount = true;
                                }else{
                                    item[i].budgeterror_amount = false;
                                }
                            }

                            $scope.budgeterror_amount = false;
                            $scope.query.totalbudget = 0;

                            for(var j=0;j<$scope.appdata.length;j++){
                                if($scope.appdata[j].budgeterror_amount == true){
                                    $scope.budgeterror_amount = true;
                                }else if($scope.appdata[j].budgeterror_amount == false){
                                    if($scope.appdata[j].apply_reim_amount !=null && $scope.appdata[j].apply_reim_amount!= undefined && $scope.appdata[j].apply_reim_amount!=''){
                                        $scope.query.totalbudget = $scope.query.totalbudget+$scope.appdata[j].apply_reim_amount;
                                    }
                                }
                            }

                            if($scope.query.totalbudget + $scope.query.totaltax !=  $scope.query.totalpay){
                                $scope.budgeterror_total = true;
                            }else{
                                $scope.budgeterror_total = false;
                            }

                            if(item[i].budgeterror_rate == true){
                                $scope.budgeterror_rate = true
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
                    $http({
                        method: 'POST',
                        noLoader:true,
                        url: APP_CONFIG.SMART_URL + '/bm/EmsBmBudgetNode/queryBudgetProcessControls',
                        data: {
                            budget_node_id:$scope.budgetnodelist.node.budget_node_id
                        },
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        }
                    }).success(function(data, status, headers, config) {
                        if(data.code=='0000'){

                            var aa1= data.data.emsbmbudgetnode;
                            $scope.budget_amount = aa1.budget_amount;
                            $scope.fee_amount = aa1.fee_amount;
                            $scope.use_amount = $scope.budget_amount-$scope.fee_amount;

                            var aa=[];
                            if( $scope.conversion_rate1 === true ){
                                var budget_amount=$scope.budget_amount;
                                var fee_amount=$scope.fee_amount;
                                aa.push({
                                    fee_apply_code:'',
                                    fee_apply_id:'',
                                    budget_name:$scope.budgetnodelist.tree.budget_name,
                                    budget_headers_id:$scope.budgetnodelist.tree.budget_headers_id,
                                    budget_node_name:$scope.budgetnodelist.node.budget_node_name,
                                    budget_node_id:$scope.budgetnodelist.node.budget_node_id,
                                    busi_org_name:$scope.budgetnodelist.org.busi_org_name,
                                    busi_org_id:$scope.budgetnodelist.org.busi_org_id,
                                    fee_type_name:$scope.budgetnodelist.feetype.fee_type_name,
                                    fee_type_id:$scope.budgetnodelist.feetype.fee_type_id,
                                    eco_type_id:'',
                                    eco_type_name:'',

                                    budget_amount:budget_amount,
                                    fee_amount:fee_amount,
                                    currency_code:$scope.currency_code,
                                    currency_name:$scope.currency_name,

                                    apply_reim_amount:0,
                                    is_last_reim:$scope.is_last_reim,
                                    sensitive_info:'',
                                    flag:true,
                                    budgeterror_rate:true
                                })
                            }
                            else{
                                var budget_amount=$scope.budget_amount * $scope.conversion_rate1;
                                var fee_amount=$scope.fee_amount * $scope.conversion_rate1;
                                aa.push({
                                    fee_apply_code:'',
                                    fee_apply_id:'',
                                    budget_name:$scope.budgetnodelist.tree.budget_name,
                                    budget_headers_id:$scope.budgetnodelist.tree.budget_headers_id,
                                    budget_node_name:$scope.budgetnodelist.node.budget_node_name,
                                    budget_node_id:$scope.budgetnodelist.node.budget_node_id,
                                    busi_org_name:$scope.budgetnodelist.org.busi_org_name,
                                    busi_org_id:$scope.budgetnodelist.org.busi_org_id,
                                    fee_type_name:$scope.budgetnodelist.feetype.fee_type_name,
                                    fee_type_id:$scope.budgetnodelist.feetype.fee_type_id,
                                    eco_type_id:'',
                                    eco_type_name:'',

                                    budget_amount:budget_amount,
                                    fee_amount:fee_amount,
                                    currency_code:$scope.currency_code,
                                    currency_name:$scope.currency_name,

                                    apply_reim_amount:$scope.apply_reim_amount,
                                    is_last_reim:'N',
                                    sensitive_info:'',
                                    flag:true,
                                    budgeterror_rate:false
                                })
                            }
                            $mdDialog.hide(aa);

                        }
                    }).error(function(data, status, headers, config) {
                        console.log(data);
                    });

                };

                $scope.budgetnodelist={};
                $scope.selected = [];
                $scope.apply_reim_amount = '';
                $scope.is_last_reim = '';
                $scope.active1_id = '';
                $scope.active1_name = '';
                $scope.budget_name = '';
                $scope.currency_code = '';
                $scope.currency_name = '';

                var watch1 = $scope.$watch('budgetnodelist.tree',function(newValue,oldValue, scope){
                    if($scope.budgetnodelist.tree != undefined){
                        if($scope.budgetnodelist.tree.budget_headers_id != undefined){
                            getbudgetlist($scope.budgetnodelist.tree.budget_headers_id);
                        }
                    }
                });

                //获取预算模板
                function getbudgetlist(name){
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.SMART_URL+'/' + 'bm/EmsBmBudgetH/pageQuery',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {
                            "page_number": 1,
                            "page_size": 10000,
                            query_param:{
                                budget_headers_id:name,
                                budget_status:'AUDITED'
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

                                var aa = data.data.datalist;
                                $scope.currency_code = aa[0].currency_code;
                                $scope.currency_name = aa[0].currency_name;

                                if($scope.currency_code == expPublic.currency_code){
                                    $scope.conversion_rate1 = 1;
                                }
                                else{
                                    var getconfig = {
                                        method: 'POST',
                                        url: APP_CONFIG.JIEBAO_URL+'/docker/rates/page',
                                        headers: {
                                            'x-auth-token':  $cookies.get("JSESSION")
                                        },
                                        data:{
                                            page_number:1,
                                            page_size:10000,
                                            from_currency:$scope.currency_code,
                                            to_currency:expPublic.currency_code,
                                            conversion_type: 'CORPORATE',
                                            conversion_date:$filter('date')(new Date(), "yyyy-MM-01")
                                        }
                                    };
                                    $http(getconfig)
                                        .success(function(data, status, headers, config) {
                                            if(data.code=='0000'){
                                                if(data.data.data != undefined && data.data.data !=null){
                                                    if(data.data.data[0].conversion_rate != undefined && data.data.data[0].conversion_rate !=null){
                                                        $scope.conversion_rate1 = data.data.data[0].conversion_rate;
                                                    }else{
                                                        $scope.conversion_rate1 = true;
                                                    }
                                                }else{
                                                    $scope.conversion_rate1 = true;
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

                //预算模板层级
                $scope.getbudgetlist11 = function(id){
                    var aa='';
                    for(var i=0;i<$scope.budgetlist.length;i++){
                        if($scope.budgetlist[i].budget_headers_id == id){
                            aa = $scope.budgetlist[i].budget_templet_id
                        }
                    }
                    var getconfig = {
                        method: 'GET',
                        url: APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/getHead/'+aa,
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

                                n_level=data.data.emsBmTemplet.level_number;

                            }else if(data.code=='6666'){

                            }else{
                                alert(data.msg)
                            }

                        })
                        .error(function(data, status, headers, config) {
                            //alert(status)
                        });
                };

                //获取预算单元
                $scope.getbudgetnodes = function(id,name,item){
                    var n_level='';
                    var getconfig1 = {
                        method: 'GET',
                        url: APP_CONFIG.SMART_URL+'/bm/EmsBmTemplet/getHead/'+item.budget_templet_id,
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        }
                    };
                    $http(getconfig1)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                n_level=data.data.emsBmTemplet.level_number;
                                var getconfig = {
                                    method: 'POST',
                                    url:  APP_CONFIG.SMART_URL+ '/bm/EmsBmBudgetNode/queryBudgetNodes',
                                    headers: {
                                        'x-auth-token': $cookies.get("JSESSION")
                                    },
                                    data: {
                                        query_param:{
                                            budget_headers_id:id,
                                            enable_flag:"Y",
                                            n_level:n_level
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

                                            $scope.budgetnodes = data.data;
                                            for(var i =0;i<$scope.budgetnodes.length;i++){
                                                for(var j=0;j<item1.length;j++){
                                                    if($scope.budgetnodes[i].budget_node_id == item1[j].budget_node_id){
                                                        $scope.budgetnodes[i].disabled1=true;
                                                    }
                                                }
                                            }
                                            $scope.budget_name = name;
                                            $scope.currency_code = item.currency_code;
                                            $scope.currency_name = item.currency_name;


                                            if(item.currency_code == expPublic.currency_code){
                                                $scope.conversion_rate1 = 1;
                                            }
                                            else{
                                                var getconfig = {
                                                    method: 'POST',
                                                    url: APP_CONFIG.JIEBAO_URL+'/docker/rates/page',
                                                    headers: {
                                                        'x-auth-token': $cookies.get("JSESSION")
                                                    },
                                                    data:{
                                                        page_number:1,
                                                        page_size:10000,
                                                        from_currency:item.currency_code,
                                                        to_currency:expPublic.currency_code,
                                                        conversion_type: 'CORPORATE',
                                                        conversion_date:$filter('date')(new Date(), "yyyy-MM-01")
                                                    }
                                                };
                                                $http(getconfig)
                                                    .success(function(data, status, headers, config) {
                                                        $scope.content=headers('x-auth-token');
                                                        if($scope.content!=''&& $scope.content!=null){
                                                            $cookies.put('JSESSION', $scope.content);
                                                        }
                                                        if(data.code=='0000'){
                                                            if(data.data.data != undefined && data.data.data !=null){
                                                                if(data.data.data[0].conversion_rate != undefined && data.data.data[0].conversion_rate !=null){
                                                                    $scope.conversion_rate1 = data.data.data[0].conversion_rate;
                                                                }else{
                                                                    $scope.conversion_rate1 = true;
                                                                }
                                                            }else{
                                                                $scope.conversion_rate1 = true;
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

                                        }else if(data.code=='6666'){

                                        }else{
                                            alert(data.msg)
                                        }

                                    })
                                    .error(function(data, status, headers, config) {
                                        //alert(status)
                                    });
                            }else if(data.code=='6666'){

                            }else{
                                alert(data.msg)
                            }

                        })
                        .error(function(data, status, headers, config) {
                            //alert(status)
                        });
                };

                //getactive1();
                //获取活动类型（一级）
                function getactive1(){
                    var getconfig = {
                        method: 'POST',
                        url:  APP_CONFIG.JIEBAO_URL+'/' + 'docker/feetype/active1/page',
                        headers: {
                            'x-auth-token': $cookies.get("JSESSION")
                        },
                        data: {"page_number":1,"page_size":10000,"enable_flag":"Y"}
                    };
                    $http(getconfig)
                        .success(function(data, status, headers, config) {
                            $scope.content=headers('x-auth-token');
                            if($scope.content!=''&& $scope.content!=null){
                                $cookies.put('JSESSION', $scope.content);
                            }
                            if(data.code=='0000'){

                                $scope.active1list = data.data.data.list;

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

                //批量失效(查询时候要重置)
                var selectdata='';
                $scope.toggle = function (item, list) {
                    var ids=[];
                    angular.forEach(list, function (value) {
                        this.push(value.budget_node_id);
                    },ids);
                    var idx = ids.indexOf(item.budget_node_id);
                    if (idx > -1) {
                        $scope.selected.splice(idx, 1);
                    }
                    else {
                        item.budget_name=$scope.budget_name;
                        item.currency_code=$scope.currency_code;
                        item.currency_name=$scope.currency_name;
                        item.conversion_rate1=$scope.conversion_rate1;
                        $scope.selected.push(item);
                    }
                };
                $scope.exists = function (item, list) {
                    var ids=[];
                    angular.forEach(list, function (value) {
                        this.push(value.budget_node_id);
                    },ids);
                    if(ids.indexOf(item.budget_node_id) > -1){
                        item.check1=true;
                    }else{
                        item.check1=false
                    }
                };
            }
        };

        $scope.budgeterror_total = false;
        $scope.budgeterror_amount = false;
        $scope.budgeterror_rate = false;
        $scope.edit_apply_reim_amount = function (event, item,index) {
            if(item.flag == true){
                if( item.apply_reim_amount + $scope.query.totaltax > $scope.query.totalpay || item.apply_reim_amount >(item.budget_amount-item.fee_amount)){
                    item.budgeterror_amount = true;
                }else{
                    item.budgeterror_amount = false;
                }
            }else if(item.flag == false){
                if( item.apply_reim_amount + $scope.query.totaltax > $scope.query.totalpay || item.apply_reim_amount >(item.approve_amount)){
                    item.budgeterror_amount = true;
                }else{
                    item.budgeterror_amount = false;
                }
            }

            $scope.budgeterror_amount = false;
            $scope.query.totalbudget = 0;

            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].budgeterror_amount == true){
                    $scope.budgeterror_amount = true;
                }else if($scope.appdata[i].budgeterror_amount == false && $scope.appdata[i].budgeterror_rate == false){
                    if($scope.appdata[i].apply_reim_amount !=null && $scope.appdata[i].apply_reim_amount!= undefined && $scope.appdata[i].apply_reim_amount!=''){
                        $scope.query.totalbudget = $scope.query.totalbudget+$scope.appdata[i].apply_reim_amount;
                    }
                }
            }

            if($scope.query.totalbudget + $scope.query.totaltax != $scope.query.totalpay){
                $scope.budgeterror_total = true;
            }else{
                $scope.budgeterror_total = false;
            }
            //event.stopPropagation();
            //var dialog = {
            //    modelValue: item.apply_reim_amount,
            //    placeholder: 'Add a comment',
            //    save: function (input) {
            //        item.apply_reim_amount = input.$modelValue;
            //
            //
            //    },
            //    targetEvent: event,
            //    type:'number',
            //    title: '修改报销金额'
            //};
            //var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            //promise.then(function (ctrl) {
            //});
        };

        $scope.delete = function(item,i){
            $scope.appdata.splice(i,1);
            $scope.budgeterror_rate = false;
            $scope.budgeterror_amount = false;
            $scope.query.totalbudget = 0;

            for(var i=0;i<$scope.appdata.length;i++){
                if($scope.appdata[i].budgeterror_amount == true){
                    $scope.budgeterror_amount = true;
                }else if($scope.appdata[i].budgeterror_amount == false){
                    if($scope.appdata[i].apply_reim_amount !=null && $scope.appdata[i].apply_reim_amount!= undefined && $scope.appdata[i].apply_reim_amount!=''){
                        $scope.query.totalbudget = $scope.query.totalbudget+$scope.appdata[i].apply_reim_amount;
                    }
                }
                if($scope.appdata[i].budgeterror_rate == true){
                    $scope.budgeterror_rate = true
                }
            }

            if($scope.query.totalbudget + $scope.query.totaltax != $scope.query.totalpay){
                $scope.budgeterror_total = true;
            }else{
                $scope.budgeterror_total = false;
            }
        };

        //关联借款单
        $scope.appdata1 = [];

        $scope.chooseLM = function(ev,item1) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController2,
                templateUrl: 'templates/personalexp/personalfirst-dialog2.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:false,
                fullscreen: useFullScreen
            })
                .then(function(item) {
                    if(item != [] && item.length!=0){
                        for(var i=0;i<$scope.appdata1.length;i++){
                            for(var j=0;j<item1.length;j++){
                                if($scope.appdata1[i].loan_info_id == item1[j].loan_info_id){
                                    $scope.appdata1[i].repay_amount = item1[j].repay_amount
                                }
                            }
                        }
                    }

                    var aa=[];
                    for(var i=0;i<item1.length;i++){
                        if(item1[i].currency_code == expPublic.currency_code){
                            item1[i].loanerror_rate = false;
                        }else{
                            var bb=false;
                            for(var e=0;e<aa.length;e++){
                                if(item1[i].currency_code == aa[e]){
                                    bb=true
                                }
                            }
                            if(bb == false){
                                if(item1[i].currency_code != undefined && item1[i].currency_code != null){
                                    aa.push(item1[i].currency_code)
                                }else{
                                    item1[i].loanerror_rate = true;
                                    alert(item1[i].loan_info_code+'不存在对应的币种！')
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
                                from_currency:aa,
                                to_currency:expPublic.currency_code
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

                                    for(var i=0;i<item1.length;i++){
                                        if(item1[i].currency_code == expPublic.currency_code){
                                            item1[i].loanerror_rate = false;
                                        }
                                        else{
                                            for(var q=0;q<rates.length;q++){
                                                if(rates[q].from_currency == item1[i].currency_code && rates[q].to_currency == expPublic.currency_code){
                                                    if(rates[q].conversion_rate != 0 && rates[q].conversion_rate != null && rates[q].conversion_rate != undefined){
                                                        item1[i].loanerror_rate = false;
                                                        item1[i].amount = rates[q].conversion_rate * item1[i].amount;
                                                        if(item1[i].already_repay_amount){
                                                            item1[i].already_repay_amount = rates[q].conversion_rate * item1[i].already_repay_amount;
                                                        }else{

                                                        }
                                                    }else{
                                                        item1[i].loanerror_rate = true;
                                                    }
                                                }else{
                                                    item1[i].loanerror_rate = true;
                                                }
                                            }
                                        }
                                    }
                                    for(var i=0;i<$scope.appdata1.length;i++){
                                        if($scope.appdata1[i].loanerror_rate == true){
                                            $scope.loanerror_rate = true;
                                        }
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

                    $scope.query.totalloan = 0;
                    $scope.loanerror_totalloan = false;
                    $scope.loanerror_amount = false;
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
                    $mdDialog.hide($scope.query.total1);
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
                    total:'',
                    total1:item1
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

        $scope.loanerror_totalloan = false;
        $scope.loanerror_amount = false;
        $scope.loanerror_rate = false;
        $scope.edit_repay_amount = function (event, item,index) {
            var already_repay_amount=0;
            if(item.already_repay_amount){
                already_repay_amount = item.already_repay_amount
            }else{

            }

            if( item.repay_amount >(item.amount-already_repay_amount)){
                item.loanerror_amount = true;
            }else{
                item.loanerror_amount = false;
            }

            $scope.loanerror_amount = false;
            $scope.query.totalloan = 0;
            for(var i=0;i<$scope.appdata1.length;i++){
                if($scope.appdata1[i].loanerror_amount == true){
                    $scope.loanerror_amount = true;
                }else if($scope.appdata1[i].loanerror_amount == false && $scope.appdata1[i].loanerror_rate == false){
                    if($scope.appdata1[i].repay_amount !=null && $scope.appdata1[i].repay_amount!= undefined && $scope.appdata1[i].repay_amount!=''){
                        $scope.query.totalloan = $scope.query.totalloan+$scope.appdata1[i].repay_amount;
                    }
                }
            }

            if($scope.query.totalloan > $scope.query.totalpay){
                $scope.query.totalloan = $scope.query.totalpay;
                $scope.loanerror_totalloan = true;
            }else{
                $scope.loanerror_totalloan = false;
            }
            //event.stopPropagation();
            //var dialog = {
            //    modelValue: item.repay_amount,
            //    placeholder: 'Add a comment',
            //    save: function (input) {
            //        item.repay_amount = input.$modelValue;
            //    },
            //    targetEvent: event,
            //    type:'number',
            //    title: '修改核销金额'
            //};
            //var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            //promise.then(function (ctrl) {
            //});
        };

        $scope.delete1 = function(item,i){
            $scope.appdata1.splice(i,1);
            $scope.loanerror_rate = false;
            $scope.loanerror_amount = false;
            $scope.query.totalloan = 0;
            for(var i=0;i<$scope.appdata1.length;i++){
                if($scope.appdata1[i].loanerror_amount == true){
                    $scope.loanerror_amount = true;
                }else if($scope.appdata1[i].loanerror_amount == false){
                    if($scope.appdata1[i].repay_amount !=null && $scope.appdata1[i].repay_amount!= undefined && $scope.appdata1[i].repay_amount!=''){
                        $scope.query.totalloan = $scope.query.totalloan+$scope.appdata1[i].repay_amount;
                    }
                }

                if($scope.appdata1[i].loanerror_rate == true){
                    $scope.loanerror_rate = true
                }
            }

            if($scope.query.totalloan > $scope.query.totalpay){
                $scope.query.totalloan = $scope.query.totalpay;
                $scope.loanerror_totalloan = true;
            }else{
                $scope.loanerror_totalloan = false;
            }
        };

        //下一步
        $scope.next = function(){
            //$scope.query.fee_apply = expPublic.fee_apply;
            var aa=false;
            if($scope.appdata.length ==0){
                aa=true;
            }
            for(var i=0;i<$scope.appdata.length;i++) {
                if ($scope.appdata[i].apply_reim_amount != null && $scope.appdata[i].apply_reim_amount != '' && $scope.appdata[i].apply_reim_amount != undefined) {
                    $scope.appdata[i].apply_reim_amount_error = false
                } else {
                    $scope.appdata[i].apply_reim_amount_error = true;
                    aa = true;
                }
                if ($scope.appdata[i].is_last_reim != null && $scope.appdata[i].is_last_reim != '' && $scope.appdata[i].is_last_reim != undefined) {
                    $scope.appdata[i].is_last_reim_error = false
                } else {
                    $scope.appdata[i].is_last_reim_error = true;
                    aa = true;
                }
            }
            var bb=false;
            for(var i=0;i<$scope.appdata1.length;i++) {
                if ($scope.appdata1[i].repay_amount != null && $scope.appdata1[i].repay_amount != '' && $scope.appdata1[i].repay_amount != undefined) {
                    $scope.appdata1[i].repay_amount_error = false
                } else {
                    $scope.appdata1[i].repay_amount_error = true;
                    bb = true;
                }
            }

            if(aa == true || bb==true){
                alert('请正确填写！');
            }else{
                for(var i=0;i<$scope.appdata.length;i++){
                    if($scope.appdata[i].budgeterror_rate == false){
                        if($scope.appdata[i].flag == false){
                            expPublic.emsecfeebudgets.push({
                                fee_apply_id:$scope.appdata[i].fee_apply_id == '' ? null:$scope.appdata[i].fee_apply_id,
                                eco_type_id:$scope.appdata[i].eco_type_id,
                                busi_org_id:$scope.appdata[i].busi_org_id,
                                fee_type_id:$scope.appdata[i].fee_type_id,
                                budget_node_id:$scope.appdata[i].budget_node_id,
                                apply_reim_amount:$scope.appdata[i].apply_reim_amount,
                                is_last_reim:$scope.appdata[i].is_last_reim,
                                sensitive_info:$scope.appdata[i].sensitive_info =='' ? null:$scope.appdata[i].sensitive_info
                            })
                        }else{
                            expPublic.emsecfeebudgets.push({
                                fee_apply_id:$scope.appdata[i].fee_apply_id == '' ? null:$scope.appdata[i].fee_apply_id,
                                eco_type_id:$scope.appdata[i].eco_type_id,
                                busi_org_id:$scope.appdata[i].busi_org_id,
                                fee_type_id:$scope.appdata[i].fee_type_id,
                                budget_node_id:$scope.appdata[i].budget_node_id,
                                apply_reim_amount:$scope.appdata[i].apply_reim_amount,
                                is_last_reim:'N',
                                sensitive_info:$scope.appdata[i].sensitive_info =='' ? null:$scope.appdata[i].sensitive_info
                            })
                        }

                    }

                }

                if($scope.appdata1.length >0){
                    expPublic.need_app_loan = 'Y';
                    for(var i=0;i<$scope.appdata1.length;i++){
                        if($scope.appdata1[i].loanerror_rate == false){
                            expPublic.emsecfeeloans.push({
                                loan_info_id:$scope.appdata1[i].loan_info_id,
                                repay_amount:$scope.appdata1[i].repay_amount
                            })
                        }
                    }
                }else{
                    expPublic.need_app_loan = 'N';
                }

                expPublic.fee_apply = undefined;
                expPublic.total = undefined;
                expPublic.totaltax = undefined;
                expPublic.fee_buy = undefined;
                console.log(expPublic);
                //var getconfig = {
                //    method: 'POST',
                //    url: APP_CONFIG.SMART_URL+'/ec/feeReim/saveFeeReim',
                //    headers: {
                //        'x-auth-token': $cookies.get("JSESSION")
                //    },
                //    data:{
                //        emsecfeereimh: expPublic
                //    }
                //};
                //$http(getconfig)
                //    .success(function(data, status, headers, config) {
                //        $scope.content=headers('x-auth-token');
                //        if($scope.content!=''&& $scope.content!=null){
                //            $cookies.put('JSESSION', $scope.content);
                //        }
                //        if(data.code=='0000'){
                //
                //        }else if(data.code=='0401'){
                //            if(data.msg == '未登录.'){
                //                $cookies.remove("managerId");
                //                $cookies.remove("tenantId");
                //                $cookies.remove("JSESSION");
                //                $cookies.remove("userId");
                //                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                //            }
                //
                //        }else if(data.code=='6666'){
                //
                //        }else{
                //            alert(data.msg)
                //        }
                //
                //    })
                //    .error(function(data, status, headers, config) {
                //        //alert(status)
                //    });
            }


            //$location.path("/expense/expensethird")
        }

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    angular._LoadModule('expensethird');
    return test;
});