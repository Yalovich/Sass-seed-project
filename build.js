console.log("Sass Seed project by Idan Yalovich (yalovich.com)");

const sass = require('sass');
const path = require('path');
const fs = require('fs');

const argv = process.argv.slice(2);
const FILENAME = argv.length > 0 ? argv[0] : "seed"; // TODO: use a proper ARGV parser.
const SUFFIX = `scss`; // TODO: make adjustable from CLI

const SRC_DIR = `${path.resolve(__dirname)}/src`;
const DIST_DIR = `${path.resolve(__dirname)}/dist`;

console.log("\t>> Entry point: ", `${SRC_DIR}/${FILENAME}.${SUFFIX}`)

const result = sass.renderSync({
    file: `${SRC_DIR}/${FILENAME}.${SUFFIX}`,
    sourceMap: true
});

fs.writeFileSync(`${DIST_DIR}/${FILENAME}.css`, result.css);
console.log("\t<< Build completed. T:", (result.stats['duration'] / 1000))