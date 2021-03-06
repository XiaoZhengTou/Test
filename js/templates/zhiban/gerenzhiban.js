/**
 * Created by admin on 2016/8/24.
 */
/**
 * Created by admin on 2016/8/19.
 */
define(['angular','js/view/choosecitys.js'], function(angular) {
  var app=angular.module('MyApp',[]);
  app.controller('zhibanController1', ['$scope', '$http', '$filter', '$mdDialog','$mdMedia', function ( $scope,$http,$filter,$mdDialog,$mdMedia) {
    $scope.query = {
      order: 'name',
      limit: 10,
      page: 1,
      reason_desc: null,
      apply_name: null,
      begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
      end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),

    };
    $scope.selected1 = [];
    $scope.selected2 = [];
    $scope.selected3 = [];
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

    //编辑
    $scope.edit = function(ev,item) {
      console.log(item);
      var pageindex = $scope.pageindex;
      var pagesize = $scope.pagesize;
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController2,
        templateUrl: 'templates/zhiban/quannian.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
          .then(function(item) {
            if(item !='' && item != undefined){
              $mdToast.show(
                  $mdToast.simple()
                      .textContent(item)
                      .position('top right')
                      .hideDelay(1500)
              );
            }
          });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
      function DialogController2($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.numberChips=[];
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
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
          zhidu_reim_code:null
        };
        $scope.answer = function(answer) {
          var getconfig = {
            method: 'PUT',
            url: APP_CONFIG.CDP_URL+'/docker/rest/u',
            headers: {
              'x-auth-token': $cookies.get("JSESSION")
            },
            data:{
              "note": $scope.resource.note,
              "status": $scope.resource.status,
              "name": $scope.resource.name,
              "url": $scope.resource.url,
              "id":$scope.resource.id
            }
          };
          $http(getconfig)
              .success(function(data, status, headers, config) {
                $scope.content=headers('x-auth-token');
                if($scope.content!=''&&$scope.content!=null){
                  $cookies.put('JSESSION', $scope.content);
                }
                if(data.code=='0000'){
                  //alert('修改成功！');
                  $mdDialog.hide('修改成功！');
                  getapp1(pageindex,pagesize);
                }else if(data.code=='0401'){
                  if(data.msg == '未登录.'){
                    $cookies.remove("managerId");
                    $cookies.remove("tenantId");
                    $cookies.remove("JSESSION");
                    $cookies.remove("userId");
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                  }

                }else if(data.code=='6666'){

                }else{
                  alert(data.msg)
                }

              })
              .error(function(data, status, headers, config) {
                //alert(status)
              });
        };
      }
    }

  }]).controller('zhibanController2', ['$scope', '$http', '$filter', '$mdDialog','$mdMedia', function ( $scope,$http,$filter,$mdDialog,$mdMedia) {
    $scope.query = {
      order: 'name',
      limit: 10,
      page: 1,
      apply_name: null,
      start_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
      end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),

    };
    $scope.selected1 = [];
    $scope.selected2 = [];
    $scope.selected3 = [];
    $scope.loadData = function() {
      var param = {
        "apply_by": null,
        "page_number": null,
        "apply_name": $scope.query.apply_name,
        "start_date": null,
        "end_date": null,
        'sche_year':null



      };
      $http({
        method: 'POST',
        url: 'http://10.16.30.74:8080/smart-accounting-web/manage/personal/exec/page',
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

    //编辑
    $scope.edit = function(ev,item) {
      console.log(item);
      var pageindex = $scope.pageindex;
      var pagesize = $scope.pagesize;
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController2,
        templateUrl: 'templates/zhiban/quannian.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
          .then(function(item) {
            if(item !='' && item != undefined){
              $mdToast.show(
                  $mdToast.simple()
                      .textContent(item)
                      .position('top right')
                      .hideDelay(1500)
              );
            }
          });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
      function DialogController2($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.numberChips=[];
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
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
          zhidu_reim_code:null
        };
        $scope.answer = function(answer) {
          var getconfig = {
            method: 'PUT',
            url: APP_CONFIG.CDP_URL+'/docker/rest/u',
            headers: {
              'x-auth-token': $cookies.get("JSESSION")
            },
            data:{
              "note": $scope.resource.note,
              "status": $scope.resource.status,
              "name": $scope.resource.name,
              "url": $scope.resource.url,
              "id":$scope.resource.id
            }
          };
          $http(getconfig)
              .success(function(data, status, headers, config) {
                $scope.content=headers('x-auth-token');
                if($scope.content!=''&&$scope.content!=null){
                  $cookies.put('JSESSION', $scope.content);
                }
                if(data.code=='0000'){
                  //alert('修改成功！');
                  $mdDialog.hide('修改成功！');
                  getapp1(pageindex,pagesize);
                }else if(data.code=='0401'){
                  if(data.msg == '未登录.'){
                    $cookies.remove("managerId");
                    $cookies.remove("tenantId");
                    $cookies.remove("JSESSION");
                    $cookies.remove("userId");
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                  }

                }else if(data.code=='6666'){

                }else{
                  alert(data.msg)
                }

              })
              .error(function(data, status, headers, config) {
                //alert(status)
              });
        };
      }
    }

  }]).controller('zhibanController3', ['$scope', '$http', '$filter', '$mdDialog','$mdMedia', function ( $scope,$http,$filter,$mdDialog,$mdMedia) {
    $scope.query = {
      order: 'name',
      limit: 10,
      page: 1,
      reason_desc: null,
      apply_name: null,
      begin_date: new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()),
      end_date: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()),

    };
    $scope.selected1 = [];
    $scope.selected2 = [];
    $scope.selected3 = [];
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
        url: APP_CONFIG.huisuanzhang + '/manage/personal/holiday/page',
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

    //编辑
    $scope.edit = function(ev,item) {
      console.log(item);
      var pageindex = $scope.pageindex;
      var pagesize = $scope.pagesize;
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
        controller: DialogController2,
        templateUrl: 'templates/zhiban/quannian.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
          .then(function(item) {
            if(item !='' && item != undefined){
              $mdToast.show(
                  $mdToast.simple()
                      .textContent(item)
                      .position('top right')
                      .hideDelay(1500)
              );
            }
          });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
      function DialogController2($scope, $mdDialog) {
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.numberChips=[];
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
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
          zhidu_reim_code:null
        };
        $scope.answer = function(answer) {
          var getconfig = {
            method: 'PUT',
            url: APP_CONFIG.CDP_URL+'/docker/rest/u',
            headers: {
              'x-auth-token': $cookies.get("JSESSION")
            },
            data:{
              "note": $scope.resource.note,
              "status": $scope.resource.status,
              "name": $scope.resource.name,
              "url": $scope.resource.url,
              "id":$scope.resource.id
            }
          };
          $http(getconfig)
              .success(function(data, status, headers, config) {
                $scope.content=headers('x-auth-token');
                if($scope.content!=''&&$scope.content!=null){
                  $cookies.put('JSESSION', $scope.content);
                }
                if(data.code=='0000'){
                  //alert('修改成功！');
                  $mdDialog.hide('修改成功！');
                  getapp1(pageindex,pagesize);
                }else if(data.code=='0401'){
                  if(data.msg == '未登录.'){
                    $cookies.remove("managerId");
                    $cookies.remove("tenantId");
                    $cookies.remove("JSESSION");
                    $cookies.remove("userId");
                    window.location.href=APP_CONFIG.FRONT_URL+"/index.html#/login"
                  }

                }else if(data.code=='6666'){

                }else{
                  alert(data.msg)
                }

              })
              .error(function(data, status, headers, config) {
                //alert(status)
              });
        };
      }
    }

  }]);

    /**
     Copyright 2016 Google Inc. All Rights Reserved.
     Use of this source code is governed by an MIT-style license that can be foundin the LICENSE file at http://material.angularjs.org/HEAD/license.
     **/
    angular._LoadModule('MyApp');
  return app

})