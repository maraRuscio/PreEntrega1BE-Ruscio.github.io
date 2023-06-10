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

    };
  
   
/*
    agregarProducto(title, description, code, price, status = true, stock, imagen) {
      try {
        const existecode = this.products.find((e) =>{
          return e.code === code;
        });
        if(existecode) {
          console.log(`El codigo ${code} ya se encuentra en el arreglo`);
        }else{
          if (title && description && code &&price && stock && imagen ){
                  
        // crear el producto
        const producto = { id: ++ProductManager.id, title, description, code, price, status : true, stock, imagen};
        this.products.push(producto);
        writeFileSync(this.path, JSON.stringify(this.products));
        }else{
          console.log(`no se cuentan con todos los parametros para crear el producto`)
        }}
      }catch(e){
      console.log(`${e} no se pudo escribir el archivo`);
      }
    }

    deleteProduct (idProduct){
     try {
      let men;
      const ind = this.products.findIndex(e => e.id == idProduct)
        if(ind < 0)
          men = `el producto con ID ${idProduct}no existe`;
        else{
          this.products.splice(ind, 1);
          writeFileSync(this.path, JSON.stringify(this.products));
          men = `el producto con ID ${idProduct} fue eliminado`
        }
        return men;
     } catch (error) {
      console.log(error);
      
     }
      }

    updateProduct (idProduct, propiedad){
      try {
        let men;
      const ind = this.products.findIndex( e => e.id == idProduct);
      if(ind > -1){
        const {id, ...rest} = propiedad;
        this.products[ind] = {...this.products[ind], ...rest};
        writeFileSync(this.path, JSON.stringify(this.products));
        men= `el producto con ID ${idProduct} fue modificado exitosamente`;
    }else
      men = `el producto con ID ${idProduct} no existe`;
   console.log(men);
      } catch (error) {
        console.log(error);
        
      }
}
 */


export default CartManager;