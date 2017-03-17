define(['angular'], function(angular) {
    // Incluede Style In Project Begin
    publicFunction.addStyle('jiehuankuan.css');
    publicFunction.addStyle('md-data-table.min.css');
    // Incluede Style In Project End
    var home = angular.module('home', ['angularMoment']);
    home.controller('jkHomeCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
        // 重置模块面包屑
        $rootScope.crumbInit('/jiehuankuan/jiekuan','首页');
        // 获取当前用户信息
        var currentUser = publicFunction.localGet("user")['data']['user'];
        // 筛选开始
        $scope.filter = {
            allStates : [
                {'id':'SPZ','name':'审核中'},
                {'id':'DHK','name':'待还款'},
                {'id':'YHQ','name':'已还清'},
                {'id':'CG','name':'草稿箱'},
                {'id':'ZF','name':'已作废'}
            ]
        };
        // 筛选结束
        // 表格开始
        // 查询参数
        $scope.query = {
            page_number: 1,
            page_size: 10,
            order_by: 'loan_info_code',
            query_param: {
                status : null,
                reason_desc : null,
                loan_info_code : null,
                fee_apply_code : null,
                apply_date : new Date(moment().add(-3,'month').format('YYYY-MM-DD')),
                expected_repay_date : new Date()
            }
        };
        // 表格结束
        $scope.clearFilter = function(){
            $scope.query.query_param = {
                status : null,
                reason_desc : null,
                loan_info_code : null,
                loan_info_id : null,
                apply_date : new Date(moment().add(-3,'month').format('YYYY-MM-DD')),
                expected_repay_date : new Date()
            }
            $scope.getData();
        }
        // 取数据
        $scope.getData = function(){
            $scope.promise = $timeout(function () {
            }, 500);
            var getconfig = {
                method: 'POST',
                url: feelapplyUrl + 'lm/loan/listMyLoan',
                noLoader : true,
                data : {
                    page_number: $scope.query.page_number,
                    page_size: $scope.query.page_size,
                    order_by: $scope.query.order_by,
                    query_param: {
                        status : $scope.query.query_param.status,
                        reason_desc : $scope.query.query_param.reason_desc,
                        loan_info_code : $scope.query.query_param.loan_info_code,
                        fee_apply_code : $scope.query.query_param.fee_apply_code,
                        begin_date : moment($scope.query.query_param.apply_date).format('YYYY-MM-DD'),
                        end_date : moment($scope.query.query_param.expected_repay_date).format('YYYY-MM-DD'),
                        biz_flag : "0"
                    }
                }
            };
            $http(getconfig).success(function(response){
                $scope.data = response.data.datalist;
                $scope.total = response.data.page.totalRow
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
                    // "tenant_id": currentUser['tenantId'],
                    // "user_id": currentUser['userId'],
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
        // 删除功能开始
        $scope.selected = [];
        $scope.delete = function(ev) {
            var confirm = $mdDialog.confirm()
                .title('确定要删除吗？')
                .textContent('你确定要删除多张借款单吗？这将会从服务器上删除你选定的借款单数据。')
                .ariaLabel('删除确认')
                .targetEvent(ev)
                .ok('是的')
                .cancel('取消');
                $mdDialog.show(confirm).then(function() {
                    // 批量删除开始
                    var viewconfig = {
                        method: 'POST',
                        url: feelapplyUrl + 'lm/loan/deleteLoanBatch',
                        data : {
                            "loan_info_ids" : $scope.selected
                        }
                    };
                    $http(viewconfig).success(function(response){
                        if (response.code == '0000') {
                            $scope.selected = [];
                            console.log(response);
                            $scope.getData();
                        }else{
                            $scope.selected = [];
                            $scope.getData();
                            console.log(response.msg);
                        }
                    });
                    // 批量删除结束
                }, function() {
                  $scope.status = 'You decided to keep your debt.';
                });
          };
        // 删除功能结束
	});
})