define(['angular'], function(angular) {
    var app = angular.module('mdduigongEClist', [])
        .filter('order_status', function($sce) {
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

        }).filter('applytype', function() {
            return function(status) {
                switch(status) {
                    case 'TY':
                        return '日常申请';
                    case 'CL':
                        return '差旅申请';
                    default:
                        return '未知';
                }
            }

        }).filter('status_color', function() {
            return function(status) {
                switch(status) {
                    case 'DRAFT':
                        return 'gray';
                    case 'SUBMITED':
                        return 'green';
                    case 'AUDITED':
                        return 'dodgerblue';
                    case 'DISABLED':
                        return 'orange';
                    default:
                        return 'palegreen';
                }
            }

        }).filter('biz_status', function() {
            return function(status) {
                switch(status) {
                    case 'APPROVALED':
                        return '已批准';
                    case 'RELEASED':
                        return '已释放';
                    case 'PAID':
                        return '已报销';
                    default:
                        return '未知';
                }
            }
        }).filter('chooseDetail', function() {
            return function(item) {
                if(item.order_status == "DRAFT") {
                    if(item.order_type == "CL") {
                        return "#/duigongEC/addChailvApply?obj=" + item.fee_apply_id;
                    } else if(item.order_type == "TY") {
                        return "#/duigongEC/addRichangApply?obj=" + item.fee_apply_id;
                    }

                } else {
                    return "#/duigongEC/details?id=" + item.fee_apply_id;
                }
            }
        }).controller('duigongEClistctrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, $filter, $mdDialog) {

            $scope.query = {
                order: 'name',
                limit: 10,
                page: 1,
                sensitive_info: null,
                begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
                end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
                order_status: null,
                fee_apply_code: null,
                currency : null,
                fee_reim_code:null

            };
            $scope.currencymodel={};
            $scope.loadData = function() {
                $scope.param = {
                    "tenant_id": null,
                    "user_id": null,
                    "page_number": $scope.query.page,
                    "page_size": $scope.query.limit,
                    "query_param": {
                        "sensitive_info": $scope.query.sensitive_info,
                        "apply_name": $scope.query.apply_name,
                        "begin_date": $filter('date')($scope.query.begin_date, 'yyyy-MM-dd'),
                        "end_date": $filter('date')($scope.query.end_date, 'yyyy-MM-dd'),
                        "order_status": $scope.query.order_status == 'null' ? null : $scope.query.order_status,
                      /*  "fee_apply_code": $scope.query.fee_reim_code,*/
                        "eco_type_id": null,
                        "fee_type_id": null,
                        "fee_reim_code":$scope.query.fee_reim_code,
                        'currency_code':$scope.currencymodel.currency_code
                    }
                };
                $http({
                    method: 'POST',
                    url: feelapplyUrl + 'ec/feeReim/listMyFeeReim',
                    data: $scope.param
                }).success(function(data, status, headers, config) {
                    console.log(data);
                    if(data.code == "0000") {
                        $scope.duigongEClist = data;
                        angular.forEach($scope.duigongEClist.data.datalist, function(item) {
                            item.reim_date = new Date(item.reim_date);
                        });
                        $scope.query.limit = data.data.page.pageSize;
                        $scope.query.page = data.data.page.pageNumber;
                    } else {
                        $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
                            .textContent('异常:' + data.msg + "(" + data.code + ")"));
                    }

                }).error(function(data, status, headers, config) {
                    console.log(data);
                });
            }
            $scope.loadData();

            $scope.selected = [];

            $scope.onDelete = function(ev) {
                var confirm = $mdDialog.confirm().title('删除确认').textContent('确定删除此条数据？').ariaLabel('删除').targetEvent(ev).ok('删除').cancel('取消');
                $mdDialog.show(confirm).then(function() {
                    console.log(confirm)
                    console.log($scope.selected);
                    var ids = [];
                    for(var i in $scope.selected) {
                        ids.push($scope.selected[i].fee_reim_id);
                    }
                    if(ids.length > 0) {
                        $http({
                            method: 'POST',
                            url: feelapplyUrl + 'ec/feeReim/deleteFeeReimBatch',
                            data: {
                                "tenant_id": null,
                                "user_id": null,
                                "deletefeeReimIds": ids
                            }
                        }).success(function(data, status, headers, config) {
                            console.log(data);
                            if(data.code == "0000") {
                                $scope.loadData();
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
                }, function(){
                    $scope.status = 'You decided to keep your debt.';
                });
            }

            function success(desserts) {
                console.log('success');
                $scope.desserts = desserts;
            }

            $scope.getDesserts = function() {
                console.log($scope.query);
                $scope.loadData();
                //$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
            };

        }]);
    angular._LoadModule('mdduigongEClist');
    return app;
});