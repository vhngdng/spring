/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const { override, useBabelRc } = require('customize-cra');
const webpack = require('webpack');
module.exports = override(useBabelRc());
module.exports = {
    // ...
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
};
