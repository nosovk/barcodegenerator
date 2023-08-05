// file : bwip-js/server.js
//
// Simple node HTTP server that renders bar code images using bwip-js.
//
// Usage:  node server [address:port] ...
//
// To specify all interfaces, use * as the address
//
// If no address:port are specified, the default is: *:3030
//
"use strict";

const http = require('http');
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

const server = http.createServer(function (req, res) {
    // If the url does not begin /?bcid= then 404.  Otherwise, we end up
    // returning 400 on requests like favicon.ico.
    console.log("req.url", req.url);
    if (req.url.indexOf('/?bcid=') != 0) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('BWIP-JS: Unknown request format.', 'utf8');
    } else {
        bwipjs.request(req, res, {sizelimit: 1024 * 1024});    // limit image size
    }
})


const PORT = process.env.PORT || 3030
server.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
