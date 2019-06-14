
module.exports = async function stats(linksArr) {
	let count = 0;
	//let linksSet = new Set([...linksArr]);
	let linksSet = new Set();
	linksArr.forEach(obj => {
		linksSet.add(obj.href); 
		obj.ok === 'fail' ? count++ : count;
	})
	return {total: linksArr.length, unique: linksSet.size, broken: count};
}
