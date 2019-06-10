const path = require('path');
const fsPromises = require('fs').promises;

const convertIntoAbsolute = (route) => {
	if (!path.isAbsolute(route)) return path.resolve(route);
	return route;
}

const isDir = (route) => {
	return fsPromises.lstat(route)
	.then(stats => stats.isDirectory());
}

async function getPathsFromDirectory(route) {
  const subdirs = await fsPromises.readdir(route);
  const files = await Promise.all(subdirs.map(async (subdir) => {
  const filePath = path.resolve(route, subdir);
    return (await isDir(filePath)) ? getPathsFromDirectory(filePath) : filePath;
  }));
  return Array.prototype.concat(...files);
}

const getMdFiles = (filesArr) => {
	return filesArr.filter((file) => path.extname(file) === '.md')
}

async function getMdLinks(filesArr) {
	// const regexUrl = /\((https?:\/\/)?([\d\w\.-]+)\.([\w\.]{2,6})([\/\w \.-]*)*\/?\)/;
	const regexLink = /\[(.*?)\]/g;
	const regexUrl = /(\]\((.*?)\))/g;
	const regexLinks = /[^!](\[(.*?)\])(\((.*?)\))/g;
	const links = await Promise.all(filesArr.map(async (file) => {
		// reads the file and storage its content
		const content = await fsPromises.readFile(file, 'utf-8');
		// looks for the links
		const fileLinkList = await content.match(regexLinks);
		if (fileLinkList !== null) {
			return await fileLinkList.map((link) => {
				return {
					href: link.match(regexUrl).toString().replace(/(\]\()|(\)$)/g, ''), 
					text: link.match(regexLink).toString().replace(/(\[|\])/g, ''),
					file
				}// FALTA: truncado a 50 caracteres del text del link PREGUNTAR DONDE SE DEBE TRUNCAR
			})// str.slice(0, 49)
		}
		return [];
	}))
	const output = await links.reduce(async (accumulator, currentValue) => await accumulator.concat(currentValue));
	return output;
}

module.exports = {
	convertIntoAbsolute,
	isDir,
	getPathsFromDirectory,
	getMdFiles,
	getMdLinks
}