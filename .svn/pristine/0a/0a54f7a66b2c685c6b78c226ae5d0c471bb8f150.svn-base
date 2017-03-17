define(['angular'], function(angular) {
    var location = angular.module('location', []);
    location.controller('jdLocationCtrl', function($scope,$http,jdPublic) {
        // $scope.city = {
        //     current: '佛山',
        //     chinaHot:[],
        //     chinaCity:[],
        //     wordHot:['曼谷','首尔','普吉','新加坡','清迈府','济州岛'],
        //     wordCity:[]
        // };
        //var $chinaCityData = 'js/server/json/chinaCityLetter.json';
        // var $chinaCityHot = ShangLvUrl + 'data/hotel/getCitys.do' + ShangLvToken + '&hotCityFlag=1';
        // $http.get($chinaCityData).success(function(response){
        //         $scope.city.chinaCity = response;
        // });
        //console.log($scope.city.chinaCity);
        // $scope.litters=[];
        // angular.forEach($scope.city.chinaCity, function(value,index) {
        //     if(value.header){
        //         this.push({name:value.text,i:index});
        //     }
        // }, $scope.litters);
        // // console.log($scope.litters);
        // $scope.nowletter=null;
        // $scope.someFunction=function(evt){
        //     var divY=evt.changedTouches[0].clientY;//实时屏幕坐标Y
        //     var divH=evt.path[1].children[0].clientHeight;//字母div高度
        //     var objDivs=evt.path[1].children;//字母数组
        //     var parentDiv=evt.target.parentElement;
        //     var parentH=parentDiv.offsetHeight;
        //     var parentTop=92;
        //     if(divY>=parentTop&&divY<=(parentH+parentTop)){
        //         var letterndex=(divY-parentTop)/divH;
        //         if(letterndex<objDivs.length){
        //             $scope.letter=objDivs[parseInt(letterndex)].innerHTML;
        //             if($scope.nowletter!=$scope.letter){
        //                 $scope.nowletter=$scope.letter;
        //                 angular.forEach($scope.litters, function(value) {
        //                     if(value.name==$scope.letter){
        //                         $scope.topIndex = value.i;
        //                         return;
        //                     }
        //                 });
        //             }
        //
        //         }
        //     }
        // }
        // $scope.cityheight={
        //         'height':((document.documentElement.clientHeight)-92)+"px",
        //     };

        //console.log(document.body.querySelector('.jd-letter'));
        // $http.get($chinaCityHot).success(function(response){
        //         $scope.city.chinaHot = response.data;
        //     });
        // City List End
        // Set City Begin
        $scope.onSetIndex=function(index){
            $scope.topIndex = index;
            console.log(index);
        };

        $scope.setCity = function (city){

            if(!city.header){
                // console.log(city);
                var cityName = city.text;
                var cityId = city.code;
                jdPublic.selectedCityName = cityName;
                jdPublic.selectedCityId = cityId;
                $scope.go("/jiudian");
            }

        }
        console.log('location');
        // Set City End
	});
});