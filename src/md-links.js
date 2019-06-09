const path = require('path');
const fsPromises = require('fs').promises;
const fn = require('./index');
const linksValidator = require('./validate');

async function mdLinks(ruta) {
	try{
	const nuevaRuta = fn.convertIntoAbsolute(ruta);
	const fileList = (await fn.isDir(nuevaRuta)) ? await fn.getPathsFromDirectory(nuevaRuta) : [nuevaRuta]
	const mdFiles = fn.getMdFiles(await fileList);
	//console.log(mdFiles);
	const links = await fn.getMdLinks(mdFiles);
	console.log(links);
	//const validation = await linksValidator({href: 'https://nodejs.org/en/', text:'Node.js', file: '/home/lorena/common-core/proyectos/LIM009-fe-md-links/README.md'});
	//console.log(validation);
	}
	catch(error){
		console.log(error)
	}
	
}

mdLinks('/home/lorena/common-core/proyectos/LIM009-Cipher');
// module.exports = mdLinks;
// /home/lorena/common-core/proyectos/LIM009-fe-md-links
/**
** RUTAS ABSOLUTAS **
Se deben indicar todos los directorios por los que hay que pasar empezando desde la raíz del sistema.
SIEMPRE empezarán por /

Ejemplos:
    /etc/apt/sources.list
    /var/log/syslog
    /home/alumno/.bashrc
    /usr/bin/

** RUTAS RELATIVAS **
Un atajo fundamental para la construcción de rutas relativas es conocer que .. hace referencia al directorio padre. 
Las rutas relativas harán referencia a un elemento que se encuentre en el directorio desde el que ejecutamos la orden, o usará los dos puntos para ascender a directorios superiores. Siempre que sean correctos, podemos combinarlos de la forma que necesitemos separando cada directorio por una barra. Por ejemplo una ruta correcta podría ser 
  
  Ejemplo:
  ../../fotos/personales/

**/


/*

** LINKS EN MARKDOWN **

[texto mostrado como link...](https://myurl.com)

O crear una variable y definir su valor en otro punto del documento:

[Un link, enlace, ancla o anchor...](blogDeJavaScript)
  
[blogDeJavaScript]: https://unjavascripter.github.io

*/
