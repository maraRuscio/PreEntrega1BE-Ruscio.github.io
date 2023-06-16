import { Router } from "express";
import products from "../data/productos.json" assert { type: "json" };
const views = Router();

// Endpoint para renderizar el home:
views.get("/", (req, res) => {
	res.render("home", {
		style: "styles.css",
		documentTitle: "Home",
		products
	});
});

// Endpoint para renderizar productos con socket:
views.get("/realtimeproducts", (req, res) => {
	res.render("realTimeProducts", {
		style: "styles.css",
		documentTitle: "Socket",
	});
});

export default views;