"use strict";

const path = require('path');

const fsPromises = require('fs').promises;

const convertIntoAbsolute = route => {
  if (!path.isAbsolute(route)) return path.resolve(route);
  return route;
};

const isDir = route => {
  return fsPromises.lstat(route).then(stats => stats.isDirectory()).then(result => result ? result : false).catch(err => false);
};

async function getPathsFromDirectory(route) {
  const subdirs = await fsPromises.readdir(route);
  const files = await Promise.all(subdirs.map(async subdir => {
    const filePath = path.resolve(route, subdir);
    return (await isDir(filePath)) ? await getPathsFromDirectory(filePath) : filePath;
  }));
  return Array.prototype.concat(...files);
}

const getMdFiles = filesArr => {
  return filesArr.filter(file => path.extname(file) === '.md');
};

async function getMdLinks(filesArr) {
  const regexLink = /\[(.*?)\]/g;
  const regexUrl = /(\]\((.*?)\))/g;
  const regexLinks = /[^!](\[(.*?)\])(\((.*?)\))|^(\[(.*?)\])(\((.*?)\))/g;
  const links = await Promise.all(filesArr.map(async file => {
    const content = await fsPromises.readFile(file, 'utf-8');
    const fileLinkList = await content.match(regexLinks);

    if (fileLinkList !== null) {
      return await fileLinkList.map(link => {
        return {
          href: link.match(regexUrl).toString().replace(/(\]\()|(\)$)/g, ''),
          text: link.match(regexLink).toString().replace(/(\[|\])/g, ''),
          file
        };
      });
    }

    return [];
  }));
  const output = await links.reduce((accumulator, currentValue) => accumulator.concat(currentValue));
  return output;
}

module.exports = {
  convertIntoAbsolute,
  isDir,
  getPathsFromDirectory,
  getMdFiles,
  getMdLinks
};