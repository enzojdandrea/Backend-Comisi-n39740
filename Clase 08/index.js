const express = require('express')
const app = express()
const PORT = 8082

let frase = "Frase Inicial"

app.use(express.json())
app.use(express.urlencoded(ex))

app.get('/api/frases',(res,req)=>{

})

app.get('/api/palagra/:pos',(res,req)=>{
    const pos = +res.params.pos
    const palabras = frase.split(" ")
    const buscada = palabras[pos]
})


app.delete('/api/palabras/:pos',(res,req)=>{
    const pos = +req.params.pos
    const palabras=frase.split(" ")
    const eliminada = palabras.split(pos,1)[0]
    frase = palabras.join(' ')

    res.status(200).json({Eliminada})
})


app.listen(PORT,()=>{
    console.log(`Server Escuchando en el puerto ${PORT}`)
})