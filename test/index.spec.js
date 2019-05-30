import { isFileOrDirectory, getExtensionName, getPathType, getMdLinks } from '../md-links';

// escribir archivo y directorio para testear
describe('isFileOrDirectory', () => {
	it('Debería ser una función', () => {
		expect(typeof isFileOrDirectory).toBe('function');
	})
	it('Si se ingresa una ruta de archivo, debería leerlo', () => {
		expect(isFileOrDirectory('README.md')).toBe('leyendo el archivo')
	})
	it('Si se ingresa una ruta de un directorio, debería retornar un error', () => {
		expect(isFileOrDirectory('/directory')).toBe('error')
	})
});

// escribir archivos para testear
describe('getExtensionName', () => {
	it('Debería ser una función', () => {
		expect(typeof getExtensionName).toBe('function');
	})
	it('Si se ingresa una ruta de archivo, debería retornar su extensión', () => {
		expect(getExtensionName('README.md')).toBe('.md');
		expect(getExtensionName('../directory/file.js')).toBe('.js')
	})
});

// escribir rutas para testear
describe('getPathType', () => {
	it('Debería ser una función', () => {
		expect(typeof getPathType).toBe('function');
	})
	it('Debería retornar true si se ingresa una ruta absoluta', () => {
		expect(getPathType('/directory/file.txt')).toBe(true)
	})
	it('Debería retornar false si se ingresa una ruta relativa', () => {
		expect(getPathType('file.txt')).toBe(false)
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