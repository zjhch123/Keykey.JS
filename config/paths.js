'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const appSrc = resolveApp('src')

module.exports = {
  appSrc: appSrc,
  appROOT: resolveApp(''),
  appNodeModules: resolveApp('node_modules'),
  appIndexHTML: path.join(appSrc, 'index.html'),
  appBuildPath: resolveApp('build'),
  appDevEntry: path.join(appSrc, 'App.js'),
  appProdEntry: path.join(appSrc, 'Prod.js'),
  appIndexJS: path.join(appSrc, 'App.js'),
  appCSS: path.join(appSrc, 'css'),
  appJS: path.join(appSrc, 'js'),
  appAssets: path.join(appSrc, 'assets'),
};
