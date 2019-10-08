let desc = "Avacado is shit";
console.log(desc);
const fs = require('fs');
const input = fs.readFileSync('./txt/input.txt','UTF-8');
console.log(input);
desc = `${desc} \n${input}`;
fs.writeFileSync('./txt/output.txt', desc);
console.log('File written') ;