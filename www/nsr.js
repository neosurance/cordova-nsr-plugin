//aleinfu
var exec = cordova.require('cordova/exec');
var	service = "Neosurance";
var ready = false;


var Neosurance = {

	//***** CordovaWebView <-- Native Android App

	onSetup: function (win, fail) {
		exec(win, fail, service, "onSetupHandler", []);
	},

	onRegisterUser: function (win, fail) {
		exec(win, fail, service, "onRegisterUserHandler", []);
	},


	onAppLogin: function (handle, win, fail) {
		exec(win, fail, service, "onAppLoginHandler", [handle]);
	},

	onAppPayment: function (handle, win, fail) {
		exec(win, fail, service, "onAppPaymentHandler", [handle]);
	},


	//***** CordovaWebView -> Native Android App

	initNSRCordovaInterface: function (obj, win, fail) {

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("initNSRCordovaInterface - Javascipt - OK");
				ready = false;
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("initNSRCordovaInterface - Javascipt - KO");
				ready = false;
			};


		exec(win, fail, service, "init_nsr", [obj]);

	},

	//NSR_Setup
	NSR_Setup: function (obj, win, fail) {


		//obj = {"int": 1, "message": "nsr_setup"}


			if (typeof win == "undefined" || win == null)
				win = function (data) {
					console.log("NSR_SETUP - Javascipt - OK");
					ready = false;
				};

			if (typeof fail == "undefined" || fail == null)
				fail = function (error) {
					console.log("NSR_SETUP - Javascipt - KO");
					ready = false;
				};


			//exec(function(winParam) {}, function(error) {}, "service","action", ["firstArgument", "secondArgument", 42, false]);
			exec(win, fail, service, "nsr_setup", [obj]);



	},

	//NSR_RegisterUser
	NSR_RegisterUser: function (obj, win, fail) {



			ready = true;

			if (typeof win == "undefined" || win == null)
				win = function (data) {
					console.log("NSR_RegisterUser - Javascipt - OK");
					ready = false;
				};

			if (typeof fail == "undefined" || fail == null)
				fail = function (error) {
					console.log("NSR_RegisterUser - Javascipt - KO");
					ready = false;
				};

			exec(win, fail, service, "nsr_register_user", [obj]);



	},


	//NSR_AppLogin
	NSR_AppLogin: function (obj, win, fail) {



			ready = true;

			if (typeof win == "undefined" || win == null)
				win = function (data) {
					console.log("NSR_AppLogin - Javascipt - OK");
					ready = false;
				};

			if (typeof fail == "undefined" || fail == null)
				fail = function (error) {
					console.log("NSR_AppLogin - Javascipt - KO");
					ready = false;
				};

			exec(win, fail, service, "nsr_app_login", [obj]);



	},

	//NSR_AppPayment
	NSR_AppPayment: function (obj, win, fail) {



			ready = true;

			if (typeof win == "undefined" || win == null)
				win = function (data) {
					console.log("NSR_AppPayment - Javascipt - OK");
					ready = false;
				};

			if (typeof fail == "undefined" || fail == null)
				fail = function (error) {
					console.log("NSR_AppPayment - Javascipt - KO");
					ready = false;
				};

			exec(win, fail, service, "nsr_app_payment", [obj]);



	},


	//NSR_SendEvent
	NSR_SendEvent: function (obj, win, fail) {



			ready = true;

			if (typeof win == "undefined" || win == null)
				win = function (data) {
					console.log("NSR_SendEvent - Javascipt - OK");
					ready = false;
				};

			if (typeof fail == "undefined" || fail == null)
				fail = function (error) {
					console.log("NSR_SendEvent - Javascipt - KO");
					ready = false;
				};

			exec(win, fail, service, "nsr_send_event", [obj]);



	},

	//NSR_SendAction
	NSR_SendAction: function (obj, win, fail) {



			ready = true;

			if (typeof win == "undefined" || win == null)
				win = function (data) {
					console.log("NSR_SendAction - Javascipt - OK");
					ready = false;
				};

			if (typeof fail == "undefined" || fail == null)
				fail = function (error) {
					console.log("NSR_SendAction - Javascipt - KO");
					ready = false;
				};

			exec(win, fail, service, "nsr_send_action", [obj]);



	},


	//NSR_PostMessage
	NSR_PostMessage: function (obj, win, fail) {



			ready = true;

			if (typeof win == "undefined" || win == null)
				win = function (data) {
					console.log("NSR_PostMessage - Javascipt - OK");
					ready = false;
				};

			if (typeof fail == "undefined" || fail == null)
				fail = function (error) {
					console.log("NSR_PostMessage - Javascipt - KO");
					ready = false;
				};

			exec(win, fail, service, "nsr_post_message", [obj]);



	},

	//startSDKMainActivity
	startSDKMainActivity: function (obj, win, fail) {

		if (typeof obj == "undefined" || obj == null)
			obj = {
				what: 'registerUser',
				user: {
					email: 'fake.ale@ale.it',
					code: 'fake.ale@ale.it',
				}
			};

		if (typeof win == "undefined" || win == null)
			win = function (data) {
				console.log("NSR_PostMessage - Javascipt - OK");
				ready = false;
			};

		if (typeof fail == "undefined" || fail == null)
			fail = function (error) {
				console.log("NSR_PostMessage - Javascipt - KO");
				ready = false;
			};

		exec(win, fail, service, "start_sdk_main_activity", [obj]);

	}

};


module.exports = Neosurance;
