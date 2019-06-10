const https = require('https');

module.exports = async function linksValidator(linksArr) {
    return linksArr.map((obj) => {
    return new Promise((resolve, reject) => {
        https.get(obj.href, response => {
        	if (response.statusCode >= 200 && response.statusCode < 400) {
	            obj.statusCode = response.statusCode;
    	        obj.statusMessage = response.statusMessage;
        	    resolve(obj);
        	} else {
        		obj.statusCode = response.statusCode;
    	        obj.statusMessage = 'fail';
        	    resolve(obj);
        	}
        }).on('error', (err) => {
  			obj.statusCode = err.code;
    		obj.statusMessage = 'fail';
        	resolve(obj);
			});     
    })
    })
}