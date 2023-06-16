import express from 'express';
import products from './routers/products.js';
import carts from './routers/carts.js';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/views.router.js';
import {Server} from 'socket.io';
import productos from "./data/productos.json" assert { type: "json" };



const app = express();
const port = 8080;

// Middlewares
app.use(express.json());
app.use(`/api/products`, products);
app.use(`/api/carts`, carts);
app.use(express.urlencoded({ extended: true }));
app.use("/", viewsRouter);

app.get (`/`, function (req, res) {
    res.send(`Solucion a la primera entrega del proyecto final de CoderHouse`)
});

const httpServer = app.listen(port, ()=>{
    console.log(`Corriendo en el puerto ${port} `)
});



// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));


const io = new Server(httpServer);
io.on("connection", (socket) => {
	console.log("New client connected");

	// Enviar productos
	socket.emit("products", productos);

	socket.on("disconnect", () => {
		console.log("Client disconnected");
	});
});