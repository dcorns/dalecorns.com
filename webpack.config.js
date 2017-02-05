/**
 * webpack.config.js
 * Created by dcorns on 2/1/17
 * Copyright © 2017 Dale Corns
 */
'use strict';
let path = require('path');
module.exports = {
  entry: './app/js/index.js',
  output: {
    path: path.resolve(__dirname, 'Development/js'),
    filename: 'bundle.js'
  }
};