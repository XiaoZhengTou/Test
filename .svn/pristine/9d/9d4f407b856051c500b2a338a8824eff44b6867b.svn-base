define(['angular', "js/templates/correspondingRelation/basicSubjects.js", "js/templates/correspondingRelation/budgetDepartment.js",  "js/templates/correspondingRelation/productLine.js", "js/templates/correspondingRelation/remark.js", "js/templates/correspondingRelation/receivables.js"], function(angular) {
	var relationList = angular.module('relationList', ['basicSubjects','budgetDepartment','productLine','remark','receivables']);
	relationList.controller('relationListCtrl', function($scope, $mdSidenav) {

		$scope.cerificateList = [{
			name: '基础科目与COA对应关系'
		}, {
			name: '预算部门与成本中心关系'
		}, {
			name: '产品线科目对应关系'
		}, {
			name: '备注段对应关系'
		}, {
			name: '应收款活动类型配置'
		}];
		$scope.state = {
			one: true,
			two: false,
			thr: false,
			four: false,
			five: false
		}

		/*列表对应数据-start*/
		$scope.border = [];
		$scope.border[0] = 'select';
		$scope.isCurrent = function(index) {
				$scope.border = [];
				$scope.border[index] = 'select';
				switch (index) {
					case 0:
						$scope.state.one = true
						$scope.state.two=false
						$scope.state.thr=false
						$scope.state.four=false
						$scope.state.five=false						
						break
					case 1:
						$scope.state.one = false
						$scope.state.two= true
						$scope.state.thr=false
						$scope.state.four=false
						$scope.state.five= false	
						break
					case 2:
						$scope.state.one = false
						$scope.state.two=false
						$scope.state.thr=true
						$scope.state.four= false
						$scope.state.five= false
						break
					case 3:
						$scope.state.one = false
						$scope.state.two=false
						$scope.state.thr= false
						$scope.state.four= true
						$scope.state.five= false	
						break
					case 4:
						$scope.state.one = false
						$scope.state.two=false
						$scope.state.thr= false
						$scope.state.four= false
						$scope.state.five= true	
						break

				}

			}
			/*列表对应数据-end*/

	})

	angular._LoadModule('relationList');
	return relationList;
});