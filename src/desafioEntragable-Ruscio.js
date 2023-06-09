
import { readFileSync, writeFileSync, existsSync } from "node:fs";
class ProductManager {
  static id;

    constructor(path) {
      this.path = path;
      this.products = this.leerArchivo();
      ProductManager.id = this.products.length >0 ? this.products[this.products.length-1].id : 0;
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
  

    getProducts() {
       return this.products;
      }
    
    
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

    getProductById (idProduct){
        const existproducto = this.products.find((e) => e.id == idProduct)
        if(existproducto){
            return existproducto;
        }else {
          let mensaje = `El producto con el ID: ${idProduct} no existe`;
          return mensaje;
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

}

export default ProductManager;
/* module.exports = {
  ProductManager,
} */