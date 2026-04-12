//connect to our mongoDB database
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const http = require('http');
const fs = require('fs');
const path = require('path');
const {MongoClient} = require('mongodb');

async function findSomeData(client){
    const cursor = await client.db('athleteOS').collection("services").find({});

    const results = await cursor.toArray();
    return results
}


// console.log(MongoClient)
async function main(){
    const uri = "mongodb+srv://matt:lagrou@lagrou355.qp9qtge.mongodb.net/";

    const client = new MongoClient(uri);
    try{
        await client.connect();
        console.log('connection established')

        const server = http.createServer(async (req, res)=>{
            if (req.url === "/"){
                fs.readFile(path.join(__dirname, 'index.html'), (err, content)=>{
                    if(err) throw err;
                    res.writeHead(200, {'Content-Type': 'text/html'})
                    res.end(content)
                })

            }
            else if (req.url === "/api"){
                const content = await findSomeData(client);    
                    res.writeHead(200, {'Content-Type': "application/json"})
                    res.end(JSON.stringify(content))
                }

            
            else if (req.url === '/style.css'){
                fs.readFile(path.join(__dirname, 'style.css'), (err, content)=>{
                    if(err) throw err;
                    res.writeHead(200, {'Content-Type': 'text/css'})
                    res.end(content)
                })
            }
            else{
                res.writeHead(404, {'Content-Type': "text/html"})
                res.end('Not Found')
            }
        
        });

        const PORT = process.env.PORT || 5959;


        server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


    }
    catch(err){
        console.log(err)
    }

}


main();


