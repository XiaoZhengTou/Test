define(['angular', 'moment', 'momentCN', 'ngMoment','js/view/choosecitys.js','js/view/train/list','js/view/train/buy','js/view/train/home','js/view/train/result'], function(angular) {
	var train = angular.module('train', ['angularMoment', 'muchoosecitys','list','buy','home','result']);
	publicFunction.addStyle('airfare.css');
    train.run(function($http){
    	//	add public.css
        $http.defaults.headers.common["X-Auth-Token"] = sessionStorage.Token;
        $http.defaults.headers.common["Content-Type"] = "application/json";
    });
    
    
    train.config(function ($routeProvider, $locationProvider) {
        $routeProvider.when('/train/list', {
                templateUrl: 'templates/train/list.html'
            }).when('/train/buy', {
                templateUrl: 'templates/train/buy.html'
            }).when('/train/result', {
                templateUrl: 'templates/train/result.html'
            });
    }).controller('trainCrl',function($scope,$http,$rootScope,airfarePublic,$filter,$mdDialog){
    	// 弹出提示框
		$scope.showConfirm = function(ev, title, content, ok, cancel, okFunction, cacelFunction) {
			var confirm = $mdDialog.confirm()
				.title(title)
				.textContent(content)
				.ariaLabel('Dialog')
				.targetEvent(ev)
				.ok(ok)
				.cancel(cancel);
			$mdDialog.show(confirm).then(function() {
				if (okFunction) {
					okFunction();
				}
			}, function() {
				if (cacelFunction) {
					cacelFunction();
				}
			});
		};
		$scope.showAlert = function(ev, title, content, ok,okFunction) {
			var alert = $mdDialog.alert()
				.title(title)
				.textContent(content)
				.ariaLabel('Dialog')
				.targetEvent(ev)
				.ok(ok)
			$mdDialog.show(alert).then(function() {
				if (okFunction) {
					okFunction();
				}
			});
		};
    });
    train.filter('getOrderStatus', function() {
		return function(orderStatus) {
			switch (orderStatus) {
				case 1:
					return '待支付';
				case 2:
					return '出票中';
				case 3:
					return '出票成功';
				case 4:
					return '订单已取消';
				case 5:
					return '出票失败';
				default:
					return '未知';
			}
		}
	});
    angular._LoadModule('train');
	return train;
});