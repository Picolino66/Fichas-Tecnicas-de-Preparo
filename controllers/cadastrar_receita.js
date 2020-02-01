let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./data/bd.sqlite3', (err) => {
    if (err) {
        console.error(err.message);
    }else console.log('Conectado com sucesso!.');
});
//funcao que pega o nome da receita
//e poe maiusculo e sem espaço
//para ser usado em possíveis buscar
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

//funcao que recebe o arquivo json e o nome do ingrediente
//e retorna a posiçao que o ingrediente está no json
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

//funcao para calcular as paradas nutricionais
function calcular(jIngredientes, rendimento, numeroPorcoes)
{
  var ingredientes = JSON.parse(jIngredientes);
  var pesoLiquido = 0, energia = 0, carboidrato = 0, proteina = 0, lipideo = 0;
  var gorduraSaturada = 0, fibra = 0, sodio = 0, gorduraTrans = 0, preco = 0;
  //somatorio de todos ingredientes
  for (var i = 0; i < ingredientes.length; i++)
  {
      pesoLiquido += ingredientes[i]["PesoLiquido"];
      energia += ((ingredientes[i]["Caracteristica"]["Energia"]*ingredientes[i]["PesoLiquido"])/100);
      carboidrato += ((ingredientes[i]["Caracteristica"]["Carboidrato total"]*ingredientes[i]["PesoLiquido"])/100);
      proteina += ((ingredientes[i]["Caracteristica"]["Proteína"]*ingredientes[i]["PesoLiquido"])/100);
      lipideo += ((ingredientes[i]["Caracteristica"]["Lipídios"]*ingredientes[i]["PesoLiquido"])/100);
      gorduraSaturada += ((ingredientes[i]["Caracteristica"]["Ácidos graxos monoinsaturados"]*ingredientes[i]["PesoLiquido"])/100);
      fibra += ((ingredientes[i]["Caracteristica"]["Fibra alimentar"]*ingredientes[i]["PesoLiquido"])/100);
      sodio += ((ingredientes[i]["Caracteristica"]["Sódio"]*ingredientes[i]["PesoLiquido"])/100);
      gorduraTrans += ((ingredientes[i]["Caracteristica"]["Ácidos graxos trans"]*ingredientes[i]["PesoLiquido"])/100);
      preco += ((ingredientes[i]["Preco"]*ingredientes[i]["PesoBruto"])/100);
  }
  //calculos para receita toda
  var kCarboidrato = carboidrato * 4;
  var kProteina = proteina * 4;
  var kLipideo = lipideo * 9;
  var kGorduraSaturada = gorduraSaturada * 9;
  var kGorduraTrans = gorduraTrans * 9;
  var vctCarboidrato = kCarboidrato*100/energia;
  var vctProteina = kProteina*100/energia;
  var vctLipideo = kLipideo*100/energia;
  var vctGorduraSaturada = kGorduraSaturada*100/energia;
  var rendimentoPorc = rendimento*100/pesoLiquido;
  var fatorCoccao = rendimentoPorc/100;
  var custoPorc = preco/numeroPorcoes;
  var dados = `[{"pesoLiquido":`+ pesoLiquido + `,"energia":`+energia+`,"carboidrato":`+carboidrato+
  `,"proteina":`+proteina+`,"lipideo":`+lipideo+`,"gorduraSaturada":`+gorduraSaturada+`,"fibra":`+fibra+
  `,"sodio":`+sodio+`,"gorduraTrans":`+gorduraTrans+`,"preco":`+preco+`,"kCarboidrato":`+kCarboidrato+
  `,"kProteina":`+kProteina+`,"kLipideo":`+kLipideo+`,"kGorduraSaturada":`+kGorduraSaturada+
  `,"kGorduraTrans":`+kGorduraTrans+`,"vctCarboidrato":`+vctCarboidrato+`,"vctProteina":`+vctProteina+
  `,"vctLipideo":`+vctLipideo+`,"vctGorduraSaturada":`+vctGorduraSaturada+`,"rendimentoPorc":`+rendimentoPorc+
  `,"fatorCoccao":`+fatorCoccao+`,"custoPorc":`+custoPorc+`}]`
  return (dados)
}

