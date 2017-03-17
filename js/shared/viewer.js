/**
 * Created by luozs on 2016-6-4.
 */
define(['angular', 'require','jquery','viewer'], function (angular) {
    publicFunction.addStyle('viewer.css');
    var app = angular.module("picviewer",[]);
    app.directive('viewer', ['$http','$cookies','$location', function ($http,$cookies,$location) {
        return {
            link: function (scope, element, attrs, ngModel) {
                $('.viewer').viewer({
                    title: false,
                    navbar:false,
                    fullscreen: false,
                    keyboard: false
                });
            }
        }
    }])
});