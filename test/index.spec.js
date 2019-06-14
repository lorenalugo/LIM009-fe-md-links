const fn = require('../src/index');
const path = require('path');

describe('convertIntoAbsolute', () => {
	it('Debería ser una función', () => {
		expect(typeof fn.convertIntoAbsolute).toBe('function');
	})
	it('Debería retornar una ruta absoluta', () => {
		let expected = path.join(process.cwd(), '/directory_test', '/file1-2.txt');
		expect(fn.convertIntoAbsolute(path.join(process.cwd(), '/directory_test', '/file1-2.txt'))).toEqual(expected);
	})
	it('Debería retornar una ruta absoluta, para la ruta relativa: ./directory_test', () => {
		let expected = path.join(process.cwd(), '/directory_test');
		expect(fn.convertIntoAbsolute('./directory_test')).toEqual(expected);
	})
});

describe('isDir', () => {
	it('Debería ser una función', () => {
		expect(typeof fn.isDir).toBe('function');
	})
	it('Si se ingresa una ruta de archivo, debería retornar false', (done) => {
		let inputPath = path.join(process.cwd(), '/directory_test', '/file1-1.md')
		return fn.isDir(inputPath)
		.then((result) => {
			expect(result).toBe(false); 
			done()
		});
	})
	it('Si se ingresa una ruta de un directorio, debería retornar true', (done) => {
		let inputPath = path.join(process.cwd(), '/directory_test');
	    return fn.isDir(inputPath)
	    .then((result) => {
	    	expect(result).toBe(true);
	    	done()
	    });
	})
});

describe('getPathsFromDirectory', () => {
	const inputPath = path.join(process.cwd(), '/directory_test');
	const expected = [
	path.join(process.cwd(), '/directory_test', '/file1-1.md'),
	path.join(process.cwd(), '/directory_test', '/file1-2.txt'),
	path.join(process.cwd(), '/directory_test', '/level1', '/file2-1.js'),
    path.join(process.cwd(), '/directory_test', '/level1', '/file2-2.md'),
    path.join(process.cwd(), '/directory_test', '/level1', '/level2', '/file-level2.md'),
    path.join(process.cwd(), '/directory_test', '/level1', '/level2', '/file.txt')
	];
	it('Debería ser una función', () => {
		expect(typeof fn.getPathsFromDirectory).toBe('function');
	})
	it('Si se ingresa una ruta de un directorio, debería retornar un array', (done) => {
		return fn.getPathsFromDirectory(inputPath)
		.then((result) => {
			expect(Array.isArray(result)).toBe(true);
			done()
		});
	})
	it('Si se ingresa una ruta de un directorio, debería retornar un array con todos las rutas de los archivos', (done) => {
	    return fn.getPathsFromDirectory(inputPath).then((result) => {
	    	expect(result).toEqual(expect.arrayContaining(expected));
	    	expect(result).toHaveLength(6);
	    	done()
	    });
	})
});
describe('getMdFiles', () => {
	const input = [
	path.join(process.cwd(), '/directory_test', '/file1-1.md'),
	path.join(process.cwd(), '/directory_test', '/file1-2.txt'),
	path.join(process.cwd(), '/directory_test', '/level1', '/file2-1.js'),
    path.join(process.cwd(), '/directory_test', '/level1', '/file2-2.md'),
    path.join(process.cwd(), '/directory_test', '/level1', '/level2', '/file.txt')
	];
	
	it('Debería ser una función', () => {
		expect(typeof fn.getMdFiles).toBe('function');
	})
	it('Si se ingresa una array de archivos, debería retornar un array de longitud 2', () => {
		expect(Array.isArray(fn.getMdFiles(input))).toBe(true); 
		expect(fn.getMdFiles(input)).toHaveLength(2);
	})
});

describe('getMdLinks', () => {
	const expected = [];
	it('Debería ser una función', () => {
		expect(typeof fn.getMdLinks).toBe('function');
	})
	it('Debería retornar un array', (done) => {
		return fn.getMdLinks([path.join(process.cwd(), '/directory_test', '/file1-1.md')])
		.then((result) => {
		expect(Array.isArray(result)).toBe(true); 
		done()
		});
		
	})
	it('Debería retornar un array con longitud 2', (done) => {
		return fn.getMdLinks([path.join(process.cwd(), '/directory_test', '/file1-1.md')])
		.then((result) => {
		expect(result).toHaveLength(2); 
		done()
		});
	})
	it('Debería retornar un array vacío', (done) => {
		return fn.getMdLinks([path.join(process.cwd(), '/directory_test', '/level1', '/level2', '/file-level2.md')])
		.then((result) => {
		expect(result).toHaveLength(0); 
		done()
		});
	})
});