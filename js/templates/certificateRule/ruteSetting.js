define(['angular'], function(angular) {
	var ruleSetting= angular.module('ruleSetting', []);
	ruleSetting.controller('ruleSettingCtrl', function($scope) {

		
		$scope.query={
			type:'BX',
			budgetCompany:'BX',
			payCompany:'BX',
			filter:{
				typeList:[{
				'id':'BX','name':'不限'
			},{
				'id':'OR11','name':'ORACLE 11i'
			},{
				'id':'OR12','name':'ORACLE R12'
			},{
				'id':'SAP','name':'SAP'
			},{
				'id':'YY6.0','name':'用友 NC6.0'
			},{
				'id':'YY6.2','name':'用友 NC6.2'
			},{
				'id':'JD','name':'金蝶 EBS'
			}],
			budgetCompanyList:[{'id': 'BX', 'name': '不限'},{
				'id':'MD','name':'广东美的制冷设备有限公司'
			}],
			payCompany:[{
				'id':'BX','name':'不限'
			},{
				'id':'MD','name':'广东美的制冷设备有限公司'
			}]
			
			}
		}
	
		$scope.cerificateList = [{
			num:'凭证1',
			company:'入账单位：预算单位',
			type:'凭证类型：AP应付'
		},{
			num:'凭证2',
			company:'入账单位：预算单位',
			type:'凭证类型：AP应付'
		}];
	
	
		$scope.selected = [];
		$scope.queryTable = {
			appdata: [{
				'jiedai': '借',
				'circulation': '',
				'rule': '',
				'value': '行预算单元对应科目',
				'code':'',
				'name':'',
				'money':'报销行金额',
				'dec':'2016-7-2'
			}],
			limit: 5,
			page_number: 1,
			total: 25

		};
		
		

	})
	angular._LoadModule('ruleSetting');
	return ruleSetting;
});
















