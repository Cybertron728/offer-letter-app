const png2icons = require('png2icons');
const fs = require('fs');
const path = require('path');

const input = fs.readFileSync(path.join(__dirname, 'public/icon.png'));

// Create .icns
const icns = png2icons.createICNS(input, png2icons.BICUBIC, 0);
if (icns) {
    fs.writeFileSync(path.join(__dirname, 'public/icon.icns'), icns);
    console.log('Created public/icon.icns');
} else {
    console.error('Failed to create .icns');
}

// Create .ico
const ico = png2icons.createICO(input, png2icons.BICUBIC, 0, false);
if (ico) {
    fs.writeFileSync(path.join(__dirname, 'public/icon.ico'), ico);
    console.log('Created public/icon.ico');
} else {
    console.error('Failed to create .ico');
}
