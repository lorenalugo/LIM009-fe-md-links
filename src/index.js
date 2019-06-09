const path = require('path');
const fsPromises = require('fs').promises;

const convertIntoAbsolute = (myPath) => {
	if (!path.isAbsolute(myPath)) {
		return path.resolve(myPath);
	}
	return myPath;
}

const isDir = (myPath) => {
	return fsPromises.lstat(myPath)
	.then(stats => stats.isDirectory());
}

async function getPathsFromDirectory(myPath) {
  const subdirs = await fsPromises.readdir(myPath);
  const files = await Promise.all(subdirs.map(async (subdir) => {
  const filePath = path.resolve(myPath, subdir);
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
	const regexUrl = /(\((.*?)\))/g;
	const regexLinks = /[^!](\[(.*?)\])(\((.*?)\))/g;
	const links = await Promise.all(filesArr.map(async (file) => {
		// reads the file and storage its content
		const content = await fsPromises.readFile(file, 'utf-8');
		// looks for the links
		const fileLinkList = await content.match(regexLinks);
		if (fileLinkList !== null) {
			return await fileLinkList.map((link) => {
				return {
					href: link.match(regexUrl).toString().replace(/(\(|\))/g, ''), 
					text: link.match(regexLink).toString().replace(/(\[|\])/g, ''), 
					file
				}
			})
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