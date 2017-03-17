define(['angular','js/shared/bankaccount.js',
'js/shared/feeapply.js',
'js/shared/receving.js',
'js/shared/ruzhangdanwei.js'], function(angular) {
    var add = angular.module('add', ['angularMoment','md.receving','md.ruzhangdanwei']);
    add.controller('fkAddCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
        // 初始化开始
        $scope.stop = function(ev){
            ev.stopPropagation();
        }
        $scope.clear = function(){
            $scope.selected = [];
        }
        $scope.origindata = {
            currency : [
                {id:'CNY',name:'人民币'},
                {id:'USD',name:'美元'}
            ],
            ywstatus : [
                {'id':'YW1','name':'业务状态1'},
                {'id':'YW2','name':'业务状态2'},
                {'id':'YW3','name':'业务状态3'},
                {'id':'YW4','name':'业务状态4'}
            ],
            erpstatus : [
                {'id':'ERP1','name':'ERP状态1'},
                {'id':'ERP2','name':'ERP状态2'},
                {'id':'ERP3','name':'ERP状态3'},
                {'id':'ERP4','name':'ERP状态4'},
                {'id':'ERP5','name':'ERP状态5'}
            ]
        };
        $scope.add = {
            desc : null,
            currency : null,
            ruzhangdanwei : null,
            ywstatus : null,
            erpstatus : null,
            gl_start_date : new Date(moment().add(-3,'month').format('YYYY-MM-DD')),
            gl_end_date : new Date()
        };
        $scope.$watch('add.ruzhangdanwei', function (newValue, oldValue) {
            $scope.getData();
        });
        // 拉取借款单开始
        var bookmark;
        $scope.selected = [];
        $scope.query = {
            page_number: 1,
            page_size: 10,
            order_by: 'loan_info_code',
            query_param: {
                reason_desc : '',
                fee_apply_code : ''
            }
        };
        $scope.filter = {
            source : [
                {id:'loan_info_code',name:'借款单号'},
                {id:'reason_desc',name:'借款原因'},
                {id:'apply_name',name:'借款人'}
            ],
            value : {},
            setFilter : function(x){
                $scope.filter.value = x;
            },
            options: {
              debounce: 500
            }
        };
        $scope.filter.value = $scope.filter.source[0];
        $scope.getData = function(){
            if (!$scope.add.ruzhangdanwei || !$scope.add.currency) {
                return;
            }
            $scope.promise = $timeout(function () {
            }, 1000);
            var getconfig = {
                method: 'POST',
                url: feelapplyUrl + 'pa/EmsPaReqH/getInvoices',
                noLoader : true,
                data : {
                    page_number: $scope.query.page_number,
                    page_size: $scope.query.page_size,
                    order_by: $scope.query.order_by,
                    query_param: {
                        status : "DHK",
                        reason_desc : ($scope.query.query_param.reason_desc == "") ? $scope.query.query_param.reason_desc : null,
                        loan_info_code : null,
                        fee_apply_code : ($scope.query.query_param.fee_apply_code == "") ? $scope.query.query_param.fee_apply_code : null,
                        begin_date : null,
                        end_date : null,
                        company_id: $scope.add.ruzhangdanwei.company_id,
                        currency_code : $scope.add.currency.id
                    }
                }
            };
            getconfig.data.query_param[$scope.filter.value.id] = $scope.searchText;
            $http(getconfig).success(function(response){
                var data = response.data.datalist;
                for(var j = 0, length = data.length; j < length; j++){
                    data[j].max_repay_amount = data[j].amount - data[j].already_repay_amount;
                    data[j].now_repay_amount = data[j].max_repay_amount;
                }
                $scope.data = data;
                $scope.total = response.data.page.totalRow
            }).error(function(response){
                console.log('请求失败!') ;
            });
        };
        $scope.removeFilter = function () {
            $scope.filter.show = false;
            $scope.query.query_param.reason_desc = '';
            $scope.query.query_param.fee_apply_code = '';
            $scope.searchText = '';
            $scope.getData();
        };
        $scope.$watch('searchText', function (newValue, oldValue) {
            if(!oldValue) {
              bookmark = $scope.query.page;
            }
            
            if(newValue !== oldValue) {
              $scope.query.page = 1;
            }
            
            if(!newValue) {
              $scope.query.page = bookmark;
            }
            $scope.getData();
        });
        // 拉取借款单结束
        // 拟合数据开始
        $scope.totalAmount = 0;
        $scope.calcTotal = function(){
            var total = 0;
            var selected = $scope.selected;
            for(var j = 0, length = selected.length; j < length; j++){
                total = selected[j].now_repay_amount + total;
            }
            $scope.totalAmount = total;
        };
        $scope.calcAmount = function(max,now,index){
            if (now > max) {
                var text = '你输入的金额' + now + '超过了这张借款单的剩余代还金额' + max + '，系统已自动将你的代还金额设置为：' + max;
                $scope.showSimpleToast(text,5000);
                $scope.data[index].now_repay_amount = max;
            }
        };
        // 拟合数据结束
    });
})