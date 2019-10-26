const fs = require('fs'); 
const http = require('http');
const url = require('url');
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

const replacePlaceHolder = (temp,product) => {

let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');

return output;
};


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'UTF-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'UTF-8');
const tempProduct= fs.readFileSync(`${__dirname}/templates/template-product.html`,'UTF-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'UTF-8');
const dataObj = JSON.parse(data);  
   
const server = http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url === '/' || req.url === '/overview'){

        const cardshtml= dataObj.map(el => replacePlaceHolder(tempCard,el)).join('');
        
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardshtml);
        res.writeHead(200,{'Content-type': 'text/html'});
        res.end(output);
    }
   else if(req.url === '/product'){
        res.end('Products not added yet');
    }
    else if(req.url === '/api'){        
        res.end(data);
    }
    else{
        res.writeHead(404,{
            'Content-type': 'text/html' ,
            'my-own-header': 'Holaa'
        });
        res.end('<h1>404 NOT FOUND</h1>');
    }
});

server.listen(8000,'127.0.0.1',()=>{

    console.log('Listening to requests on port 8000');
})











