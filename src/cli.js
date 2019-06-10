#!/usr/bin/env node
const mdLinks = require('./md-links');
const validate = require('./validate');

const [,, ...args] = process.argv;

async function getmdLinks(route) {
	const links = await mdLinks(route);
	await links.forEach((obj) => console.log(`${obj.file} ${obj.href} ${obj.text.slice(0,49)}`))
	//const validation = await validate(links);
	//await validation.forEach((obj) => obj.then((result) => console.log(`${result.href} ${result.statusMessage.toLowerCase()} ${result.statusCode} ${result.text.slice(0,49)}`)))
}

getmdLinks(args[0]);
//console.log(`Hello World ${args}`)

