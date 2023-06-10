import { Router } from "express";
import ProductManager from '../models/ProductManager.js';

const productos = new ProductManager('./data/productos.json');
const router = Router();


router.get (`/`, (req, res) => {
    const { limit } = req.query;
    const prod = productos.getProducts();
    let cant;
    if(limit)
        cant = prod.slice(0, limit)
        else cant = prod;
    return res.json({cantProductos: prod.length, productosSeleccionados: cant});


});

router.post('/', (req,res) => {
    const{title, description, code, price, status, stock, imagen}= req.body;
    const result = productos.agregarProducto(title, description, code, price, status, stock, imagen);
   
    return res.json({result});
});

router.put('/:id', (req,res) => {
    const {id} = req.params;
    const result = productos.updateProduct(parseInt(id), req.body);
    return res.json({result});

});

router.delete('/:id', (req,res) => {
    const {id} = req.params;
    const result = productos.deleteProduct(parseInt(id));
    return res.json({result});

});

router.get('/:id', (req,res) => {
    const {id} = req.params;
    return res.json(productos.getProductById(parseInt(id)));
});

export default router;

