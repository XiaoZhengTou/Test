define(['angular'], function(angular) {

	var personalInfo = angular.module('personalInfo', []);
	personalInfo.controller('personalInfoCtrl', function($scope, $rootScope, $mdDialog, airfarePublic, $http, fileReader, publicmodel) {
		// 重置模块面包屑
		$rootScope.crumbInit('/personalCenter/personalInfo', '首页');
		//获取个人资料
		$scope.userId = publicmodel.userId;
		console.log($scope.userId);
		var $personalInfoUrl = LoginUrl + 'docker/userinfo/getUserById/' + $scope.userId;
		console.log($personalInfoUrl);
		$http.get($personalInfoUrl).success(function(response) {
			if(response && response.code == '0000') {
				$scope.personalInfo = response.data;
				//个人昵称信息
				$scope.nickname = response.data.user_full_name;
				$scope.mobile = response.data.user_mobile;
				console.log($scope.personalInfo);
			} else {
				$scope.showAlert("", "提示", response.msg, "确定", "");
			}
		}).error(function() {
			console.log("shibai");
		});
		//去修改昵称
		$scope.goNickname = function() {
			airfarePublic.nickname = $scope.nickname;
			airfarePublic.changedNickname = $scope.changedNickname;
		};
		//接收修改后的昵称
		$scope.changedNickname = airfarePublic.changedNickname;

		//收货地址
		$scope.receiverAddress = airfarePublic.receiverMoren;
		console.log($scope.receiverAddress);

		//上传照片
		$scope.loadImg = function() {
			document.getElementById("loadImg").click();
		};
		$scope.getFile = function() {
			fileReader.readAsDataUrl($scope.file, $scope)
				.then(function(result) {
					$scope.imageSrc = result;
				});
		};
		// 组装表单数据 
		//		var postData = {
		//			vacationType: $scope.leave.type,
		//			reason: $scope.leave.reason,
		//			familyRelation: +$scope.leave.type == 7 ? $scope.leave.relation : "",
		//			startTime: startTime,
		//			endTime: endTime,
		//			fileName: $scope.imageSrc,
		//			workDelivers: workDelivers,
		//			ccmailNickNames: sendPersons,
		//			realDays: +$scope.leave.type == 8 ? $scope.leave.timeLong : ""
		//		};
		//		var promise = postMultipart('/maldives/leave/save', postData);
		//
		//		function postMultipart(url, data) {
		//			var fd = new FormData();
		//			angular.forEach(data, function(val, key) {
		//				fd.append(key, val);
		//			});
		//			var args = {
		//				method: 'POST',
		//				url: url,
		//				data: fd,
		//				headers: {
		//					'Content-Type': undefined
		//				},
		//				transformRequest: angular.identity
		//			};
		//			return $http(args);
		//		};

	});
});