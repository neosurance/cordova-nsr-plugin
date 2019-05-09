var exec = cordova.require('cordova/exec');
var	service = "Neosurance";

var Neosurance = {

	login_url: "",

	payment: "",

	payment_url: "",

	initNSRCordovaInterface: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("initNSRCordovaInterface - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("initNSRCordovaInterface - Javascipt - KO");
			};

		var what = (cordova.platformId == "ios") ? "setup" : "init_nsr";
		exec(win, fail, service, what, [obj]);

	},

	NSR_Setup: function (obj, win, fail) {

		if(typeof obj == "undefined" || obj == null)
			obj = {"int": 1, "message": "nsr_setup"};


		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_SETUP - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_SETUP - Javascipt - KO");
			};

		var what = (cordova.platformId == "ios") ? "setup" : "nsr_setup";
		exec(win, fail, service, what, [obj]);

	},

	NSR_RegisterUser: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_RegisterUser - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_RegisterUser - Javascipt - KO");
			};

		var what = (cordova.platformId == "ios") ? "registerUser" : "nsr_register_user";
		exec(win, fail, service, what, [obj]);

	},

	NSR_SetLoginCallback: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_SetLoginCallback - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_SetLoginCallback - Javascipt - KO");
			};

		if(obj == "undefined" || obj == null){
			obj = {"int": 1, "message": "nsr_app_login"};
		}

		var what = (cordova.platformId == "ios") ? "login" : "nsr_app_login";
		exec(win, fail, service, what, [obj]);

	},

	NSR_SendEvent: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_SendEvent - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_SendEvent - Javascipt - KO");
			};

		if(typeof obj == "undefined" || obj == null){
			fail("No event found");
		}

		var what = (cordova.platformId == "ios") ? "sendEvent" : "nsr_send_event";
		exec(win, fail, service, what, [obj]);

	},

	NSR_LoginExecuted: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_LoginExecuted - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_LoginExecuted - Javascipt - KO");
			};

		if(obj == "undefined" || obj == null){
			obj = {url: Neosurance.login_url};
		}

		var what = (cordova.platformId == "ios") ? "appLogin" : "nsr_login_executed";
		exec(win, fail, service, what, [obj]);

	},

	//NSR_SHOWAPP
	NSR_ShowApp: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_ShowApp - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_ShowApp - Javascipt - KO");
			};

		var what = (cordova.platformId == "ios") ? "showApp" : "showApp";
		exec(win, fail, service, what, [obj]);

	},

	NSR_AppPayment: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_AppPayment - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_AppPayment - Javascipt - KO");
			};

		if(obj == "undefined" || obj == null){
			obj = {"int": 1, "message": "nsr_app_payment"};
		}

		var what = (cordova.platformId == "ios") ? "appPayment" : "nsr_app_payment";
		exec(win, fail, service, what, [obj]);

	},

	NSR_PaymentExecuted: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_PaymentExecuted - Javascipt - OK");

				if(typeof Neosurance != "undefined" && Neosurance != null &&
					typeof Neosurance.payment != "undefined" && Neosurance.payment != null &&
					typeof Neosurance.payment_url != "undefined" && Neosurance.payment_url != null) {

					console.log("Neosurance.payment: " + JSON.stringify(Neosurance.payment) );
					console.log("Neosurance.payment_url: " + Neosurance.payment_url);

				}

			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_PaymentExecuted - Javascipt - KO");

				if(typeof Neosurance != "undefined" && Neosurance != null &&
					typeof Neosurance.payment != "undefined" && Neosurance.payment != null &&
					typeof Neosurance.payment_url != "undefined" && Neosurance.payment_url != null) {

					console.log("Neosurance.payment: " + JSON.stringify(Neosurance.payment) );
					console.log("Neosurance.payment_url: " + Neosurance.payment_url);

				}

			};

		if(typeof Neosurance != "undefined" && Neosurance != null &&
			typeof Neosurance.payment != "undefined" && Neosurance.payment != null &&
			typeof Neosurance.payment_url != "undefined" && Neosurance.payment_url != null)
			obj = {"payment": Neosurance.payment, "payment_url": Neosurance.payment_url};

		var what = (cordova.platformId == "ios") ? "appPayment" : "nsr_payment_executed";
		exec(win, fail, service, what, [obj]);

	},

	NSR_SendAction: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_SendAction - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_SendAction - Javascipt - KO");
			};

		if(typeof obj == "undefined" || obj == null){
			fail("No event found");
		}

		var what = (cordova.platformId == "ios") ? "sendAction" : "nsr_send_action";
		exec(win, fail, service, what, [obj]);

	},

	NSR_PostMessage: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_PostMessage - Javascipt - OK");
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_PostMessage - Javascipt - KO");
			};

		var what = (cordova.platformId == "ios") ? "postMessage" : "nsr_post_message";
		exec(win, fail, service, what, [obj]);

	},

	nsr_event_cruncher: {

		ns_lang: new URL(document.URL).searchParams.get('ns_lang'),

		ns_log: (new URL(document.URL).searchParams.get('ns_log') == 'true'),

		NSRPostMsg: function (params) {

			//>>> NSR: NSREventWebView eventWebView (name)

			try {
				if (typeof window.webkit != "undefined" && window.webkit != null)
					window.webkit.messageHandlers.app.postMessage(params);
				else
					Neosurance.NSR_PostMessage(JSON.stringify(params));
			} catch (err) {
				Neosurance.NSR_PostMessage(JSON.stringify(params));
			}
		},

		NSRlog: function (msg) {
			if (this.ns_log) {
				console.log('Neosurance.nsr_event_cruncher.EVC>> ' + msg);
				this.NSRPostMsg({
					log: 'Neosurance.nsr_event_cruncher.EVC>> ' + msg
				});
			}
		},

		EVC: {


			init: function (win,fail) {

				if (localStorage.getItem("nsr_chains") != null)
					window.eval(localStorage.getItem("nsr_chains"));
				this.synch();


				if(cordova.platformId == "ios")
					exec(win, fail, 'Neosurance', 'setWorkflowDelegate', [{"int": 1, "cmd": "setWorkflowDelegate"}]);
				else
					win({res: '>>> EVC INIT OK'});

			},
			synch: function () {

				Neosurance.nsr_event_cruncher.NSRlog('eventView Synch!');

				var t = localStorage.getItem("nsr_chainstime");
				t = t == null ? 0 : parseInt(t, 10);

				var _self = this.innerSynch;
				Neosurance.nsr_event_cruncher.NSRPostMsg({
					what: 'callApi',
					endpoint: 'chains?t=' + t,
					callBack: _self
				});

			},
			innerSynch: function (res) {

				Neosurance.nsr_event_cruncher.NSRlog('eventView innerSynch! ' + JSON.stringify(res));

				if (res.status == 'ok') {
					Neosurance.nsr_event_cruncher.NSRlog('refresh chains!');

					localStorage.setItem("nsr_chainstime", res.chains_time);
					localStorage.setItem("nsr_chains", res.chains);
					window.eval(res.chains);
				}

			},

			n_pending_evt: 0,

			innerCrunchEvent: function (nsrEvent) {

				Neosurance.nsr_event_cruncher.NSRlog('innerCrunchEvent');

				if (window.crunchEvent) {

					Neosurance.nsr_event_cruncher.NSRlog('cruncher exists');
					window.crunchEvent(nsrEvent);
					this.n_pending_evt = 0;

				} else if (this.n_pending_evt++ < 10) {

					Neosurance.nsr_event_cruncher.NSRlog('wait for cruncher ' + this.n_pending_evt);

					setTimeout(function () {
						this.innerCrunchEvent(JSON.parse(JSON.stringify(nsrEvent)))
					}, 1000);
				}

			},

			loaded: function () {

				window.Neosurance.nsr_event_cruncher.NSRlog('continueInitJob');
				window.Neosurance.nsr_event_cruncher.NSRPostMsg({
					what: 'continueInitJob'
				});
			}

		}

	}

};


module.exports = Neosurance;
