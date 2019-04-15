/* T v 2.0 - 2018 giovanni tigli */
function T(src, key) {
	var retVal = T.cache[key ? key : src];
	if (!retVal) {
		if (key) {
			retVal = T.cache[key] = T.cache[src];
			if (!retVal)
				retVal = T.cache[key] = T.cache[src] = T.compile(src);
		} else {
			var e = null;
			var es = document.getElementsByName(src);
			for (var i = 0; i < es.length; i++)
				if (es[i].tagName.toUpperCase() == 'SCRIPT' && es[i].type == 'T')
					e = es[i];
			retVal = T.cache[src] = T.compile(e ? e.innerHTML : src);
		}
	}
	return retVal;
}
T.load = function(url, key, okHandler, koHandler) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			if (xhr.status == 200) {
				T(xhr.responseText, key)
				if (okHandler)
					okHandler(T.cache[key]);
			} else if (koHandler)
				koHandler(xhr);
		}
	}
	xhr.send();
}
T.cache = {}
T.tokenize = function(s, regex) {
	var retVal = [];
	for (var i = regex.exec(s); i != null; i = regex.exec(s)) {
		retVal.push(s.substring(0, i.index));
		retVal.push(i[0]);
		s = s.slice(i.index + i[0].length);
	}
	if (s.length > 0)
		retVal.push(s);
	return retVal;
}
T.escape = function(txt) {
	return txt.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}
T.toText = function(obj) {
	return obj != null ? '' + obj : '';
}
T.compile = function(src) {
	var t = [];
	var tag = null;
	var parts = T.tokenize(src.replace(/\r\n/g, '\n').replace(/\r/g, '\n'), /(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\])/);
	for (var i = 0; i < parts.length; i++) {
		switch (parts[i]) {
		case '':
			break;
		case '[%%':
			if (tag != '[%#')
				t.push(tag ? t.push('[%') : 'l.push("' + T.escape('[%') + '");');
			break;
		case '%%]':
			if (tag != '[%#')
				t.push(tag ? t.push('%]') : 'l.push("' + T.escape('%]') + '");');
			break;
		case '[%':
		case '[%=':
		case '[%#':
			tag = parts[i];
			break;
		case '%]':
			tag = null;
			break;
		default:
			switch (tag) {
			case '[%':
				t.push(parts[i]);
				break;
			case '[%=':
				t.push('l.push(T.toText(' + parts[i] + '));');
				break;
			case '[%#':
				break;
			default:
				t.push('l.push("' + T.escape(parts[i]) + '");');
			}
		}
	}
	var retVal = {
		out : 'function(ctx,fncs){with(T.fncs){with(fncs?fncs:{}){with(ctx?ctx:{}){var l=[];\n' + t.join('') + '\nreturn l.join("")}}}}'
	}
	try {
		eval('retVal.render=' + retVal.out);
	} catch (err) {
		console.log(src)
		console.log(retVal.out)
		throw err;
	}
	return retVal;
}
T.fncs = {
	encodeHTML : function(html) {
		if (html == null)
			return '';
		var d = document.createElement('div');
		d.textContent = html;
		return d.innerHTML;
	},
	encodeAttribute : function(html) {
		if (html == null)
			return '';
		var d = document.createElement('div');
		d.textContent = html;
		return d.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&apos;');
	},
	hasLength : function(s) {
		return (s != null && s.trim() != '');
	}
}