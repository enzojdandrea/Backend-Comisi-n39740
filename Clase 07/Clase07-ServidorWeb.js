import Express from "express";
import productsManage1 from "./Clase05-productManager-Archivos.js";

const app = Express();

const productsManager = new productsManage1();
const products = await productsManager.getProducts()

app.get('/:productId',(req,res)=>{
    const productId= +req.params.productId
    const product = products.find((product)=>product.id===productId)

    if(!product){
        res.send({error: "Producto no encontrado"})
    }
    res.send(product)
})