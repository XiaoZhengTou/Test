define(['angular', 'require', 'ngAnimate', 'ngAnimate', 'ngMaterial', 'ngMessages',
	'ngRoute', 'js/config/view'
], function(angular, require) {
	var webpc = angular.module('webpc', []);
	webpc.constant('baseconfig', {
		'currencys': [{
			shortName: 'AUD',
			'name': '澳大利亚元'
		}, {
			shortName: 'CAD',
			'name': '加拿大元'
		}, {
			shortName: 'CHF',
			'name': '瑞士法郎'
		}, {
			shortName: 'CNY',
			'name': '人民币'
		}, {
			shortName: 'DKK',
			'name': '丹麦克朗'
		}, {
			shortName: 'EUR',
			'name': '欧元'
		}, {
			shortName: 'GBP',
			'name': '英镑'
		}, {
			shortName: 'HKD',
			'name': '港元'
		}, {
			shortName: 'HUF',
			'name': '匈牙利福林'
		}, {
			shortName: 'INR',
			'name': '印度卢布'
		}, {
			shortName: 'JPY',
			'name': '日元'
		}, {
			shortName: 'MXN',
			'name': '墨西哥比索'
		}, {
			shortName: 'MYR',
			'name': '马来西亚林吉特'
		}, {
			shortName: 'NOK',
			'name': '挪威克朗'
		}, {
			shortName: 'SGD',
			'name': '新加坡元'
		}, {
			shortName: 'THB',
			'name': '泰国铢'
		}, {
			shortName: 'USD',
			'name': '美元'
		}, {
			shortName: 'ZAR',
			'name': '南非兰特'
		}],
	});
	return webpc;
});