import express from 'express';
import products from './routers/products.js';
import carts from './routers/carts.js';


const app = express();
const port = 8080;

app.use(express.json());

app.use(`/api/products`, products);
app.use(`/api/carts`, carts);



app.get (`/`, function (req, res) {
    res.send(`Solucion a la primera entrega del proyecto final de CoderHouse`)
});

app.listen(port, ()=>{
    console.log(`Corriendo en el puerto ${port} `)
})