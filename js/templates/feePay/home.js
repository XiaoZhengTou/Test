define(['angular', 'moment', 'momentCN', 'ngMoment', 'js/templates/feePay/addBill.js', 'js/templates/feePay/approve.js', 'js/templates/feePay/flowApprove.js','js/shared/currency.js'], function (angular) {
    //	add public.css
    publicFunction.addStyle('jiehuankuan.css');
    publicFunction.addStyle('md-data-table.min.css');
    var mdfeePay = angular.module('mdfeePay', ['mdaddBill', 'mdApprove', 'angularMoment', 'mdflowApprove','mdcurrency']);
    mdfeePay.run(function ($http) {
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
    })
        mdfeePay.filter('order_status', function($sce) {
            return function(status) {
                var htmlstatus = null;
                switch(status) {
                    case 'DRAFT':
                        htmlstatus = '<span style="color:#fff;background:gray;padding: 3px;border-radius: 3px;">草稿</span>';
                        break;
                    case 'SUBMITED':
                        htmlstatus = '<span style="color:#fff;background:green;padding: 3px;border-radius: 3px;">待审批</span>';
                        break;
                    case 'AUDITED':
                        htmlstatus = '<span style="color:#fff;background:dodgerblue;padding: 3px;border-radius: 3px;">已审批</span>';
                        break;
                    case 'DISABLED':
                        htmlstatus = '<span style="color:#fff;background:orange;padding: 3px;border-radius: 3px;">已作废</span>';
                        break;
                    default:
                        htmlstatus = '<span style="color:#fff;background:palegreen;padding: 3px;border-radius: 3px;">未知状态</span>';
                        break;
                }
                return $sce.trustAsHtml(htmlstatus);
            }

        })
    mdfeePay.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/feePay/addBill', {
            templateUrl: 'templates/feePay/addBill.html'
        }).when('/feePay/flowApprove', {
            templateUrl: 'templates/feePay/flowApprove.html'
        }).when('/feePay/approve', {
            templateUrl: 'templates/feePay/approve.html'
        }).otherwise({
            redirectTo: '/feePay/home' //angular就喜欢斜杠开头
        });

    });
    mdfeePay.controller('homeCtrl', function ($scope, $http, $rootScope,$timeout, $filter, $mdDialog) {
        $rootScope.crumbInit('/feePay/home', '首页');
        $scope.filter = {
            orderStates: [
                {'id': 'DRAFT', 'name': '草稿'},
                {'id': 'SUBMITED', 'name': '提交'},
                {'id': 'AUDITED', 'name': '已审批'},
                {'id': 'DISABLED', 'name': '已作废'},
                {'id': 'REJECTED', 'name': '已驳回'}
            ]
        };
        $scope.total = 0;
        $scope.selected = [];
        $scope.currencymodel={};  //储存货币类型的对象
        // 查询参数
        $scope.query = {
            page_number: 1,
            page_size: 10,
            order_by: 'apply_date',
            query_param: {
                status: null,
                currency: null,
                reason_desc: null,
                loan_info_code: null,
                min_amount: null,
                max_amount: null,
                apply_date: null
            }
        };
        $scope.clearFilter = function () {
            $scope.query.query_param = {
                status: null,
                currency: null,
                reason_desc: null,
                loan_info_code: null,
                min_amount: null,
                max_amount: null,
                apply_date: null
            }
            $scope.getData();
        }
        $scope.getData = function () {
            if($scope.query.query_param.creation_date != null && $scope.query.query_param.creation_date != undefined){
                $scope.query.query_param.creation_date=$filter('date')($scope.query.query_param.creation_date, "yyyy-MM-dd");
            }
            $scope.promise = $timeout(function () {
            }, 500);
            var getconfig = {
                method: 'POST',
                url: 'http://10.16.30.74:8080/smart-expense-web/ca/EmsCaApportionH/pageLikeAsH',
                noLoader: true,
                data:{
                    page_number:$scope.query.page_number,
                    page_size:$scope.query.page_size,
                    query_param:{
                        reason_desc:$scope.query.query_param.reason_desc, //业务描述
                        lower_amount:$scope.query.query_param.min_amount , //金额下限
                        higher_amount:$scope.query.query_param.max_amount,   //金额上限
                        apportion_code:$scope.query.query_param.loan_info_code,  //单号
                        order_status:$scope.query.query_param.status,    //单据状态
                        currency_code:$scope.query.query_param.currency,    //币种
                        creation_date:$scope.query.query_param.apply_date,   //日期
                        order_type: 'INTERNAL_COLLECTION'
                    }
                }
            }
            $http(getconfig).success(function (response) {
            if (response.data && response.code=='0000' && response.msg=='success') {
            angular.forEach(response.data.info, function(x) {
                            x.creation_date = new Date(x.creation_date);
                        });
             $scope.viewData = response;
            }else {
                $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
                    .textContent('' + response.msg + "(" + response.code + ")"));
            }
        }).error(function (response) {
            console.log('请求失败!');
        });
        };

        $scope.getData();
// 取数据结束
// 表格结束

        $scope.getDesserts = function() {
            $scope.getData();
        };
    });
    //控制器范围到这里结束

angular._LoadModule('mdfeePay');
return mdfeePay;

});
