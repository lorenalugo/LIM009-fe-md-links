#!/usr/bin/env node
const mdLinks = require('./md-links');
const stats = require('./stats');

const [,, ...args] = process.argv;
const path = args[0];
const optionArray = args.slice(1);
let options = {};

optionArray.forEach(function (option) {
  if (option === '-v' || option === '--validate') {
    options.validate = true;
  }

  if (option === '-s' || option === '--stats') {
    options.stats = true;
  
  }
  if ((option === '-v' || option === '--validate') && (option === '-s' || option === '--stats')) {
    options.validate = true;
    options.stats = true;
  }
});

if(!options.stats) {
	mdLinks(path, options)
	.then( result => result.forEach((result) =>
		(options.validate) ? console.log(`${result.href} ${result.ok} ${result.status} ${result.text.slice(0,49)}`) : console.log(`${result.file} ${result.href} ${result.text.slice(0,49)}`)
	))
} else {
	mdLinks(path, options)
	.then( result => stats(result))
	.then( stats => console.log(`Total: ${stats.total}\nUnique: ${stats.unique}\nBroken: ${stats.broken}`))
}
// acomodar la funcion de para evitar la repeticion de codigo IMPORTANTE
// request axios
