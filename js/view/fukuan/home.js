define(['angular'], function(angular) {
    // Incluede Style In Project Begin
    publicFunction.addStyle('jiehuankuan.css');
    publicFunction.addStyle('md-data-table.min.css');
    // Incluede Style In Project End
    var home = angular.module('home', ['angularMoment']);
    home.controller('fkHomeCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
        // 重置模块面包屑
        $rootScope.crumbInit('/duigong/fukuan','首页');
        // 筛选开始
        $scope.filter = {
            orderStates : [
                {'id':'SPZ','name':'审核中'},
                {'id':'DHK','name':'待还款'},
                {'id':'YHQ','name':'已还清'},
                {'id':'CG','name':'草稿箱'},
                {'id':'ZF','name':'已作废'}
            ],
            currency : [
                {'id':'CNY','name':'人民币'},
                {'id':'USD','name':'美金'}
            ]
        };
        // 筛选结束
        // 表格开始
        // 查询参数
        $scope.query = {
            page_number: 1,
            page_size: 10,
            query_param: {
                order_status : null,
                sensitive_info : null,
                currency : null,
                lower_amount : 0,
                higher_amount : 100000,
                pay_info_code : null,
                creation_date : new Date()
            }
        };
        // 表格结束
        $scope.clearFilter = function(){
            $scope.query.query_param = {
                order_status : null,
                sensitive_info : null,
                currency : null,
                lower_amount : 0,
                higher_amount : 1000000,
                pay_info_code : null,
                creation_date : new Date()
            }
        }
        // 取数据
        $scope.getData = function(){
            $scope.promise = $timeout(function () {
            }, 500);
            var getconfig = {
                method: 'POST',
                url: feelapplyUrl + 'pa/EmsPaReqH/pageLikeAsH',
                noLoader : true,
                data : {
                    page_number: $scope.query.page_number,
                    page_size: $scope.query.page_size,
                    query_param : $scope.query.query_param
                }
            };
            getconfig.data.query_param.creation_date = moment(getconfig.data.query_param.creation_date).format('YYYY-MM-DD');
            $http(getconfig).success(function(response){
                $scope.data = response.data.datalist;
                $scope.total = response.data.totalRow
            }).error(function(response){
                console.log('请求失败!') ;
            });
        };
        $scope.getData();
        // 取数据结束
        // 表格结束
        // 查看详情开始
        $scope.view = function(id,code){
            var viewconfig = {
                method: 'POST',
                url: feelapplyUrl + 'lm/loan/getLoan',
                data : {
                    "tenant_id": 11,
                    "user_id": 11,
                    "loan_info_id" : id
                }
            };
            $http(viewconfig).success(function(response){
                if (response.code == '0000') {
                    console.log('查询成功！');
                    jhkPublic.View = response.data.emslmloan;
                    $scope.go('/jiehuankuan/jiekuan/view','借款单(' + code + ')');
                }
            });
        }
        // 查看详情结束
	}).config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.months = ['1月', '2月', '3月','4月', '5月', '6月','7月', '8月', '9月','10月', '11月', '12月'];
        $mdDateLocaleProvider.shortMonths = ['一月', '二月', '三月','四月', '五月', '六月','七月', '八月', '九月','十月', '十一月', '十二月'];
        $mdDateLocaleProvider.days = ['星期天', '星期一','星期二', '星期三','星期四', '星期五','星期六'];
        $mdDateLocaleProvider.shortDays = ['日', '一','二', '三','四', '五','六'];
        $mdDateLocaleProvider.firstDayOfWeek = 0;
    });
})