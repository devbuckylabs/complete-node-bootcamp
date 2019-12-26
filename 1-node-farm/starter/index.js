const fs = require('fs');
const http = require('http');
const url = require('url');

const replacePlaceHolder = require('./modules/replaceTemplate');

//****************************/
//FILES SYNC/
// let desc = "Avacado is shit";
// console.log(desc);
// const input = fs.readFileSync('./txt/input.txt', 'UTF-8');
// console.log(input);
// desc = `${desc} \n${input}`;
// fs.writeFileSync('./txt/output.txt', desc);
// console.log('File written');

///****************************/
//**********FILES ASYNC*******//

// fs.readFile('./txt/star.txt', 'UTF-8', (err, data1) => {
//     if(err) return console.log("Fuck.........!  ERRORRRR")
//     console.log(data1);
//     fs.readFile(`./txt/${data1}.txt`, 'UTF-8', (err, data2) => {
//         console.log(data2);
//         const data3= `${data1}\n${data2}`;
//         fs.writeFile('./txt/output.txt', data3, (err) => {
//             console.log('File written Async');
//         })

//     })

// })
///****************************/
//**********SERVER*******//

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'UTF-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'UTF-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'UTF-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'UTF-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    const cardshtml = dataObj
      .map(el => replacePlaceHolder(tempCard, el))
      .join('');

    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardshtml);
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replacePlaceHolder(tempProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'Holaa'
    });
    res.end('<h1>404 NOT FOUND</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});
