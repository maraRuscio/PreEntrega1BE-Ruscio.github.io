import { Router } from "express";
import ProductManager from '../src/desafioEntragable-Ruscio.js';

const productos = new ProductManager(`./data/productos.json`);
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
    console.log(req.body);
    const{title, description, price, imagen, code, stock}= req.body;
    const result = productos.agregarProducto(title, description, price, imagen, code, stock);
   
    return res.json({result});

});

router.put('/', (req,res) => {
    return res.json({msg: `PUT Product`});

});

router.delete('/', (req,res) => {
    const {id} = req.params;
    return res.json({msg: `DELETE Product`});

});

router.get('/:id', (req,res) => {
    const {id} = req.params;
    return res.json(productos.getProductById(parseInt(id)));
});

export default router;

