const fetchMock = require('../__mocks__/node-fetch');
fetchMock.config.sendAsJson = false;
const path = require('path');
const fn = require('../src/exec');

describe('cli', () => {
  fetchMock
  .mock('https://nodejs.org/api/http.html#http_http_get_options_callback', 200)
  .mock('https://markdown/syntax', 200)
  .mock('https://nodejs.org/es/', 200)
  .mock('https://developers.google.com/v8/', 200);

  it('Debería retornar un string: expected1', (done) => {
    const expected1 = "https://nodejs.org/api/http.html#http_http_get_options_callback ok 200 http.get";
    fn.cli(path.join(process.cwd(), '/directory_test', '/file1-1.md'), ['-v'])
    .then(result => {
      expect(typeof result).toBe('string');
      expect(result).toEqual(expect.stringMatching(expected1));
      done()
    })
  })

  it('Debería retornar un string: expected2', (done) => {
    const expected2 = "https://nodejs.org/es/ Node.js";
    fn.cli(path.join(process.cwd(), '/directory_test', '/level1', '/file2-2.md'), [])
    .then(result => {
      expect(result).toEqual(expect.stringMatching(expected2));
      done()
    })
  })

  it('Debería retornar un string: expected3', (done) => {
    const expected3 = "Total: 2\nUnique: 2\nBroken: 0";
    fn.cli(path.join(process.cwd(), '/directory_test', '/file1-1.md'), ['-v', '-s'])
    .then(result => {
      expect(result).toBe(expected3);
      done()
    })
  })

  it('Debería retornar un string: expected4', (done) => {
    const expected4 = "Total: 2\nUnique: 2";
    fn.cli(path.join(process.cwd(), '/directory_test', '/level1', '/file2-2.md'), ['--stats'])
    .then(result => {
      expect(result).toBe(expected4);
      done()
    })
  })
})

describe('createOptionsObject', () => {
  it('Debería retornar un objeto con la propiedad validate igual true', () => {
    expect(fn.createOptionsObject(['--validate'])).toHaveProperty('validate', true)
    expect(fn.createOptionsObject(['--validate'])).toHaveProperty('stats', false)
  })

  it('Debería retornar un objeto con la propiedad stats igual true', () => {
    expect(fn.createOptionsObject(['--stats'])).toHaveProperty('stats', true)
    expect(fn.createOptionsObject(['--stats'])).toHaveProperty('validate', false)
  })

  it('Debería retornar un objeto con la propiedades validate y stats igual true', () => {
    expect(fn.createOptionsObject(['-v', '-s'])).toMatchObject({'validate': true, 'stats': true})
  })

  it('Debería retornar un objeto con la propiedad stats igual false', () => {
    expect(fn.createOptionsObject(['-v'])).toHaveProperty('stats', false)
    expect(fn.createOptionsObject(['-v'])).toHaveProperty('validate', true)
  })

  it('Debería retornar un objeto con la propiedad stats igual true', () => {
    expect(fn.createOptionsObject(['--validate', '-s'])).toHaveProperty('stats', true)
    expect(fn.createOptionsObject(['--validate', '-s'])).toHaveProperty('validate', true)
  })
})
