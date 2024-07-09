const porta = 3003
const express = require('express')
const app = express()
const bd = require('./config/database')
const { parseISO, format } = require('date-fns')

app.use(express.json())

//Login
app.post('/login', async(req, res, next) => {
    try{
        const {email, senha} = req.body
        const users = await bd.getLogin(email, senha)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})



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



//Mostrar Todos Pedidos
app.get('/pedido', async (req,res,next) => {
    try{
        const users = await bd.allPed()
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Mostrar Pedidos
app.get('/pedido/:id', async (req,res,next) => {
    try{
        const users = await bd.showPed(req.params.id)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Criar Pedidos
app.post('/pedido', async(req, res, next) => {
    try{
        const {dataHora, status, idCliente} = req.body
        const parsedDate = parseISO(dataHora)
        const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm:ss')
        const users = await bd.createPed(formattedDate, status, idCliente)
        res.json(users)
    }catch(error){
        res.status(500).json({error: error.message})
    }
})

//Atualizar Pedidos
app.put('/pedido/:id', async(req, res, next) => {
    try {
        const {dataHora, status, idCliente} = req.body
        const parsedDate = parseISO(dataHora)
        const formattedDate = format(parsedDate, 'yyyy-MM-dd HH:mm:ss')
        const users = await bd.updatePed(req.params.id, formattedDate, status, idCliente)
        res.json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//Deletar Pedidos
app.delete('/pedido/:id', async(req, res, next) => {
    try {
        const users = await bd.deletePed(req.params.id)
        res.json(users)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})