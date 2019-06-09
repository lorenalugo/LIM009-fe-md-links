const https = require('https');

module.exports = async function linksValidator(obj) {
    return new Promise((resolve, reject) => {
        https.get(obj.href, response => {
        	if (response.statusCode >= 200 && response.statusCode < 400) {
	            obj.statusCode = response.statusCode;
    	        obj.statusMessage = response.statusMessage;
        	    resolve(obj);
        	} else {
        		obj.statusCode = response.statusCode;
    	        obj.statusMessage = 'FAIL';
        	    resolve(obj);
        	}
        }).on('error', (err) => {
  			obj.statusCode = err.code;
    		obj.statusMessage = 'FAIL';
        	resolve(obj);
			});     
    })
}