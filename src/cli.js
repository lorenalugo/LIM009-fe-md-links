#!/usr/bin/env node
const mdLinks = require('./md-links');
const validate = require('./validate');
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

if(!options.validate && !options.stats) {
	mdLinks(path, options)
	.then( result => result.forEach((obj) => console.log(`${obj.file} ${obj.href} ${obj.text.slice(0,49)}`)))
}

if(options.validate && !options.stats) {
	mdLinks(path, options)
	.then( result => validate(result))
	.then( validation => validation.forEach((result) => console.log(`${result.href} ${result.statusMessage} ${result.statusCode} ${result.text.slice(0,49)}`)))
}

if(!options.validate && options.stats) {
	mdLinks(path, options)
	.then( result => validate(result))
	.then( validation => stats(validation))
	.then( stats => console.log(`Total: ${stats.total}\nUnique: ${stats.unique}`))
}

if(options.validate && options.stats) {
	mdLinks(path, options)
	.then( result => validate(result))
	.then( validation => stats(validation))
	.then( stats => console.log(`Total: ${stats.total}\nUnique: ${stats.unique}\nBroken: ${stats.broken}`))
}

// request axios
