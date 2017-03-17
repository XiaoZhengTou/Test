/**
 * Created by admin on 2016/9/1.
 */
/**
 * Created by admin on 2016/9/1.
 */
define(['angular'], function(angular) {
    var addxiugai= angular.module('mdxiugailist', []);
    addxiugai.controller('xiugaictrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, $filter, $mdDialog) {
        $scope.sscreditscore = {
            credit_user_name:null
        };

        $scope.loadData = function() {
            var param = {
                'sscreditscore':{
                    'change_credit_value':'',
                    'credit_type':null,
                    'credit_user_account':null,
                    'credit_user_code':null,
                    'credit_user_id':'',
                    'credit_user_name':'',
                    'credit_value':'',
                    'remark':'',
                    'source_bill_code':null,
                    'source_bill_id':null,
                    'source_bill_type':null,
                    'source_system':null
                }

            };
            $http({
                method: 'POST',
                url: APP_CONFIG.huisuanzhang + '/credit/ssCreditScore/saveCredit',
                headers: {
                    'x-auth-token': sessionStorage.Token
                },
                data: param
            }).success(function(data, status, headers, config) {
                console.log(data);
                if(data.code == "0000") {
                    $scope.xingyong = data;
                    angular.forEach($scope.xingyong.data.datalist, function(item) {
                        item.apply_date = new Date(item.apply_date);
                    });
                    $scope.query.limit = data.data.page_size;
                    $scope.query.page = data.data.page_number;
                } else {
                    $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
                        .textContent('异常:' + data.msg + "(" + data.code + ")"));
                }

            }).error(function(data, status, headers, config) {
                console.log(data);
            });
        }
       // $scope.loadData();

       /* $scope.selected = [];


        function success(desserts) {
            console.log('success');
            $scope.desserts = desserts;
        }

        $scope.getDesserts = function() {
            console.log($scope.query);
            $scope.loadData();
            //$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
        };**/

    }]);
    angular._LoadModule('mdxiugailist');
    return addxiugai;
});