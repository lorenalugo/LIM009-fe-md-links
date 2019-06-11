const fn = require('./index');

async function mdLinks(path, options) {
	try{
	const absolutePath = fn.convertIntoAbsolute(path);
	const fileList = (await fn.isDir(absolutePath)) ? await fn.getPathsFromDirectory(absolutePath) : [absolutePath]
	const mdFiles = fn.getMdFiles(await fileList);
	const links = await fn.getMdLinks(mdFiles);
	return links;
	}
	catch(err){
	return err;
	}
	
}
//mdLinks('../README.md').then((res) => console.log(res))
//.catch((e) => console.log('ruta no valida'));
module.exports = mdLinks;
