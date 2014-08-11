/*
http://jason.pureconcepts.net/articles/javascript_cookie_object
JavaScript Cookie Object using Prototype

Example Usage

Currently, the Cookie class only handles a single named cookie. This is acceptable since you can store multiple variables in a single cookie. However, I want to refactor this class from a Singleton to a Factory. Look for that in the future. In the meantime, here are some current sample uses:

Cookie that expires 90 days from visit, and sets a value:

    Cookie.init({name: 'yourdata', expires: 90});
    Cookie.setData('favorites', false);

Cookie that only lasts the session, with default data:

    Cookie.init({name: 'mydata'}, {foo: 'bar', x: 0});
    alert(Cookie.getData('foo'));

*/


var Cookie = {
  data: {},
  options: {expires: 1, domain: "", path: "", secure: false},

init: function(options, data) {
  Cookie.options = Object.extend(Cookie.options, options || {});

  var payload = Cookie.retrieve();
        if(payload) {
            Cookie.data = payload.evalJSON();
        }
        else {
            Cookie.data = data || {};
        }
        Cookie.store();
    },
    getData: function(key) {
        return Cookie.data[key];
    },
    setData: function(key, value) {
        Cookie.data[key] = value;
        Cookie.store();
    },
    removeData: function(key) {
        delete Cookie.data[key];
        Cookie.store();
    },
    retrieve: function() {
        var start = document.cookie.indexOf(Cookie.options.name + "=");

        if(start == -1) {
            return null;
        }
        if(Cookie.options.name != document.cookie.substr(start, Cookie.options.name.length)) {
            return null;
        }

        var len = start + Cookie.options.name.length + 1;   
        var end = document.cookie.indexOf(';', len);

        if(end == -1) {
            end = document.cookie.length;
        } 
        return unescape(document.cookie.substring(len, end));
    },
    store: function() {
        var expires = '';

        if (Cookie.options.expires) {
            var today = new Date();
            expires = Cookie.options.expires * 86400000;
            expires = ';expires=' + new Date(today.getTime() + expires);
        }

        document.cookie = Cookie.options.name + '=' + escape(Object.toJSON(Cookie.data)) + Cookie.getOptions() + expires;
    },
    erase: function() {
        document.cookie = Cookie.options.name + '=' + Cookie.getOptions() + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
    },
    getOptions: function() {
        return (Cookie.options.path ? ';path=' + Cookie.options.path : '') + (Cookie.options.domain ? ';domain=' + Cookie.options.domain : '') + (Cookie.options.secure ? ';secure' : '');      
    }
};