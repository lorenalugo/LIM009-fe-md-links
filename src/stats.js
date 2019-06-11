
module.exports = async function stats(linksArr) {
	let count = 0;
	let linksSet = new Set();
	linksArr.forEach((obj) => {
		linksSet.add(obj.href);
		if(obj.statusMessage === 'fail') { count++ }
	});
	return {total: linksArr.length, unique: linksSet.size, broken: count};
}

//stats([{href:'https://nodejs.org/api/http.html#http_http_gions_callback', statusMessage: 'ok'}, {href:'https://nodejs.org/api/http.html#http_http_get_options_callback', statusMessage: 'ok'}, {href:'https://semver.org/', statusMessage: 'fail'}]);