define(['angular'],function(angular){
var server= angular.module('server', []);
	server.factory('publicmodel',function(){
		return {
			Share : {
				selectMode : false,
				fromUrl : '',
				toUrl : '',
				data : '',
				data1 : '',
				data2 : ''
			},
			Passengers : [],
			breadCrumb : [],
			TemplateModel :{
				JieKuan : {
					module_type: "LM",
                    order_type: "PERSONPAY"
				},
				HuanKuan : {
					module_type: "RP",
                    order_type: "PERSONREPAY"
				}
			}
		};
	});
	// 酒店⬇️
	server.factory('jdPublic',function(){
		return {
			Data : {
				checkInDate : '',
				checkOutDate : '',
				keyWord : '',
				star : [],
				vendor : '200',
				landMark : {
					id:'',
					type:''
				},
				cityName : '',
				cityId : '',
				priceRange : '',
				hotilBrand : '',
				businessAreaId : '',
				districtId : ''
			},
			Hotils : {
				newSearch : true,
				total : 0,
				pageIndex : 1,
				list : [],
				viewed : [],
				selected : {}
			},
			Detail : {
				data : {},
				selectRoom : {},
				selectPrice : {}
			},
			Order : {}
		};
	});
	// 借还款⬇️
	server.factory('jhkPublic',function(){
		return {
			Add : {},
			View : {},
			ShenPi : {
				forminstanceid : '',
				formid : '',
				modelid : '001',
				processlsit : []
			}
		};
	});
	server.factory('costPublic',function(){
		return {};
	});
	server.factory('governPublic',function(){
		return {};
	});
	server.factory('lendPublic',function(){
		return {};
	});
	server.factory('organizationPublic',function(){
		return {
			selectMode:false
		};
	});
	server.factory('clbxPublic',function(){
		return {
			feeId : '',
			draft : []
		};
	});
	server.factory('rcbxPublic',function(){
		return {
			feeId : ''
		};
	});
	server.factory('airfarePublic',function(){
		return {
			passengers:[],
			EA_lists:[],
			pays:[]
		};
	});
	server.factory('trainPublic',function(){
		return {
			passengers:[],
			EA_lists:[],
			pays:[]
		};
	});
	server.factory('taskPublic',function(){
		return {
			passengers:[],
			EA_lists:[],
			pays:[]
		};
	});
	server.factory('statusPublic',function(){
		return {
			selectFrom:0 // 0:机票 1:酒店
		};
	});
	server.factory('note',function(){
		return{}
	});
	server.factory('invoice',function(){
		return {
			invoice_code: null
		}
	});
		server.factory('trainPublic',function(){
		return{}
	});
	//预算调整
	server.factory('busiorgPublic',function(){
		return {
			Add : {},
			View : {},
			ShenPi : {
				forminstanceid : "",
				formid : "",
				modelid : '001',
				processlsit : []
			}
		};
	});
	// 差旅报销️
	//server.factory('expPublic',function(){
	//	return {
	//		reim_date:null,
	//		apply_by:'',
	//		apply_name:'',
	//		org_id:'',
	//		org_name:'',
	//		order_type:'CL',
	//		pay_type:'NORMAL_PAY',
	//		form_template_id:'',
	//		form_template_name:'',
	//		order_template_id:'',
	//		order_template_name:'',
	//		biz_flag: 0,
	//		company_id:'',
	//		ou_id:'',
	//		proxy_user:'',
	//		receiver:'',
	//		bank_name:'',
	//		bank_account:'',
	//		assistance_fee:0,
	//		currency_code:'',
	//		currency_name:'',
	//		payment_method:'WIRE',
	//		is_instalments_pay:'N',
	//		need_app_loan: "",
	//		need_input_tax:'',
	//		sensitive_info: "",
	//		apply_reim_amount:0,
    //
	//		emsecfeetravels: [],
	//		emsecfeebudgets:[],
	//		emsecfeeloans:[],
	//		emsecinvoicetaxrs:[],
	//		emsecfeedetails:[],
    //
	//		fee_apply:[],
	//		fee_buy:[],
	//		total:0,
	//		totaltax:''
    //
	//	};
	//});

	server.factory('uploadFile', ['$rootScope', function($rootScope){
		return {
	  		  files: [],
		      addFile: function (file,callback) {
		         this.files.push(file);
		         callback();
		         //$rootScope.$broadcast('files.update');
		      }
		    }
	}]);
	
	
	
	return server;
});