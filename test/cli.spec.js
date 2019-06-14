const fetchMock = require('../__mocks__/node-fetch');
fetchMock.config.sendAsJson = false;
const path = require('path');
const cli = require('../src/cli');

describe('mdLinks', () => {
  fetchMock
  .mock('https://nodejs.org/api/http.html#http_http_get_options_callback', 200)
  .mock('https://markdown/syntax', 200)
  .mock('https://nodejs.org/es/', 200)
  .mock('https://developers.google.com/v8/', 200);

  it('Debería retornar un string: expected1', (done) => {
    const expected1 = "https://nodejs.org/api/http.html#http_http_get_options_callback ok 200 http.get";
    cli(path.join(process.cwd(), '/directory_test', '/file1-1.md'), {validate: true, stats: false})
    .then(result => {
      expect(typeof result).toBe('string');
      expect(result).toEqual(expect.stringMatching(expected1));
      done()
    })
  })

  it('Debería retornar un string: expected2', (done) => {
    const expected2 = "https://nodejs.org/es/ Node.js";
    cli(path.join(process.cwd(), '/directory_test', '/level1', '/file2-2.md'), {validate: false, stats: false})
    .then(result => {
      expect(result).toEqual(expect.stringMatching(expected2));
      done()
    })
  })

  it('Debería retornar un string: expected3', (done) => {
    const expected3 = "Total: 2\nUnique: 2\nBroken: 0";
    cli(path.join(process.cwd(), '/directory_test', '/file1-1.md'), {validate: true, stats: true})
    .then(result => {
      expect(result).toEqual(expect.stringMatching(expected3));
      done()
    })
  })

  it('Debería retornar un string: expected4', (done) => {
    const expected4 = "Total: 2\nUnique: 2";
    cli(path.join(process.cwd(), '/directory_test', '/level1', '/file2-2.md'), {validate: true, stats: true})
    .then(result => {
      expect(result).toEqual(expect.stringMatching(expected4));
      done()
    })
  })
})
