const fetch = require('node-fetch');

module.exports = async function linksValidator(linksArr) {
    const validated = linksArr.map((obj) => {
    return new Promise((resolve, reject) => {
        fetch(obj.href)
        .then((response) => {
        	if (response.status >= 200 && response.status < 400) {
	            obj.statusCode = response.status;
    	        obj.statusMessage = response.statusText.toLowerCase();
                resolve(obj);
        	} else {
        		obj.statusCode = response.status;
    	        obj.statusMessage = 'fail';
                resolve(obj);
        	}
        }).catch('error', (err) => {
  			obj.statusCode = err;
    		obj.statusMessage = 'fail';
        	resolve(obj);
			});     
    })
    })
    return Promise.all(validated);    
}
//linksValidator([{href: 'https://www.npmjs.com/package/node-fetch'}])
/*
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
*/