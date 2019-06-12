
module.exports = async function stats(linksArr) {
	let count = 0;
	let linksSet = new Set([...linksArr]);
	linksArr.forEach(obj => obj.ok === 'fail' ? count++ : count)
	return {total: linksArr.length, unique: linksSet.size, broken: count};
}
