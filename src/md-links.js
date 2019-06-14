const fn = require('./index');
const validate = require('./validate');

async function mdLinks(path, options) {
	try{
		const absolutePath = fn.convertIntoAbsolute(path);
		const fileList = (await fn.isDir(absolutePath)) ? await fn.getPathsFromDirectory(absolutePath) : [absolutePath]
		
		const mdFiles = await fn.getMdFiles(fileList);
		
		if (mdFiles.length !== 0) {
			const links = await fn.getMdLinks(mdFiles);
			return (options.validate) ? await validate(links) : links;
		} else {
			return []
		}
	}
	catch(err){
		return err;
	}
}

module.exports = mdLinks;
