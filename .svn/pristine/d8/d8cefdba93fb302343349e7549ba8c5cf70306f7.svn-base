define(['angular','js/shared/ruzhangdanwei.js','js/shared/currency.js','js/shared/organization.js'], function(angular) {
	var home = angular.module("home",['md.ruzhangdanwei','mdcurrency','mdorganization']);
	home.controller("governHomeCrl",['$scope','$rootScope','$http','$mdDialog','governPublic',function($scope,$rootScope,$http,$mdDialog,governPublic){
		publicFunction.addStyle('airfare.css');
		
		// 重置模块面包屑
        $rootScope.crumbInit('feeapply/govern','首页');
		
		//导接口状态
		$scope.interfaceState = [
			{name:"已取消",id:"CANCELLED"},
			{name:"取消失败",id:"CANCEL_FAILED"},
			{name:"失败",id:"FAILED"},
			{name:"处理中",id:"PROCESSING"},
			{name:"成功",id:"SUCCESS"},
		];
		
		//支付单状态
		$scope.payState = [
			{name:"未支付",id:"UNPAID"},
			{name:"部分支付",id:"PART_PAID"},
			{name:"已支付",id:"PAID"},
			{name:"已还款",id:"REPAID	"},
			{name:"部分还款",id:"PART_REPAY"},
		]
		
		
		$scope.stateFlag = true;
		$scope.state = function(){
			if($scope.stateFlag){
				$scope.stateFlag = false;
			}else{
				$scope.stateFlag = true;
			};
		};
		   	
       	
   	  	var noParameters = {
		   		query_param:{
								
				},
		   		tenant_id:null
	       	};
       	
       	//获取数据
	   	$scope.load = function(parameter){
       		$http({ 
       			method: 'POST',
                url: APP_CONFIG.huisuanzhang + 'pay/SsLmLoan/pageQuery',
                //url: 'http://10.73.8.33:8080/smart-accounting-web/pay/SsLmLoan/pageQuery',
                noLoader : true,
                data : parameter    
			}).success(function(data, status, headers, config) {
				console.log(data)
				$scope.datas=data.data.info;
			}).error(function(data, status, headers, config) {
				console.log(data);
			});
       	}
       	$scope.load(noParameters);
       	
       	
       	//改变时间格式
	   	$scope.data = function(chooseTime){
		   if(chooseTime){
			   	var date = new Date(chooseTime);
			    var year = date.getFullYear();
			    var month = date.getMonth()+1;   
			    var date1 = date.getDate(); 
				return year+"-"+month+"-"+date1;
		   }
		}
       
       	//查询数据
       	$scope.refer = function(){
       		//判断是否选择入账单位
       		if($scope.ruzhangdanwei != undefined){
       			$scope.company_id = $scope.ruzhangdanwei.company_id;
       		};
       		//判断是否选择申请人
       		if($scope.orgs != undefined){
       			$scope.apply_by = $scope.orgs.tenant_id;
       		}

       		var aParameters = {
		   		query_param:{
					loan_info_code:$scope.loan_info_code,
					company_id:$scope.company_id,
					loan_amount_from:$scope.loan_amount_from,
					loan_amount_to:$scope.loan_amount_to,
					apply_date_from:$scope.data($scope.apply_date_from),
					apply_date_to:$scope.data($scope.apply_date_to),
					apply_by:$scope.apply_by,
					reason_desc:$scope.reason_desc,
					biz_status:$scope.biz_status,
					import_erp_status:$scope.import_erp_status,
					},
		   		tenant_id:null
	       	};
	       	$scope.load(aParameters);
       	}
       	
       	
       	
       	//全选，取消全选
       	$scope.selected = [];
       	
       	//提交付款申请
        $scope.onSubmit = function(ev){
    	   		var confirm = $mdDialog.confirm()
                .title('')
                .textContent('你确定要提交付款申请吗')
                .ariaLabel('删除确认')
                .targetEvent(ev)
                .ok('是的')
                .cancel('取消');
                $mdDialog.show(confirm).then(function() {
	             
                }, function() {
                 
                });
    	   	
    	    }
        
        //付款申请信息详情
		$scope.details = function(id){
			governPublic.loan_info_id = id;
			if(governPublic.loan_info_id.length > 0){
				$scope.go('/govern/list','付款信息');
			}
		};
		
		//新增付款申请
		$scope.onGoList = function(){
			governPublic.loan_info_id = null;
			$scope.go('/govern/list','付款信息');
		}
		
    }]);
	
});
