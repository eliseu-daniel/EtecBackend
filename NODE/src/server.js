const porta = 3003
const express = require('express')
const app = express()
const bd = require('./config/database')

app.use(express.json())

//Mostrar todos
app.get('/adm', async (req,res,next) => {
    try{
        const users = await bd.allAdm()
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Mostrar Adm
app.get('/adm/:id', async (req,res,next) => {
    try{
        const users = await bd.showAdm(req.params.id)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Criar Adm
app.post('/adm', async(req, res, next) => {
    try{
        const {nome, senha, email, fone} = req.body
        const users = await bd.createAdm(nome, senha, email, fone)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Atualizar Adm
app.put('/adm/:id', async(req, res, next) => {
    try {
        const {nome, senha, email, fone} = req.body
        const users = await bd.updateAdm(req.params.id, nome, senha, email,fone)
        res.json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Deletar Adm
app.delete('/adm/:id', async(req, res, next) => {
    try {
        const users = await bd.deleteAdm(req.params.id)
        res.json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})



//Mostrar Todos cliente
app.get('/cliente', async (req,res,next) => {
    try{
        const users = await bd.allCli()
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Mostrar cliente
app.get('/cliente/:id', async (req,res,next) => {
    try{
        const users = await bd.showCli(req.params.id)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Criar cliente
app.post('/cliente', async(req, res, next) => {
    try{
        const {nome, fone, email, senha} = req.body
        const users = await bd.createCli(nome, fone, email, senha)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Atualizar cliente
app.put('/cliente/:id', async(req, res, next) => {
    try {
        const {nome, fone, email, senha} = req.body
        const users = await bd.updateCli(req.params.id, nome, fone, email, senha)
        res.json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Deletar cliente
app.delete('/cliente/:id', async(req, res, next) => {
    try {
        const users = await bd.deleteCli(req.params.id)
        res.json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})


app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})