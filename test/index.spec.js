import { convertIntoAbsolute, isFile, getMdFiles, getMdLinks } from '../md-links';

/** 
para testear file system, usar el siguiente mock???
https://github.com/tschaub/mock-fs


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
describe('isFile', () => {
	it('Debería ser una función', () => {
		expect(typeof isFile).toBe('function');
	})
	it('Si se ingresa una ruta de archivo, debería leerlo', () => {
		expect(isFile('README.md')).toBe('leyendo el archivo')
	})
	it('Si se ingresa una ruta de un directorio, debería retornar un error', () => {
		expect(isFile('/directory')).toBe('error')
	})
});

// escribir archivos para testear, completar la redaccion de la prueba
describe('getMdFiles', () => {
	it('Debería ser una función', () => {
		expect(typeof getMdFiles).toBe('function');
	})
	it('Si se ingresa una ruta de archivo, debería retornar su extensión', () => {
		expect(getMdFiles('README.md')).toBe('.md');
		expect(getMdFiles('../directory/file.js')).toBe('.js')
	})
});

// escribir archivo para testear
describe('getMdLinks', () => {
	it('Debería ser una función', () => {
		expect(typeof getMdLinks).toBe('function');
	})
	it('Debería retornar un array', () => {
		expect(Array.isArray(getMdLinks('directory/file.txt'))).toBe(true)
	})
	it('Debería retornar un array con longitud 2', () => {
		expect(getMdLinks('file.txt').lenght).toBe(2)
	})

	// escribir el array expected
	it('Debería retornar un array que contenga expected', () => {
		expect(getMdLinks('file.txt')).toEqual(
      expect.arrayContaining(expected),
      );
	})
});