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

const server = http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url === '/' || req.url === '/overview'){
        res.end('Hello from Server!!!!!');

    }
   else if(req.url === '/product'){
        res.end('Products not added yet');

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




































