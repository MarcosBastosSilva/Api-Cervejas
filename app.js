const express = require('express')
const { Db } = require('mongodb')
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
require("./models/Cerveja")
const Cerveja = mongoose.model("cerveja")

mongoose.connect('mongodb://localhost/api-cervejas',{
    useNewUrlParser: true,
  useUnifiedTopology: true
 })
.then(()=>{
    console.log("Conexão com mongoDB realizada com sucesso")
}).catch(()=>{
    console.log("Conexão com mongo DB não pode ser realizada.")
})

app.get("/", async function(req,res){
    Cerveja.find({})
    .then((cerveja)=>{
        return res.json(cerveja)
    })
    .catch(()=>{
        return res.status(400).json({
            error: true,
            mensagem: "Não foi possivel visualizar ID"
        })
    })
})

app.get("/cerveja/:id",async function(req,res){
    Cerveja.findOne({_id:req.params.id})
    .then((cerveja)=>{
        return res.json(cerveja)
    })
    .catch((error)=>{
        return res.status(400).json({
            error:true,
            mensagem:"Não foi possivel acessar o id."
        })
    })
})

app.post("/cerveja", async function(req,res){
     Cerveja.create(req.body,(err)=>{
        if(err) return res.status(400).json({
            error:true,
            mensagem:"houve um problema para cadastrar o produto."
        })
        return res.status(200).json({
            error:false,
            mensage: "O produto foi cadastrado com sucesso."
        })
    })
})

app.put("/cerveja/:id", async function(req,res){
    Cerveja.updateOne({_id: req.params.id}, req.body, (err)=>{
        if(err) return res.status(400).json({
            error:true,
            mensagem:"houve um erro ao atualizar o produto"
        })
        return res.status(200).json({
            error:false,
            mensagem:"produto atualizado com sucesso."
        })
    })
})

app.delete("/cerveja/:id", async function(req,res){
    const cerveja = Cerveja.deleteOne({_id:req.params.id}, req.body,(err)=>{
        if(err) return res.status(400).json({
            error:true,
            mensagem:"o produto não conseguiu ser deletado"
        })
        return res.status(200).json({
            error:false,
            mensagem:"produto deletado com sucesso"
        })
    })
})


app.listen(8080)
