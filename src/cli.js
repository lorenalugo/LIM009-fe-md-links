#!/usr/bin/env node
const fn = require('./exec');
const [,, ...args] = process.argv;
const path = args[0];
const optionArray = args.slice(1);

(args.length !== 0) ? fn.cli(path, optionArray).then(res => console.log(res)) : console.log('Ingrese una ruta válida');

// request axios
