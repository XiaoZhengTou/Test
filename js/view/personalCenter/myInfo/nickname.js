define(['angular'], function(angular) {
    
	var nickname = angular.module('nickname', []);
	nickname.controller('nicknameCtrl', function($scope,airfarePublic,$rootScope) {
		//接收昵称
		$scope.changeNickname = airfarePublic.changedNickname ? airfarePublic.changedNickname:airfarePublic.nickname;
		console.log($scope.changeNickname);
		//修改后昵称
		$scope.nicknameBaocun = function(){
			airfarePublic.changedNickname = $scope.changeNickname;
			$rootScope.go('/personalCenter/personalInfo');
			$rootScope.back();
		}
		
	
	});
});