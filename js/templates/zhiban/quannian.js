/**
 * Created by admin on 2016/8/24.
 */
/**
 * Created by admin on 2016/8/19.
 */
define(['angular','js/view/choosecitys.js'], function(angular) {
    var app=angular.module('QuannianApp',[]);
    app.controller('quannianController', ['$scope', '$http', '$filter', '$mdDialog','$mdMedia', function ( $scope,$http,$filter,$mdDialog,$mdMedia) {
        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1,
            reason_desc: null,
            apply_name: null,
            begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
            end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),

        };
        $scope.selected = [];
        $scope.loadData = function() {
            var param = {
                "tenant_id": null,
                "user_id": null,
                "page_number": $scope.query.page,
                "page_size": $scope.query.limit,
                "query_param": {
                    "reason_desc": $scope.query.reason_desc,
                    "apply_name": $scope.query.apply_name,
                    "begin_date": $filter('date')($scope.query.begin_date, 'yyyy-MM-dd'),
                    "end_date": $filter('date')($scope.query.end_date, 'yyyy-MM-dd'),


                }
            };
            $http({
                method: 'POST',
                url: APP_CONFIG.huisuanzhang + '/manage/personal/duty/list',
                headers: {
                    'x-auth-token': sessionStorage.Token
                },
                data: param
            }).success(function(data, status, headers, config) {
                console.log(data);
                if(data.code == "0000") {
                    $scope.zhibanlist = data;
                    angular.forEach($scope.zhibanlist.data.data_list, function(item) {
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
        $scope.getDesserts = function() {
            console.log($scope.query);
            $scope.loadData();
            //$scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
        };

        $scope.selected = [];

        $scope.query = {
            order: 'name',
            limit: 5,
            page: 1
        };

        function success(desserts) {
            $scope.desserts = desserts;
        }
    }])

    /**
     Copyright 2016 Google Inc. All Rights Reserved.
     Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
     **/
    angular._LoadModule('QuannianApp');
    return app


})