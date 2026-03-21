const http = require('http'); 
const fs = require('fs')

const server = http.createServer((req, res)=>{
    if (req.url === "/"){
        fs.readFile(path.join(__dirname, 'index.html'), (err, content)=>{
            if(err) throw err;
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(content)
        })

    }
    else if (req.url === "/api"){
        fs.readFile(path.join(__dirname, 'ADDONS.JSON'), (err, content)=>{
            if(err) throw err; 
            res.writeHead(200, {'Content-Type': "application/json"})
            res.end(content)
        })

    }
    else{
        if(err) throw err; 
        res.writeHead(404, {'Content-Type': "text/html"})
        res.end('Not Found')
    }
        
})