//funcao que insere os valores no banco
function insertReceita(){
  var nome = document.querySelector('#nome').value;
  var busca = criarNomeBusca(nome);
  //pega o campo de ingrediente até preco
  let data = {     
      ingrediente: document.querySelector('#ingrediente').value,
      medidaCaseira:  document.querySelector('#medidaCaseira').value,
      prePreparo:  document.querySelector('#prePreparo').value,
      pesoBruto:  document.querySelector('#pesoBruto').value,
      pesoLiquido:  document.querySelector('#pesoLiquido').value,
      preco: document.querySelector('#preco').value
  }
  //pega o json tbca
  var jsonData = require('../data/tbca.json');
  //pega restante do que foi digitado
  var preparacao = document.querySelector('#preparacao').value;
  var grau = document.querySelector('#grau').value;
  var tempo = document.querySelector('#tempo').value;
  var categoria = document.querySelector('#categoria').value;
  var rendimento = document.querySelector('#rendimento').value;
  var numeroPorcoes = document.querySelector('#numeroPorcoes').value;
  var pesoPorcao = document.querySelector('#pesoPorcao').value;

  var posicao, fc, perCapita;
  let jIngredientes = "[";

  //percorre a quantidade de ingrediente para pegar cada item de cada ingrediente separado
  //cada ingrediente tem sua medida caseira etc
  //todo armazenamento de jIngredientes é uma string que dá pra ser convertida para json
  var tam = ingrediente.length;
  for (i=0; i<tam; i++)
  {
      jIngredientes = jIngredientes + '{"Ingrediente' +'":"'+ingrediente[i].value+'", ';
      jIngredientes = jIngredientes + '"MedidaCaseira' +'":"'+medidaCaseira[i].value+'", ';
      jIngredientes = jIngredientes + '"PrePreparo' +'":"'+prePreparo[i].value+'", ';
      jIngredientes = jIngredientes + '"PesoBruto' +'":'+pesoBruto[i].value+', ';
      jIngredientes = jIngredientes + '"PesoLiquido' +'":'+pesoLiquido[i].value+', ';
      fc = pesoBruto[i].value / pesoLiquido[i].value;
      perCapita = pesoLiquido[i].value / numeroPorcoes;
      jIngredientes = jIngredientes + '"FatorCorrecao' +'":'+fc+', ';
      jIngredientes = jIngredientes + '"PerCapita' +'":'+perCapita+', ';
      posicao = indicePorNome(jsonData, ingrediente[i].value);
      //acha a posicao que tal ingredientes está no json tbca, e transforma essa parte de json em
      //string, para poder salvar no banco.Para usar é possível converter novamente.
      jIngredientes = jIngredientes + '"Caracteristica'+'":'+JSON.stringify(jsonData[posicao])+', '; 
      if (i != (tam-1))
          jIngredientes = jIngredientes + '"Preco' +'":'+preco[i].value+'},';
      else
          jIngredientes = jIngredientes + '"Preco' +'":'+preco[i].value+'}]';
  }
  //chama funcao de calcular
  var dados = calcular(jIngredientes, rendimento, numeroPorcoes);
  //salva no banco
  db.run('INSERT INTO receita (busca, nome, ingrediente, preparacao, grau, tempo, categoria, rendimento, numeroPorcoes, pesoPorcao, dados) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
  [busca, nome, jIngredientes, preparacao, grau, tempo, categoria, rendimento, numeroPorcoes, pesoPorcao, dados],
      (err) => {
          if (err){
              return console.error(err.message);
          }else {
              console.log('Receita inserida com sucesso');
              window.location.href = "../views/cadastrar_receita.html";
          }
      }
  );
}

function ready(fn){
    if (document.readyState != 'loading'){
        fn();
    }else{
        document.addEventListener('DOMContentLoaded', fn);
    }
  }

ready(function(){
    //verifica se clicou em salvar para inserir uma receita
    document.querySelector('#salvar').addEventListener('click', function(e){
        e.preventDefault();
        insertReceita();
    });
    //verifica se clicou no botão voltar
    document.querySelector('#voltar').addEventListener('click', function(v){
        v.preventDefault();
        db.close(
            (err) => {
                if (err){
                    return console.error(err.message);
                }else console.log('Fechou com sucesso!');
            }
        );
        window.location.href = "../views/index.html";
    });
  })