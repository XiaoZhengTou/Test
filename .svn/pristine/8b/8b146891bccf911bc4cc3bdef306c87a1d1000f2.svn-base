/**
 * Created by decheng on 2016/6/24.
 */
define(['angular','G2'], function(angular,G2) {
	var app = angular.module('mdchart', []);
	//环图
	app.directive('drChart', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div id="c1" style="position:absolute;width:100%;height:100%"></div>',
			'scope': {
				
			},
			controller: function($scope) {
				
			},
			link: function(scope, element, attrs) {
				 var $el = angular.element(element[0]);
				 var time , elheight;
				 
				 function timer(){
					if($el['0'].clientHeight>0){
						draw();
						clearTimeout(time);
						return false;
					}
					time = setTimeout(timer,500);
				 }
				 
				 timer();
				 
				function draw(){
				 		
				  angular.element('<div style="position: absolute;width: 100%;top: 23%;left: 0;text-align: center;color: #999;"><p style="font-size: 22px;font-weight: bold;margin: 0;line-height: 1.5;">2</p><p style="margin: 0;">消费构成</p></div>').appendTo('#c1');
			      var data = [
			        {area:'书箱', profit: 0.5},
			        {area:'日用品', profit: 0.3},
			        {area:'油费', profit: 0.2},
			
			      ];
			      var Stat = G2.Stat;
			      var chart = new G2.Chart({
			        id: 'c1',
			        width: $el['0'].clientWidth,
			        height: $el['0'].clientHeight,
			        plotCfg: {
			          margin: [0,20,20,20]
			        }
			      });
			      // 以 year 为维度划分分面
			      chart.source(data);
			      chart.legend('bottom');
			      chart.coord('theta', {
			        radius: 0.7,
			        inner: 0.7
			      });
			      chart.tooltip({
			        title: null
			      });
			
			      chart.intervalStack().position(Stat.summary.percent('profit')).color('area');
			      chart.render();
				 	}
				 
			}
		}
	}]);
	
	
	app.directive('drChartb', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div id="c2" style="position:absolute;width:100%;height:100%"></div>',
			'scope': {
				
			},
			controller: function($scope) {
				
			},
			link: function(scope, element, attrs) {
				
				var $el = angular.element(element[0]);
				 var time , elheight;
				 
				 function timer(){
					if($el['0'].clientHeight>0){
						draw();
						clearTimeout(time);
						return false;
					}
					time = setTimeout(timer,500);
				 }
				 
				 timer();
				 
				 function draw(){
				 	var data = [{"cut":"渠道1","price":52},
			      	{"cut":"渠道2","price":20},
			      	{"cut":"渠道3","price":60}]
		        var Stat = G2.Stat;
		        var chart = new G2.Chart({
		          id: 'c2',
			        width: $el['0'].clientWidth,
			        height: $el['0'].clientHeight,
		          plotCfg: {
		            margin: [0,60,0,0]
		          }
		        });
		        chart.legend('right');
		        // 配置列定义,设置y轴的最小值
		        var colDefs = {
		          price: {
		            min: 0
		          },
		         cut: {
		          alias: '渠道'
		         }

		        };
		        chart.source(data, colDefs);
		        chart.interval().position(Stat.summary.mean('cut*price')).color('cut');
		        chart.render();
				 }
			             
			}
		}
	}]);
	
	app.directive('drChartc', ['$mdMedia', '$mdDialog', '$http', '$parse', '$filter', function($mdMedia, $mdDialog, $http, $parse, $filter) {
		return {
			restrict: 'EA',
			replace: true,
			//priority: 9999,
			template: '<div id="c3" style="position:absolute;width:100%;height:100%"></div>',
			'scope': {
				
			},
			controller: function($scope) {
				
			},
			link: function(scope, element, attrs) {
				 var $el = angular.element(element[0]);
				 var time , elheight;
				 
				 function timer(){
					if($el['0'].clientHeight>0){
						draw();
						clearTimeout(time);
						return false;
					}
					time = setTimeout(timer,500);
				 }
				 
				 timer();
				 
				 function draw(){
				 	var data = [
					{"ids":0,"tem":0.5,"ratio":"优惠率"},
					{"ids":1,"tem":0.6,"ratio":"优惠率"},
					{"ids":2,"tem":0.9,"ratio":"优惠率"},
					{"ids":3,"tem":0.6,"ratio":"优惠率"}
			  
			      ];
			      var chart = new G2.Chart({
			        id: 'c3',
					width: $el['0'].clientWidth,
			        height: $el['0'].clientHeight,
			        plotCfg: {
			            margin: [10,0,30,38]
			          }
			        
			      });
			      var defs = {
			        'ids': {
			          type: 'cat',
			          values: ['苏宁','国美','天猫','京东']
			        },
			        'shop': {
			          alias: '商城'
			        },
			        'tem': {
			          alias: '百分比'
			        }
			      };
			      chart.source(data, defs);
			      chart.line().position('ids*tem').color('ratio').size(2);
			      chart.render();
				 }
			             
			}
		}
	}]);
	

	return app;
});