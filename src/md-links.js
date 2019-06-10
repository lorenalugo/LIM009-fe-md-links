const fn = require('./index');

async function mdLinks(route) {
	try{
	const absoluteRoute = fn.convertIntoAbsolute(route);
	const fileList = (await fn.isDir(absoluteRoute)) ? await fn.getPathsFromDirectory(absoluteRoute) : [absoluteRoute]
	const mdFiles = fn.getMdFiles(await fileList);
	const links = await fn.getMdLinks(mdFiles);
	return links;
	}
	catch(error){
	console.log(error);
	}
	
}

module.exports = mdLinks;
