const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
	    '/foo',
	    proxy({
		    target: 'http://api:3001/',
		    changeOrigin: true,
		})
	    );
};