#!/usr/bin/env node
const cli = require('./exec');
const [,, ...args] = process.argv;
const path = args[0];
const optionArray = args.slice(1);

cli(path, optionArray).then(res => console.log(res));

// request axios
