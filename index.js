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
        const orderCollection = client.db('socialZone').collection('orders');
        const doctorsCollection = client.db('socialZone').collection('doctors');

        app.get('/services', async(req, res)=>{
            const query ={}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        // orders api
        app.post('/orders', async(req, res) =>{
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })

        app.get('/orders', async(req,res) =>{
            const query ={}
            const result = await orderCollection.find(query).project({name: 1}).toArray();
            res.send(result);
        });

        app.get('/doctors', async(req, res) =>{
            const query = {};
            const doctors = await doctorsCollection.find(query).toArray();
            res.send(doctors);
        })


        app.post('/doctors', async(req, res) =>{
            const doctor = req.body;
            const result = await doctorsCollection.insertOne(doctor);
            res.send(result);
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