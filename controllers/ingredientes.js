var $ = require('../static/js/jquery.js');
function ready(fn){
  if (document.readyState != 'loading'){
      fn();
  }else{
      document.addEventListener('DOMContentLoaded', fn);
  }
}
ready(function(){
    //Mostrando todos os elementos de tabela tbca em uma dataTable
    var obj = require('../data/name_tbca.json');
    //console.log(obj);
    $(document).ready(function() {
        var table = $('#ingredienteTable').DataTable( {
            data: obj,
            retrieve: true,
            paging: true,
            columns: [
                { title: "Nome" },
                { data: 'Id' }
            ],
            "columnDefs": [ 
              { 
                "width": "90%", "targets": 0,
                "width": "10%", "targets": 1
              },
              {
              "targets": -1,
              "defaultContent": `
              <div class="row">
                  <button type="button" class="col mx-1 btn btn-primary" data-toggle="modal" data-target="#modalIngredientes">
                  Ver
                  </button>
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
        })
    $('#ingredienteTable').on( 'click', 'button', function () {
      //pega a linha de cada tabela e armazena em data
      var data = table.row( $(this).parents('tr') ).data();
      var dataIgredientes = require('../data/tbca.json');
      //modal e tabela dentro da tabela externa
      console.log(dataIgredientes[data[1]])
      var modal = document.getElementById('modalTexto');
      var html = '';
      html = `
      <table id="teste" class="table table-sm table-bordered text-gray-900" width="100%" cellspacing="0">
      <tbody>
      <tr>
          <td scope="row" colspan="2" align="center">`+dataIgredientes[data[1]]['Nome']+`</td>
      </tr>
        <tr>
            <td scope="row">Vitamina E</td>
            <td scope="row">`+dataIgredientes[data[1]]['Alfa-tocoferol (Vitamina E)']+`</td>
        </tr>
        <tr>
            <td scope="row">Açúcar de adição</td>
            <td scope="row">`+dataIgredientes[data[1]]['Açúcar de adição']+`</td>
        </tr>
        <tr>
            <td scope="row">Carboidrato disponível</td>
            <td scope="row">`+dataIgredientes[data[1]]['Carboidrato disponível']+`</td>
        </tr>
        <tr>
            <td scope="row">Carboidrato total</td>
            <td scope="row">`+dataIgredientes[data[1]]['Carboidrato total']+`</td>
        </tr>
        <tr>
            <td scope="row">Cinzas</td>
            <td scope="row">`+dataIgredientes[data[1]]['Cinzas']+`</td>
        </tr>
        <tr>
            <td scope="row">Cobre</td>
            <td scope="row">`+dataIgredientes[data[1]]['Cobre']+`</td>
        </tr>
        <tr>
            <td scope="row">Colesterol</td>
            <td scope="row">`+dataIgredientes[data[1]]['Colesterol']+`</td>
        </tr>
        <tr>
            <td scope="row">Cálcio</td>
            <td scope="row">`+dataIgredientes[data[1]]['Cálcio']+`</td>
        </tr>
        <tr>
            <td scope="row">Energia</td>
            <td scope="row">`+dataIgredientes[data[1]]['Energia']+`</td>
        </tr>
        <tr>
            <td scope="row">Energia Jaule</td>
            <td scope="row">`+dataIgredientes[data[1]]['Energia Jaule']+`</td>
        </tr>
        <tr>
            <td scope="row">Equivalente de folato</td>
            <td scope="row">`+dataIgredientes[data[1]]['Equivalente de folato']+`</td>
        </tr>
        <tr>
            <td scope="row">Ferro</td>
            <td scope="row">`+dataIgredientes[data[1]]['Ferro']+`</td>
        </tr>
        <tr>
            <td scope="row">Fibra alimentar</td>
            <td scope="row">`+dataIgredientes[data[1]]['Fibra alimentar']+`</td>
        </tr>
        <tr>
            <td scope="row">Fósforo</td>
            <td scope="row">`+dataIgredientes[data[1]]['Fósforo']+`</td>
        </tr>
        <tr>
            <td scope="row">Lipídios</td>
            <td scope="row">`+dataIgredientes[data[1]]['Lipídios']+`</td>
        </tr>
        <tr>
            <td scope="row">Magnésio</td>
            <td scope="row">`+dataIgredientes[data[1]]['Magnésio']+`</td>
        </tr>
        <tr>
            <td scope="row">Manganês</td>
            <td scope="row">`+dataIgredientes[data[1]]['Manganês']+`</td>
        </tr>
        <tr>
            <td scope="row">Niacina</td>
            <td scope="row">`+dataIgredientes[data[1]]['Niacina']+`</td>
        </tr>
        <tr>
            <td scope="row">Potássio</td>
            <td scope="row">`+dataIgredientes[data[1]]['Potássio']+`</td>
        </tr>
        <tr>
            <td scope="row">Proteína</td>
            <td scope="row">`+dataIgredientes[data[1]]['Proteína']+`</td>
        </tr>
        <tr>
            <td scope="row">Riboflavina</td>
            <td scope="row">`+dataIgredientes[data[1]]['Riboflavina']+`</td>
        </tr>
        <tr>
            <td scope="row">Sal de adição</td>
            <td scope="row">`+dataIgredientes[data[1]]['Sal de adição']+`</td>
        </tr>
        <tr>
            <td scope="row">Selênio/td>
            <td scope="row">`+dataIgredientes[data[1]]['Selênio']+`</td>
        </tr>
        <tr>
            <td scope="row">Sódio</td>
            <td scope="row">`+dataIgredientes[data[1]]['Sódio']+`</td>
        </tr>
        <tr>
            <td scope="row">Tiamina</td>
            <td scope="row">`+dataIgredientes[data[1]]['Tiamina']+`</td>
        </tr>
        <tr>
            <td scope="row">Vitamina A (RAE)</td>
            <td scope="row">`+dataIgredientes[data[1]]['Vitamina A (RAE)']+`</td>
        </tr>
        <tr>
            <td scope="row">Vitamina A (RE)</td>
            <td scope="row">`+dataIgredientes[data[1]]['Vitamina A (RE)']+`</td>
        </tr>
        <tr>
            <td scope="row">Vitamina B6</td>
            <td scope="row">`+dataIgredientes[data[1]]['Vitamina B6']+`</td>
        </tr>
        <tr>
            <td scope="row">Vitamina B12</td>
            <td scope="row">`+dataIgredientes[data[1]]['Vitamina B12']+`</td>
        </tr>
        <tr>
            <td scope="row">Vitamina C</td>
            <td scope="row">`+dataIgredientes[data[1]]['Vitamina C']+`</td>
        </tr>
        <tr>
            <td scope="row">Vitamina D</td>
            <td scope="row">`+dataIgredientes[data[1]]['Vitamina D']+`</td>
        </tr>
        <tr>
            <td scope="row">Zinco</td>
            <td scope="row">`+dataIgredientes[data[1]]['Zinco']+`</td>
        </tr>
        <tr>
            <td scope="row">Ácidos graxos monoinsaturados</td>
            <td scope="row">`+dataIgredientes[data[1]]['Ácidos graxos monoinsaturados']+`</td>
        </tr>
        <tr>
            <td scope="row">Ácidos graxos poliinsaturados</td>
            <td scope="row">`+dataIgredientes[data[1]]['Ácidos graxos poliinsaturados']+`</td>
        </tr>
        <tr>
            <td scope="row">Ácidos graxos saturados</td>
            <td scope="row">`+dataIgredientes[data[1]]['Ácidos graxos saturados']+`</td>
        </tr>
        <tr>
            <td scope="row">Ácidos graxos trans</td>
            <td scope="row">`+dataIgredientes[data[1]]['Ácidos graxos trans']+`</td>
        </tr>
        <tr>
            <td scope="row">Álcool</td>
            <td scope="row">`+dataIgredientes[data[1]]['Álcool']+`</td>
        </tr>
      </tbody>
    </table>
      `
      modal.innerHTML = html;
    });
  });
})