"use strict";

const url = require('url');
const bwipjs = require('bwip-js');

console.log('bwip-js ' + bwipjs.BWIPJS_VERSION + ' / BWIPP ' + bwipjs.BWIPP_VERSION);

// Optionally, load custom fonts.  This shows how to load the Inconsolata font,
// supplied with the bwip-js distribution.  The path to your fonts will be different.
// The second and third params, the width and height size multipliers, allow scaling
// a font to the BWIPP built-in font metrics.
// 100 (100%) indicates to use the font's default size.
//bwipjs.loadFont('Inconsolata', 100,
//        require('fs').readFileSync(__dirname + '/fonts/Inconsolata.otf', 'binary'));



export default async function handler(req, res) {
    // If the url does not begin /?bcid= then 404.  Otherwise, we end up
    // returning 400 on requests like favicon.ico.
    console.log("req.url", req.url, req.url.indexOf('bcid='));
    if (req.url.indexOf('bcid=') === -1) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('BWIP-JS: Unknown request format. No bcid precent', 'utf8');
    } else {
        bwipjs.request(req, res, {sizelimit: 1024 * 1024});    // limit image size
    }
}
