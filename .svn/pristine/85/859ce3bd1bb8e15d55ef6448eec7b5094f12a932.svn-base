define(['angular','js/view/choosepassenger.js'], function(angular) {
    var order = angular.module('order', ['angularMoment','muchoosepassengers']);
    order.controller('jdOrderCtrl', function($scope,$http,jdPublic,publicmodel,moment) {
        // 获取获取到的订单信息开始
        $scope.order = {
            // 从公共对象中获取数据开始
            hotil : jdPublic.Hotils.selected,
            room : jdPublic.Detail.selectRoom,
            price : jdPublic.Detail.selectPrice,
            checkInDate : jdPublic.Data.checkInDate,
            checkOutDate : jdPublic.Data.checkOutDate,
            verdor : jdPublic.Data.vendor,
            // 从公共对象中获取对象结束
            // 计算入住天数
            days : moment(jdPublic.Data.checkOutDate).diff(moment(jdPublic.Data.checkInDate), 'days'),
            // 计算入住天数结束
            // 入住人员信息获取开始
            roomNum : 1,
            passengers : [],
            // 入住人员信息获取结束
            // 联系人信息开始
            user : {
                cnName : '',
                mobile : '',
                earlystime : new Date(moment().hours(15).minute(0)),
                latestime : new Date(moment().hours(18).minute(0))
            },
            // 联系人信息结束
            // 支付方式开始
            remark : null,
            payment : 1,
            // 支付方式结束
            // 等调试完成后下面的方法会被删除
            checkOrder : function(){
                $scope.go('/shanglv/jiudian/confirm','确认订单');
            }
        }
        console.log($scope.order.days);
        $scope.passengers = {
            list : publicmodel.Passengers,
            select : {},
            view : function(index){
                $scope.passengers.select = $scope.order.passengers[index];
            },
            del : function(index){
                $scope.passengers.list.splice(index, 1);
                $scope.passengers.select = null;
                publicmodel.Passengers = $scope.passengers.list;
            }
        };
        $scope.setUser = function(x){
            $scope.order.user.cnName = x.cnName;
            $scope.order.user.mobile = x.mobile;
        }
    	// 获取获取到的订单信息结束
        // 设置付款方式开始
        $scope.paymentMethod = [
            {id:"1",name:"前台现付"},
            {id:"2",name:"公司支付"}
        ];
        // 设置付款方式结束
        // 设置发票抬头信息开始
        $http.get('js/server/json/option.json').success(function(response){
            $scope.fapiao = response.common.fapiao;
        });
        // 设置发票抬头信息结束
        // 校验订单开始
        $scope.jiaoYan = function(){
            var priceList = [];
            priceList[0] = $scope.order.price;
            priceList = JSON.stringify(priceList);
            $http({
                url: ShangLvUrl + "data/hotel/checkHotelPrice.do",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    "hotelCode": $scope.order.hotil.code,
                    "roomCode": $scope.order.room.roomCode,
                    "ratePlanID": $scope.order.room.ratePlanID,
                    "supplierCode": $scope.order.room.supplierCode,
                    "checkInDate": $scope.order.checkInDate,
                    "checkOutDate": $scope.order.checkOutDate,
                    "roomNum": $scope.order.roomNum,
                    "vendor": $scope.order.verdor,
                    "datePriceList": priceList
                })
            }).then(function(response){
                if (response.data.resultFlag == "1") {
                    console.log('校验成功！');
                    // 提交订单开始
                    passengerList = JSON.stringify($scope.order.passengers);
                    hotelInfo = JSON.stringify(jdPublic.Hotils.selected.all);
                    $http({
                        url: ShangLvUrl + "data/hotel/createHotelOrder.do",
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "orderNo" : null,
                            "vendorOrderNo": null,
                            "hotelCode": $scope.order.hotil.code,
                            "roomCode": $scope.order.room.roomCode,
                            "ratePlanID": $scope.order.room.ratePlanID,
                            "supplierCode": $scope.order.room.supplierCode,
                            "checkInDate": $scope.order.checkInDate,
                            "checkOutDate": $scope.order.checkOutDate,
                            "mipAccount": null,
                            "payType" : $scope.order.payment,
                            "roomNum": $scope.order.roomNum,
                            "passengerNum" : $scope.order.passengers.length,
                            "orderStatus": null,
                            "firstArriveTime" : moment($scope.order.user.earlystime).format('YYYY-MM-DD HH:mm'),
                            "lastArriveTime" : moment($scope.order.user.latestime).format('YYYY-MM-DD HH:mm'),
                            "remark" : $scope.order.remark,
                            "vendor": $scope.order.verdor,
                            "currency": "CNY",
                            "totalAmount" : $scope.order.roomNum * $scope.order.price * $scope.order.days,
                            "contactName" : $scope.order.user.cnName,
                            "mobile" : $scope.order.user.mobile,
                            "email" : $scope.order.passengers[0].email,
                            "creditInfo": null,
                            "passengerList" : passengerList,
                            "datePriceList": priceList,
                            "hotelInfo": hotelInfo,
                            "cityCnName" : jdPublic.Data.cityName,
                            "cityEnName": null,
                            "cityId" : jdPublic.Data.cityId
                        })
                    }).then(function(response){
                        if (response.data.resultFlag == "1"){
                            console.log('订单创建成功！');
                            jdPublic.Order = response.data.data;
                            $scope.go('/shanglv/jiudian/confirm','订单创建成功');
                        }else{
                           alert(response.data.resultMsg);
                        }
                    });
                   // 订单提交结束
                }else{
                   // 订单提交开始
                   alert(response.data.resultMsg);
                }
            });
        };
        // 校验订单结束
	})	
})