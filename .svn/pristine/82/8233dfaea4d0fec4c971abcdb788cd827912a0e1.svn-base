define(['angular','moment','momentCN','ngMoment','js/view/jiudian/home','js/view/jiudian/result','js/view/jiudian/detail','js/view/jiudian/order','js/view/jiudian/confirm','js/view/jiudian/complete'], function (angular) {
    var jiudian = angular.module('jiudian', ['home','result','detail','order','confirm','complete','angularMoment']);
    jiudian.run(function($http){
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
    }).config(function ($routeProvider, $locationProvider,$httpProvider) {
        $httpProvider.defaults.timeout = 5000;
        $routeProvider
            .when('/shanglv/jiudian/result', {
                templateUrl: 'templates/jiudian/result.html'
            })
            .when('/shanglv/jiudian/order', {
                templateUrl: 'templates/jiudian/order.html'
            })
            .when('/shanglv/jiudian/confirm', {
                templateUrl: 'templates/jiudian/order_confirm.html'
            })
            .when('/shanglv/jiudian/complete', {
                templateUrl: 'templates/jiudian/order_complete.html'
            })
            .when('/shanglv/jiudian/orderlist', {
                templateUrl: 'templates/jiudian/orderList.html'
            })
            .when('/shanglv/jiudian/detail', {
                templateUrl: 'templates/jiudian/detail.html'
            })
            .when('/shanglv/jiudian/commit', {
                templateUrl: 'templates/jiudian/commit.html'
            })
            .otherwise({
                redirectTo: '/shanglv/jiudian'
        });
    })
    .controller('jdCtrl',function($scope,moment,jdPublic,$filter,publicmodel,$mdDialog){
        // window.onbeforeunload = confirmExit;
        //     function confirmExit(){
        //         alert("本系统属于单页面系统，如果你关闭或刷新这个页面，你已经选择的酒店和房型信息会需要你重新选择，你确定要关闭或是刷新这个页面吗？");
        //         return false;
        // }
        // 选项设置开始
        $scope._date = {
            // 时间设置开始
            dateCalc : function(x,days){
                var y = moment(x).add(days,'day');
                return new Date(y);
            },
            updateRange : function(){
                // 初始化checkInDate
                if (jdPublic.Data.checkInDate) {
                    $scope._date.checkInDate = new Date(jdPublic.Data.checkInDate);
                }else {
                    $scope._date.checkInDate = new Date();
                    jdPublic.Data.checkInDate = $filter('date')($scope._date.checkInDate, "yyyy-MM-dd"); 
                }
                // 初始化checkout日期
                if (jdPublic.Data.checkOutDate) {
                    $scope._date.checkOutDate = new Date(jdPublic.Data.checkOutDate);
                }else {
                    $scope._date.checkOutDate = $scope._date.dateCalc($scope.checkInDate,3);
                    jdPublic.Data.checkOutDate = $filter('date')($scope._date.checkOutDate, "yyyy-MM-dd");
                }
                // 设定最大提前预定时间和最大预订天数
                var rentDaysBefore = 60;
                var maxRentDay = 30;
                // 设定开始预订时间
                $scope._date.checkInMinDate = new Date();
                $scope._date.checkInMaxDate = $scope._date.dateCalc($scope._date.checkInMinDate,rentDaysBefore);

                // 设定结束预订时间
                var y = maxRentDay + rentDaysBefore;
                $scope._date.checkOutMinDate = $scope._date.dateCalc($scope._date.checkInDate,1);
                $scope._date.checkOutMaxDate = $scope._date.dateCalc($scope._date.checkInDate,y);
            },
            // 入住时间开始
            checkInDate : '',
            checkInMinDate : '',
            checkInMaxDate : '',
            checkInChange : function(){
                jdPublic.Data.checkInDate = $filter('date')($scope._date.checkInDate, "yyyy-MM-dd");
                if ($scope._date.checkOutDate <= $scope._date.checkInDate) {
                    // 同步更改离开日期
                    $scope._date.checkOutDate = $scope._date.dateCalc($scope._date.checkInDate,3);
                    jdPublic.Data.checkOutDate = $filter('date')($scope._date.checkOutDate, "yyyy-MM-dd");
                }
                // 更新可选择范围
                $scope._date.updateRange();
            },
            // 入住时间结束
            // 离开时间开始
            checkOutDate : '',
            checkOutMinDate : '',
            checkOutMaxDate : '',
            checkOutChange : function(){
                jdPublic.Data.checkOutDate = $filter('date')($scope._date.checkOutDate, "yyyy-MM-dd");
            },
            // 离开时间结束
            // 时间设置结束
        }
        // 选项设置结束
    }).directive('switch', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                    element.parent().children().removeClass('active');
                    element.addClass('active');
            })
        },
    }
    }).directive('switchOnly', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('click', function() {
                if (element.hasClass('active')) {
                    element.removeClass('active');
                }else {
                    element.parent().children().removeClass('active');
                    element.addClass('active');
                }
            })
        },
    }
    });
   angular._LoadModule('jiudian');
   return jiudian;
});