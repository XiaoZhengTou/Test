define(['angular','ngBaidu','swiper','ngSwiper'], function(angular) {
    publicFunction.addStyle('swiper.min.css');
    var detail = angular.module('detail', ['angularMoment','ksSwiper','baiduMap']);
    detail.controller('jdDetailCtrl', function($scope,$filter,jdPublic,moment,$http) {
        // 日期初始化
        $scope._date.updateRange();
         $scope.swiper = {};
        $scope.slideTo = function(x){
            $scope.swiper.slideTo(x);
        };
        $scope.shangyiye = function(){
            $scope.go('/shanglv/jiudian/result/');
        }
        // 获取酒店详细信息开始
        $scope.detail = {
            data : jdPublic.Detail.data,
            loader : false,
            error : false,
            map : false,
            reGetRooms : function(){
                $scope.detail.loader = true;
                var url = ShangLvUrl + 'data/hotel/getHotelDetail.do' + '?hotelCode=' + jdPublic.Hotils.selected['code'] + '&checkInDate=' + jdPublic.Data.checkInDate + '&checkOutDate=' + jdPublic.Data.checkOutDate + '&vendor=' + jdPublic.Data.vendor + '&cityId=' + jdPublic.Data.cityId;
                $http.get(url,{timeout:10000}).success(function(response){
                    $scope.detail.loader = false;
                    jdPublic.Detail.data = response.data;
                    // 取数据
                    $scope.detail.data.hotelRoomList = response.data.hotelRoomList;
                }).error(function(response){
                    $scope.detail.loader = false;
                    console.log('数据获取错误！')
                });
            },
            getAverage : function(x){
                var sum = 0;
                for( var i = 0; i < x.length; i++ ){
                    sum += parseInt( x[i]['price'], 10 );
                }
                var aver = sum/x.length;
                return aver.toFixed(0);
            },
            order : function(item,info,room){
                jdPublic.Detail.selectPrice = item;
                // 设置房型信息
                jdPublic.Detail.selectRoom = {
                    name : room.roomName,
                    bedType : room.bedType,
                    internet : room.intent,
                    roomCode : room.roomCode,
                    ratePlanID : info.ratePlanID,
                    supplierCode : info.supplierCode,
                    payType : info.payType,
                    break : info.hasBreakfast,
                    currency :info.currency,
                    refund : info.garanteeDescription
                };
                var title = $filter('date')(item.sellDate, "yyyy-MM-dd");
                $scope.go('/shanglv/jiudian/order',title);
            }
        }
        // 获取酒店详细信息结束
        // 地图开始
        if ($scope.detail.data.longitude && $scope.detail.data.longitude) {
            $scope.detail.map = true;
            $scope.offlineOpts = {
                retryInterval: 10000,
                txt: '抱歉，没有找到给区域的地图信息……'
            };
            // 地图开始
            var longitude = $scope.detail.data.longitude;
            var latitude = $scope.detail.data.latitude;
            $scope.mapOptions = {
                city: 'GuangZhou',
                enableScrollWheelZoom: false,
                center: {
                    longitude: longitude,
                    latitude: latitude
                },
                zoom: 17,
                markers: [{
                    longitude: longitude,
                    latitude: latitude,
                    icon: 'img/mappiont.png',
                    width: 49,
                    height: 60,
                    title: $scope.detail.data.hotelCNName,
                    content: '<p>电话：' + $scope.detail.data.hotelPhone + '</p>' + '<p>酒店地址：' + $scope.detail.data.hotelAddress + '</p>',
                    enableMessage: true
                }]
            };
            $scope.loadMap = function(map) {
            };
            // 地图结束
        }else{

        }
	})	
})