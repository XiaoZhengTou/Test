define(['angular'], function(angular) {
    var location = angular.module('location', []);
    location.controller('airfareLocationCtrl', function($scope,$http,airfarePublic,baseconfig) {
        $scope.city = {
            current: '佛山',
            chinaHot:[],
            chinaCity:[],
            wordHot:['曼谷','首尔','普吉','新加坡','清迈府','济州岛'],
            wordCity:[]
        };
//      var BaseUrl = 'http://172.16.12.213:9091/smart-buy-center-web/';
//      var Token = '?mideatest_sso_token=358dqonuB0uQ13Ggqm2q3CiSGu0l2a%2Fakwt2WvtQnYSKGTKEDkAhBw%3D%3D';
//      var $chinaCityData = 'js/server/json/flightCity.json';
//      var $chinaCityHot = ShangLvUrl + 'data/flight/getCitys.do' + Token;
//      $http.get($chinaCityData).success(function(response){
//              $scope.city.chinaCity = response;
//              console.log($scope.city.chinaCity)
//      });
//         $scope.city.chinaCity=baseconfig.citys;
//         $http.get($chinaCityHot).success(function(response){
//                 //$scope.city.chinaHot = response.data;
//                 var datas = response.data;
//                 for(var i = 0;i< datas.length;i++){
//                 		if(datas[i].hotCityFlag == "1"){
//                 			$scope.city.chinaHot.push(datas[i]);
//                 		}
//                 }
//                 console.log($scope.city.chinaHot)
//             });
        // City List End
        // Set City Begin
		
        $scope.setCity = function (city){
            var cityName = city.cnName;
            var cityId = city.id;
            var cityCode = city.flightCityCode;
            var city = airfarePublic.whichCity; //1 chufa 2 fanhui
            if (city == 1){
            		airfarePublic.selectedCityName1 = cityName;
            		airfarePublic.selectfLightCityCode1 = cityCode;
            }else if(city == 2){
            		airfarePublic.selectedCityName2 = cityName;
            		airfarePublic.selectfLightCityCode2 = cityCode;
            };
            airfarePublic.selectedCityId = cityId;
            $scope.go("/airfare");
        };
        // Set City End
	})	
})