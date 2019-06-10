const fn = require('../src/index');

describe('convertIntoAbsolute', () => {
	it('Debería ser una función', () => {
		expect(typeof fn.convertIntoAbsolute).toBe('function');
	})
	it('Debería retornar /home/lorena/common-core/proyectos/LIM009-fe-md-links/test/directory_test/file1-2.txt, para la ruta absoluta /home/lorena/common-core/proyectos/LIM009-fe-md-links/test/directory_test/file1-2.txt', () => {
		expect(fn.convertIntoAbsolute('/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/directory_test/file1-2.txt')).toEqual('/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/directory_test/file1-2.txt')
	})
	/*PREGUNTAR ACERCA DE ESTE TEST
	it('Debería retornar /home/lorena/common-core/proyectos/LIM009-fe-md-links/test/directory_test, para la ruta relativa: directory_test', () => {
		expect(fn.convertIntoAbsolute('directory_test')).toEqual('/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/directory_test')
	})
	*/
});
describe('isDir', () => {
	it('Debería ser una función', () => {
		expect(typeof fn.isDir).toBe('function');
	})
	it('Si se ingresa una ruta de archivo, debería retornar false', (done) => {
		return fn.isDir('/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/directory_test/file1-1.md').then((result) => console.log(result));
		done()
	})
	//it('Si se ingresa una ruta de un directorio, debería retornar true', (done) => {
	//    return fn.isDir('/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/directory_test').then((result) => expect(result).toBe(true));
	//    done()
	//})
});
/*

describe('getPathsFromDirectory', () => {
	const expected = [
	'/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/test-directory/file1-1.md',
	'/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/test-directory/file1-2.txt',
	'/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/test-directory/level1/file2-1.js',
	'/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/test-directory/level1/file2-2.md',
	'/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/test-directory/level1/level2/file.txt'
	];
	it('Debería ser una función', () => {
		expect(typeof fn.getPathsFromDirectory).toBe('function');
	})
	it('Si se ingresa una ruta de un directorio, debería retornar un array', (done) => {
		return fn.getPathsFromDirectory('/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/test-directory').then((result) => expect(Array.isArray(result).toBe(true)));
		done()
	})
	it('Si se ingresa una ruta de un directorio, debería retornar un array con todos las rutas de los archivos', (done) => {
	    return fn.getPathsFromDirectory('/home/lorena/common-core/proyectos/LIM009-fe-md-links/test/test-directory').then((result) => {
	    	expect(result).toEqual(expect.arrayContaining(expected));
	    	expect(result).toHaveLength(5);
	    });
	    done()
	})
});
*/
// escribir archivos para testear, completar la redaccion de la prueba
/*describe('getMdFiles', () => {
	it('Debería ser una función', () => {
		expect(typeof fn.getMdFiles).toBe('function');
	})
	it('Si se ingresa una array de archivos que no tienen extensión .md, debería retornar un array vacío', () => {
		expect(fn.getMdFiles(['index.spec.js', 'md-links.spec.js'])).toHaveLength(0);
		expect(fn.getMdFiles(['index.spec.js', 'md-links.spec.js', 'README.md'])).toHaveLength(1);
	})
});
*/
// escribir archivo para testear
/*describe('getMdLinks', () => {
	const expected = [];
	it('Debería ser una función', () => {
		expect(typeof fn.getMdLinks).toBe('function');
	})
	it('Debería retornar un array', (done) => {
		return fn.getMdLinks('directory/file.txt').then((result) => expect(Array.isArray(result)).toBe(true));
		done()
	})
	it('Debería retornar un array con longitud 2', (done) => {
		return fn.getMdLinks('directory/file.txt').then((result) => expect(result).toHaveLength(1));
		done()
	})
	// escribir el array expected
	it('Debería retornar un array que contenga expected', (done) => {
		return fn.getMdLinks('directory/file.txt').then((result) => expect(result).toEqual(expect.arrayContaining(expected)));
		done()
	})
});*/