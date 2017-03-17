/**
 * Created by admin on 2016/8/30.
 */
define(['angular','js/shared/organization.js','js/shared/receving.js'], function(angular) {
    var governList = angular.module("firstlist",['md.receving']);
    publicFunction.addStyle('md-data-table.min.css');
    governList.controller("governFirstCtrl",['$scope', '$http', '$filter', '$mdDialog',function($scope,$http,$filter,$mdDialog){

        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1,
            cash_bank_no:null,
            cash_bank_open:null,
            begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
            end_date:new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
            cash_receiver_name:null,
            company_id:null,
            created_by:null,
            created_name:null,
            pay_by:null,
            receipt_code:null,
            receipt_id:null,
            remarke:null,
            settlte_way:null,
            source_system_num:null,
            status:null,
            supplier_name:null,
            type_code:null,
            type_name:null,
            vendor_type:null
        };
        $scope.selected=[];
        console.log('111')
        $scope.loadData = function() {
            var param = {
                "pageNumber": $scope.query.page,
                "pageSize": $scope.query.limit,
                "sslmrepayhs": {
                    'cash_bank_no':$scope.query.cash_bank_no,
                    'cash_bank_open':$scope.query.cash_bank_open,
                    'cash_receiver_name':$scope.query. cash_receiver_name,
                    'end_date':$filter('date')($scope.query.end_date, 'yyyy-MM-dd'),
                    'company_id':$scope.query.company_id,
                    'start_date':$filter('date')($scope.query.start_date, 'yyyy-MM-dd'),
                    'created_by':$scope.query.created_by,
                    'created_name':$scope.query. created_name,
                    'pay_by':$scope.query. pay_by,
                    'receipt_code':$scope.query.receipt_code,
                    'receipt_id':$scope.query.receipt_id,
                    'remarke':$scope.query.remarke,
                    'settlte_way':$scope.query.settlte_way,
                    'source_system_num':$scope.query.source_system_num,
                    'status':$scope.query. status,
                    'supplier_name':$scope.query.supplier_name,
                    'type_code':$scope.query. type_code,
                    'type_name':$scope.query.type_name,
                    'vendor_type':$scope.query.vendor_type,
                }
            };
            $http({
                method: 'POST',
                url:  APP_CONFIG.huisuanzhang + '/center/receipt/SsImCashReceipt/listByIdAndTypeCode',
                headers: {
                    'x-auth-token': sessionStorage.Token
                },
                data: {
                    receipt_id:'2',
                    type_code:'REPAY'
                }
            }).success(function(data, status, headers, config) {
                console.log(data);
                if(data.code == "0000") {
                    $scope.shoukuandan = data;
                    angular.forEach($scope.shoukuandan.data.sslmrepayhs, function(item) {
                        item.apply_date = new Date(item.apply_date);
                    });
                    $scope.query.limit = data.data.pageSize;
                    $scope.query.page = data.data.pageNumber;
                } else {
                    $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
                        .textContent('异常:' + data.msg + "(" + data.code + ")"));
                }

            }).error(function(data, status, headers, config) {
                console.log(data);
            });
        }
        $scope.loadData();

        $scope.stateFlag = true;
        $scope.state = function(){
            if($scope.stateFlag){
                $scope.stateFlag = false;
            }else{
                $scope.stateFlag = true;
            };
        };

    }]);
});
