import Express from "express";
import productsManage1 from "./productManager.js";

const app = Express();

const productsManager = new productsManage1();

app.get('/',(req,res)=>{
    const products = productsManager.getProducts()
    res.send(products)
})

app.use(Express.urlencoded({extended: true}))

app.get('/query',(req,res)=>{
    let consulta = req.query
    let {limit}=consulta
    console.log(limit)
})

app.get('/:productId',(req,res)=>{
    const productId= +req.params.productId
    const product = productsManager.getProductsById(productId)

    if(!product){
        res.send({error: "Producto no encontrado"})
    }
    res.send({data:product})
})

app.listen(8083,()=>{
    console.log("Servidor Escuchando")
})