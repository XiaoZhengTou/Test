/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('budgetprocess', []);
    test.controller('budgetprocessCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$mdToast,$location,$timeout,$mdEditDialog){

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

        $scope.query = {
            order: 'name',
            process_type: '',
            process_all: ''
        };

        var budget_node_id='';
        var watch1 = $scope.$watch('$location.search()',function(newValue,oldValue, scope){
            if($location.search().budget_node_id != null && $location.search().budget_node_id != undefined){
                budget_node_id=$location.search().budget_node_id;
                if($location.search().budget_node_id == ''){
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/budget_edit_list"
                }
                getapp1();
            }else{
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/budget_edit_list"
            }
        });

        //getapp1();
        function getapp1(){
            if(budget_node_id == ''){
                window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/budget_edit_list"
            }else{
                var getconfig = {
                    method: 'POST',
                    url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmBudgetNode/getBudgetNodeProcessControl',
                    headers: {
                        'x-auth-token': $cookies.get("JSESSION")
                    },
                    data: {
                        budget_node_id:budget_node_id
                    }
                };
                $http(getconfig)
                    .success(function(data, status, headers, config) {
                        $scope.content=headers('x-auth-token');
                        if($scope.content!=''&& $scope.content!=null){
                            $cookies.put('JSESSION', $scope.content);
                        }
                        if(data.code=='0000'){
                            $scope.query.process_type = data.data.emsbmbudgetnode.process_type;
                            $scope.appdata = data.data.emsbmbudgetnode.emsbmprocesscontrols;

                            if($scope.appdata != '' && $scope.appdata!=[] && $scope.appdata!=null && $scope.appdata!=undefined){
                                if($scope.appdata.length >0 && $scope.query.process_type !='TIME'){
                                    var aa=0;
                                    for(var i=0;i<$scope.appdata.length;i++){
                                        aa=aa+$scope.appdata[i].evaluate_value
                                    }
                                    $scope.query.process_all = aa;
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
        }
        $scope.appdata=[];
        $scope.control_value_error = false;

        $scope.back = function (){
            $location.path("/budget_edit_list_edit")
        };

        //保存
        $scope.save = function () {
            var aa=[];
            if($scope.query.process_type == 'TIME'){
                for(var i=0;i<$scope.appdata.length;i++){
                    aa.push({
                        begin_date:$scope.appdata[i].begin_date,
                        end_date:$scope.appdata[i].end_date,
                        process_control_value:$scope.appdata[i].process_control_value
                    })
                }
            }else{
                for(var i=0;i<$scope.appdata.length;i++){
                    aa.push({
                        begin_date:$scope.appdata[i].begin_date,
                        end_date:$scope.appdata[i].end_date,
                        evaluate_value:$scope.appdata[i].evaluate_value,
                        process_control_value:$scope.appdata[i].process_control_value
                    })
                }
            }
            var getconfig = {
                method: 'POST',
                url:  APP_CONFIG.SMART_URL+'' + '/bm/EmsBmBudgetNode/createBudgetProcessControls',
                //url:  'http://10.73.186.25:8081/smart-expense-web/' + 'bm/EmsBmTemplet/pageLike',
                headers: {
                    'x-auth-token': $cookies.get("JSESSION")
                },
                data: {
                    budget_node_id:budget_node_id,
                    emsbmprocesscontrols:aa,
                    process_type:$scope.query.process_type
                }
            };
            $http(getconfig)
                .success(function(data, status, headers, config) {
                    $scope.content=headers('x-auth-token');
                    if($scope.content!=''&& $scope.content!=null){
                        $cookies.put('JSESSION', $scope.content);
                    }
                    if(data.code=='0000'){

                       alert('保存成功！')

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

        //按月评分
        $scope.changelevel = function(item){
            $scope.appdata=[];
            var myDate = new Date().getFullYear(); //获取当前年
            var daycount = new Date(myDate,2,0).getDate();//获取2月的天数
            var timepro=[8,16,24,32,40,48,56,64,72,80,88,100];
            var timebegin=['-01-01','-02-01','-03-01','-04-01','-05-01','-06-01','-07-01','-08-01','-09-01','-10-01','-11-01','-12-01'];
            var timeend=['-01-31','-02-','-03-31','-04-30','-05-31','-06-30','-07-31','-08-31','-09-30','-10-31','-11-30','-12-31'];
            var proall=$scope.query.process_all % 12;
            var proall1=Math.floor($scope.query.process_all / 12);
            for(var i=1;i<=12;i++){
                if($scope.query.process_type == 'TIME'){
                    $scope.appdata.push({
                        process_control_value:timepro[i-1],
                        begin_date:myDate+timebegin[i-1],
                        end_date:i == 2 ? myDate+timeend[i-1]+daycount : myDate+timeend[i-1]
                    })
                }else{
                    $scope.appdata.push({
                        evaluate_value:i == 12 ? proall1+proall : proall1,
                        process_control_value:i == 12 ?  Math.round(((proall1+proall) /$scope.query.process_all *100+ $scope.appdata[i-2].process_control_value)*100)/100 :i == 1? Math.round((proall1) /$scope.query.process_all *100*100)/100 :Math.round(((proall1) /$scope.query.process_all *100+ $scope.appdata[i-2].process_control_value)*100)/100,
                        begin_date:myDate+timebegin[i-1],
                        end_date:i == 2 ? myDate+timeend[i-1]+daycount : myDate+timeend[i-1]
                    })
                }
            }
        };

        //添加
        $scope.addrow = function () {
            $scope.appdata.push({
                process_control_value:'',
                begin_date:'',
                end_date:''
            })
        };

        //逐个删除
        $scope.deleteone = function (item) {
            $scope.appdata.splice(item,1)
        };

        $scope.edit_begin_date = function (event, item) {
            event.stopPropagation();
            var begin_date='';
            if(item.begin_date != null && item.begin_date != undefined){
                begin_date=item.begin_date.toString();
                begin_date =  begin_date.replace(/-/g,"/");
            }
            var dialog = {
                modelValue: begin_date == ''? null:new Date(begin_date),
                placeholder: 'Add a comment',
                save: function (input) {
                    item.begin_date=$filter('date')(input.$modelValue, "yyyy-MM-dd");
                    //item.begin_date = input.$modelValue;
                },
                type:'date',
                targetEvent: event,
                title: '修改开始日期'
            };
            var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            promise.then(function (ctrl) {
                //var input = ctrl.getInput();
                //input.$viewChangeListeners.push(function () {
                //    input.$setValidity('test', input.$modelValue !== 'test');
                //});
            });
        };

        $scope.edit_end_date = function (event, item) {
            event.stopPropagation();
            var begin_date='';
            if(item.begin_date != null && item.begin_date != undefined){
                begin_date=item.begin_date.toString();
                begin_date =  begin_date.replace(/-/g,"/");
            }
            var end_date='';
            if(item.end_date != null && item.end_date != undefined){
                end_date=item.end_date.toString();
                end_date =  end_date.replace(/-/g,"/");
            }
            var dialog = {
                modelValue: end_date == ''? null:new Date(end_date),
                placeholder: 'Add a comment',
                save: function (input) {
                    item.end_date=$filter('date')(input.$modelValue, "yyyy-MM-dd");
                    //item.begin_date = input.$modelValue;
                },
                type:'date',
                targetEvent: event,
                title: '修改结束日期',
                'mdMinDate':new Date(begin_date)
            };
            var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            promise.then(function (ctrl) {
                //var input = ctrl.getInput();
                //input.$viewChangeListeners.push(function () {
                //    input.$setValidity('test', input.$modelValue !== 'test');
                //});
            });
        };

        $scope.edit_process_control_valuet = function (event, item,num) {
            var bb=item.process_control_value;
            event.stopPropagation();
            var dialog = {
                modelValue: item.process_control_value,
                placeholder: 'Add a comment',
                save: function (input) {
                    item.process_control_value = input.$modelValue;
                    var aa=item.process_control_value - bb;
                    for(var i=num+1;i<$scope.appdata.length;i++){
                        if(i == 0){

                        }else{
                            $scope.appdata[i].process_control_value = $scope.appdata[i].process_control_value+aa;
                        }
                    }
                    var all=0;
                    all = $scope.appdata[$scope.appdata.length-1].process_control_value;
                    if(all > 100 || all<0){
                        $scope.control_value_error = true;
                    }else{
                        $scope.control_value_error = false;
                    }
                },
                targetEvent: event,
                type:'number',
                title: '修改控制进度值'
            };
            var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            promise.then(function (ctrl) {
                //var input = ctrl.getInput();
                //input.$viewChangeListeners.push(function () {
                //    input.$setValidity('test', input.$modelValue !== 'test');
                //});
            });
        };

        $scope.edit_evaluate_value = function (event, item,index) {
            event.stopPropagation();
            var dialog = {
                modelValue: item.evaluate_value,
                placeholder: 'Add a comment',
                save: function (input) {
                    item.evaluate_value = input.$modelValue;
                    for(var i=0;i<$scope.appdata.length;i++){
                        if(i == 0){
                            $scope.appdata[0].process_control_value = Math.round($scope.appdata[0].evaluate_value / $scope.query.process_all *100*100)/100;
                        }else{
                            $scope.appdata[i].process_control_value = Math.round(($scope.appdata[i].evaluate_value / $scope.query.process_all *100+$scope.appdata[i-1].process_control_value)*100)/100;
                        }
                    }
                    var all=0;
                    all = $scope.appdata[$scope.appdata.length-1].process_control_value;
                    if(all > 100 || all<0){
                        $scope.control_value_error = true;
                    }else{
                        $scope.control_value_error = false;
                    }
                },
                targetEvent: event,
                type:'number',
                title: '修改预估值'
            };
            var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            promise.then(function (ctrl) {
                //var input = ctrl.getInput();
                //input.$viewChangeListeners.push(function () {
                //    input.$setValidity('test', input.$modelValue !== 'test');
                //});
            });
        };

        $scope.changeapp = function(){
            $scope.control_value_error = false;
            $scope.appdata=[];
        }
    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });


    angular._LoadModule('budgetprocess');
    return test;
});