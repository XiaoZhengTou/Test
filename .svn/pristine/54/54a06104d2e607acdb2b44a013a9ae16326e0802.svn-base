'use strict';

(function(win) {
	//配置baseUrl
	var baseUrl = document.getElementById('main').getAttribute('data-baseurl');

	/*
	 * 文件依赖
	 */
	var config = {
		baseUrl: baseUrl, //依赖相对路径
		paths: {
			angular: 'libs/Angular.min',
			ngAnimate: 'libs/angular-animate.min',
			ngAria: 'libs/angular-aria.min',
			ngMaterial: 'libs/angular-material.min',
			ngRoute: 'libs/angular-route.min',
			ngMessages: 'libs/angular-messages.min',
			ngCookies:'libs/angular/angular-cookies.min', //TEST
			ngPrint: 'libs/angularPrint',
			ngLocale: 'libs/angular-locale_zh-cn',
			//cTri:'js/view/app',
			// 日期选择器
			ngDatePicker : 'libs/sc-date-time',
			cTri:'js/view/app',
			// 百度地图⬇️
			ngBaidu: 'libs/angular-baidu-map.min',
			// 幻灯片⬇️
			swiper: 'libs/swiper.min',
			ngSwiper: 'libs/angular-swiper',
			// 表格处理库⬇️
			ngTable : 'libs/md-data-table',
			ngTable11:'libs/dist/ng-table',
			//以下三个类库为Moment.js的引入类库，为日期处理库，大小分别为5k 35k 5k，共计45k
			moment: 'libs/moment.min',
			momentCN: 'libs/moment.cn',
			ngMoment: 'libs/angular-moment.min',
			viewer:'libs/viewer',
			jquery:'libs/jquery-1.10.2.min',
			//蚂蚁金服图表G2 https://antv.alipay.com/ 大小354k
			G2:'libs/g2'
		},
		shim: { //引入没有使用requirejs模块写法的类库。例如underscore这个类库，本来会有一个全局变量'_'。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样

			angular: {
				exports: 'angular'
			},
			ngAnimate: {
				deps: ['angular'],
				exports: 'ngAnimate'
			},
			ngCookies: {
				deps: ['angular'],
				exports: 'ngCookies'
			},
			ngPrint : {
				deps: ['angular'],
				exports: 'ngPrint'
			},
			ngAria: {
				deps: ['angular'],
				exports: 'ngAria'
			},
			ngLocale: {
				deps: ['angular'],
				exports: 'ngLocale'
			},
			ngMaterial: {
				deps: ['angular', 'ngAnimate', 'ngAria'],
				exports: 'ngMaterial'
			},
			ngMessages: {
				deps: ['angular'],
				exports: 'ngMessages'
			},
			ngRoute: {
				deps: ['angular'],
				exports: 'ngRoute'
			},
			ngSwiper:{
				deps: ['angular'],
				exports: 'ngSwiper'
			},
			swiper: {
				exports: 'swiper'
			},
			ngTable : {
				deps: ['angular'],
				exports: 'ngTable'
			},
			ngTable11 : {
				deps: ['angular'],
				exports: 'ngTable11'
			},
			//时间处理
			ngMoment:{
				deps: ['angular'],
				exports: 'ngMoment'
			},
			moment: {
				exports: 'moment'
			},
			momentCN: {
				deps: ['moment'],
				exports: 'momentCN'
			},
			ngDatePicker : {
				deps: ['angular','moment'],
				exports: 'ngDatePicker'
			},
			// 百度地图
			ngBaidu : {
				deps: ['angular'],
				exports: 'ngBaidu'
			},
			cTri: {
				deps: ['angular'],
				exports: 'c.tri'
			}
		}
	};

	require.config(config);

	require(['angular', 'js/config/app'], function(angular) {
		angular.bootstrap(document, ['webapp']);
	});

})(window);
