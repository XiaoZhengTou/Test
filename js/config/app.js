define(['angular', 'require', 'ngRoute', 'ngMaterial', 'ngMessages', 'ngLocale','ngCookies','ngPrint'
    , 'js/config/config', 'js/server/factory', 'cTri', 'js/common/function',
    'js/common/module', 'js/common/httpError', 'ngDatePicker', 'ngTable','ngTable11','js/view/ztree']
    , function (angular, require) {
    var app = angular.module('webapp', ['ngRoute', 'ngMaterial', 'ngMessages','ngCookies', 'c.tri', 'webpc',
        'server', 'mdhttperror', 'scDateTime', 'md.data.table','ngTable','ztreeModule','AngularPrint']);
    angular._LoadModule = function (moduleName) {
    	//console.log(app);
        var m = angular.module(moduleName);
        //console.log('register module:' + moduleName);
        /* 应用的injector，和config中的injector不是同一个，是instanceInject，返回的是通过provider.$get创建的实例 */
        var $injector = angular.element(document).injector();
        /* 递归加载依赖的模块 */
        angular.forEach(m.requires, function (r) {
            angular._LoadModule(r);
        });
        
        /* 用provider的injector运行模块的controller，directive等等 */
        angular.forEach(m._invokeQueue, function (invokeArgs) {
            try {
                var provider = app.providers.$injector.get(invokeArgs[0]);
                provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
            } catch (e) {
                console.error('load module invokeQueue failed:' + e.message, invokeArgs);
            }
        });
        /* 用provider的injector运行模块的config */
        angular.forEach(m._configBlocks, function (invokeArgs) {
            try {
                app.providers.$injector.invoke.apply(app.providers.$injector, invokeArgs[2]);
            } catch (e) {
                console.error('load module configBlocks failed:' + e.message, invokeArgs);
            }
        });
        /* 用应用的injector运行模块的run */
        angular.forEach(m._runBlocks, function (fn) {
            $injector.invoke(fn);
        });
    };
    app.config(['$injector', '$locationProvider', '$routeProvider', '$controllerProvider', '$compileProvider',
        function ($injector, $locationProvider, $routeProvider, $controllerProvider, $compileProvider) {
            app.providers = {
                $injector: $injector,
                $controllerProvider: $controllerProvider
            };

            $routeProvider.
                // 登录部分开始
                when('/login', {
                    templateUrl: 'templates/login/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/login/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
        }
                    }
                }).
                // 登录部分结束
                // 酒店部分开始
                when('/shanglv/jiudian', {
                    templateUrl: 'templates/jiudian/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/jiudian/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/shanglv/jiudian/orders', {
                    templateUrl: 'templates/jiudian/orders.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/jiudian/orders'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                // 酒店部分结束
                // 借还款开始
                when('/jiehuankuan/jiekuan', {
                    templateUrl: 'templates/jiekuan/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/jiekuan/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/jiehuankuan/huankuan', {
                    templateUrl: 'templates/huankuan/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/huankuan/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/duigong/yufukuan', {
                    templateUrl: 'templates/yufukuan/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/yufukuan/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                // 借还款结束
                // 机票部分开始
                when('/shanglv/airfare', {
                    templateUrl: 'templates/airfare/search.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/airfare/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                // 机票部分结束
                //个人账户
                when('/personalCenter/account', {
                    templateUrl: 'templates/personalCenter/account/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/personalCenter/account/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //我的订单
                when('/personalCenter/myOrder', {
                    templateUrl: 'templates/personalCenter/myOrder/myOrder.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/personalCenter/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //个人资料
                when('/personalCenter/personalInfo', {
                    templateUrl: 'templates/personalCenter/myInfo/personalInfo.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/personalCenter/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //我的发票抬头
                when('/personalCenter/invoice', {
                    templateUrl: 'templates/personalCenter/myInvoice/invoice.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/personalCenter/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //常用旅客
                when('/personalCenter/passengers', {
                    templateUrl: 'templates/personalCenter/myPassengers/passengers.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/personalCenter/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //我的单据
                when('/personalCenter/danju', {
                    templateUrl: 'templates/personalCenter/danju.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/personalCenter/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //我的待办
                when('/personalCenter/backlog', {
                    templateUrl: 'templates/personalCenter/backlog.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/personalCenter/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //账号与绑定设置
                when('/personalCenter/bangding', {
                    templateUrl: 'templates/personalCenter/bangding.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/personalCenter/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/personalCenter/defaultDept', {
                    templateUrl: 'templates/personalCenter/defaultDept.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/personalCenter/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //机票订单详情
//			when('/personalCenter/orderRefunds', {
//				templateUrl: 'templates/personalCenter/myOrder/orderRefunds.html',
//				resolve: {
//					keyName: function($q) {
//						var deferred = $q.defer();
//						require(['js/templates/personalCenter/index'], function(controller) {
//							deferred.resolve();
//						});
//						return deferred.promise;
//					}
//				}
//			}).
                /*记一笔*/
                when('/keepaccounts/index', {
                    templateUrl: 'templates/keepaccounts/index.html',
                    //controller: 'kcCtrl',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/keepaccounts/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*票夹*/
                when('/invoicesfolder/index', {
                    templateUrl: 'templates/invoicesfolder/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/invoicesfolder/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*影像采集*/
                when('/imageAcquisition/index', {
                    templateUrl: 'templates/imageAcquisition/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/imageAcquisition/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*影像调阅*/
                when('/imageAccess/index', {
                    templateUrl: 'templates/imageAccess/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/imageAccess/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*分类目录定义*/
               when('/typeDefine/index',{
               		templateUrl: 'templates/archivedefine/typedefine/index.html',
               		resolve: {
               			keyName: function($q){
               				var deferred = $q.defer();
               				require(['js/templates/archivedefine/typedefine/index'], function(controller){
               					deferred.resolve();
               				});
               				return deferred.promise;
               			}
               		}
               }).
                /*仓库管理*/
               when('/warehouseManagement/index',{
               		templateUrl: 'templates/archivedefine/warehousemanagement/index.html',
               		resolve: {
               			keyName: function($q){
               				var deferred = $q.defer();
               				require(['js/templates/archivedefine/warehousemanagement/index'], function(controller){
               					deferred.resolve();
               				});
               				return deferred.promise;
               			}
               		}
               }).
               /*分册规则*/
               when('/volumeRule/index',{
               		templateUrl: 'templates/archivedefine/volumerule/index.html',
               		resolve: {
               			keyName: function($q){
               				var deferred = $q.defer();
               				require(['js/templates/archivedefine/volumerule/index'], function(controller){
               					deferred.resolve();
               				});
               				return deferred.promise;
               			}
               		}
               }).
               /*会计凭证档案采集*/
               when('/accountingVoucher/index',{
               		templateUrl: 'templates/archivecollection/accountingvoucher/index.html',
               		resolve: {
               			keyName: function($q){
               				var deferred = $q.defer();
               				require(['js/templates/archivecollection/accountingvoucher/index'], function(controller){
               					deferred.resolve();
               				});
               				return deferred.promise;
               			}
               		}
               }).
               /*会计账簿档案采集*/
               when('/accountingBook/index',{
               		templateUrl: 'templates/archivecollection/accountingbooks/index.html',
               		resolve: {
               			keyName: function($q){
               				var deferred = $q.defer();
               				require(['js/templates/archivecollection/accountingbooks/index'], function(controller){
               					deferred.resolve();
               				});
               				return deferred.promise;
               			}
               		}
               }).
               /*会计报表档案采集*/
               when('/accountingForm/index',{
               		templateUrl: 'templates/archivecollection/accountingform/index.html',
               		resolve: {
               			keyName: function($q){
               				var deferred = $q.defer();
               				require(['js/templates/archivecollection/accountingform/index'], function(controller){
               					deferred.resolve();
               				});
               				return deferred.promise;
               			}
               		}
               }).
               /*其它类型档案采集*/
               when('/othorArchive/index',{
               		templateUrl: 'templates/archivecollection/othorarchive/index.html',
               		resolve: {
               			keyName: function($q){
               				var deferred = $q.defer();
               				require(['js/templates/archivecollection/othorarchive/index'], function(controller){
               					deferred.resolve();
               				});
               				return deferred.promise;
               			}
               		}
               }).
                /*费用申请*/
                when('/feeapply/home', {
                    templateUrl: 'templates/feeapply/home.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/feeapply/home'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*预付款*/
                when('/advancepayment/home', {
                    templateUrl: 'templates/advancepayment/home.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/advancepayment/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*对公划收开始*/
                when('/feePay/home', {
                    templateUrl: 'templates/feePay/home.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/feePay/home'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //分期付款计划
                when('/fenqifukuanjihua/index', {
                    templateUrl: 'templates/fenqifukuanjihua/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/fenqifukuanjihua/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*作业平台-制度维护*/
            when('/zhiduweihu/home', {
                templateUrl: 'templates/zhiduweihu/home.html',
                resolve: {
                    keyName: function ($q) {
                        var deferred = $q.defer();
                        require(['js/templates/zhiduweihu/home'], function (controller) {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                }
            }).
            /*作业平台-值班计划**/
            when('/zhiban/home', {
                templateUrl: 'templates/zhiban/home.html',
                resolve: {
                    keyName: function ($q) {
                        var deferred = $q.defer();
                        require(['js/templates/zhiban/home'], function (controller) {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                }
            }).
            /*作业平台-收款单**/
            when('/gathering_order/index', {
                templateUrl: 'templates/gathering_order/index.html',
                resolve: {
                    keyName: function ($q) {
                        var deferred = $q.defer();
                        require(['js/templates/gathering_order/index'], function (controller) {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                }
            }).
                /*还款单*/
            when('/huankuandan/index', {
                templateUrl: 'templates/huankuandan/index.html',
                resolve: {
                    keyName: function ($q) {
                        var deferred = $q.defer();
                        require(['js/templates/huankuandan/index'], function (controller) {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                }
            }).
                /*信用管理*/
            when('/xingyongguanli/home', {
                templateUrl: 'templates/xingyongguanli/home.html',
                resolve: {
                    keyName: function ($q) {
                        var deferred = $q.defer();
                        require(['js/templates/xingyongguanli/home'], function (controller) {
                            deferred.resolve();
                        });
                        return deferred.promise;
                    }
                }
            }).
                /*付款申请*/
                when('/duigong/fukuan', {
                    templateUrl: 'templates/fukuan/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/fukuan/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/test', {
                    templateUrl: 'templates/shared/component.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/shared/demo'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/train', {
                    templateUrl: 'templates/train/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/train/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/home', {
                    templateUrl: 'templates/home/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/home/index'], function (controller){
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).


				when('/editbudget_money_list', {
					templateUrl: 'view/basicdata/budgetadjust/editmoneylist.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/budgetadjust/editmoneylist'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).

				when('/addbudget_money_list', {
					templateUrl: 'view/basicdata/budgetadjust/addmoneylist.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/budgetadjust/addmoneylist'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/budget_processbatch', {
					templateUrl: 'view/basicdata/budget/budgetprocessbatch.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/budget/budgetprocessbatch'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/budget_process', {
					templateUrl: 'view/basicdata/budget/budgetprocess.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/budget/budgetprocess'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/budget_edit_list_edit', {
					templateUrl: 'view/basicdata/budget/budgeteditlistedit.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/budget/budgeteditlistedit'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/budget_edit_list', {
					templateUrl: 'view/basicdata/budget/budgeteditlist.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/budget/budgeteditlist'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/budget_create_list', {
					templateUrl: 'view/basicdata/budget/budgetcreatelist.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/budget/budgetcreatelist'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/budget_list', {
					templateUrl: 'view/basicdata/budget/budgetlist.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/budget/budgetlist'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/batchmenu', {
					templateUrl: 'view/basicdata/menu/batchmenu.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/batchmenu'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/batchperson', {
					templateUrl: 'view/basicdata/menu/batchperson.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/batchperson'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/pemenu', {
					templateUrl: 'view/basicdata/menu/pemenu.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/pemenu'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/pedetail', {
					templateUrl: 'view/basicdata/menu/pedetail.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/pedetail'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/pedefine', {
					templateUrl: 'view/basicdata/menu/pedefine.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/pedefine'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/datadefine', {
					templateUrl: 'view/basicdata/menu/datadefine.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/datadefine'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/packagemenu', {
					templateUrl: 'view/basicdata/menu/packagemenu.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/packagemenu'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/package', {
					templateUrl: 'view/basicdata/menu/package.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/package'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/resource', {
					templateUrl: 'view/basicdata/menu/resource.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/resource'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/menudefine', {
					templateUrl: 'view/basicdata/menu/menudefine.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/menu/menudefine'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/rnormdetail', {
					templateUrl: 'view/basicdata/reimburse/rnormdetail.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/reimburse/rnormdetail'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/rnorm', {
					templateUrl: 'view/basicdata/reimburse/rnorm.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/reimburse/rnorm'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/rperson', {
					templateUrl: 'view/basicdata/reimburse/rperson.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/reimburse/rperson'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/rarea', {
					templateUrl: 'view/basicdata/reimburse/rarea.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/reimburse/rarea'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/rate', {
					templateUrl: 'view/basicdata/rate.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/rate'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/area', {
					templateUrl: 'view/basicdata/area.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/area'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/provider', {
					templateUrl: 'view/basicdata/provider.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/provider'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/subjects', {
					templateUrl: 'view/basicdata/subjects.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/subjects'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/cost_active2', {
					templateUrl: 'view/basicdata/cost/cost_active2.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/cost/cost_active2'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/cost_active1', {
					templateUrl: 'view/basicdata/cost/cost_active1.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/cost/cost_active1'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/cost_budgetall', {
					templateUrl: 'view/basicdata/cost/cost_budgetall.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/cost/cost_budgetall'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/cost_budget', {
					templateUrl: 'view/basicdata/cost/cost_budget.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/cost/cost_budget'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/cost_basic', {
					templateUrl: 'view/basicdata/cost/cost_basic.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/cost/cost_basic'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/erp_ou', {
					templateUrl: 'view/basicdata/erpou.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/erpou'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/paybank', {
					templateUrl: 'view/basicdata/paybank.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/paybank'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/company', {
					templateUrl: 'view/basicdata/company.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/company'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/busiorgdetail', {
					templateUrl: 'view/basicdata/busiorgdetail.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/busiorgdetail'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/busiorg', {
					templateUrl: 'view/basicdata/busiorg.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/busiorg'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
                when('/dictdetail', {
                    templateUrl: 'view/basicdata/dictdetail.html',
                    resolve: {
                        keyName: function($q) {
                            var deferred = $q.defer();
                            require(['js/view/basicdata/dictdetail'], function(controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/dict', {
                    templateUrl: 'view/basicdata/dict.html',
                    resolve: {
                        keyName: function($q) {
                            var deferred = $q.defer();
                            require(['js/view/basicdata/dict'], function(controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //when('/expense/expensethird', {
                //    templateUrl: 'view/personalexp/expensethird.html',
                //    resolve: {
                //        keyName: function($q) {
                //            var deferred = $q.defer();
                //            require(['js/view/personalexp/expensethird'], function(controller) {
                //                deferred.resolve();
                //            });
                //            return deferred.promise;
                //        }
                //    }
                //}).
				when('/expense/expensefirst', {
					templateUrl: 'view/personalexp/expensefirst.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/personalexp/expensefirst'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/currency', {
					templateUrl: 'view/basicdata/currency.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/basicdata/currency'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/workflow', {
					templateUrl: 'view/workflow/workflow.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/view/workflow/workflow'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
                when('/processbrule1', {
                    templateUrl: 'view/workflow/processbrule1.html',
                    resolve: {
                        keyName: function($q) {
                            var deferred = $q.defer();
                            require(['js/view/workflow/processbrule1'], function(controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/processbrule2', {
                    templateUrl: 'view/workflow/processbrule2.html',
                    resolve: {
                        keyName: function($q) {
                            var deferred = $q.defer();
                            require(['js/view/workflow/processbrule2'], function(controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/placerule', {
                    templateUrl: 'view/workflow/placerule.html',
                    resolve: {
                        keyName: function($q) {
                            var deferred = $q.defer();
                            require(['js/view/workflow/placerule'], function(controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/processauthadmin', {
                    templateUrl: 'view/workflow/processauthadmin.html',
                    resolve: {
                        keyName: function($q) {
                            var deferred = $q.defer();
                            require(['js/view/workflow/processauthadmin'], function(controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/processauth', {
                    templateUrl: 'view/workflow/processauth.html',
                    resolve: {
                        keyName: function($q) {
                            var deferred = $q.defer();
                            require(['js/view/workflow/processauth'], function(controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/processauthmyewu', {
                    templateUrl: 'view/workflow/processauthmyewu.html',
                    resolve: {
                        keyName: function($q) {
                            var deferred = $q.defer();
                            require(['js/view/workflow/processauthmyewu'], function(controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                when('/processauthyewu', {
                    templateUrl: 'view/workflow/processauthyewu.html',
                    resolve: {
                        keyName: function($q) {
                            var deferred = $q.defer();
                            require(['js/view/workflow/processauthyewu'], function(controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
				//费用分摊 create by 16/8
				when('/feeSharing/index', {
					templateUrl: 'templates/feeSharing/index.html',
					resolve: {
						keyName: function($q) {
							var deferred = $q.defer();
							require(['js/templates/feeSharing/feeSharing'], function(controller) {
								deferred.resolve();
							});
							return deferred.promise;
						}
					}
				}).
				when('/shanglv/telAirfare', {
                    templateUrl: 'templates/telAirfare/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/telAirfare/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //付款管理
				when('/feeapply/govern', {
                    templateUrl: 'templates/fukuanguanli/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/fukuanguanli/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //预提开始
                when('/provision/home', {
                    templateUrl: 'templates/provision/home.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/provision/home'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //派单规则
                when('/ordersRule', {
                    templateUrl: 'templates/renwuguanli/paidanguize/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/renwuguanli/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //任务池维护
                when('/maintain', {
                    templateUrl: 'templates/renwuguanli/renwuchiweihu/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/renwuguanli/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //任务组维护
                when('/taskSet', {
                    templateUrl: 'templates/renwuguanli/renwuzuweihu/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/renwuguanli/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //任务组派单
                when('/taskSend', {
                    templateUrl: 'templates/renwuguanli/renwuzupaidan/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/renwuguanli/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                //任务池分组
                when('/taskPool', {
                    templateUrl: 'templates/renwuguanli/renwuchifenzu/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/renwuguanli/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*对公支付EC*/
                when('/duigongEC/home', {
                    templateUrl: 'templates/duigongEC/home.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/duigongEC/home'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*任务处理*/
                when('/tasks/index', {
                    templateUrl: 'templates/tasks/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/tasks/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).                             
                /*任务异常处理*/
                when('/tasks/taskException', {
                    templateUrl: 'templates/tasks/taskException.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/tasks/taskException'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
               
                /*凭证科目对应关系设置*/
                when('/correspondingRelation/index', {
                    templateUrl: 'templates/correspondingRelation/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/correspondingRelation/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*预凭证生成规则设置*/
                when('/certificateRule/index', {
                    templateUrl: 'templates/certificateRule/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/certificateRule/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                 /*ERP实例维护*/
                when('/caseMaintenance/index', {
                    templateUrl: 'templates/caseMaintenance/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/caseMaintenance/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*科目集与ERP数据源映射关系*/
               when('/mapping/index', {
                    templateUrl: 'templates/mapping/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/mapping/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*基础科目与COA对应关系*/
               when('/baseSubjects/index', {
                    templateUrl: 'templates/baseSubjects/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/baseSubjects/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*内部交易关系设置*/
               when('/internalTransaction/index', {
                    templateUrl: 'templates/internalTransaction/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/internalTransaction/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*预凭证管理*/
                when('/preCertificate/index', {
                    templateUrl: 'templates/preCertificate/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/preCertificate/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*核销关系管理*/
                when('/hexiao/index', {
                    templateUrl: 'templates/hexiao/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/hexiao/index'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*test*/
                when('/tasks/test', {
                    templateUrl: 'templates/tasks/test.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/tasks/test'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).

                /*质检任务处理*/
                when('/financeQC/taskProcessing', {
                    templateUrl: 'templates/financeQC/taskProcessing.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/financeQC/taskProcessing'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                
                /*质检计划管理*/
                when('/financeQC/planManagement', {
                    templateUrl: 'templates/financeQC/planManagement.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/financeQC/planManagement'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*质检任务派组*/
                when('/financeQC/taskGroup', {
                    templateUrl: 'templates/financeQC/taskGroup.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/financeQC/taskGroup'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*问题类别定义*/
                when('/financeQC/questionClass', {
                    templateUrl: 'templates/financeQC/questionClass.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/financeQC/questionClass'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*问题定义*/
                when('/financeQC/question', {
                    templateUrl: 'templates/financeQC/question.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/financeQC/question'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*需整改问题管理*/
                when('/financeQC/problemManagement', {
                    templateUrl: 'templates/financeQC/problemManagement.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/financeQC/problemManagement'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
                /*质检报告*/
                when('/financeQC/reportQC', {
                    templateUrl: 'templates/financeQC/reportQC.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/financeQC/reportQC'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).
      
                 /*综合工单*/
                when('/tasks/worksheet', {
                    templateUrl: 'templates/tasks/worksheet/index.html',
                    resolve: {
                        keyName: function ($q) {
                            var deferred = $q.defer();
                            require(['js/templates/tasks/worksheet/worksheet'], function (controller) {
                                deferred.resolve();
                            });
                            return deferred.promise;
                        }
                    }
                }).           
                otherwise({
                    redirectTo: '/home' //angular就喜欢斜杠开头
                });
        }
    ]).run(function ($rootScope, $location, $http, publicmodel) {
        $rootScope.slide = '';
        //$rootScope.$on('$routeChangeStart', function() {
        //event button to move backward
        $rootScope.back = function () {
            $rootScope.slide = 'slide-right';
        };
        //event button item list to move forward
        $rootScope.next = function () {
            $rootScope.slide = 'slide-left';
        };
        // 子模块面包屑开始
        $rootScope.modCrumb = publicmodel.breadCrumb;
        $rootScope.goCrumb = function (path, index, isLast) {
            var len = $rootScope.modCrumb.length;
            var howMany = len - index + 1;
            var start = index + 1;
            $rootScope.modCrumb.splice(start, howMany);
            publicmodel.breadCrumb = $rootScope.modCrumb;
            if (isLast == false) {
                $rootScope.go(path);
            } else {
                console.log("你就在这个页面");
            }
        };
        $rootScope.crumbInit = function (path, title) {
            $rootScope.modCrumb = [];
            if (path && title) {
                var i = {
                    path: path,
                    title: title
                }
                $rootScope.modCrumb.push(i);
            }
            publicmodel.breadCrumb = $rootScope.modCrumb;
        }
        $rootScope.updateCrumb = function (newValue) {
            $rootScope.modCrumb[$rootScope.modCrumb.length - 1].title = newValue;
        };
        // 子模块面包屑结束
        $rootScope.go = function (path, title) {
            if (title) {
                // 面包屑添加模式开始
                var i = {
                    path: path,
                    title: title
                }
                $rootScope.modCrumb.push(i);
                publicmodel.breadCrumb = $rootScope.modCrumb;
            }
            for (var i = $rootScope.modCrumb.length; i--;) {
                if (path[path.length - 1] == '/') {
                    path = path.substring(0, path.length - 1);
                }
                if ($rootScope.modCrumb[i]['path'] == path.toString()) {
                    var len = $rootScope.modCrumb.length;
                    var howMany = len - i + 1;
                    var start = i + 1;
                    $rootScope.modCrumb.splice(start, howMany);
                    publicmodel.breadCrumb = $rootScope.modCrumb;
                    break;
                }
            }
            $location.path(path);
        };
        $rootScope.goBack = function () {
            history.back(-1);
        };
        // 登录判断开始
        var time = (new Date().getTime() / 1000).toFixed(0);
        if (!(sessionStorage.Remember == 1) && (time - sessionStorage.LoginTime) > 500) {
            $rootScope.go('/login');
        }
        if (!sessionStorage.Token || sessionStorage.Token == '') {
            $rootScope.go('/login');
        }
        console.log(window.location.href);
        // 登录判断结束
    }).config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('indigo', {
                'default': '400',
                'hue-1': '200',
                'hue-2': '700',
                'hue-3': '800'
            }).accentPalette('pink', {
                'default': '700',
                'hue-1': '400',
                'hue-2': '700',
                'hue-3': 'A200'
            });
    });
    app.factory('instance', function () {
        return {};
    }).run(['$templateCache', function ($templateCache) {
        $templateCache.put('dateTimeDialog.tpl.html', '<md-dialog><time-date-picker display-mode="{{displayMode}}" default-mode="{{defaultMode}}" default-date="{{defaultDate}}" mindate="{{mindate}}" maxdate="{{maxdate}}" ng-model="model" on-cancel="onCancel()" on-save="onSave()"></time-date-picker></md-dialog>');
    }]).directive('dateTimePickerInput', function ($mdDialog, $filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope,
                            element,
                            attrs,
                            ngModelCtrl) {
                if (element[0].tagName.toLowerCase() !== 'input' || attrs['type'].toLowerCase() !== 'text') {
                    throw new Error('date-time-picker-input directive must be instantiated as an attribute of a input with type="text"');
                }
                var _openModal;
                element.on('focus', function () {
                    if (_openModal) return;
                    ngModelCtrl.$setTouched();
                    _openModal = $mdDialog.show({
                        parent: angular.element(document.querySelector('body')),
                        templateUrl: 'dateTimeDialog.tpl.html',
                        controller: function ($scope, $mdDialog) {
                            // See https://github.com/SimeonC/sc-date-time#options for details
                            var passthroughAttrs = ['displayMode', 'defaultDate', 'defaultMode', 'mindate', 'maxdate']
                            angular.forEach(passthroughAttrs, function (key) {
                                $scope[key] = attrs[key];
                            });
                            if (angular.isDate(ngModelCtrl.$modelValue)) $scope.model = ngModelCtrl.$modelValue;
                            $scope.onCancel = function () {
                                $mdDialog.cancel();
                                element[0].focus();
                                element[0].blur();
                            };
                            $scope.onSave = function () {
                                $mdDialog.hide($scope.model);
                            };
                        },
                        show: true
                    }).then(function (newDate) {
                        ngModelCtrl.$modelValue.setTime(newDate.getTime());
                        ngModelCtrl.$setDirty();
                        element.val(formatDate(newDate));
                        ngModelCtrl.$setViewValue(newDate);
                        _openModal = null;
                    });
                });

                if (attrs['ngMin']) {
                    ngModelCtrl.$validators['min'] = function (dateValue) {
                        return new Date(dateValue) >= new Date(attrs['ngMin']);
                    };
                }

                if (attrs['ngMax']) {
                    ngModelCtrl.$validators['max'] = function (dateValue) {
                        return new Date(dateValue) <= new Date(attrs['ngMax']);
                    };
                }

                ngModelCtrl.$formatters.push(formatDate);
                function formatDate(value) {
                    return $filter('date')(value, attrs['displayFormat'] || 'EEEE d MMMM yyyy, h:mm a');
                };
            }
        };
    });
    return app;
});