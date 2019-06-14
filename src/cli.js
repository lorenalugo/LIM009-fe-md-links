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

const cli = (path, options) => {
  let stringOutput = '';
  if(!options.stats) {
    return mdLinks(path, options)
    .then( res => {
      res.forEach((result) => (options.validate) ? stringOutput += `${result.href} ${result.ok} ${result.status} ${result.text.slice(0,49)}\n` : stringOutput += `${result.file} ${result.href} ${result.text.slice(0,49)}\n`);
     return stringOutput;
  })
  .then(res => res); 
  } else {
    return mdLinks(path, options)
    .then( result => stats(result))
    .then( stats => (options.validate) ? `Total: ${stats.total}\nUnique: ${stats.unique}\nBroken: ${stats.broken}` : `Total: ${stats.total}\nUnique: ${stats.unique}`)
  }
}

cli(path, options).then(res => console.log(res));

module.exports = cli;


// request axios
