define(['angular','js/view/choosecitys.js'], function(angular) {
    // Incluede Style In Project Begin
    publicFunction.addStyle('jiudian.css');
    // Incluede Style In Project End
    var home = angular.module('home', ['angularMoment','muchoosecitys']);
    home.controller('jdHomeCtrl', function($scope,$rootScope,$http,$filter,jdPublic,moment,$mdDialog) {
        // 重置模块面包屑
        $rootScope.crumbInit('/shanglv/jiudian','首页');
        // 日期初始化
        $scope._date.updateRange();
        // 城市选择开始
        $scope.selectCity = jdPublic.Data.cityName;
        $scope.$watch("city1", function(newValue, oldValue) {
            if ((newValue !== oldValue) && !(newValue['cityId'] == '')) {
                $scope.selectCity = newValue['text'];
                jdPublic.Data.cityName = newValue['text'];
                jdPublic.Data.cityId = newValue['cityId'];
            }
        });
        // 城市选择结束
        // 关键词开始
        $scope.keyword = jdPublic.Data.keyWord;
        $scope.search = function(){
            jdPublic.Data.keyWord = $scope.keyword;
            jdPublic.Hotils.newSearch = true;
            var title = jdPublic.Data.cityName + '的酒店';
            $scope.go('/shanglv/jiudian/result',title);
        }
        // 关键词结束
	});
})