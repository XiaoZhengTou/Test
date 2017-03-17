define(['angular'], function(angular) {
    
	var receiver = angular.module('receiver', []);
	receiver.controller('receiverCtrl', function($scope,$rootScope,airfarePublic) {
		$scope.receivers = [
			{name:'黄天宇',tel:'15526356475',address:'广东省佛山市顺德区北滘镇美的大道6号美的总部新办公大楼',Postcodes:'528311'},
			{name:'小白',tel:'15526356475',address:'广东省佛山市顺德区北滘镇美的大道6号美的总部新办公大楼',Postcodes:'528311'},
			{name:'小明',tel:'15526356475',address:'广东省佛山市顺德区北滘镇美的大道6号美的总部新办公大楼',Postcodes:'528311'},
			{name:'小黄',tel:'15526356475',address:'广东省佛山市顺德区北滘镇美的大道6号美的总部新办公大楼',Postcodes:'528311'}
		];
		//默认设置
		$scope.receiverChecked = airfarePublic.receiverMoren;
//		$scope.morenchecked = airfarePublic.receiverMoren.index();
		$scope.morenSelect = function(receiver,index){
			$scope.morenchecked = index;
			airfarePublic.receiverMoren = receiver;
			console.log(receiver);
		};
		
		//编辑
		$scope.receiverBainji = function(receiver){
			airfarePublic.whichReceiver = 1;
			airfarePublic.receiver = receiver;
			$rootScope.go('/personalCenter/addReceiver','编辑收货人');
			$rootScope.next();
		};
		//新增
		$scope.addReceiver = function(){
			airfarePublic.whichReceiver = 2;
			airfarePublic.receiver = '';
			$scope.go('/personalCenter/addReceiver','新增收货人');
		}
	
	});
});