/**
 * Created by admin on 2016/9/1.
 */
define(['angular'], function(angular) {
    var addbiangen = angular.module('mdbiangenlist', []);
    addbiangen.controller('biangenctrl', ['$scope', '$http', '$filter', '$mdDialog', function($scope, $http, $filter, $mdDialog) {
        $scope.query = {
            change_credit_value: null,
            limit: 10,
            page: 1,
            credit_type: null,
            credit_user_account: null,
            begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
            end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),
            credit_user_code: null,
            credit_user_id: null,
            created_name:null,
            credit_id:null
        };
        $scope.credit_id=null;
        $scope.loadData = function() {
            var param = {
               'credit_id':null

            };
            $http({
                method: 'POST',
                url: APP_CONFIG.huisuanzhang + '/credit/ssCreditScore/getCreditLog',
                headers: {
                    'x-auth-token': sessionStorage.Token
                },
                data: {
                    'credit_id':'47405970564841472'
                }
            }).success(function(data, status, headers, config) {
                console.log(data);
                if(data.code == "0000") {
                    $scope.xingyong = data;

                } else {
                    $mdDialog.show($mdDialog.alert().title('提交结果').ok('关闭')
                        .textContent('异常:' + data.msg + "(" + data.code + ")"));
                }

            }).error(function(data, status, headers, config) {
                console.log(data);
            });
        };
        $scope.loadData()
    }]);
    angular._LoadModule('mdbiangenlist');
    return addbiangen;
});