console.log("Sass Seed project by Idan Yalovich (yalovich.com)");

const sass = require('sass');
const path = require('path');
const fs = require('fs');

const argv = process.argv.slice(2);

let WATCH = false;
let FILENAME = "seed";

// TODO: use a proper ARGV parser.
argv.map(arg => {
    let [ key, value ] = arg.split("=");

    if(!WATCH) WATCH = key === "--watch";

    if(key === "--file") FILENAME = value;
});

const SUFFIX = `scss`; // TODO: make adjustable from CLI

const SRC_DIR = `${path.resolve(__dirname)}/src`;
const DIST_DIR = `${path.resolve(__dirname)}/dist`;

const INPUT_FILE = `${SRC_DIR}/${FILENAME}.${SUFFIX}`;

const build = (INPUT_FILE, DIST_DIR, FILENAME, compressed = false) => {
    try {
        const result = sass.renderSync({
            file: INPUT_FILE,
            outputStyle: compressed ? "compressed" : "expanded"
        });

        fs.writeFileSync(`${DIST_DIR}/${FILENAME}.css`, result.css);
        console.log("\t<< Build completed. T:", (result.stats['duration'] / 1000))
    } catch(error)
    {
        console.log("\t>> Sass error: \n\n\x1b[31m%s\x1b[0m\n", error.formatted);
    }
}

console.log("\t>> Entry point: ", `${INPUT_FILE}`);

if(WATCH)
{
    console.log("\t>> Watching mode.");

    fs.watch(SRC_DIR, {}, (change, file) => {
        if(file === `${FILENAME}.${SUFFIX}`) build(INPUT_FILE, DIST_DIR, FILENAME);
    });
}

build(INPUT_FILE, DIST_DIR, FILENAME, true);
