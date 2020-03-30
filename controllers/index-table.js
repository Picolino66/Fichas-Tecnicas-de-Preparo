//Monta a tabela que exibida no início do programa
//Usei a dataTable do JQuery
function mountTable(data){
    $('#btnPDF').click(function() {
        criarPDF(data[0]["nome"]);
    });
  $(document).ready(function() {
    var table = $('#receitaTable').DataTable( {
      data: data,
      retrieve: true,
      paging: true,
      columns: [
        { data: 'nome' },
        { data: 'categoria' },
        { data: 'grau' },
        { data: '' }
    ],
      "columnDefs": [ 
        { 
          "width": "40%", "targets": 0,
          "width": "15%", "targets": 1,
          "width": "15%", "targets": 2,
          "width": "30%", "targets": 3
        },
        {
        "targets": -1,
        "defaultContent": `
        <div class="row">
            <button type="button" class="col mx-1 btn btn-primary" data-toggle="modal" data-target="#modalExemplo">
            Ver
            </button>
            <a href="" class="edit col btn btn-warning">
            Editar
            </a>
            <a href="" class="remove col mx-1 btn btn-danger">
            Deletar
            </a>
        </div>`
        } ],
        "language": {
        "lengthMenu": "Exibir _MENU_ registros por página.",
        "zeroRecords": "Não consta esse registro.",
        "info": "Página _PAGE_ de _PAGES_",
        "infoEmpty": "Nenhum registro disponível.",
        "search": "Buscar:",
        "paginate": {
            "first":      "Primeira",
            "last":       "Última",
            "next":       "Próxima",
            "previous":   "Anterior"
        },
        "infoFiltered": "(Filtrado do total de _MAX_ registro.)"
        }
        });
        // Delete a record
        $('#receitaTable tbody').on('click', 'a.remove', function (e) {
            e.preventDefault();
            var data = table.row( $(this).parents('tr') ).data();
            swal({
                title: "Você tem certeza?",
                text: "Uma vez deletado você não tera como recuperar a receita "+data["nome"]+".",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                  swal("Receita deletada com sucesso.", {
                    icon: "success",
                  });
                    table.row( $(this).parents('tr') ).remove().draw();
                    db.run('DELETE FROM receita WHERE ID=?', data["ID"], function(err) {
                        if (err) {
                            return console.error(err.message);
                        }
                            console.log(`Row(s) deleted ${this.changes}`);
                        })
                } else {
                  swal("Não foi deletado!");
                }
              });
        } );
      $('#receitaTable tbody').on( 'click', 'button', function () {//verifica se cliquei no botao ver
        //pega a linha de cada tabela e armazena em data
        var data = table.row( $(this).parents('tr') ).data();
        //pega a string que tá em data[dados] e converte em JSON
        //console.log(data["dados"]);
        dataDados = JSON.parse(data["dados"]);
        //modal e tabela dentro da tabela externa
        var modal = document.getElementById('modalTexto');
        //concatenação de strings com valores do banco
        var html = '';
        html = `
        <div class="row">
            <div class="col">
                <b>Preparação:</b>
                `+data["nome"]+`
            </div>
            <div class="col">
                <b>Categoria:</b>
                `+data["categoria"]+`
            </div>
        </div>
        <div class="row mt-3">
            <div class="col">
                <b>Informações técnicas</b>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                Grau de dificuldade:`+data["grau"]+`
            </div>
            <div class="col">
                Rendimento (%):`+dataDados[0]["rendimentoPorc"]+`
            </div>
            <div class="col">
                Peso da Porção (g):`+data["pesoPorcao"]+`
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                Tempo de preparo:`+data["tempo"]+`
            </div>
            <div class="col">
                Fator de cocção:`+dataDados[0]["fatorCoccao"]+`
            </div>
            <div class="col">
                Custo Total (R$):`+dataDados[0]["preco"]+`
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                Redimento (g):`+data["rendimento"]+`
            </div>
            <div class="col">
                Número de porções:`+data["numeroPorcoes"]+`
            </div>
            <div class="col">
                Custo da porção (R$):`+dataDados[0]["custoPorc"]+`
            </div>
        </div>
        <div class="row mt-2">
            <div class="col">
                Densidade energética (kcal/g):
            </div>
        </div>
        <div class="row my-3">
            <div class="col">
                <b>Valor nutricional</b>
            </div>
        </div>
        <div class="table-responsive">
        <table id="teste" class="table table-sm table-bordered text-gray-900" width="100%" cellspacing="0">
          <tbody>
            <tr>
                <td colspan="3" scope="row" align="center">
                    INFORMAÇÃO NUTRICIONAL - Porção de XXX g (1 unidade)
                </td>
            </tr>
            <tr>
                <td colspan="2" scope="row">
                    <p>Quantidade por porção</p>
                </td>
                <td scope="row">
                    <p>% VD (*)</p>
                </td>
            </tr>
            <tr>
                <td scope="row">Valor Energético(kcal)</td>
                <td scope="row">`+dataDados[0].energia+`</td>
                <td scope="row">`+dataDados[0].vdEnergia+`</td>
            </tr>
            <tr>
                <td scope="row">Valor Energético(kj)</td>
                <td scope="row">`+dataDados[0].energiaJaule+`</td>
                <td scope="row">*</td>
            </tr>
            <tr>
                <td scope="row">Carboidrato</td>
                <td scope="row">`+dataDados[0].carboidrato+`</td>
                <td scope="row">`+dataDados[0].vdCarboidrato+`</td>
            </tr>
            <tr>
                <td scope="row">Proteína</td>
                <td scope="row">`+dataDados[0].proteina+`</td>
                <td scope="row">`+dataDados[0].vdProteina+`</td>
            </tr>
            <tr>
                <td scope="row">Gordura Totais</td>
                <td scope="row">`+dataDados[0].lipideo+`</td>
                <td scope="row">`+dataDados[0].vdLipideo+`</td>
            </tr>
            <tr>
                <td scope="row">Gordura Saturadas</td>
                <td scope="row">`+dataDados[0].gorduraSaturada+`</td>
                <td scope="row">`+dataDados[0].vdGorduraSaturada+`</td>
            </tr>
            <tr>
                <td scope="row">Gordura Trans</td>
                <td scope="row">`+dataDados[0].gorduraTrans+`</td>
                <td scope="row"></td>
            </tr>
            <tr>
                <td scope="row">Fibra Alimentar</td>
                <td scope="row">`+dataDados[0].fibra+`</td>
                <td scope="row">`+dataDados[0].vdFibra+`</td>
            </tr>
            <tr>
                <td scope="row">Sódio</td>
                <td scope="row">`+dataDados[0].sodio+`</td>
                <td scope="row">`+dataDados[0].vdSodio+`</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row my-3">
          <div class="col">
              <b>Ingredientes e Modo de Preparo</b>
          </div>
      </div>
        <div class="table-responsive">
            <table class="table" id="ingredienteTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>Ingredientes</th>
                        <th>Medida Caseira</th>
                        <th>Pré-Preparo</th>
                        <th>Peso Bruto (g)</th>
                        <th>Peso Líquido (g)</th>
                        <th>FC</th>
                        <th>Per capita (g)</th>
                    </tr>
                </thead>
                    <tbody>

        `;
        //pega a string que esta em data[ingrediente] e transforma em json
        var dataIngrediente = JSON.parse(data["ingrediente"]);
        for (var i=0; i<dataIngrediente.length; i++)
        {
            html += '<tr>';
            html += '<td>'+dataIngrediente[i]["Ingrediente"]+'</td>';
            html += '<td>'+dataIngrediente[i]["MedidaCaseira"]+'</td>';
            html += '<td>'+dataIngrediente[i]["PrePreparo"]+'</td>';
            html += '<td>'+dataIngrediente[i]["PesoBruto"]+'</td>';
            html += '<td>'+dataIngrediente[i]["PesoLiquido"]+'</td>';
            html += '<td>'+dataIngrediente[i]["FatorCorrecao"]+'</td>';
            html += '<td>'+dataIngrediente[i]["PerCapita"]+'</td>';
            html += '</tr>';
        }
        html += `</tbody>
            </table>
        </div>
        
        <div class="row my-3">
            <div class="col">
                <b>Mode de Preparo</b>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <p>`+data["preparacao"]+`</p>
            </div>
        </div>`;
        modal.innerHTML = html;
        //fim modal
    });
    //conta a quantidade de linhas visiveis na tabela e informa quantas receitas tem cadastrada
    document.getElementById('receita-cadastrada').innerHTML = table.rows(':visible').count();
  });
}