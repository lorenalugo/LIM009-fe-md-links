const fetchMock = require('../__mocks__/node-fetch');
fetchMock.config.sendAsJson = false;
const validate = require('../src/validate');

describe('validate', () => {
	fetchMock
	.mock('https://www.npmjs.com/package/node-fetch', 200)
	.mock('https://semver.org/', 200)
	.mock('https://docs.npmjs.com/cli/install', 301)
	.mock('https://www.npmjs.com/package/nch', 404);
	
	it('Debería retornar status 200', () => {
		validate([{href:'https://www.npmjs.com/package/node-fetch'}])
  		.then(res => {
    		expect(res.status).to.equal(200);
  		})
	})

	it('Debería retornar status 301', () => {
		validate([{href:'https://docs.npmjs.com/cli/install'}])
  		.then(res => {
    		expect(res.status).to.equal(301);
  		})
	})

	it('Debería retornar status 404', () => {
		validate([{href:'https://www.npmjs.com/package/nch'}])
  		.then(res => {
    		expect(res.status).to.equal(404);
  		})
	})
})
