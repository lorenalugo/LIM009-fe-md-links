const fetchMock = require('../__mocks__/node-fetch');
fetchMock.config.sendAsJson = false;
const validate = require('../src/validate');

describe('validate', () => {
  fetchMock
    .mock('https://www.npmjs.com/package/node-fetch', 200)
    .mock('https://semver.org/', 200)
    .mock('https://docs.npmjs.com/cli/install', 301)
    .mock('https://www.npmjs.com/package/nch', 404)
    .mock('http://ruta-inexistente', { throws: new TypeError('Failed to fetch') });
    
  it('Debería retornar status 200', (done) => {
    validate([{href:'https://www.npmjs.com/package/node-fetch', text: 'texto', file: 'file'}])
    .then(res => {res.forEach(obj => expect(obj.status).toEqual(200)); done()})
  })

  it('Debería retornar status 301', (done) => {
    validate([{href:'https://docs.npmjs.com/cli/install', text: 'texto', file: 'file'}])
    .then(res => {res.forEach(obj => expect(obj.status).toEqual(301)); done()})
  })

  it('Debería retornar status 404', (done) => {
    validate([{href:'https://www.npmjs.com/package/nch', text: 'texto', file: 'file'}])
    .then(res => { res.forEach(obj => expect(obj.status).toEqual(404)); done() })
  })

  it('Debería retornar status un error', (done) => {
    const expected = [{ href: 'http://ruta-inexistente',
      text: 'texto',
      file: 'file',
      status: 'Failed to fetch',
      ok: 'fail'
    }];
    validate([{href:'http://ruta-inexistente', text: 'texto', file: 'file'}])
    .then(e => {
      expect(e).toMatchObject(expected); 
      done()
    })
  })

  it('Debería retornar status un error', (done) => {
    const expected = [{ href: 'http://otra-ruta-inexistente',
      text: 'texto',
      file: 'file',
      ok: 'fail'
    }];
    validate([{href:'http://otra-ruta-inexistente', text: 'texto', file: 'file'}])
    .then(e => {
      expect(e).toMatchObject(expected); 
      done()
    })
  })
})

