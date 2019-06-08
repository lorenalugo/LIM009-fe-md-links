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
