define(['angular'], function(angular) {
    var commit = angular.module('commit', []);
    commit.controller('jdCommitCtrl', function($scope,$http,jdPublic) {
    	// Requeset Init Begin
    	$scope.loadingComplete = false;
    	var $commitUrl_local = 'js/server/json/commit.json';
    	$scope.commitList = [];
    	$http.get($commitUrl_local).success(
    		function(response){
    		$scope.loadingComplete = true;
            $scope.commitList = response.data;
            console.log($scope.commitList);
        });
    	// Requeset Init End
    	$scope.showMore = function($event){
    		angular.element($event.currentTarget).parent().removeClass('limitReach');
    	}
    	
	}).directive('limitheight', function() {
        return function (scope, element, attrs) {
        	var height = element[0].offsetHeight;
        	if (height > 70) {
        		element.addClass('limitReach');
        	}
        }
	});
});