const { ProductManager } = require('./desafioEntragable-Ruscio.js')

const productos = new ProductManager('./data/productos.json');

console.log(productos.getProducts());
productos.agregarProducto(`producto prueba`, `Este es un producto prueba`, 280, `Sin imagen`, `abc123`, 25);
productos.agregarProducto(`producto prueba1`, `Este es un producto prueba`, 700, `Sin imagen`, `abc234`, 25);
productos.agregarProducto(`producto prueba2`, `Este es un producto prueba`, 600, `Sin imagen`, `abc345`, 25);
productos.agregarProducto(`producto prueba3`, `Este es un producto prueba`, 500, `Sin imagen`, `abc456`, 25);
productos.agregarProducto(`producto prueba4`, `Este es un producto prueba`, 400, `Sin imagen`, `abc567`, 25);
console.log(productos.getProducts());
productos.getProductById(1);
productos.getProductById(4);
productos.agregarProducto(`producto prueba`, `Este es un producto prueba`, 100, `Sin imagenes`, `abc1234`, 255);
console.log(productos.deleteProduct(3));
console.log(productos.getProducts());

const prop = {
  id: 20,
  price: 5,
  stock:100,
  thumbail: './img/algo.jpg',
};
productos.updateProduct(2,prop)
console.log(productos.getProducts()); 