/**
 * Created by LONG on 2016/8/19.
 */
define(['angular', 'moment', 'momentCN', 'ngMoment', 
'js/templates/provision/addBillP.js', 'js/templates/provision/approveP.js', 
'js/templates/provision/flowApproveP.js','js/shared/currency.js','js/shared/feeapplyv2.js','js/shared/budgets.js',
'js/shared/budgetpart.js'], function (angular) {
    //	add public.css
    publicFunction.addStyle('jiehuankuan.css');
    publicFunction.addStyle('md-data-table.min.css');
    var mdfeePayP = angular.module('mdfeePayP', ['mdaddBillP', 'mdApproveP', 'angularMoment', 'mdflowApproveP',
    'mdcurrency','md.feeapplyv2','mdbudgets','mdbudgetpart']);
    mdfeePayP.run(function ($http) {
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
    })
    mdfeePayP.filter('order_status', function($sce) {
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
    mdfeePayP.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/provision/addBillP/:obj', {
            templateUrl: 'templates/provision/addBillP.html'
        })
        .when('/provision/addBillP', {
            templateUrl: 'templates/provision/addBillP.html'
        })
        .when('/provision/flowApproveP', {
            templateUrl: 'templates/provision/flowApproveP.html'
        }).when('/provision/approveP/:obj', {
            templateUrl: 'templates/provision/approveP.html'
        }).otherwise({
            redirectTo: '/provision/home' //angular就喜欢斜杠开头
        });

    });
    mdfeePayP.controller('homeCtrlP', function ($scope, $http, $rootScope,$timeout,$mdDialog,$filter) {
        $rootScope.crumbInit('/provision/home', '首页');
        $scope.filter = {
            orderStates: [
                {'id': 'DRAFT', 'name': '草稿'},
                {'id': 'SUBMITED', 'name': '提交'},
                {'id': 'AUDITED', 'name': '已审批'},
                {'id': 'DISABLED', 'name': '已作废'},
                {'id': 'REJECTED', 'name': '已驳回'}
            ]
        };
//      $scope.total = 0;
        $scope.selected = [];   //表格组件必填
        $scope.currencymodel={};  //储存货币类型的对象
        // 查询参数
        $scope.query = {
           	page_number: 1,
			page_size: 10,
            order_by: 'creation_date',  //根据创建时间排序
            query_param: {
                order_status: null,  //单据状态
                currency_code: null, //币种
                currency_name:null, //币种名称
                reason_desc: null, //业务描述
                lower_amount: null, //金额下限
                higher_amount: null,  //金额上限
                creation_date: null, //日期
                apportion_code:null,  //单号
                fee_apply_code:null
            }
        };
        
        /*---------------------清除条件---------------------*/
        $scope.clearFilter = function () {
            $scope.query={
            	page_number: 1,
				page_size: 10,
				query_param :{
                order_status: null,  //单据状态
                currency_code: null, //币种
                currency_name:null, //币种名称
                reason_desc: null, //业务描述
                lower_amount: null, //金额下限
                higher_amount: null,  //金额上限
                creation_date: null, //日期
                apportion_code:null   //单号
            }
            }
            $scope.getData();   //清除查询条件后重新请求数据
        }
        
     /* 请求接口,获取数据*/
        $scope.getData = function () {
            if ($scope.query.query_param.creation_date != null && $scope.query.query_param.creation_date != undefined) {
				$scope.query.query_param.creation_date = $filter('date')($scope.query.query_param.creation_date, "yyyy-MM-dd");
			}
            $scope.promise = $timeout(function () {
            }, 500);
            var getconfig = {
                method: 'POST',
                url: 'http://10.16.30.74:8080/smart-expense-web/ca/EmsCaApportionH/pageLikeAsH',
                noLoader: true,
                data:{
            	page_number: $scope.query.page_number,
				page_size: $scope.query.page_size,
                    query_param:{
                order_status:$scope.query.query_param.order_status,  //单据状态
                currency_code:$scope.currencymodel.currency_code, //币种
                currency_name:$scope.currencymodel.currency_name,
                reason_desc:  $scope.query.query_param.reason_desc, //业务描述
                lower_amount: $scope.query.query_param.lower_amount, //金额下限
                higher_amount: $scope.query.query_param.higher_amount,  //金额上限
                creation_date: $scope.query.query_param.creation_date, //日期
                apportion_code:$scope.query.query_param.apportion_code //单号
                    }
                }
            }
            $http(getconfig).success(function (response) {
                if (response.data && response.code=='0000') {
                	console.log(response);
                	 angular.forEach(response.data.info, function(x) {
                            x.creation_date = new Date(x.creation_date);
                        });
                    $scope.viewData = response;
                    $scope.total = response.data.totalRow;
                    
                
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


//删除数据
$scope.onDelete = function(ev) {
                var confirm = $mdDialog.confirm().title('删除确认').textContent('确定删除此条数据？').ariaLabel('删除').targetEvent(ev).ok('删除').cancel('取消');
                $mdDialog.show(confirm).then(function() {
                    var ids = [];
                    for(var i in $scope.selected) {
                        ids.push($scope.selected[i].apportion_id);
                    }
                    console.log(ids);
                    if(ids.length > 0) {
                        $http({
                            method: 'delete',
                            url: feelapplyUrl + 'ca/EmsCaApportionH/delete/'+$scope.selected[i].apportion_id,
                            data: {
                                "tenant_id": null,
                                "user_id": null,
//                              "deletefeeReimIds": ids
                            }
                        }).success(function(data, status, headers, config) {
                            console.log(data);
                            if(data.code == "0000") {
                                $scope.getData();
                            } else {
                                $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
                                    .textContent('异常:' + data.msg + "(" + data.code + ")"));
                            }
                        }).error(function(data, status, headers, config) {
                            console.log(data);
                        });
                    } else {
                        $mdDialog.show($mdDialog.alert().title('提示').ok('确定')
                            .textContent('请至少选择一条数据'));
                    }
                }, function() {
                    $scope.status = 'You decided to keep your debt.';
                });
            }
/*---------------删除数据结束---------------------*/
   
   
   
   
/*-------------批量删除-----------------*/
$scope.onDeletes=function(ev){
	
	   var confirm = $mdDialog.confirm().title('删除确认').textContent('确定删除此条数据？').ariaLabel('删除').targetEvent(ev).ok('删除').cancel('取消');
                $mdDialog.show(confirm).then(function() {
                    var ids = [];
                    for(var i in $scope.selected) {
                        ids.push({"apportion_id":$scope.selected[i].apportion_id});
                    }
                    console.log(ids);
                    if(ids.length > 0) {
                        $http({
                            method: 'post',
                            url: feelapplyUrl + 'ca/EmsCaApportionH/batchDelete',
                            data: {
                                "tenant_id": null,
                                "user_id": null,
                                "delete_param":ids
//                              "deletefeeReimIds": ids
                            }
                        }).success(function(data, status, headers, config) {
                            console.log(data);
                            if(data.code == "0000") {
                                $scope.getData();
                            } else {
                                $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
                                    .textContent('异常:' + data.msg + "(" + data.code + ")"));
                            }
                        }).error(function(data, status, headers, config) {
                            console.log(data);
                        });
                    } else {
                        $mdDialog.show($mdDialog.alert().title('提示').ok('确定')
                            .textContent('请至少选择一条数据'));
                    }
                }, function() {
                    $scope.status = 'You decided to keep your debt.';
                });
	
	
	
	
}
              
/*-------------批量删除结束-----------------*/
        $scope.getDesserts = function() {
            $scope.getData();
        };
    });
//控制器范围到此结束
    angular._LoadModule('mdfeePayP');
    return mdfeePayP;

});
