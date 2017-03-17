define(['angular'], function(angular) {
	angular.module("c.tri", ['ngMaterial']).controller("AppCtrl", ["$rootScope", "$scope", "$timeout", function($rs, $scope) {
		// Layout Init Begin
		$scope.layout = {
			toolbarSize: "default",
			toolbarShrink: !0,
			toolbarClass: "",
			contentClass: "",
			innerContentClass: "",
			fullMenuSize: true,
			footer: !0,
			showToolbar: !0,
			activeItem: "Analytics"
		};
		$scope.sidebarInfo = {
			appLogo: "img/logo.png",
			appName: "123"
		};
		// Layout Init End
		// Breadcrumbs Begin
		$scope.breadcrumbs = {
			crumbs: '首页',
			crumbs1: '个人中心'
		};
		$scope.openLink = function(a, b) {
			$scope.breadcrumbs.crumbs = a;
			$scope.breadcrumbs.crumbs1 = b;
			$scope.layout.activeItem = b;
		};
		// Breadcrumbs End
		// Menu Data Init Begin
		$scope.items = [
			//{ name: '预算金额追加申请',alias:'test2',icon:'\ue645',open:'', children: [
			//    {name: '金额追加列表',alias:'addbudget_money_list',open:''},
			//    {name: '金额追加表单',alias:'addbudget_money_table',open:''},
			//    {name: '金额追加流程',alias:'addbudget_money_process',open:''}
			//]},
			{ name: '预算金额追加调整',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '金额追加列表',alias:'addbudget_money_list',open:''},
			    {name: '金额调整列表',alias:'editbudget_money_list',open:''}
			    //{name: '金额调整表单',alias:'editbudget_money_table',open:''},
			    //{name: '金额调整流程',alias:'editbudget_money_process',open:''}
			]},
			{ name: '个人报销',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '差旅报销',alias:'expense/expensefirst',open:''},
				//{name: '差旅报销1',alias:'expensesecond',open:''},
				//{name: '差旅报销2',alias:'expense/expensethird',open:''}
			]},
			{ name: '预算编辑',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '预算页面',alias:'budget_edit_list',open:''}
				//{name: '编辑页面',alias:'budget_edit_list_edit',open:''},
				//{name: '进度维护',alias:'budget_process',open:''},
				//{name: '批量进度维护',alias:'budget_processbatch',open:''}
			]},
			{ name: '预算创建',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '列表页面',alias:'budget_create_list',open:''}
			]},
			{ name: '预算模板维护',alias:'test2',icon:'\ue645',open:'',children: [
				{name: '列表界面',alias:'budget_list',open:''}
			]},
			{ name: '菜单定义',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '资源注册',alias:'resource',open:''},
				{name: '菜单定义',alias:'menudefine',open:''},
				{name: '套餐列表',alias:'package',open:''}
				//{name: '标准维护',alias:'rnormdetail',open:''}
			]},
			{ name: '数据角色维护',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '角色定义',alias:'datadefine',open:''},
				//{name: '角色人员',alias:'pedetail',open:''},
				//{name: '功能授权',alias:'pemenu',open:''}
			]},
			{ name: '功能角色维护',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '角色定义',alias:'pedefine',open:''},
				//{name: '角色人员',alias:'pedetail',open:''},
				//{name: '功能授权',alias:'pemenu',open:''}
			]},
			{ name: '批量操作页',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '批量人员角色',alias:'batchperson',open:''},
				{name: '批量菜单角色',alias:'batchmenu',open:''}
			]},
			{ name: '报销标准维护',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '地区类别维护',alias:'rarea',open:''},
				{name: '人员类别维护',alias:'rperson',open:''},
				{name: '标准列表',alias:'rnorm',open:''}
				//{name: '标准维护',alias:'rnormdetail',open:''}
			]},
			{ name: '基础平台',alias:'test2',icon:'\ue645',open:'', children: [
				{name: '工作流表单',alias:'workflow',open:''},
				{name: '流程分支规则(集团)',alias:'processbrule1',open:''},
				{name: '流程分支规则(经营)',alias:'processbrule2',open:''},
				{name: '岗位规则',alias:'placerule',open:''},
				{name: '流程授权-管理员',alias:'processauthadmin',open:''},
				{name: '流程授权-授权人',alias:'processauth',open:''},
				{name: '业务授权m',alias:'processauthmyewu',open:''},
				{name: '业务授权',alias:'processauthyewu',open:''},
			]},
			{ name: '基础数据',alias:'test2',icon:'\ue635',open:'', children: [
				{name: '数据字典',alias:'dict',open:''},

				{name: '币种',alias:'currency',open:''},

				{name: '公司汇率',alias:'rate',open:''},
				{name: '区域',alias:'area',open:''},

				{name: '核算组织',alias:'company',open:''},
				{name: '付款银行账户',alias:'paybank',open:''},

				{name: '科目',alias:'subjects',open:''},
				{name: '供应商',alias:'provider',open:''},

				{name: 'ERP_OU',alias:'erp_ou',open:''},
				//{name: '费用类型',alias:'cost_basic',icon:'\ue645',open:true,children:''},
				{name: '费用类型-基础科目',alias:'cost_basic',open:''},
				{name: '费用类型-预算科目集',alias:'cost_budgetall',open:''},
				//{name: '费用类型-预算科目',alias:'cost_budget',open:''},
				{name: '费用类型-活动类型(一级)',alias:'cost_active1',open:''},
				//{name: '费用类型-活动类型(二级)',alias:'cost_active2',open:''},

				{name: '预算组织',alias:'busiorg',open:''}


			]}, {
			name: '消费平台',
			alias: 'keepaccounts',
			icon: '\ue645',
			open: '',
			children: [{
				name: '记一笔',
				alias: 'keepaccounts/index',
				open: ''
			}]
		}, {
			name: '国内用车',
			alias: 'test3',
			icon: '\ue64c',
			open: '',
			children: [{
				name: '测试2',
				alias: 'test2',
				open: ''
			}, {
				name: '测试3',
				alias: 'test3',
				open: ''
			}]
		}, {
			name: '商旅',
			alias: 'shanglv',
			icon: '\ue642',
			open: '',
			children: [{
				name: '酒店',
				alias: 'shanglv/jiudian',
				open: ''
			}, {
				name: '机票',
				alias: 'shanglv/airfare',
				open: ''
			}, {
				name: '火车',
				alias: 'train',
				open: ''
			}, {
				name: '人工机票',
				alias: 'shanglv/telAirfare',
				open: ''
			}]
		}, {
			name: '商城',
			alias: 'test1',
			icon: '\ue644',
			open: '',
			children: [{
				name: '测试2',
				alias: 'test2',
				open: ''
			}, {
				name: '测试3',
				alias: 'test3',
				open: ''
			}]
		}, {
			name: '结算中心',
			alias: 'test2',
			icon: '\ue64b',
			open: '',
			children: [{
				name: '测试2',
				alias: 'test2',
				open: ''
			}, {
				name: '测试3',
				alias: 'test3',
				open: ''
			}]
		}, {
			name: '借还款',
			alias: 'jiehuankuan',
			icon: '\ue685',
			open: '',
			children: [{
				name: '借款',
				alias: 'jiehuankuan/jiekuan',
				open: ''
			}, {
				name: '还款',
				alias: 'jiehuankuan/huankuan',
				open: ''
			}]
		}, {
			name: '对公支付',
			alias: 'feeapply',
			icon: '\ue686',
			open: '',
			children: [{
				name: '费用申请',
				alias: 'feeapply/home',
				open: ''
			},{
				name: '付款申请',
				alias: 'duigong/fukuan',
				open: ''
			}, {
				name: '预付款',
				alias: 'duigong/yufukuan',
				open: ''
			},/* {
                name: '对公划收',
                alias: 'feePay/home',
                open: ''
            },*/
			 {
                name: '对公支付EC',
                alias: 'duigongEC/home',
                open: ''
            }, {
                name: '费用分摊',
                alias: 'feeSharing/index',
                open: ''
            },{
            	name:'分期付款计划',
				alias:'fenqifukuanjihua/index',
				open:''
			}]
		}, {
			name: '个人中心',
			alias: 'personalCenter',
			icon: '\ue647',
			open: '',
			children: [{
				name: '常用收款方',
				alias: 'personalCenter/account',
				open: ''
			}, {
				name: '我的订单',
				alias: 'personalCenter/myOrder',
				open: ''
			}, {
				name: '个人信息',
				alias: 'personalCenter/personalInfo',
				open: ''
			}, {
				name: '发票抬头',
				alias: 'personalCenter/invoice',
				open: ''
			}, {
				name: '常用旅客',
				alias: 'personalCenter/passengers',
				open: ''
			}, {
				name: '我的单据',
				alias: 'personalCenter/danju',
				open: ''
			}, {
				name: '待办事宜',
				alias: 'personalCenter/backlog',
				open: ''
			}, {
				name: '账号和绑定设置',
				alias: 'personalCenter/bangding',
				open: ''
			}, {
				name: '默认预算部门',
				alias: 'personalCenter/defaultDept',
				open: ''
			}]
		}, {
			name: '档案定义',
			alias: 'archiveDefine',
			icon: '\ue643',
			open: '',
			children: [{
				name: '分类目录定义',
				alias: 'typeDefine/index',
				open: ''
			}, {
				name: '仓库管理',
				alias: 'warehouseManagement/index',
				open: ''
			},{
				name: '分册规则',
				alias: 'volumeRule/index',
				open: ''
			}]
		},{
			name: '档案采集-手工建档',
			alias: 'archiveCollection',
			icon: '\ue643',
			open: '',
			children: [{
				name: '会计凭计档案采集',
				alias: 'accountingVoucher/index',
				open: ''
			}, {
				name: '会计账簿档案采集',
				alias: 'accountingBook/index',
				open: ''
			},{
				name: '会计报表档案采集',
				alias: 'accountingForm/index',
				open: ''
			},{
				name: '其它类型档案采集',
				alias: 'othorArchive/index',
				open: ''
			}]
		},
		{
			name: '档案管理',
			alias: 'archiveManage',
			icon: '\ue643',
			open: '',
			children: [{
				name: '档案分册',
				alias: 'archiveVolume/index',
				open: ''
			}, {
				name: '分册装盒',
				alias: 'archiveBoxed/index',
				open: ''
			}]
		},
		/*{
			name: '档案采集-自动建档',
			alias: 'archiveCollection',
			icon: '\ue643',
			open: '',
			children: [{
				name: '档案采集接收查询',
				alias: 'accountingVoucher/index',
				open: ''
			}, {
				name: '接收记录',
				alias: 'accountingBooks/index',
				open: ''
			},{
				name: '档案接收',
				alias: 'accountingForm/index',
				open: ''
			},{
				name: '档案回退',
				alias: 'othorArchive/index',
				open: ''
			}]
		}, */{
			name: '财务质检',
			alias: 'financeQC ',
			icon: '\ue643',
			open: '',
			children: [{
				name: '问题类别定义',
				alias: 'financeQC/questionClass',
				open: ''
			}, {
				name: '问题定义',
				alias: 'financeQC/question',
				open: ''
			},{
				name: '质检计划管理',
				alias: 'financeQC/planManagement',
				open: ''
			},{
				name: '质检任务派组',
				alias: 'financeQC/taskGroup',
				open: ''
			},{
				name: '质检任务派单',
				alias: 'financeQC/taskAssignment',
				open: ''
			},{
				name: '质检任务处理',
				alias: 'financeQC/taskProcessing',
				open: ''
			},{
				name: '需整改问题管理',
				alias: 'financeQC/problemManagement ',
				open: ''
			},{
				name: '质检报告',
				alias: 'financeQC/reportQC',
				open: ''
			}]
		},{
			name: '作业平台',
			alias: 'tasks',
			icon: '\ue649',
			open: '',
			children: [{
				name: '测试2',
				alias: 'test2',
				open: ''
			}, {
				name: '测试3',
				alias: 'test3',
				open: ''
			}, {
                name: '付款管理',
                alias: 'feeapply/govern',
                open: ''
        	}, {
                name: '派单规则',
                alias: 'ordersRule',
                open: ''
        	}, {
                name: '任务池维护',
                alias: 'maintain',
                open: ''
        	},{
                name: '任务组维护',
                alias: 'taskSet',
                open: ''
        	},{
                name: '任务组派单',
                alias: 'taskSend',
                open: ''
        	},{
                name: '任务池分组',
                alias: 'taskPool',
			},{
				name: '制度维护',
				alias: 'zhiduweihu/home',
				open: ''
			},{
				name: '值班计划',
				alias: 'zhiban/home',
				open: ''
			},{
				name: '收款单',
				alias: 'gathering_order/index',
				open: ''
			},{
				name: '还款单',
				alias: 'huankuandan/index',
				open: ''
			},{
				name: '信用管理',
				alias: 'xingyongguanli/home',
				open: ''
			}, {
				name: '任务处理',
				alias: 'tasks/index',
				open: ''
			},{
				name: '任务异常处理',
				alias: 'tasks/taskException',
				open: ''
			},{
				name: '综合工单',
				alias: 'tasks/worksheet',
				open: ''
			},{
				name: '测试',
				alias: 'tasks/test',
				open: ''
			}]
		},{
			name: '凭证管理',
			alias: 'archiveDefine',
			icon: '\ue643',
			open: '',
			children: [{
				name: 'ERP实例维护',
				alias: 'caseMaintenance/index',
				open: ''
			},{
				name: '科目集与ERP数据源映射关系',
				alias: 'mapping/index',
				open: ''
			},{
				name: '基础科目与COA对应关系',
				alias: 'baseSubjects/index',
				open: ''
			},{
				name: '凭证科目对应关系设置',
				alias: 'correspondingRelation/index',
				open: ''
			},{
				name: '内部交易关系设置',
				alias: 'internalTransaction/index',
				open: ''
			},{
				name: '预凭证生成规则设置',
				alias: 'certificateRule/index',
				open: ''
			},{
				name: '预凭证管理',
				alias: 'preCertificate/index',
				open: ''
			},{
				name: '核销关系管理',
				alias: 'hexiao/index',
				open: ''
			}]
			
		}, {
			name: '交付平台',
			alias: 'test2',
			icon: '\ue64a',
			open: '',
			children: [{
				name: '测试2',
				alias: 'test2',
				open: ''
			}, {
				name: '测试3',
				alias: 'test3',
				open: ''
			}]
		}, {
			name: '客服',
			alias: 'test2',
			icon: '\ue646',
			open: '',
			children: [{
				name: '测试2',
				alias: 'test2',
				open: ''
			}, {
				name: '测试3',
				alias: 'test3',
				open: ''
			}]
		}, {
			name: '基础服务',
			alias: 'test2',
			icon: '\ue641',
			open: '',
			children: [{
				name: '测试2',
				alias: 'test2',
				open: ''
			}, {
				name: '测试3',
				alias: 'test3',
				open: ''
			}]
		}, {
			name: '配置中心',
			alias: 'test2',
			icon: '\ue648',
			open: '',
			children: [{
				name: '测试2',
				alias: 'test2',
				open: ''
			}, {
				name: '测试3',
				alias: 'test3',
				open: ''
			}]
		}, {
			name: '千里眼',
			alias: 'test2',
			icon: '\ue64d',
			open: '',
			children: [{
				name: '测试2',
				alias: 'test2',
				open: ''
			}, {
				name: '测试3',
				alias: 'test3',
				open: ''
			}]
		}, {
			name: '票夹',
			alias: 'invoicesfolder',
			icon: '\ue6a2',
			open: '',
			children: [{
				name: '发票库',
				alias: 'invoicesfolder/index',
				open: ''
			}]
		},{
			name: '影像',
			alias: 'image',
			icon: '\ue665',
			open: '',
			children: [{
				name: '影像采集',
				alias: 'imageAcquisition/index',
				open: ''
			},{
				name: '影像调阅',
				alias: 'imageAccess/index',
				open: ''
			}]
		},{
                name: '预提',
                alias: 'image',
                icon: '\ue665',
                open: '',
                children: [{
                    name: '月度预提',
                    alias: 'provision/home',
                    open: ''
                }]
            }];
		// Menu data Init End
		// Public Function Begin
		function toggleClass(obj, cls, cls1) {
			if(hasClass(obj, cls)) {
				addClass(obj, cls1);
			}
		}

		function toggleClass1(obj, cls, cls1) {
			if(hasClass(obj, cls)) {
				removeClass(obj, cls1);
			}
		}

		function hasClass(obj, cls) {
			return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		}

		function addClass(obj, cls) {
			if(!hasClass(obj, cls)) obj.className += " " + cls;
		}

		function removeClass(obj, cls) {
			if(hasClass(obj, cls)) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				obj.className = obj.className.replace(reg, ' ');
			}
		}
		// Public Function End
		// Side Menu Begin
		$scope.toggleMenuSize = function() {
			$scope.layout.fullMenuSize = !$scope.layout.fullMenuSize;
			if($scope.layout.fullMenuSize) {
				$scope.sidebarInfo.appLogo = "img/logo.png";
			} else {
				$scope.sidebarInfo.appLogo = "img/logomini.png";
			}
		}
		$scope.toggleDropdownMenu = function(e, num) {
			if(e == true) {
				$scope.items[num].open = false;
			} else if(e == false) {
				$scope.items[num].open = true;
			}
		};
		// Side Menu End
		$scope.logOut = function() {
			$scope.go('/login');
		}

		$scope.activateHover = function() {

		}
		$scope.removeHover = function() {

		}
	}])
});