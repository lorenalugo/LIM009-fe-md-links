const mdLinks = require('./md-links');
const stats = require('./stats');

const cli = (path, optionsArray) => {
  const options = createOptionsObject(optionsArray);
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

const createOptionsObject = (optionsArray) => {
  let validate = false;
  let stats = false;
  optionsArray.forEach(function (option) {
    if (option === '-v' || option === '--validate') {
      validate = true;
    } 
    if (option === '-s' || option === '--stats') {
      stats = true;
    }
  })
  return {validate, stats};
}

module.exports = {
	cli, 
	createOptionsObject
}