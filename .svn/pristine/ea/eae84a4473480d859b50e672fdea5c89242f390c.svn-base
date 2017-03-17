define(['angular','js/shared/bankaccount.js',
'js/shared/feeapply.js'], function(angular) {
    var add = angular.module('add', ['angularMoment','md.bankaccount','md.eachoose']);
    add.controller('jkAddCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdDialog) {
    	// 初始化选择项开始
    	$scope.NextText = "下一步";
        $scope.currencyList = [
        	{'id':'CNY','name':'人民币'},
            {'id':'USD','name':'美金'}
        ];
        $scope.currencyName = function(id){
		  for (var i = 0; i < $scope.currencyList.length; i++) {
		    if ($scope.currencyList[i].id === id) {
		      return $scope.currencyList[i];
		    }
		  }
		};
        $scope.payType = [
        	{'id':'1','name':'一次还清'},
            {'id':'2','name':'分期还款'}
        ];
        $scope.fenqi = [
        	{'id':'3','name':'3期'},
        	{'id':'6','name':'6期'},
        	{'id':'12','name':'12期'},
        	{'id':'18','name':'18期'},
        	{'id':'24','name':'24期'},
            {'id':'36','name':'36期'}
        ];
        $scope.add = {
        	amount : '',
        	currency : '',
        	desc : '',
        	type : '',
        	onetimedate : new Date(),
        	fenqidate : new Date(),
        	fenqiamount : '',
        	qishu : '',
        	bank : {},
        	ea : {},
        	ruzhanginfo : {}
        }
        $scope.clearBank = function(){
        	$scope.add.bank = {};
        }
        // 初始化选择项结束
        // 分期计算开始
        $scope.calcFenqi = function(){
        	$scope.qishuItems = [];
        	$scope.qishuData = [];
        	var amount = $scope.add.amount;
        	var qishu = $scope.add.qishu;
        	var x = $scope.add.fenqiamount=='' ? (amount/qishu).toFixed(0) : $scope.add.fenqiamount;
        	if (amount == '' || amount == 0 || x == '' || x == 0) {
        		return;
        	}
        	var d = $scope.add.fenqidate; //计算还款日期
        	for(var j = 1; j <= qishu; j++){
        		var item = {
	        		num : j,
	        		amount : (j==qishu) ? (amount - (j - 1) * x).toFixed(0) : x,
	        		which_month : moment(d).add(j-1,'month').format('YYYY-MM-DD'),
	        		shengyu : (j==qishu) ? 0 : (amount - j * x).toFixed(0),

        		}
        		var item2 = {
        			amount : (j==qishu) ? (amount - (j - 1) * x).toFixed(0) : x,
	        		which_month : moment(d).add(j-1,'month').format('YYYY-MM-DD'),
	        		repay_plan_id:'',
			        loan_info_id:'',
			        remark: '',
			        repay_type: 3,
        		}
        		$scope.qishuItems.push(item);
        		$scope.qishuData.push(item2);
        	}
        }
        // 分期计算结束
        $scope.next = function(dostring){
        	// 数据拼接开始
        	var postdata = {
				"emslmloan":{
        		  	"loan_info_id": null,
				    "apply_by": "1",
				    "apply_name": "刘信强",
				    "org_id": "1",
				    "org_name": "IT管理部",
				    "form_template_id": "LM_PERSONPAY",
				    "form_template_name": "个人借款",
				    "amount": $scope.add.amount,
				    "currency_code": $scope.add.currency,
				    "currency_name": $scope.currencyName($scope.add.currency).name,
				    "expected_repay_date": $scope.add.type == 1 ? moment($scope.add.onetimedate).format('YYYY-MM-DD') : $scope.qishuItems[$scope.qishuItems.length - 1].which_month,
				    "receiver": $scope.add.bank.receiver,
				    "bank_name": $scope.add.bank.bank_name,
				    "bank_account": $scope.add.bank.id,
				    "sensitive_info": $scope.add.desc,
				    "is_instalments_pay": $scope.add.type == 1 ? 'N' : 'Y',
				    "month_amt": $scope.add.type == 2 ? ($scope.add.fenqiamount=='' ? ($scope.add.amount/$scope.add.qishu).toFixed(0):$scope.add.fenqiamount) : $scope.add.amount,
				    "monthes": $scope.add.type == 2 ? $scope.add.qishu : null,
				    "month_repay_date": $scope.add.type == 2 ? moment($scope.add.fenqidate).format('YYYY-MM-DD') : null,
				    "emslmloanexts": [],
				    "emslmloanrepayplans": $scope.qishuData,
        		}
        	}
        	var getconfig = {
                method: 'POST',
                url: feelapplyUrl + 'lm/loan/saveLoan',
                data : postdata
            };
            $http(getconfig).success(function(response){
                if (response.code == '0000') {
                	console.log('恭喜你，保存成功！');
                	$scope.NextText = "数据保存成功，开始启动校验……";
                	if (dostring && dostring == 'save') {
                		$scope.go('/jiehuankuan/jiekuan');
                	}else{
                		jhkPublic.Add = response.data.emslmloan;
                		var loadid = response.data.emslmloan.loan_info_id;
                		var jyconfig = {
			                method: 'POST',
			                url: feelapplyUrl + 'lm/loan/checkLoan',
			                data : {
			                	"tenant_id": 11,
 								"user_id": 11,
			                	"loan_info_id" : loadid
			                }
			            };
			            $http(getconfig).success(function(response){
			            	if (response.code == '0000') {
			            		console.log("校验成功！");
			            		$scope.NextText = "数据校验通过，开始启动流程……";
			            		var lcconfig =  {
					                method: 'POST',
					                url: feelapplyUrl + 'lm/loan/startLoan',
					                data : {
										"tenant_id": 11,
										"user_id": 11,
										"loan_info_id": loadid,
										"process_def_id": 11,
										"process_def_name": "11"
					                }
					            };
					             $http(lcconfig).success(function(response){
					             	if (response.code == '0000'){
					            		console.log("流程启动成功！");
					            		$scope.NextText = "流程启动成功！";
					            		$scope.go("/jiehuankuan/jiekuan/shenpi",'选择审批人');
					            	}
					             });
			            	}
			            }).error(function(response){
			                console.log('校验失败!') ;
			            });
                	}
                }else{
                	console.log('保存失败，原因是：' + response.msg);
                }
            }).error(function(response){
                console.log('请求失败!') ;
            });
        	// 数据拼接结束
        }
	});
})