const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../src');

const replacements = [
    { from: /'projects'/g, to: "'pkcreative_projects'" },
    { from: /"projects"/g, to: '"pkcreative_projects"' },
    { from: /'projectCategories'/g, to: "'pkcreative_projectCategories'" },
    { from: /"projectCategories"/g, to: '"pkcreative_projectCategories"' },
    { from: /'siteContent'/g, to: "'pkcreative_siteContent'" },
    { from: /"siteContent"/g, to: '"pkcreative_siteContent"' },
    { from: /'galleryImages'/g, to: "'pkcreative_galleryImages'" },
    { from: /"galleryImages"/g, to: '"pkcreative_galleryImages"' },
    { from: /'galleryCategories'/g, to: "'pkcreative_galleryCategories'" },
    { from: /"galleryCategories"/g, to: '"pkcreative_galleryCategories"' },
    { from: /'contactMessages'/g, to: "'pkcreative_contactMessages'" },
    { from: /"contactMessages"/g, to: '"pkcreative_contactMessages"' }
];

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(directoryPath);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    replacements.forEach(r => {
        content = content.replace(r.from, r.to);
    });

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Updated:', file);
    }
});
console.log('Done replacing collection names.');
