const stats = require('../src/stats');;

describe('stats', () => {
	it('Debería retornar un objeto, con cero links broken', (done) => {
		const linkArr = [{href: 'https://www.npmjs.com/package/node-fetch', ok: 'ok'}, {href: 'https://semver.org/', ok: 'ok'}];
		const expected = {total: 2, unique: 2, broken: 0};
		return stats(linkArr).then(result => {
			expect(result).toHaveProperty('broken', 0);
			expect(result).toHaveProperty('unique', 2)
			done()
			})
	})

	it('Debería retornar un objeto, con 1 link broken', (done) => {
		const linkArr = [{href: 'https://www.npmjs.com/package/ntch', ok: 'fail'}, {href: 'https://semver.org/', ok: 'ok'}, {href: 'https://semver.org/', ok: 'ok'}];
		const expected = {total: 3, unique: 2, broken: 1};
		return stats(linkArr).then(result => {
			expect(result).toHaveProperty('broken', 1);
			expect(result).toHaveProperty('total', 3);
			expect(result).toHaveProperty('unique', 2)
			done()
			})
	})

})