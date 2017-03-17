define(['angular'], function(angular) {
	var addPerson = angular.module('addPerson', []);
	addPerson.controller('addPersonCtrl', function($scope, airfarePublic, $http) {
		$scope.loadcCredentials = function() {
			$scope.papersType = [{
				certType: 1,
				name: '身份证'
			}, {
				certType: 2,
				name: '台湾通行证(台胞证)'
			}, {
				certType: 3,
				name: '港澳通行证'
			}, {
				certType: 4,
				name: '军人证'
			}, {
				certType: 5,
				name: '护照'
			}];

		};

		$scope.getCredentials = function(credentials) {
			$scope.certType = credentials.certType;
			$scope.addPerson.certNumber = '';
			console.log($scope.certType)
		}

		var states = airfarePublic.whichPassenger;
		if(states == 1) {
			$scope.addPersonTop = "编辑常用旅客";
			//接收编辑信息
			$scope.addPerson = airfarePublic.passenger;
		} else if(states == 2) {
			$scope.addPersonTop = "新增常用旅客";
			$scope.addPerson = {
				cnName: '',
				certType: '',
				mobile: '',
				certNumber: ''
			};
		};
		//限制input
		//		mobile=function(o){
		//	        o.value=o.value.replace(/\D/g,'').substring(0,11);
		//	    };
		//	    certNumber=function(o){
		//	        o.value=o.value.replace(/[/W]/g,'').substring(0,18);
		//	    };

		//		$scope.loadcNumber = function() {
		//			$scope.numbers = [
		//				"+852",
		//				"＋886",
		//				"＋86"
		//			];
		//	  	};

		//提交
		$scope.addPersonBaocun = function() {
			$scope.addPerson.certType = $scope.certType ? $scope.certType : '1';
			console.log($scope.addPerson);
			//		var Token = '?mideatest_sso_token=358dqonuB0uQ13Ggqm2q3CiSGu0l2a%2Fakwt2WvtQnYSKGTKEDkAhBw%3D%3D';
			var AddPersonUrl = ShangLvUrl + 'data/flight/createOrUpdatePassenger.do';
			$http({
					method: 'POST',
					url: AddPersonUrl,
					data: $scope.addPerson
				})
				.success(function(response) {
					if(response.resultFlag == 1) {
						console.log(response);
						$scope.go('/personalCenter/passengers');
					} else {
						$scope.showAlert("", "提示", '访问服务器异常：' + response.resultMsg, "确定", "");

					};

				}).error(function() {
					console.log("shibai");
				})
		};

	});
});