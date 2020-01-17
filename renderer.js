let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./bd.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    }else console.log('Conectado com sucesso!.');
});

function ready(fn){
    if (document.readyState != 'loading'){
        fn();
    }else{
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function criarNomeBusca(teste)
{
    var tamanho = teste.length;
    var novaString = "";
    
    for( var i = 0; i < tamanho; i++ ) {
    
        if( teste.charAt(i) != " " ) {
        
            novaString += teste.charAt(i);    
        }
    }
    var buscaNome = novaString.toUpperCase();
    return buscaNome;
}

function indicePorNome(arr, nome) {
    for (var i = 0; i < arr.length; i++)
    {
        if (arr[i]["Nome"] == nome)
        {
            return i;
        }
    }
    return -1;
  }

ready(function(){
    db.run("CREATE TABLE if not exists receita (ID INTEGER PRIMARY KEY AUTOINCREMENT, busca TEXT, nome TEXT, ingrediente TEXT, preparacao TEXT, grau TEXT, tempo TEXT, categoria TEXT, rendimento FLOAT, numeroPorcoes INT, pesoPorcao FLOAT)");

    document.querySelector('#salvar').addEventListener('click', function(e){
        e.preventDefault();
        var nome = document.querySelector('#nome').value;
        var busca = criarNomeBusca(nome);
        let data = {     
            ingrediente: document.querySelector('#ingrediente').value,
            pesoBruto:  document.querySelector('#pesoBruto').value,
            pesoLiquido:  document.querySelector('#pesoLiquido').value,
            preco: document.querySelector('#preco').value
        }
        var tam = ingrediente.length;
        var jsonData = require('./tabela.json');
        var posicao;
        let jIngredientes = "[";
        for (i=0; i<tam; i++)
        {
            jIngredientes = jIngredientes + '{"Ingrediente' +'":"'+ingrediente[i].value+'", ';
            posicao = indicePorNome(jsonData, ingrediente[i].value);
            jIngredientes = jIngredientes + '"Caracteristica'+'":'+JSON.stringify(jsonData[posicao])+', '; 
            jIngredientes = jIngredientes + '"PesoBruto' +'":'+pesoBruto[i].value+', ';
            jIngredientes = jIngredientes + '"PesoLiquido' +'":'+pesoLiquido[i].value+', ';
            if (i != (tam-1))
                jIngredientes = jIngredientes + '"Preco' +'":'+preco[i].value+'},';
            else
                jIngredientes = jIngredientes + '"Preco' +'":'+preco[i].value+'}]';
        }
        var preparacao = document.querySelector('#preparacao').value;
        var grau = document.querySelector('#grau').value;
        var tempo = document.querySelector('#tempo').value;
        var categoria = document.querySelector('#categoria').value;
        var rendimento = document.querySelector('#rendimento').value;
        var numeroPorcoes = document.querySelector('#numeroPorcoes').value;
        var pesoPorcao = document.querySelector('#pesoPorcao').value;
        db.run('INSERT INTO receita (busca, nome, ingrediente, preparacao, grau, tempo, categoria, rendimento, numeroPorcoes, pesoPorcao) VALUES (?,?,?,?,?,?,?,?,?,?)',
        [busca, nome, jIngredientes, preparacao, grau, tempo, categoria, rendimento, numeroPorcoes, pesoPorcao],
            (err) => {
                if (err){
                    return console.error(err.message);
                }else {
                    console.log('Receita inserida com sucesso');
                    window.location.href = "cadastrar.html";
                }
            }
        );
    });
    document.querySelector('#voltar').addEventListener('click', function(v){
        v.preventDefault();
        db.close(
            (err) => {
                if (err){
                    return console.error(err.message);
                }else console.log('Fechou com sucesso!');
            }
        );
        window.location.href = "index.html";
    });
    
    
})


