define(['angular', 'moment', 'momentCN', 'ngMoment'], function(angular) {
	publicFunction.addStyle('tasks.css');
	publicFunction.addStyle('md-data-table.min.css');
	var taskException = angular.module('taskException', ['angularMoment']);
	taskException.controller('taskExceptionCtrl', function($scope, baseconfig) {
		$scope.query={
			num:'',
			dec:'',
			minMoney:'',
			maxMoney:'',
			currency: 'CNY',
			filter: {
				taskGroupList: [{
					'id': 'WXCS',
					'name': '总部五项费用初审组'
				}, {
					'id': 'YYCS',
					'name': '总部运营费用初审组'
				}, {
					'id': 'DECS',
					'name': '总部大额支出初审组'
				}, {
					'id': 'DEFS',
					'name': '总部大额支出复审组'
				}],
				currencys: baseconfig.currencys,
				groupLevelList: [
					{'id':'CS','name':'初审组'},
					{'id':'FS','name':'复审组'}
				],
				taskStateList:[
					{'id':'DFP','name':'待分配'},
					{'id':'DPG','name':'待派工'},
					{'id':'DCL','name':'待处理'},
					{'id':'YBH','name':'已驳回'},
					{'id':'DD','name':'等待'},
					{'id':'YWC','name':'已完成'}
				],
				reimburseList: [
					{'id':'MIP','name':'MIP通讯录'}
				],
				departmentList: [
					{'id':'XZZZ','name':'行政组织'}
				],
				basicItemList: [
					{'id':'123','name':'123'}
				],
				danjuTypeList:[
					{'id':'EC','name':'EC'},
					{'id':'EA','name':'EA'},
					{'id':'LM','name':'LM'},
					{'id':'PA','name':'PA'}
				],
				undistributedTimeList:[
					{'id':'1','name':'1'},
					{'id':'2','name':'2'},
					{'id':'3','name':'3'},
					{'id':'4','name':'4'},
					{'id':'5','name':'5'},
					{'id':'6','name':'6'}
				],
				urgencyList:[
					{'id':'JJ','name':'紧急'},
					{'id':'YB','name':'一般'}
				]
			},
			rcStartData:new Date(),
			rcEndData: new Date(),
			bzStartDate: new Date(),
			bzEndDate: new Date(),
			completeStartDate:new Date(),
			completeEndDate: new Date(),
			taskGroup:'WXCS',
			groupLevel:'CS',
			taskState: 'DFP',
			handler:'',
			reimburse:'MIP',
			department:'XZZZ',
			budgetaryItem:'',
			basicItem:'123',
			danjuType:'EC',
			FromSys: '',
			undistributedTime:'1',
			urgency:'JJ'
			
		}
		
		$scope.selected = [];
		$scope.queryTable = {			
			appdata: [{
				'urgency': '一般',
				'danjuNum': '2015021223',
				'danjuType': 'EC',
				'taskGroup': '总部五项费用组',
				'groupLevel': '初审组',
				'handler': '李云龙',
				'taskState': '未分配',
				'rcTime': '2016-5-17 9:30',
				'sumTime':'0.2',
				'currentTime':'0.2',
				'recordedCompany':'广东美的制冷设备有限公司-总部职能部'
			}, {
				'urgency': '一般',
				'danjuNum': '2015021223',
				'danjuType': 'EC',
				'taskGroup': '总部五项费用组',
				'groupLevel': '初审组',
				'handler': '李云龙',
				'taskState': '未分配',
				'rcTime': '2016-5-17 9:30',
				'sumTime':'0.2',
				'currentTime':'0.2',
				'recordedCompany':'广东美的制冷设备有限公司-总部职能部'
			},{
				'urgency': '一般',
				'danjuNum': '2015021223',
				'danjuType': 'EC',
				'taskGroup': '总部五项费用组',
				'groupLevel': '初审组',
				'handler': '李云龙',
				'taskState': '未分配',
				'rcTime': '2016-5-17 9:30',
				'sumTime':'0.2',
				'currentTime':'0.2',
				'recordedCompany':'广东美的制冷设备有限公司-总部职能部'
			}],
			limit: 5,
			page_number: 1,
			total: 25

		};
		
		$scope.retract = function(){
			alert("收起");
		};
		$scope.find = function(){
			alert("查询")
		}
		

	});
	angular._LoadModule('taskException');
	return taskException;
});