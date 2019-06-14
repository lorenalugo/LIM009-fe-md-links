const fetchMock = require('../__mocks__/node-fetch');
fetchMock.config.sendAsJson = false;
const path = require('path');
const mdLinks = require('../src/md-links');

describe('mdLinks', () => {
  fetchMock
    .mock('https://nodejs.org/api/http.html#http_http_get_options_callback', 200)
    .mock('https://markdown/syntax', 200)
    .mock('https://nodejs.org/es/', 200)
    .mock('https://developers.google.com/v8/', 200);

  it('Debería retornar un array de objetos con la propiedad href: https://markdown/syntax, status: 200', (done) => {
    const expected = [
      {
        "file": path.join(process.cwd(), '/directory_test', '/file1-1.md'), 
        "href": "https://nodejs.org/api/http.html#http_http_get_options_callback", 
        "ok": "ok", 
        "status": 200, 
        "text": "http.get"
      }, 
      {
        "file": path.join(process.cwd(), '/directory_test', '/file1-1.md'), 
        "href": "https://markdown/syntax", 
        "ok": "ok", 
        "status": 200, 
        "text": "markdown"
      }];
    mdLinks('./directory_test/file1-1.md', {validate: true})
    .then(res => {
      expect(res).toMatchObject(expected);
      expect(res).toHaveLength(2);
      done()
    })
  })

  it('Debería retornar un array de objetos con la propiedad href: https://markdown/syntax, status: 200', (done) => {
    const expected = [
      {
        href: 'https://nodejs.org/es/', 
        text: 'Node.js', 
        file: path.join(process.cwd(), '/directory_test', '/level1', '/file2-2.md')
      },
      {
        href: 'https://developers.google.com/v8/', 
        text: 'motor de JavaScript V8 de Chrome', 
        file: path.join(process.cwd(), '/directory_test', '/level1', '/file2-2.md')
      }];
    mdLinks('./directory_test/level1', {validate: true})
    .then(res => {
      expect(res).toMatchObject(expected);
      expect(res).toHaveLength(2);
      done()
    })
  })

  it('Debería retornar un array vacío', (done) => {
    mdLinks('./directory_test/level1/level2', {validate: true})
    .then(res => {
      expect(res).toHaveLength(0);
      done();
    })
  })

  it('Debería retornar un array vacío', (done) => {
    mdLinks('./directory_test/level1/level2/file.txt', {validate: true})
    .then(res => {
      expect(res).toHaveLength(0);
      done();
    })
  })
})

