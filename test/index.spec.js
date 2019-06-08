import { convertIntoAbsolute, isDir, getPathsFromDirectory, getMdFiles, getMdLinks } from '../md-links';

/** 
https://www.npmjs.com/package/mock-fs
**/
describe('convertIntoAbsolute', () => {
	it('Debería ser una función', () => {
		expect(typeof convertIntoAbsolute).toBe('function');
	})
	it('Debería retornar tal, para la ruta relativa ../directory/file.txt'), () => {
		expect(convertIntoAbsolute('../directory/file.txt').toEqual('/home/directory/file.txt'))
	}
	it('Debería retornar tal, para la ruta absoluta /directory/file.txt'), () => {
		expect(convertIntoAbsolute('/directory/file.txt').toEqual('/home/directory/file.txt'))
	}
});
// escribir archivo y directorio para testear
describe('isDir', () => {
	it('Debería ser una función', () => {
		expect(typeof isDir).toBe('function');
	})
	it('Si se ingresa una ruta de archivo, debería retornar true', (done) => {
		return isDir('README.md').then((result) => expect(result).toBe(false));
		done()
	})
	it('Si se ingresa una ruta de un directorio, debería retornar false', (done) => {
	    return isDir('test').then((result) => expect(result).toBe(false));
	    done()
	})
});


describe('getPathsFromDirectory', () => {
	const expected = [];
	it('Debería ser una función', () => {
		expect(typeof getPathsFromDirectory).toBe('function');
	})
	it('Si se ingresa una ruta de un directorio, debería retornar un array', (done) => {
		return getPathsFromDirectory('test').then((result) => expect(Array.isArray(result).toBe(true)));
		done()
	})
	it('Si se ingresa una ruta de un directorio, debería retornar un array con todos las rutas de los archivos', (done) => {
	    return getPathsFromDirectory('test').then((result) => expect(result).toEqual(expect.arrayContaining(expected)));
	    done()
	})
});

// escribir archivos para testear, completar la redaccion de la prueba
describe('getMdFiles', () => {
	it('Debería ser una función', () => {
		expect(typeof getMdFiles).toBe('function');
	})
	it('Si se ingresa una array de archivos que no tienen extensión .md, debería retornar un array vacío', () => {
		expect(getMdFiles(['index.spec.js', 'md-links.spec.js'])).toHaveLength(0);
		expect(getMdFiles(['index.spec.js', 'md-links.spec.js', 'README.md'])).toHaveLength(1);
	})
});

// escribir archivo para testear
describe('getMdLinks', () => {
	const expected = [];
	it('Debería ser una función', () => {
		expect(typeof getMdLinks).toBe('function');
	})
	it('Debería retornar un array', (done) => {
		return getMdLinks('directory/file.txt').then((result) => expect(Array.isArray(result)).toBe(true));
		done()
	})
	it('Debería retornar un array con longitud 2', (done) => {
		return getMdLinks('directory/file.txt').then((result) => expect(result).toHaveLength(1));
		done()
	})
	// escribir el array expected
	it('Debería retornar un array que contenga expected', (done) => {
		return getMdLinks('directory/file.txt').then((result) => expect(result).toEqual(expect.arrayContaining(expected)));
		done()
	})
});