const porta = 3003
const express = require('express')
const app = express()
const bd = require('./config/database')

app.use(express.json())

//apagar depois
app.get('/adm', async (req,res,next) => {
    try{
        const users = await bd.all()
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Criar Adm
app.post('/adm', async(req, res, next) => {
    try{
        const {nome, senha, email, fone} = req.body
        const users = await bd.create(nome, senha, email, fone)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})




app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})