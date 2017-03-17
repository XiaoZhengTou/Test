/**
 * Created by admin on 2016/9/2.
 */
define(['angular'], function(angular) {
    var huankuandanList = angular.module("addchakan",[]);
    publicFunction.addStyle('md-data-table.min.css');
    huankuandanList.controller("addchakanCtrl",['$scope', '$http', '$filter', '$mdDialog',function($scope,$http,$filter,$mdDialog){

        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1,
            reason_desc: null,
            apply_name: null,
            begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
            end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
            order_status: null,
            fee_apply_code: null,

        };
        $scope.selected=[];

        $scope.loadData = function() {
            var param = {
                "page_number": $scope.query.page,
                "page_size": $scope.query.limit,
                "query_param": {
                    "reason_desc": $scope.query.reason_desc,
                    "apply_name": $scope.query.apply_name,
                    "begin_date": $filter('date')($scope.query.begin_date, 'yyyy-MM-dd'),
                    "end_date": $filter('date')($scope.query.end_date, 'yyyy-MM-dd'),
                    "order_status": $scope.query.order_status == 'null' ? null : $scope.query.order_status,
                    "fee_apply_code": $scope.query.fee_apply_code,
                    "eco_type_id": null,
                    "fee_type_id": null,
                }
            };
            $http({
                method: 'POST',
                url: feelapplyUrl + 'ea/feeApply/listMyFeeApply',
                data: param
            }).success(function(data, status, headers, config) {
                console.log(data);
                if(data.code == "0000") {
                    $scope.huankuandan = data;
                    console.log($scope.huankuandan.data.info)
                    angular.forEach($scope.huankuandan.data.info, function(item) {
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
