const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
const {pool} = require('./config')

dotenv.config()

async function allAdm(){
    const [sql] = await pool.execute('SELECT * FROM administrador')
    return sql
}

async function showAdm(idAdm){
    const [sql] = await pool.execute('SELECT * FROM administrador WHERE idAdm= ?', [idAdm])
    return sql[0]
}

async function createAdm(nome, senha, email, fone) {
    const sql = 'INSERT INTO administrador (nomeAdm, senhaAdm, emailAdm, foneAdm) VALUES (?, ?, ?, ?)'
    const {params} = await pool.execute(sql, [nome, senha, email, fone])
    return {id: params.insertid, nome}
}

async function updateAdm(idAdm, nome, senha, email, fone) {
    const sql = 'UPDATE administrador SET nomeAdm= ?, senhaAdm= ?, emailAdm= ?, foneAdm= ? WHERE idAdm= ?'
    const {params} = await pool.execute(sql, [nome, senha, email, fone, idAdm])
    return {idAdm, nome, senha, email, fone}
}

async function deleteAdm(idAdm){
    const [sql] = await pool.execute('DELETE FROM administrador WHERE idAdm= ?', [idAdm])
    return sql[0]
}

//Clientes
async function allCli(){
    const [sql] = await pool.execute('SELECT * FROM cliente')
    return sql
}

async function showCli(idCli){
    const [sql] = await pool.execute('SELECT * FROM cliente WHERE idCliente= ?', [idCli])
    return sql[0]
}

async function createCli(nome, fone, email, senha) {
    const sql = 'INSERT INTO cliente (nomeCliente, foneCliente, emailCliente, senhaCliente) VALUES (?, ?, ?, ?)'
    const {params} = await pool.execute(sql, [nome, fone, email, senha])
    return {nome, fone, email, senha}
}

async function updateCli(idCli, nome, fone, email, senha) {
    const sql = 'UPDATE cliente SET nomeCliente= ?, foneCliente= ?, emailCliente= ?, senhaCliente= ? WHERE idCliente= ?'
    const {params} = await pool.execute(sql, [nome, fone, email, senha, idCli])
    return {idCli, nome, fone, email, senha}
}

async function deleteCli(idCli){
    const [sql] = await pool.execute('DELETE FROM cliente WHERE idCliente= ?', [idCli])
    return idCli
}




module.exports = {showAdm, allAdm, createAdm, updateAdm, deleteAdm, showCli, allCli, createCli, updateCli, deleteCli}