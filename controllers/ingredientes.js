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
    $(document).ready(function() {
      $('#ingredienteTable').DataTable( {
        data: obj,
        columns: [
            { title: "Nome" },
            { title: "ID" }
        ],
        
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
    });
})