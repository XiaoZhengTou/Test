define(['angular','js/shared/bankaccount.js',
'js/shared/feeapply.js',
'js/shared/ruzhangdanwei.js',
'js/shared/upload.js'], function(angular) {
    var add = angular.module('add', ['angularMoment','md.bankaccount','md.eachoose','md.ruzhangdanwei','md.upload']);
    add.controller('jkAddCtrl',function($scope,$rootScope,$http,$filter,jhkPublic,moment,$timeout,$mdMedia,$mdDialog,publicmodel,uploadFile) {
    	// 初始化选择项开始
    	$scope.NextText = "下一步";
        $scope.currencyList = [
        	{'id':'CNY','name':'人民币'},
            {'id':'USD','name':'美金'}
        ];
        var currentUser = publicFunction.localGet("user")['data']['user'];
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
        	ea : [],
        	ruzhangdanwei : {}
        }
        $scope.clearBank = function(){
        	$scope.add.bank = {};
        }
        $scope.clearEa = function(){
            $scope.add.ea = [];
        }
        $scope.clearRuzhangdanwei = function(){
            $scope.add.ruzhangdanwei = {};
        }
        // 初始化选择项结束
        // 分期计算开始
        $scope.calcFenqi = function(){
        	$scope.qishuItems = [];
        	$scope.qishuData = [];
        	var amount = $scope.add.amount;
        	var qishu = $scope.add.qishu;
        	var x = (!$scope.add.fenqiamount || $scope.add.fenqiamount=='') ? (amount/qishu).toFixed(0) : $scope.add.fenqiamount;
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
	        		repay_plan_id:null,
			        loan_info_id:null,
			        remark: null,
			        repay_type: "3",
        		}
        		$scope.qishuItems.push(item);
        		$scope.qishuData.push(item2);
        	}
        }
        // 分期计算结束
        $scope.next = function(dostring){
            console.log($scope.add.ruzhangdanwei);
        	// 数据拼接开始
        	var postdata = {
				"emslmloan":{
        		  	"loan_info_id": null,
                    "order_template_id" : null,
                    "order_template_name" : null,
				    "apply_by": currentUser['userId'],
                    "apply_name": currentUser['userName'],
                    "biz_flag" : "0",
				    "org_id": "1",
				    "org_name": "IT管理部",
				    "form_template_id": null,
				    "form_template_name": null,
				    "amount": $scope.add.amount,
				    "currency_code": $scope.add.currency,
				    "currency_name": $scope.currencyName($scope.add.currency).name,
				    "expected_repay_date": $scope.add.type == 1 ? moment($scope.add.onetimedate).format('YYYY-MM-DD') : $scope.qishuItems[$scope.qishuItems.length - 1].which_month,
				    "receiver": $scope.add.bank.receiver,
				    "bank_name": $scope.add.bank.bank_name,
				    "bank_account": $scope.add.bank.id,
                    "vendor_type" : $scope.add.bank.vendor_type,
				    "sensitive_info": $scope.add.desc,
				    "is_instalments_pay": $scope.add.type == 1 ? 'N' : 'Y',
				    "month_amt": $scope.add.type == 2 ? ($scope.add.fenqiamount=='' ? ($scope.add.amount/$scope.add.qishu).toFixed(0):$scope.add.fenqiamount) : $scope.add.amount,
				    "monthes": $scope.add.type == 2 ? $scope.add.qishu : null,
				    "month_repay_date": $scope.add.type == 2 ? moment($scope.add.fenqidate).format('YYYY-MM-DD') : null,
                    "company_id" : $scope.add.ruzhangdanwei.company_id ? $scope.add.ruzhangdanwei.company_id : null,
                    "ou_id" : $scope.add.ruzhangdanwei.external_org_id,
                    "proxy_user" : $scope.add.ruzhangdanwei.proxy_user,
				    "emslmloanexts": [],
				    "emslmloanrepayplans": $scope.qishuData
        		}
        	}
            // 获取表单数据开始
            $http({
                method: 'POST',
                url: feelapplyUrl + 'cm/formTemplate/getFormTemplates',
                data: publicmodel.TemplateModel.JieKuan,
            }).success(function(data, status, headers, config){
                if (data.code == "0000") {
                    postdata.emslmloan.form_template_id = data.data.info[0].form_template_id;
                    postdata.emslmloan.order_template_id = data.data.info[0].order_template_id;
                    postdata.emslmloan.order_template_name = data.data.info[0].order_template_name;
                    postdata.emslmloan.form_template_name = data.data.info[0].form_template_name;
                    // 数据保存开始
                    var getconfig = {
                        method: 'POST',
                        url: feelapplyUrl + 'lm/loan/saveLoan',
                        data : postdata
                    };
                    $http(getconfig).success(function(response){
                        if (response.code == '0000') {
                            console.log('恭喜你，保存成功！');
                            jhkPublic.ShenPi.forminstanceid = response.data.emslmloan.formInstanceId;
                            jhkPublic.ShenPi.formid = postdata.emslmloan.form_template_id;
                            $scope.NextText = "数据保存成功，开始启动校验……";
                            
                            
                            if($scope.files.length > 0){
                            	$http({
	                            	method: "POST",
	                            	url: piaojiaTestUrl + "expense/save",
	                            	data: {
									 "source_order_id": response.data.emslmloan.loan_info_id,
									 "source_order_code": response.data.emslmloan.loan_info_code,
									 "source_system": "Expense",
									 "source_order_type": "LM",
									 "resultList": $scope.data
	                            	}
	                            }).success(function(response){
	                            	console.log(response);
	                            });
                            }
                            
                            
                            if (dostring && dostring == 'save') {
                                $scope.go('/jiehuankuan/jiekuan');
                            }else{
                                jhkPublic.ShenPi.forminstanceid = response.data.emslmloan.formInstanceId;
                                jhkPublic.Add = response.data.emslmloan;
                                var loadid = response.data.emslmloan.loan_info_id;
                                var jyconfig = {
                                    method: 'POST',
                                    url: feelapplyUrl + 'lm/loan/checkLoan',
                                    data : {
                                        "loan_info_id" : loadid
                                    }
                                };
                                $http(jyconfig).success(function(response){
                                    if (response.code == '0000') {
                                        console.log("校验成功！");
                                        $scope.NextText = "数据校验通过，开始启动流程……";
                                        var lcconfig =  {
                                            method: 'POST',
                                            url: feelapplyUrl + 'lm/loan/startLoan',
                                            data : {
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
                    // 数据保存结束
                }else{
                    return;
                }
            });
            // 获取表单数据结束
        	// 数据拼接结束
        }
        
        
        $scope.files = [];
        $scope.data = [];
        
        $scope.openDialog = function(ev){
        	 var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        	 
		    $mdDialog.show({
		      controller: DialogController,
		      templateUrl: 'templates/jiekuan/dialog.html',
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      locals: {
		           files: $scope.files,
		           data: $scope.data
		      },
		      clickOutsideToClose:true,
		      fullscreen: useFullScreen
		    }).then(function(answer){
		    }, function(){
		    	$scope.files.length = 0;
		    	$scope.data.length = 0;
		    });
		    
		    $scope.$watch(function() {
		      return $mdMedia('xs') || $mdMedia('sm');
		    }, function(wantsFullScreen) {
		      $scope.customFullscreen = (wantsFullScreen === true);
		    });
        }
        
        function DialogController($scope, $mdDialog,files,data) {
		  $scope.hide = function(){
		    $mdDialog.hide();
		  };
		  $scope.cancel = function(){
		    $mdDialog.cancel();
		  };
		  
		  $scope.selectFile = function(){
		  	document.getElementById("files").click();
		  }
		  
		  $scope.files = files;
		  $scope.data = data;
		  var i = 1;
		  
		  $scope.fileHandle = function(){
	        var file = uploadFile.files.pop();
	        var reader = new FileReader();
	       
			reader.onload = function(loadEvent){
				$scope.$apply(function (){
					$scope.files.push({base64: loadEvent.target.result});
					
					$scope.data.push({
					  "oper_type": "add",
					  "image_id": "",
					  "image_index": i,
					  "source_filename": file.name,
					  "file_type": file.name.split('.')[1],
					  "filecontent": loadEvent.target.result.split(',')[1]
					});
					
					i++;
			   });
			}
			
			if(typeof(file) === 'object'){
				reader.readAsDataURL(file);
			}
		  }
		  
		  $scope.save = function(){
		  	$mdDialog.hide("save");
		  }
		
          $scope.removeImg = function(event,index){
          	event.stopPropagation();
          	event.preventDefault();
          	
          	$scope.files.splice(index,1);
          	$scope.data.splice(index,1);
          }
        
        }
        
	});
})