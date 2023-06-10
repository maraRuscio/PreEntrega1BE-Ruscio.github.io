import { Router } from "express";
import CartManager from '../models/CartManager.js';

const carts = new CartManager('./data/carts.json');
const router = Router();

router.post('/', (req,res) => {
    const result = carts.crearCart();
    return res.json({result});

});

router.get (`/:id`, (req, res) => {
    const { id } = req.params;
    const result = carts.getcartById(parseInt(id));

    return res.json({result});
});

router.post('/:id/product/:pid', (req,res) => {
    const { id, pid } = req.params;
    const result = carts.addProductToCart(parseInt(id), parseInt(pid));
    return res.json({result});

});


export default router;