const mysql = require('mysql2/promise')
const dotenv = require('dotenv')
const {pool} = require('./config')

dotenv.config()

//apagar depois
async function all(){
    const [sql] = await pool.execute('SELECT * FROM administrador')
    return sql
}


async function create(nome, senha, email, fone) {
    const sql = 'INSERT INTO administrador (nomeAdm, senhaAdm, emailAdm, foneAdm) VALUES (?, ?, ?, ?)'
    const {params} = await pool.execute(sql, [nome, senha, email, fone])
    return {idAdm: params.insertidAdm, nome}
}


module.exports = {all,create}