let sqlite3 = require('sqlite3').verbose();
let pdf = require('jspdf');
let pdfauto = require('jspdf-autotable');
let db = new sqlite3.Database('./bd.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    }else console.log('Conectado2 com sucesso!.');
});

function ready(fn){
    if (document.readyState != 'loading'){
        fn();
    }else{
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function converter(obj){
    const j = JSON.parse(obj);
    calculos(j);
    var tr = '';
    tr += '<th colspan="4">Igredientes: </th>';
    for (var i=0; i<j.length; i++)
    {
        tr += '<tr>';
        tr += '<th>Nome: </th>';
        tr += '<th>Peso Bruto: </th>';
        tr += '<th>Peso Líquido: </th>';
        tr += '<th>Preço: </th>';
        tr += '</tr>';
        tr += '<tr>';
        tr += '<td>' + j[i].Ingrediente + '</td>';
        tr += '<td>' + j[i].PesoBruto + '</td>';
        tr += '<td>' + j[i].PesoLiquido + '</td>';
        tr += '<td>' + j[i].Preco + '</td>';
        tr += '</tr>';
    }
    return (tr);
}

function calculos(jsonData){
    var sPesoLiquido = 0, sEnergiaKcal = 0, sCarboidrato = 0, sProteina = 0, sLipideo = 0;
    var sGorduraSaturada = 0, sFibra = 0, sGorduraTrans = 0, sCustoTotal = 0;
    for (var i=0; i<jsonData.length; i++)
    {
        sPesoLiquido += jsonData[i].PesoLiquido
        sEnergiaKcal += jsonData[i]["Caracteristica"]["Energia Jaule"];
        console.log(sEnergiaKcal);

    }   
}

function criarPDF()
{  
    let doc = new pdf.jsPDF();
    doc.autoTable({html: '.table'});
    doc.save();

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

ready(function(){
    db.run("CREATE TABLE if not exists receita (ID INTEGER PRIMARY KEY AUTOINCREMENT, busca TEXT, nome TEXT, ingrediente TEXT, preparacao TEXT, grau TEXT, tempo TEXT, categoria TEXT, rendimento FLOAT, numeroPorcoes INT, pesoPorcao FLOAT)");

    var lista = document.getElementById('lista');
    var list = '';
    db.each("SELECT * FROM receita", function(err, rows) {
    list += '<a href="#" class="list-group-item list-group-item-action">'+rows.nome+'</a>';
    lista.innerHTML = list;
    });

    document.querySelector('#buscar').addEventListener('click', function(t){
        t.preventDefault();
        var nome = document.querySelector('#busca').value;
        var busca = criarNomeBusca(nome);
        db.each("SELECT * FROM receita where busca=?;",[busca], function(err, row) {
            var table = document.getElementById('table-register');
            var tr = '';
            tr += '<tr>';
            tr += '<th colspan="2">Nome: </th>';
            tr += '<td colspan="2">' + row.nome + '</td>';
            tr += '</tr>';
            tr += converter(row.ingrediente);
            tr += '<tr>';
            tr += '<th colspan="2">Preparação: </th>';
            tr += '<td colspan="2">' + row.preparacao + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<th colspan="2">Grau de Dificuldade: </th>';
            tr += '<td colspan="2">' + row.grau + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<th colspan="2">Tempo de Preparo: </th>';
            tr += '<td colspan="2">' + row.tempo + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<th colspan="2">Categoria: </th>';
            tr += '<td colspan="2">' + row.categoria + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<th colspan="2">Rendimento: </th>';
            tr += '<td colspan="2">' + row.rendimento + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<th colspan="2">Número de Porções: </th>';
            tr += '<td colspan="2">' + row.numeroPorcoes + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<th colspan="2">Peso da Porção: </th>';
            tr += '<td colspan="2">' + row.pesoPorcao + '</td>';
            tr += '</tr>';
            tr += '<button onclick="criarPDF()">Gerar PDF</button>';
            table.innerHTML = tr;
        });
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


