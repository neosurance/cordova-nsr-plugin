var scriptJS = {

	postMsg: function(params) {

		//>>> demo: NSRActivity WebView mainView (name)

		try {
			if(typeof window.webkit != "undefined" && window.webkit != null)
				window.webkit.messageHandlers.app.postMessage(params);
			else if(typeof window.demo != "undefined" && window.demo != null)
				window.demo.postMessage(JSON.stringify(params));
			else
				Neosurance.NSR_PostMessage(JSON.stringify(params));
		} catch (err) {
			if(typeof window.demo != "undefined" && window.demo != null)
				window.demo.postMessage(JSON.stringify(params));
			else
				Neosurance.NSR_PostMessage(JSON.stringify(params));
		}
	},

 	getById: function(id) {
		return document.getElementById(id);
	},

 	init: function() {

		scriptJS.postMsg({
			what : 'ready'
		});

		if (localStorage.getItem('ingdemo_user')) {

			var user = JSON.parse(localStorage.getItem('ingdemo_user'));

			try {
				with (user) {
					address
				}
				scriptJS.postMsg({
					what : 'registerUser',
					user : {
						email : 'fake.' + user.email,
						code : 'fake.' + user.email,
						locals : {
							email : user.email,
							firstname : user.firstname,
							lastname : user.lastname,
							fiscalCode : user.fiscalCode,
							address : user.address,
							city : user.city,
							stateProvince : user.stateProvince,
							pushToken : 'fake-push'
						}
					},
				});

			} catch (err) {

				user.address = '';
				user.city = '';
				user.stateProvince = '';

			}

		}

	},


 	registerUser: function() {

		var user = {
			email: "ale@ale.it", //scriptJS.getById('email').value.trim(),
			firstname: "ale", //scriptJS.getById('firstname').value.trim(),
			lastname: "infu", //scriptJS.getById('lastname').value.trim(),
			fiscalCode: "NFRLSN85T01D960I", //scriptJS.getById('fiscalCode').value.trim(),
			address: "Via Canova 12", //scriptJS.getById('address').value.trim(),
			city: "Milano", //scriptJS.getById('city').value.trim(),
			stateProvince: "MI" //scriptJS.getById('stateProvince').value.trim()
		};

		localStorage.setItem('ingdemo_user', JSON.stringify(user));

		scriptJS.init();

	},



 	sendEvent: function() {

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

		scriptJS.postMsg({
			event : 'countryChange',
			payload : places[Math.floor(Math.random() * 3)],
		});

	},

 	loginDone: function() {

		scriptJS.postMsg({
			what : 'loginExecuted'
		});

	},

 	payDone: function() {

		scriptJS.postMsg({
			what : 'paymentExecuted'
		});

	}

};

module.exports = scriptJS;
