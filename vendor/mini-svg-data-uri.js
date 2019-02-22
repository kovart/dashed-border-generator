// Rewritten for browser support

// MIT License
// Copyright (c) 2018 Taylor Hunt
// Source: https://github.com/tigt/mini-svg-data-uri

const shorterNames = {
    aqua: /#00ffff(?!\w)|#00ffffff(?!\w)|#0ff(?!\w)/gi,
    azure: /#f0ffff(?!\w)/gi,
    beige: /#f5f5dc(?!\w)/gi,
    bisque: /#ffe4c4(?!\w)/gi,
    black: /#000000(?!\w)|#000000ff(?!\w)|#000(?!\w)/g,
    blue: /#0000ff(?!\w)|#0000ffff(?!\w)|#00f(?!\w)/gi,
    brown: /#a52a2a(?!\w)/gi,
    coral: /#ff7f50(?!\w)/gi,
    cornsilk: /#fff8dc(?!\w)/gi,
    crimson: /#dc143c(?!\w)/gi,
    cyan: /#00ffff(?!\w)|#00ffffff(?!\w)|#0ff(?!\w)/gi,
    darkblue: /#00008b(?!\w)/gi,
    darkcyan: /#008b8b(?!\w)/gi,
    darkgrey: /#a9a9a9(?!\w)/gi,
    darkred: /#8b0000(?!\w)/gi,
    deeppink: /#ff1493(?!\w)/gi,
    dimgrey: /#696969(?!\w)/g,
    gold: /#ffd700(?!\w)/gi,
    green: /#008000(?!\w)/g,
    grey: /#808080(?!\w)/g,
    honeydew: /#f0fff0(?!\w)/gi,
    hotpink: /#ff69b4(?!\w)/gi,
    indigo: /#4b0082(?!\w)/gi,
    ivory: /#fffff0(?!\w)/gi,
    khaki: /#f0e68c(?!\w)/gi,
    lavender: /#e6e6fa(?!\w)/gi,
    lime: /#00ff00(?!\w)|#00ff00ff(?!\w)|#0f0(?!\w)/gi,
    linen: /#faf0e6(?!\w)/gi,
    maroon: /#800000(?!\w)/g,
    moccasin: /#ffe4b5(?!\w)/gi,
    navy: /#000080(?!\w)/g,
    oldlace: /#fdf5e6(?!\w)/gi,
    olive: /#808000(?!\w)/g,
    orange: /#ffa500(?!\w)/gi,
    orchid: /#da70d6(?!\w)/gi,
    peru: /#cd853f(?!\w)/gi,
    pink: /#ffc0cb(?!\w)/gi,
    plum: /#dda0dd(?!\w)/gi,
    purple: /#800080(?!\w)/g,
    red: /#ff0000(?!\w)|#ff0000ff(?!\w)|#f00(?!\w)/gi,
    salmon: /#fa8072(?!\w)/gi,
    seagreen: /#2e8b57(?!\w)/gi,
    seashell: /#fff5ee(?!\w)/gi,
    sienna: /#a0522d(?!\w)/gi,
    silver: /#c0c0c0(?!\w)/gi,
    skyblue: /#87ceeb(?!\w)/gi,
    snow: /#fffafa(?!\w)/gi,
    tan: /#d2b48c(?!\w)/gi,
    teal: /#008080(?!\w)/g,
    thistle: /#d8bfd8(?!\w)/gi,
    tomato: /#ff6347(?!\w)/gi,
    violet: /#ee82ee(?!\w)/gi,
    wheat: /#f5deb3(?!\w)/gi,
    white: /#ffffff(?!\w)|#ffffffff(?!\w)|#fff(?!\w)/gi,
}
const REGEX = {
    whitespace: /\s+/g,
    urlHexPairs: /%[\dA-F]{2}/g,
    quotes: /"/g,
}

function collapseWhitespace(str) {
    return str.trim().replace(REGEX.whitespace, ' ');
}

function dataURIPayload(string) {
    return encodeURIComponent(string)
        .replace(REGEX.urlHexPairs, specialHexEncode);
}

// `#` gets converted to `%23`, so quite a few CSS named colors are shorter than
// their equivalent URL-encoded hex codes.
function colorCodeToShorterNames(string) {
    Object.keys(shorterNames).forEach(function (key, i) {
        if (shorterNames[key].test(string)) {
            string = string.replace(shorterNames[key], key);
        }
    });

    return string;
}

function specialHexEncode(match) {
    switch (match) { // Browsers tolerate these characters, and they're frequent
        case '%20':
            return ' ';
        case '%3D':
            return '=';
        case '%3A':
            return ':';
        case '%2F':
            return '/';
        default:
            return match.toLowerCase(); // compresses better
    }
}

function svgToTinyDataUri(svgString) {
    if (typeof svgString !== 'string') {
        throw new TypeError('Expected a string, but received ' + typeof svgString);
    }
    // Strip the Byte-Order Mark if the SVG has one
    if (svgString.charCodeAt(0) === 0xfeff) {
        svgString = svgString.slice(1)
    }

    var body = colorCodeToShorterNames(collapseWhitespace(svgString))
        .replace(REGEX.quotes, "'");
    return 'data:image/svg+xml,' + dataURIPayload(body);
}

window.svgToTinyDataUri = svgToTinyDataUri;