import { readFileSync, writeFileSync, existsSync } from "node:fs";
import ProductManager from "./ProductManager.js";

class CartManager {
  static id;
  

    constructor(path) {
      this.path = path;
      this.carts = this.leerArchivo();
      CartManager.id = this.carts.length >0 ? this.carts[this.carts.length-1].id : 0 ;
      this.products = new ProductManager('./data/productos.json');
    }

    leerArchivo (){
      try {
        if (existsSync(this.path)) 
          return JSON.parse(readFileSync(this.path, 'utf8'));
        else
        return [];
      } catch (error) {
        console.log(error);
      }
    }

    crearCart(){
        try {
            const newCart ={
                id: ++CartManager.id,
                products: [],
            };
            this.carts.push(newCart);
            writeFileSync(this.path, JSON.stringify(this.carts));
            return "Su nuevo carrito fue creado con exito"
    
        }catch (e) {
            console.log(e);
        }
    }

    getcartById (idCart){
      let mensaje;
        const existcart = this.carts.find((e) => e.id == idCart)
        if(existcart){
          mensaje = `el carrito con el ID: ${idCart} contiene: ${existcart.products}`;
          
        }else {
          mensaje = `El carrito con el ID: ${idCart} no existe`;
        }
        return mensaje;
    };

    addProductToCart(idCart, idProduct){
      try {
        let mensaje;
        const existcart = this.carts.findIndex(c => c.id === idCart);
        if(existcart>-1){
          const existprod =this.products.getProductById(idProduct);
          if(existprod){
            const art = this.carts[existcart].products.findIndex( a => a.pid === idProduct);
            if (art != -1){
              this.carts[existcart].products[art].qty=++this.carts[existcart].products[art].qty;
            } else{
              const newArt ={
                pid: idProduct,
                qty: 1
              };
              console.log(newArt);
              this.carts[existcart].products.push(newArt);
            }
            writeFileSync(this.path, JSON.stringify(this.carts));
            mensaje = `Se agrego una unidad del producto con id ${existprod.id} al carrito con el ID: ${idCart} `; 
          } else {
            mensaje = `El producto con el ID: ${idProduct} no existe`;
          }} else {
          mensaje = `El carrito con el ID: ${idCart} no existe`;
        }
        return mensaje;


      } catch (error) {
        console.log(error);
        
      } 
        
    };

    removeCart(idCart){
      try {
        let men;
        const ind = this.carts.findIndex(e => e.id == idCart)
          if(ind < 0)
            men = `el carrito con ID ${idCart}no existe`;
          else{
            this.carts.splice(ind, 1);
            writeFileSync(this.path, JSON.stringify(this.carts));
            men = `el carrito con ID ${idCart} fue eliminado`
          }
          return men;
       } catch (error) {
        console.log(error);
        
       }

    };


    };
  
   


export default CartManager;