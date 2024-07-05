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

module.exports = {showAdm, allAdm,createAdm, updateAdm, deleteAdm}