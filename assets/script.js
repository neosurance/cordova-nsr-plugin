function postMsg(params) {
	try {
		window.webkit.messageHandlers.app.postMessage(params)
	} catch (err) {
		demo.postMessage(JSON.stringify(params))
	}
}

function getById(id) {
	return document.getElementById(id);
}

function hasClass(obj, name) {
	return (obj.className) ? obj.className.split(' ').includes(name) : false;
}

function addClass(obj, name) {
	if (!obj.className)
		obj.className = ''
	var cls = obj.className.split(' ')
	obj.className += (!cls.includes(name)) ? ' ' + name : '';
	obj.className = obj.className.trim();
}

function removeClass(obj, name) {
	if (hasClass(obj, name)) {
		var cls = obj.className.split(' ')
		obj.className = ''
		for (var i = 0; i < cls.length; i++)
			obj.className += (name != cls[i]) ? ' ' + cls[i] : '';
		obj.className = obj.className.trim();
	}
}

HTMLElement.prototype.hasClass = function(name) {
	return hasClass(this, name);
}

HTMLElement.prototype.addClass = function(name) {
	addClass(this, name);
}

HTMLElement.prototype.removeClass = function(name) {
	removeClass(this, name);
}

var user = {
	email : '',
	firstname : '',
	lastname : '',
	fiscalCode : '',
	address : '',
	city : '',
	stateProvince : ''
}

function init() {
	postMsg({
		what : 'ready'
	})
	if (localStorage.getItem('ingdemo_user')) {
		user = JSON.parse(localStorage.getItem('ingdemo_user'))
		try {
			with (user) {
				address
			}
			postMsg({
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
			})
			showMain()
		} catch (err) {
			user.address = '';
			user.city = '';
			user.stateProvince = '';
			showUser()
		}
	} else
		showUser()
}

function showUser() {
	getById('inner').innerHTML = T('user').render(user)
}

function registerUser() {
	var proceed = true
	if (getById('email').value.trim() == '') {
		proceed = false;
		getById('email').addClass('error')
	}
	if (getById('firstname').value.trim() == '') {
		proceed = false;
		getById('firstname').addClass('error')
	}
	if (getById('lastname').value.trim() == '') {
		proceed = false;
		getById('lastname').addClass('error')
	}
	if (!CF.check(getById('fiscalCode').value.trim())) {
		proceed = false;
		getById('fiscalCode').addClass('error')
	}
	if (getById('address').value.trim() == '') {
		proceed = false;
		getById('address').addClass('error')
	}
	if (getById('city').value.trim() == '') {
		proceed = false;
		getById('city').addClass('error')
	}
	if (getById('stateProvince').value.trim() == '') {
		proceed = false;
		getById('stateProvince').addClass('error')
	}
	if (proceed) {
		user = {
			email : getById('email').value.trim(),
			firstname : getById('firstname').value.trim(),
			lastname : getById('lastname').value.trim(),
			fiscalCode : getById('fiscalCode').value.trim(),
			address : getById('address').value.trim(),
			city : getById('city').value.trim(),
			stateProvince : getById('stateProvince').value.trim()
		}
		localStorage.setItem('ingdemo_user', JSON.stringify(user))
		init()
	}
}

function showMain() {
	if (user.address == null)
		showUser()
	else
		getById('inner').innerHTML = T('main').render()
}

function sendEvent() {
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
	} ]
	postMsg({
		event : 'countryChange',
		payload : places[Math.floor(Math.random() * 3)],
	})
}

function showLogin() {
	getById('inner').innerHTML = T('login').render()
}

function showPay() {
	getById('inner').innerHTML = T('pay').render()
}

function loginDone() {
	postMsg({
		what : 'loginExecuted'
	})
	setTimeout(showMain, 250)
}

function payDone() {
	postMsg({
		what : 'paymentExecuted'
	})
	setTimeout(showMain, 250)
}
