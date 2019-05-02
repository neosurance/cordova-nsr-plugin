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

		exec(win, fail, service, "init_nsr", [obj]);

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


		//exec(function(winParam) {}, function(error) {}, "service","action", ["firstArgument", "secondArgument", 42, false]);
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
			obj = {"msg":"nsr_app_login"};
		}

		exec(win, fail, service, "nsr_app_login", [obj]);

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
			obj = {"msg":"nsr_app_payment"};
		}

		exec(win, fail, service, "nsr_app_payment", [obj]);

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
			var places = [ {
				fake : 1,
				fromCode : 'IT',
				fromCountry : 'Italia',
				toCode : 'FR',
				toCountry : 'Francia'
			}, {
				fake : 1,
				fromCode : 'IT',
				fromCountry : 'Italia',
				toCode : 'US',
				toCountry : 'Stati Uniti'
			}, {
				fake : 1,
				fromCode : 'IT',
				fromCountry : 'Italia',
				toCode : 'JP',
				toCountry : 'Giappone'
			} ];

			obj = {
				event : 'countryChange',
				payload : places[0],
			};
		}

		var what = (cordova.platformId == "ios") ? "sendEvent" : "nsr_send_event";
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
			var places = [ {
				fake : 1,
				fromCode : 'IT',
				fromCountry : 'Italia',
				toCode : 'FR',
				toCountry : 'Francia'
			}, {
				fake : 1,
				fromCode : 'IT',
				fromCountry : 'Italia',
				toCode : 'US',
				toCountry : 'Stati Uniti'
			}, {
				fake : 1,
				fromCode : 'IT',
				fromCountry : 'Italia',
				toCode : 'JP',
				toCountry : 'Giappone'
			} ];

			obj = {
				event : 'countryChange',
				payload : places[0],
			};
		}

		exec(win, fail, service, "nsr_send_action", [obj]);

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

		exec(win, fail, service, "nsr_post_message", [obj]);

	}

};


module.exports = Neosurance;
