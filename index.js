const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion } = require('mongodb');
const { query } = require('express');
const cores = require('cores');
require('dotenv').config();

const app = express();
const port = process.env.PORT ||  5000;


// middle wares
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.bckes0p.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const serviceCollection = client.db('socialZone').collection('services');

        app.get('/services', async(req, res)=>{
            const query ={}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

    }
    finally{

    }

}
run().catch(err => console.error(err))





app.get('/', (req,res) =>{
    res.send('server is running')
})

app.listen(port,() =>{
    console.log(`server is running on ${port}`);
})