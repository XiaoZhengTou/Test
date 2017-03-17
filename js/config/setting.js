/**
 * Created by LUOZS on 2016-4-19.
 */
define(['angular'], function (angular) {
    angular.module("setting", ['ngMaterial']).controller("AppCtrl", ["$rootScope", "$scope", "$timeout", function ($rs, $scope) {

        $scope.status = {
            active: !0
        };

        $scope.breadcrumbs={
            crumbs:'Dashboards',
            crumbs1:'Analytics'
        };

        $scope.hideMenuButton=function(e, t){
            return "hidden" !== $scope.layout.sideMenuSize
        };

        $scope.aaa=function(){
            alert($scope.layout.sideMenuSize);
        };

        $scope.openLink=function(a,b){
            $scope.breadcrumbs.crumbs=a;
            $scope.breadcrumbs.crumbs1=b;
            $scope.layout.activeItem=b;
        };

        $scope.layout = {
            toolbarSize: "default",
            toolbarShrink: !0,
            toolbarClass: "",
            contentClass: "",
            innerContentClass: "",
            sideMenuSize: "full",
            footer: !0,
            showToolbar: !0,
            activeItem:"Analytics"
        };
        $scope.sidebarInfo={
            appLogo:"./img/1.jpg",
            appName:"123"
        };

        $scope.items = [
            { name: '基础平台',open:true, children:
                [
                    {name: '币种',open:'', children:'',path:'#/basePlatform/currency'},
                    {name: '公司汇率',open:'', children:'',path:''},
                    {name: '区域',open:'', children:'',path:''},
                    {name: '费用类型',open:'', children:'',path:''},
                    {name: '预算组织',open:'', children:'',path:''},
                    {name: '核算组织',open:'', children:'',path:''},
                    {name: '付款银行账号',open:'', children:'',path:''},
                ]
            },
            { name: 'Email',open:true, children: [{name: 'test2',open:'', children:''},{name: 'test3',open:'', children:''}]}
        ];
        $scope.toggleIconMenu=function(){
            $scope.layout.sideMenuSize = "icon" === $scope.layout.sideMenuSize ? "full": "icon";
        };

        $scope.activateHover=function(event){
            var aa=document.getElementById('sidebar-left');
            "icon" === $scope.layout.sideMenuSize && toggleClass(aa,'admin-sidebar-left','hover')
        };
        $scope.removeHover=function(event){
            var aa=document.getElementById('sidebar-left');
            "icon" === $scope.layout.sideMenuSize && toggleClass1(aa,'admin-sidebar-left','hover')
        };

        function toggleClass(obj,cls,cls1){
            if(hasClass(obj,cls)){
                addClass(obj, cls1);
            }
        }

        function toggleClass1(obj,cls,cls1){
            if(hasClass(obj,cls)){
                removeClass(obj, cls1);
            }
        }

        function hasClass(obj, cls) {
            return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        }

        function addClass(obj, cls) {
            if (!hasClass(obj, cls)) obj.className += " " + cls;
        }

        function removeClass(obj, cls) {
            if (hasClass(obj, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                obj.className = obj.className.replace(reg, ' ');
            }
        }

        $scope.toggleDropdownMenu=function(e,num){
            if(e==true){
                //alert('1');
                $scope.items[num].open=false;
            }else if(e==false){
                //alert('2');
                $scope.items[num].open=true;
            }
        };

    }])
});