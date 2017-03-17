define(['angular'], function(angular) {
    var result = angular.module('result', ['angularMoment']);
    result.controller('jdResultCtrl', function($scope,$http,$timeout,$filter,jdPublic,$timeout,moment) {
        // 酒店搜索开始
        $scope.hotils = {
            error : false,
            detailLoading : false,
            loading : false,
            total : jdPublic.Hotils.total,
            list : jdPublic.Hotils.list,
            pageIndex : jdPublic.Hotils.pageIndex
        };

        $scope.hotilSearch = function (searchMod){
            if (searchMod != 'load') {
                $scope.hotils.total = 0;
                $scope.hotils.list = [];
                $scope.hotils.pageIndex = 1;
            }
            $scope.hotils.loading = true;
            var url = ShangLvUrl + 'data/hotel/queryHotels.do' + '?cityId=' + jdPublic.Data.cityId + '&cityName=' + encodeURIComponent(jdPublic.Data.cityName) + '&checkInDate=' + jdPublic.Data.checkInDate + '&checkOutDate=' + jdPublic.Data.checkOutDate + '&hotelName=' + encodeURIComponent(jdPublic.Data.keyWord) + '&landmarkType=' + jdPublic.Data.landMark.type + '&landmarkId=' + jdPublic.Data.landMark.id + '&businessAreaId=' + jdPublic.Data.businessAreaId + '&districtId=' + jdPublic.Data.districtId + '&priceRange=' + jdPublic.Data.priceRange + '&starCode=' + jdPublic.Data.star + '&brandID=' + jdPublic.Data.hotilBrand + '&pageIndex=' + $scope.hotils.pageIndex + '&pageCount=10' + '&vendorNumber=' + jdPublic.Data.vendor;
            var local = 'js/server/json/hotil_1.json'
            $http.get(url,{timeout:10000,noLoader:true}).success(function(response){
                $scope.hotils.loading = false;
                if (response.resultFlag == "0") {
                    console.log("数据加载失败!");
                    return;
                }else{
                    if (searchMod == 'load') {
                        $scope.hotils = {
                            total : response.data.total,
                            list : $scope.hotils.list.concat(response.data.hotelList),
                            pageIndex : $scope.hotils.pageIndex + 1
                        }   
                    }else{
                        $scope.hotils = {
                            total : response.data.total,
                            list : response.data.hotelList,
                            pageIndex : $scope.hotils.pageIndex + 1
                        }
                    }
                }
            }).error(function(response){
                $scope.hotils.loading = false;
                console.log("与服务器连接失败！");
                $scope.hotils.error = true;
            });    
        };
        // 判断是否需要一加载页面就开始搜索
        if (jdPublic.Hotils.newSearch) {
            $scope.hotilSearch();
            jdPublic.Hotils.newSearch = false;
        }
        // 酒店搜索结束
        // 选项数据开始
        $scope.filter = {
            priceOption : [],
            vendor : [],
            landMarkType : [],
            star :[]
        };
        $http.get('js/server/json/option.json').success(function(response){
            $scope.filter.priceOption = response.jiudian.priceRange;
            $scope.filter.vendor = response.jiudian.vendor;
            $scope.filter.landMarkType = response.jiudian.landMarkType;
            $scope.filter.star = response.jiudian.star;
        });
        // 选项数据结束
        // 选项设置开始
        $scope.selected = {
            vendor : jdPublic.Data.vendor,
            priceRange : jdPublic.Data.priceRange,
            landMark : jdPublic.Data.landMark,
            star : jdPublic.Data.star,
            hotilBrands : [],
            subLandMarks :[],
            subLandMarksSub : [],
            showSub : false,
            setVendor : function(){
                jdPublic.Data.vendor = $scope.selected.vendor;
                $scope.selected.getHotilBrand();
                $scope.hotilSearch();
            },
            setPriceRange : function(x,y,z){
                if (x == 'clear') {
                    $scope.selected.priceRange = '';
                }
                if (x == 'custom') {
                    var from = y;
                    var to = z;
                    $scope.selected.priceRange = y + '-' + z;
                }   
                jdPublic.Data.priceRange = $scope.selected.priceRange;
                $scope.hotilSearch();
            },
            getLandMark : function(x){
                $scope.selected.subLandMarks = [];
                $scope.selected.subLandMarksSub = [];
                var $url = ShangLvUrl + 'data/hotel/selectLandmarks.do' + '?vendorNumber=' + jdPublic.Data.vendor + '&cityId=' + jdPublic.Data.cityId +'&locateKey=' + x;
                $http.get($url).success(
                function(response){
                    if (response.resultFlag == '1') {
                        $scope.selected.showSub = true;
                        $scope.selected.subLandMarks = response.data.landMarks;
                    }else{
                        alert(response.resultMsg);
                    }
                });
            },
            setLandMark : function(x,id,type,pid,subid){
                $scope.selected.subLandMarksSub = [];

                // 清除已选择数据
                jdPublic.Data.businessAreaId = '';
                jdPublic.Data.districtId = '';
                jdPublic.Data.landMark = {
                    id : '',
                    type : ''
                };
                if (x == 'clear') {
                    $scope.selected.showSub = false;
                }
                // 如果是地铁站的地标类型，则获取子数据
                if (type == "1" && !pid){
                    var $url = ShangLvUrl + 'data/hotel/selectLandmarks.do' + '?vendorNumber=' + jdPublic.Data.vendor + '&cityId=' + jdPublic.Data.cityId +'&locateKey=' + type  + '&landmarkPid=' + id;
                    $http.get($url).success(
                        function(response){
                        $scope.selected.subLandMarksSub = response.data.landMarks;
                    });
                }else{
                    if (type == "21") {
                        jdPublic.Data.businessAreaId = subid;
                    }
                    if (type == "20") {
                        jdPublic.Data.districtId = subid;
                    }
                    $scope.selected.landMark = {
                        id : id,
                        type : type
                    };
                    jdPublic.Data.landMark = $scope.selected.landMark;
                    $scope.selected.showSub = false;
                    $scope.hotilSearch();
                }
            },
            toggerStar : function(item, list){
            	console.log(list)
                var idx = list.indexOf(item);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
                else {
                    list.push(item);
                }
                jdPublic.Data.star = $scope.selected.star;
                console.log($scope.selected.star)
                $scope.hotilSearch();
            },
            existStar : function(item, list){
                return list.indexOf(item) > -1;
            },
            clearStar : function(list){
                $scope.selected.star = [];
                jdPublic.Data.star = [];
                $scope.hotilSearch();
            },
            getHotilBrand : function(){
                $scope.selected.hotilBrand = '';
                $scope.selected.hotilBrands = [];
                var $url = ShangLvUrl + 'data/hotel/listHotelBrands.do' + '?vendorNumber=' + jdPublic.Data.vendor;
                $http.get($url).success(
                function(response){
                    if (response.resultFlag == '1') {
                        $scope.selected.hotilBrands = response.data;
                    }else{
                        alert(response.resultMsg);
                    }
                });
            },
            setHotilBrand : function(x){
                if (x == 'clear') {
                    $scope.selected.hotilBrand = '';
                }
                jdPublic.Data.hotilBrand = $scope.selected.hotilBrand;
                $scope.showMore = false;
                $scope.hotilSearch();
            }
        }
        $scope.selected.getHotilBrand();
        // 选项设置结束

        // 日期初始化
        $scope._date.updateRange();

        // 城市选择开始
        $scope.selectCity = jdPublic.Data.cityName;
        $scope.$watch("city1", function(newValue, oldValue) {
            if (newValue !== oldValue) {
                $scope.selectCity = newValue['text'];
                jdPublic.Data.cityName = newValue['text'];
                jdPublic.Data.cityId = newValue['cityId'];
            }
        });
        // 城市选择结束
        // 关键词开始
        $scope.keyword = jdPublic.Data.keyWord;
        $scope.keywordChange = function(){
            jdPublic.Data.keyWord = $scope.keyword;
        }
        // 关键词结束
        // 查看酒店详细信息开始
        $scope.curIndex = 0;
        $scope.viewDetail = function(index,id,mod,name,pic,address,all){
            $scope.curIndex = index;
            // 存数据
            jdPublic.Hotils.pageIndex = $scope.hotils.pageIndex;
            jdPublic.Hotils.total = $scope.hotils.total;
            jdPublic.Hotils.list = $scope.hotils.list;

            // 选数据
            if (mod && (mod == 'add')) {
                var hotil = {
                    name : name,
                    code : id,
                    pic : pic,
                    address : address
                }
                jdPublic.Hotils.viewed.push(hotil);
            }

            // 将当前酒店ID存入公共区域
            jdPublic.Hotils.selected = {
                name : name,
                code : id,
                pic : pic,
                address : address,
                all : all
            };
            // 获取数据开始
            $scope.hotils.detailLoading = true;
            var url = ShangLvUrl + 'data/hotel/getHotelDetail.do' + '?hotelCode=' + jdPublic.Hotils.selected['code'] + '&checkInDate=' + jdPublic.Data.checkInDate + '&checkOutDate=' + jdPublic.Data.checkOutDate + '&vendor=' + jdPublic.Data.vendor + '&cityId=' + jdPublic.Data.cityId;
            $http.get(url,{timeout:10000,noLoader:true}).success(function(response){
                if (response.resultFlag == 1) {
                    jdPublic.Detail.data = response.data;
                    $scope.go('/shanglv/jiudian/detail',response.data.hotelCNName);
                }else{
                    console.log(response.resultMsg);
                }
                $scope.hotils.detailLoading = false;
            }).error(function(response){
                $scope.hotils.detailLoading = false;
                console.log('数据获取错误！')
            });
            // 跳转
        }
        // 查看酒店详细信息结束
	});
})