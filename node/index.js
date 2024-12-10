const express = require('express')
const app = express()
const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'dilean123',
    database: 'nodedb'
});

con.connect();


const port = 3000

app.get('/',(req, res) => {

    try {
        
        let nomes = ['Dilean', 'Lais'];

        for (let nome of nomes) {
            con.query(`SELECT count(*) as count FROM usuarios WHERE nome = '${nome}'`, function (err, result, fields) {
                if (err) throw err;
    
                if (result[0].count == 0) {
                    var sql = `INSERT INTO usuarios(nome) values ('${nome}')`;
                    con.query(sql);
                }
            });
        };

        ObterUsuarios(res);

    } catch (e) {
        console.error(e)
        return res.status(500).send({
            success: false,
            message: 'internal server error'
        })
    }
})

app.listen(port, () => {
    console.log('Rodando na porta', + port)
})
function ObterUsuarios(res) {
    con.query("SELECT id, nome FROM usuarios", function (err, result, fields) {
        if (err) throw err;
        var htmlStr = `
                <h1>Full Cycle Rocks!</h1>
                <ul>`;
        for (i = 0; i < result.length; i++) {
            orderinfo = "Id: " + result[i].id + " -  Nome:" + result[i].nome;
            htmlStr += `<li>${orderinfo}</li>`;
        }
        htmlStr += "</ul>";

        res.send(htmlStr);
        con.end();
    });
}

