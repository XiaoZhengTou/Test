/**
 * Created by LUOZS on 2016-6-15.
 */
define(['angular','js/shared/viewer.js'], function (angular) {
    publicFunction.addStyle('md-data-table.min.css');
    var test = angular.module('expensesecond', ['picviewer']);
    test.controller('expensesecondCtrl',function($scope, $log, $mdDialog, $mdMedia,$http,$cookies,$filter,$element,$mdToast,$timeout,$mdEditDialog,$location,expPublic){
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
            flag:'N',
            totaltax:0,
            invoice_type:[]
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

        //getapp1();
        function getapp1(page,size){
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.JIEBAO_URL+'/docker/currencies/queryAllPage?pageIndex='+$scope.query.page+'&pageSize='+$scope.query.limit,
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

                        $scope.appdata = data.data.data.list;
                        $scope.query.total = data.data.data.totalRow;
                        $scope.query.limit = data.data.data.pageSize;
                        $scope.query.page = data.data.data.pageNumber;

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

        $scope.showpic = function(ev){
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
            $mdDialog.show({
                controller: DialogController1,
                templateUrl: 'templates/personalexp/personalsecond-dialog1.html',
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
                    $mdDialog.hide();
                };
            }
        };

        //增值税发票1
        $scope.flagshow=true;

        //获取税的基础科目
        getfeetax();
        function getfeetax(){
            var getconfig = {
                method: 'GET',
                url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/foundation/queryIsTax',
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

                        $scope.query.invoice_type = data.data.info;

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

        $scope.changeflag = function(){
            if($scope.query.flag == 'Y'){
                $scope.flagshow=false;
            }else if($scope.query.flag == 'N'){
                $scope.appdata=[];
                $scope.flagshow=true;
            }
        };

        $scope.addtrip1 = function(ev){
            $scope.appdata.push({
                invoice_type:'',
                invoice_maker:'',
                invoice_num:'',
                tax_amount:'',
                invoice_date:null
            });
        };

        $scope.delete1 = function(item,i){
            if(item.tax_amount != null && item.tax_amount != undefined){
                $scope.query.totaltax = $scope.query.totaltax-item.tax_amount;
            }
            $scope.appdata.splice(i,1)
        };

        $scope.edit_invoice_date = function (event, item) {
            event.stopPropagation();
            var invoice_date='';
            if(item.invoice_date != null && item.invoice_date != undefined){
                invoice_date=item.invoice_date.toString();
                invoice_date =  invoice_date.replace(/-/g,"/");
            }
            var dialog = {
                modelValue: invoice_date == ''? null:new Date(invoice_date),
                placeholder: 'Add a comment',
                save: function (input) {
                    item.invoice_date=$filter('date')(input.$modelValue, "yyyy-MM-dd");
                },
                type:'date',
                targetEvent: event,
                title: '修改税票日期'
            };
            var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            promise.then(function (ctrl) {
            });
        };

        $scope.edit_invoice_maker = function (event, item,index) {
            var dialog = {
                modelValue: item.invoice_maker,
                placeholder: 'Add a comment',
                save: function (input) {
                    item.invoice_maker = input.$modelValue;
                },
                targetEvent: event,
                type:'text',
                title: '修改开票方'
            };
            var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            promise.then(function (ctrl) {
            });
        };

        $scope.edit_invoice_num = function (event, item,index) {
            var dialog = {
                modelValue: item.invoice_num,
                placeholder: 'Add a comment',
                save: function (input) {
                    item.invoice_num = input.$modelValue;
                },
                targetEvent: event,
                type:'number',
                title: '修改税票号'
            };
            var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            promise.then(function (ctrl) {
            });
        };

        $scope.edit_tax_amount = function (event, item,index) {
            $scope.query.totaltax = 0;
            for(var i=0;i<$scope.appdata.length;i++){
                $scope.query.totaltax = $scope.query.totaltax+$scope.appdata[i].tax_amount;
            }
            //var dialog = {
            //    modelValue: item.tax_amount,
            //    placeholder: 'Add a comment',
            //    save: function (input) {
            //        item.tax_amount = input.$modelValue;
            //        $scope.query.totaltax = 0;
            //        for(var i=0;i<$scope.appdata.length;i++){
            //            $scope.query.totaltax = $scope.query.totaltax+$scope.appdata[i].tax_amount;
            //        }
            //
            //    },
            //    targetEvent: event,
            //    type:'number',
            //    title: '修改税额'
            //};
            //var promise = $scope.options.largeEditDialog ? $mdEditDialog.large(dialog) : $mdEditDialog.small(dialog);
            //promise.then(function (ctrl) {
            //});
        };

        //下一步
        $scope.next = function(){
            if($scope.query.flag == 'Y'){
                var aa=false;
                if($scope.appdata.length ==0){
                    aa=true;
                }
                for(var i=0;i<$scope.appdata.length;i++){
                    if($scope.appdata[i].bill_type_id != null && $scope.appdata[i].bill_type_id !='' && $scope.appdata[i].bill_type_id != undefined){
                        $scope.appdata[i].bill_type_id_error = false
                    }else{
                        $scope.appdata[i].bill_type_id_error = true;
                        aa=true;
                    }

                    if($scope.appdata[i].invoice_maker != null && $scope.appdata[i].invoice_maker !='' && $scope.appdata[i].invoice_maker != undefined){
                        $scope.appdata[i].invoice_maker_error = false
                    }else{
                        $scope.appdata[i].invoice_maker_error = true;
                        aa=true;
                    }

                    if($scope.appdata[i].invoice_num != null && $scope.appdata[i].invoice_num !='' && $scope.appdata[i].invoice_num != undefined){
                        $scope.appdata[i].invoice_num_error = false
                    }else{
                        $scope.appdata[i].invoice_num_error = true;
                        aa=true;
                    }

                    if($scope.appdata[i].invoice_date != null && $scope.appdata[i].invoice_date !='' && $scope.appdata[i].invoice_date != undefined){
                        $scope.appdata[i].invoice_date_error = false
                    }else{
                        $scope.appdata[i].invoice_date_error = true;
                        aa=true;
                    }

                    if($scope.appdata[i].tax_amount != null && $scope.appdata[i].tax_amount !='' && $scope.appdata[i].tax_amount != undefined){
                        $scope.appdata[i].tax_amount_error = false
                    }else{
                        $scope.appdata[i].tax_amount_error = true;
                        aa=true;
                    }
                }

                if(aa == true){
                    alert('请正确填写！');

                }else{
                    expPublic.need_input_tax = 'Y';
                    for(var i=0;i<$scope.appdata.length;i++){
                        expPublic.emsecinvoicetaxrs.push({
                            bill_type_id:$scope.appdata[i].bill_type_id,
                            invoice_maker:$scope.appdata[i].invoice_maker,
                            invoice_num:$scope.appdata[i].invoice_num,
                            invoice_type:'增值税发票',
                            invoice_date:$filter('date')($scope.appdata[i].invoice_date, "yyyy-MM-dd"),
                            //invoice_amount:0,
                            remark:'',
                            //tax_rate:'',
                            tax_amount:$scope.appdata[i].tax_amount
                        })
                    }
                    expPublic.totaltax=$scope.query.totaltax;
                    console.log(expPublic);
                    $location.path("/expense/expensethird")
                }

            }else if($scope.query.flag == 'N'){
                expPublic.need_input_tax = 'N';
                expPublic.totaltax=0;
                console.log(expPublic);
                $location.path("/expense/expensethird")
            }


        }

    }).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });

    angular._LoadModule('expensesecond');
    return test;
});