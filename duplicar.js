var $ = require('jQuery');
$('button.reset').click(
    function () {
        $(this).prevAll('input').val(function(){
            switch (this.type){
                case 'text':
                    return this.defaultValue;
            }
        });
    });
    
$(function() {
  var divContent = $('#destino');
  var botaoAdicionar = $('a[data-id="1"]');
  var i = 1;

  //Ao clicar em adicionar ele cria uma linha com novos campos
  $(botaoAdicionar).click(function() {
          var clone = document.getElementById('origem').cloneNode(true);
          var camposClonados = clone.getElementsByTagName('input');
          var ingrediente = document.getElementById("ingrediente");
          var bruto = document.getElementById("pesoBruto");
          var liquido = document.getElementById("pesoLiquido");
          var preco = document.getElementById("preco");
          ingrediente.value = ingrediente.defaultValue;
          bruto.value = bruto.defaultValue;
          liquido.value = liquido.defaultValue;
          preco.value = preco.defaultValue;
          var linha = $('<div class="destino"><div class="form-group"><input type="text" class="form-control" id="ingrediente" name="ingrediente'+i+'" value="'+camposClonados[0].value+'" disabled></div><div id="match-list"></div><div class="row"><div class="col"><div class="form-group"><input type="text" class="form-control" id="pesoBruto" name="pesoBruto'+i+'"  value="'+camposClonados[1].value+'" disabled></div></div><div class="col"><div class="form-group"><input type="text" class="form-control" id="pesoLiquido" name="pesoLiquido'+i+'"  value="'+camposClonados[2].value+'" disabled></div></div><div class="col"><div class="form-group"><input type="text" class="form-control" id="preco" name="preco'+i+'"  value="'+camposClonados[3].value+'" disabled></div></div></div><a href="#" class="btn btn-danger mb-2" id="linkRemover">Remover</a></div>').appendTo(divContent);                
          $('#removehidden').remove();
          i++;
          $('<input type="hidden" name="quantidadeCampos" value="'+i+'" id="removehidden">').appendTo(divContent);
      linha.find("a").on("click", function(){
          $(this).parent(".destino").remove();
      });
  });
});

