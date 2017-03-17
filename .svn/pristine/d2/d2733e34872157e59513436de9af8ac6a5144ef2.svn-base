define(['angular'], function(angular) {
	var orderList = angular.module("orderList",[]);
	orderList.controller("ordersListCtrl",function($scope,$http,$cookies){
		
		$scope.priortys = [1,2,3,4,5,6,7,8,9];
		
		//设置时间
       	$scope.newTime =  new Date();
	    $scope.beginTime =  new Date();
       	$scope.endTime =  new Date();
       	
       	//新增数据
       	$scope.arr = [{
       		selectedType:"qingxuanze",
			selMoney:false,
			selRest:false,
       	}];
       	//选择表单类型
       	$scope.listType = 'deploy';
       	$scope.deployFlag = true;
       	$scope.SQLFlag = false;
       	
       	$scope.selListType = function(){
       		if(	$scope.listType == 'deploy'){
       			$scope.deployFlag = true;
       			$scope.SQLFlag = false;
       		}else{
       			$scope.deployFlag = false;
       			$scope.SQLFlag = true;
       		}
       		
       	};
       	
       	//新增数据
		$scope.listSel = ['模块','单据类型','核算组织','预算组织','行政组织','来源系统','基础科目','金额','业务类型','活动事项','预算主体','预算主体层级','产品线','流程模板','预算科目'];
		
		
		//$scope.selTime = false;
		$scope.selMoney = false;
		
		//获取单据类型
		$http({ 
			method: 'POST',
            url: APP_CONFIG.huisuanzhang + 'task/SsTmBillType/pageQuery',
            noLoader : true,
			data: {
				query_param:{		
				}
			},
			headers: {
				'x-auth-token': sessionStorage.Token
			}
		}).success(function(data, status, headers, config) {
			$scope.bils = data.data.info;
		}).error(function(data, status, headers, config) {
			console.log(data);
		});
		
		//获取核算组织类型
		$http({ 
			method: 'POST',
            url: APP_CONFIG.JIEBAO_URL+'/docker/company/queryAllPage',
            noLoader : true,
			data: {
				page_number:1,
                page_size:100
			},
			headers: {
				'x-auth-token': sessionStorage.Token
			}
		}).success(function(data, status, headers, config) {
			$scope.comps = data.data.info;
		}).error(function(data, status, headers, config) {
			console.log(data);
		});
		
		//获取预算组织类型
		$http({ 
			method: 'POST',
            url: APP_CONFIG.JIEBAO_URL+'/docker/busiorg/ys/select',
            noLoader : true,
			data: {
				busi_org_code:null,
				busi_org_name:null,
				page_number:1,
                page_size:100
			},
			headers: {
				'x-auth-token': sessionStorage.Token
			}
		}).success(function(data, status, headers, config) {
			$scope.busis = data.data.info;
		}).error(function(data, status, headers, config) {
			console.log(data);
		});
		
		//获取基础科目类型
		$http({ 
			method: 'POST',
            url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/quotefs/select',
            noLoader : true,
			data: {
				bill_type_code:null,
				bill_type_name:null,
				page_number:1,
                page_size:100
			},
			headers: {
				'x-auth-token': sessionStorage.Token
			}
		}).success(function(data, status, headers, config) {
			$scope.bills = data.data.info;
		}).error(function(data, status, headers, config) {
			console.log(data);
		});

		//获取活动事项类型
		$http({ 
			method: 'GET',
            url: APP_CONFIG.JIEBAO_URL+'/docker/feetype/active/queryParentAndChild',
            noLoader : true,
			data: {
			
			},
			headers: {
				'x-auth-token': sessionStorage.Token
			}
		}).success(function(data, status, headers, config) {
			if(data.data.data.length > 0){
				$scope.ecos = data.data.data[0].childs;
			}
			
		}).error(function(data, status, headers, config) {
			console.log(data);
		});
		
		
	    $scope.sel;
		$scope.changed = function(item){
			item.module_type_flag = false;
			item.order_type_flag = false;
			item.comp_flag = false;
			item.busi_org_flag = false;
			item.orgId_flag = false;
			item.sourceId_flag = false;
			item.bill_flag = false;
			item.biz_type_flag = false;
			item.eco_flag = false;
	        if(item.selectedType != undefined){
	        	if(item.selectedType=="金额"){
					item.selMoney = true;
		        }else{
					item.selMoney = false;
		        }
		        
		        //判断模块类型
		        if(item.selectedType=="金额"){
		        	$scope.sel = "jine";
		        }else if(item.selectedType=="模块"){
		        	$scope.sel = "mokuai";
		        	item.module_type_flag = true;	
		        }else if(item.selectedType=="单据类型"){
		        	$scope.sel = "danju";
		        	item.order_type_flag = true;
		        }else if(item.selectedType=="核算组织"){
		        	$scope.sel = "hesuan";
		        	item.comp_flag = true;
		        }else if(item.selectedType=="预算组织"){
		        	$scope.sel = "yusuan";
		        	item.busi_org_flag = true;
		        }else if(item.selectedType=="行政组织"){
		        	$scope.sel = "xingzheng";
		        	item.orgId_flag = true;
		        }else if(item.selectedType=="来源系统"){
		        	$scope.sel = "laiyuan";
		        	item.sourceId_flag = true;
		        }else if(item.selectedType=="基础科目"){
		        	$scope.sel = "jichu";
		        	item.bill_flag = true;
		        }else if(item.selectedType=="业务类型"){
		        	$scope.sel = "yewuleixing";
		        	item.biz_type_flag = true;
		        }else if(item.selectedType=="活动事项"){
		        	$scope.sel = "huodong";
		        	item.eco_flag = true;
		        }else if(item.selectedType=="预算主体"){
		        	$scope.sel = "yusuanzhuti";
		        }else if(item.selectedType=="预算主体层级"){
		        	$scope.sel = "jiceng";
		        }else if(item.selectedType=="产品线"){
		        	$scope.sel = "chanpinxian";
		        }else if(item.selectedType=="流程模板"){
		        	$scope.sel = "liuchengmuban";
		        }else if(item.selectedType=="预算科目"){
		        	$scope.sel = "yuesuankemu";
		        	
		        };
	        };
	    };
		
	    $scope.addData = function(){
	    	$scope.module_type_flag = false;
			$scope.order_type_flag = false;
			$scope.comp_flag = false;
			$scope.orgId_flag = false;
			$scope.sourceId_flag = false;
			$scope.bill_flag = false;
			$scope.biz_type_flag = false;
			$scope.eco_flag = false;
	    	$scope.add = {
	       		selectedType:$scope.sel,
	       		selTime:$scope.selTime,
				selMoney:$scope.selMoney,
				order_type:$scope.order_type,
				comp:$scope.comp,
				busi_org:$scope.busi_org,
				orgId:$scope.orgId,
				sourceId:$scope.sourceId,
				bill:$scope.bill,
				startValue:$scope.startValue,
				endValue:$scope.endValue,
				biz_type:$scope.biz_type,
				eco:$scope.eco,
	        };
	    	if($scope.arr.length<=15){
	    		$scope.arr.push($scope.add);
	    	}
	    }
	    
	    //获取所选的单据类型
	    $scope.orderTypedChange = function(item){
	    	$scope.order_type = item.order_type;
	    };
	    
	    //获取所选的核算组织
	    $scope.compChange = function(item){
	    	$scope.comp = item.comp;
	    };
	    
	    //获取所选的预算组织
	    $scope.busiOrgChange = function(item){
	    	$scope.busi_org = item.busi_org;
	    };
	    
	    //获取所选的基础科目
	    $scope.billChange = function(item){
	    	$scope.bill_type = item.bill;
	    };
	    
	    //获取所输入的模块
	    $scope.moduleIdsChange = function(item){
	    	$scope.module_type = item.module_type;
	    };
	    
	    //获取所输入的行政组织
	    $scope.orgIdChange = function(item){
	    	$scope.orgId = item.orgId;
	    };
	    
	    //获取所输入的来源系统
	    $scope.sourceIdChange = function(item){
	    	$scope.sourceId = item.sourceId;
	    };
	    
	    //获取所输入的金额（起）
	    $scope.startValueChange = function(item){
	    	$scope.startValue = item.startValue;
	    };
	    
	    //获取所输入的金额（止）
	    $scope.endValueChange = function(item){
	    	$scope.endValue = item.endValue;
	    };
	    
	    //获取所输入的业务类型
	    $scope.bizTypeChange = function(item){
	    	$scope.biz_type = item.biz_type;
	    };
	    
	    //获取所输入的业务类型
	    $scope.ecoChange = function(item){
	    	$scope.eco_type = item.eco;
	    };
	    
	    $scope.save = function(){
	    	var aParameters = {
	       		sstaskrule:{
	       			order:[{
	       				_desc:null,
	       				_type:$scope.order_type,
	       				_value:null
	       			}],	
	       			comp:[{
	       				_desc:null,
	       				_type:$scope.comp,
	       				_value:null
	       			}],	
	       			busi:[{
	       				_desc:null,
	       				_type:$scope.busi_org,
	       				_value:null
	       			}],
	       			moduleId:[{
	       				_desc:null,
	       				_type:$scope.module_type,
	       				_value:null
	       			}],
	       			orgId:[{
	       				_desc:null,
	       				_type:$scope.orgId,
	       				_value:null
	       			}],
	       			bill:[{
	       				_desc:null,
	       				_type:$scope.bill_type,
	       				_value:null
	       			}],
	       			bill:[{
	       				_desc:null,
	       				_type:null,
	       				_value:$scope.startValue+"#"+$scope.endValue
	       			}],
	       			biz:[{
	       				_desc:null,
	       				_type:$scope.biz_type,
	       				_value:null
	       			}],
	       			eco:[{
	       				_desc:null,
	       				_type:$scope.eco_type,
	       				_value:null
	       			}],
				}
       		};
       	
	   $scope.load = function(parameter){
       		$http({ 
	       			method: 'POST',
	                url: APP_CONFIG.huisuanzhang + 'task/SsTmTaskPool/pageQuery',
	                noLoader : true,
	                data : parameter,
	                headers: {
						'x-auth-token': sessionStorage.Token
					}
				}).success(function(data, status, headers, config) {
					console.log(data);
				}).error(function(data, status, headers, config) {
					console.log(data);
				});
	       	}
	       	$scope.load(aParameters);
	    }
	    
    });
	
});