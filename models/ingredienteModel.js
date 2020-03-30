function createBD(){
    let sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('./data/bd.sqlite3', (err) => {
        if (err) {
            console.error(err.message);
        }else console.log('Conectado com sucesso!.');
    });
}
function stop(){
    db.close();
}
function createReceita(){
    db.run(`CREATE TABLE if not exists receita (ID INTEGER PRIMARY KEY AUTOINCREMENT, 
        busca TEXT, nome TEXT, ingrediente TEXT, preparacao TEXT, grau TEXT, tempo TEXT, 
        categoria TEXT, rendimento FLOAT, numeroPorcoes INT, pesoPorcao FLOAT, dados TEXT)`, (err) => {
            if (err) {
                console.error(err.message);
            }else console.log('Criado Receita Com Sucesso!');
        });
}
function ready(fn){
    if (document.readyState != 'loading'){
        fn();
    }else{
        document.addEventListener('DOMContentLoaded', fn);
    }
  }

ready(function(){
    createBD();
    createReceita();
})