function Cookie(name, opts) {
	if (!name || typeof name != 'string') {
		throw 'Cookie name must be a valid string: ' + name + ' (' + typeof name + ') given.';
	}

	this.name = name;

	var data = find() || {};
	
	var options = {};
	opts = opts || {};
	options.expires = opts.expires || null;
	options.domain = opts.domain || null;
	options.path = opts.path || null;
	options.secure = opts.secure || false;

	// public
	this.get = function(key) {
		return data[key];
	}

	this.set = function(key, value) {
		data[key] = value;
		this.save();
	}
	
	this.delete = function(key) {
		delete that.data[key];
		this.save();
	}
	
	this.save = function() {
		document.cookie = this.name + '=' + escape(JSON.stringify(data)) + getOptions();
	}
	
	this.destroy = function() {
		document.cookie = this.name + '=' + getOptions(false) + ';expires=Thu, 01 Jan 1970 00:00:00 GMT;max-age:0';
	}
	
	// private
	function find() {
		var start = document.cookie.indexOf(name + "=");

		if (start == -1) {
			return null;
		}

		if (name != document.cookie.substr(start, name.length)) {
			return null;
		}

		var len = start + name.length + 1;
		var end = document.cookie.indexOf(';', len);

		if (end == -1) {
			end = document.cookie.length;
		}

		return JSON.parse(unescape(document.cookie.substring(len, end)));
	}
	
	function getOptions(include_expires) {
		include_expires = include_expires !== false;
		
		var opts = []; 

		for (key in options) {
			if (options[key]) {
				if (key == 'expires') {
					if (include_expires) {
						var today = new Date();
						var ttl = options.expires * 86400000;
						opts.push('expires=' + new Date(today.getTime() + ttl).toUTCString());
						opts.push('max-age=' + ttl/1000);
					}
				}
				else if (key == 'secure') {
					opts.push('secure');
				}
				else {
					opts.push(key + '=' + options[key]);
				}
			}
		}

		return opts.length ? ';' + opts.join(';') : '';
	}
}
