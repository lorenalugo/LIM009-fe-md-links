#!/usr/bin/env node
"use strict";

const fn = require('./exec');

const [,, ...args] = process.argv;
const path = args[0];
const optionArray = args.slice(1);
fn.cli(path, optionArray).then(res => console.log(res)); // request axios