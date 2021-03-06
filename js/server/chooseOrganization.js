/**
 * Created by chao on 2016/6/21.
 */
define(['angular'], function (angular) {
    var view = angular.module('chooseOrg', []);
    //组织架构
    view.directive('mideagroup', ['$mdMedia', '$mdDialog', '$http', '$parse', 'publicmodel', function ($mdMedia, $mdDialog, $http, $parse, publicmodel) {
        return {
            link: function (scope, element, attrs) {
                element[0].addEventListener('click', function (ev) {
                    $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'view/common/organization.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: true
                    }).then(function (answer) {
                        //截取传过来的ng-model
                        console.log(answer);
                        var models = attrs.ngModel.split('.');
                        if (models.length > 0) {
                            //根据传过来的ng-model进行赋值
                            var model = scope[models[0]];
                            for (var i = 1; i < models.length; i++) {
                                model = model[models[i]];
                            }
                            for (var j = 0; j < model.length; j++) {
                                if (model[j].id == answer.id) {
                                    return;
                                }
                            }
                            model.push(answer);
                        }
                    }, function () {

                    });
                    function DialogController($scope, $mdDialog) {
                        $scope.hide = function () {
                            $mdDialog.hide();
                        };
                        $scope.cancel = function () {
                            $mdDialog.cancel();
                        };
                        $scope.answer = function (answer) {
                            $mdDialog.hide(answer);
                        };

                        $scope.getDate = function (pid) {
                            // pid=(pid==null?"":pid;
                            console.log(pid);
                            var url = organizationUrl + 'docker/tenantorg/queryOrgUsersByOrgId?org_id=' + pid;
                            $scope.showloading = true;
                            console.log(publicmodel.TokenOrg);
                            //$http.defaults.headers.common["x-auth-token"] = publicmodel.TokenOrg;
                            $http({
                                method: 'GET',
                                url: url,
                                headers: {
                                    'x-auth-token': publicmodel.TokenOrg
                                }
                            }).success(function (data, status, headers, config) {
                                console.log(data);
                                if (data.data.paths && data.data.paths.length) {
                                    $scope.orgData = data;
                                }

                                $scope.showloading = false;
                            }).error(function (data, status, headers, config) {
                                $scope.showloading = false;
                            });

                        }
                        $scope.getDate("");
                        $scope.onSearch = function (key) {
                            if (key) {
                                key = encodeURIComponent(encodeURIComponent(key));
                                if (key) {
                                    var url = organizationUrl + 'docker/userinfo/queryUserListByName?user_name=' + key;
                                    //$http.defaults.headers.common["x-auth-token"] = publicmodel.TokenOrg;
                                    $http({
                                        method: 'GET',
                                        url: url,
                                        headers: {
                                            'x-auth-token': publicmodel.TokenOrg
                                        }
                                    }).success(function (data, status, headers, config) {
                                        console.log(data);
                                        $scope.orgData = {
                                            data: {
                                                users: data.data.list
                                            }
                                        };
                                        console.log($scope.orgData);
                                        //$scope.orgData=data;
                                        $scope.showloading = false;
                                    }).error(function (data, status, headers, config) {
                                        $scope.showloading = false;
                                    });
                                }
                            } else {
                                $scope.getDate("");
                            }

                        }

                    }
                }, false);
            }
        }
    }]);
    return view;
});