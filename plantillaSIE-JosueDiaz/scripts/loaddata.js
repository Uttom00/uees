
var MaxId = 0;
var IdReg = null;

$(document).ready(function(){
  //===================================================================
  /////////////////////////////////////////////////////////////////////
  //===================================================================

  cargarDatos();

  $("#btnAgregar").click(function(){

    $("#h4Titulo").html("Agregando registro:");

    $("#txtCodigo").val((MaxId + 1));
    $("#txtNombres").val("");
    $("#txtApellidos").val("");
    $("#txtNota").val("");

    $("#accion").val("A");
    $("#mdl").modal("show");
  });


  $("#btnGuardar").click(function(){

    var id = $("#txtCodigo").val();
    if(  $("#accion").val() == "E")           
    {
        $("#tr" + id + " .Nombres").html( $("#txtNombres").val());
        $("#tr" + id + " .Apellidos").html( $("#txtApellidos").val());
        $("#tr" + id + " .Nota").html( $("#txtNota").val());
    }
    else if($("#accion").val() == "A"){
      var Codigo = (MaxId + 1);
      $("#txtCodigo").val(Codigo);
      
      $("#tbl").append(   $("<tr>").attr("id","tr" + Codigo));
      $("#tbl tr:last").append( $("<td>").html($("#txtCodigo").val()).addClass("Codigo") );
      $("#tbl tr:last").append( $("<td>").html($("#txtNombres").val()).addClass("Nombres") );
      $("#tbl tr:last").append( $("<td>").html($("#txtApellidos").val()).addClass("Apellidos") );
      $("#tbl tr:last").append( $("<td>").html($("#txtNota").val()).addClass("Nota") );
      $("#tbl tr:last").append( $("<td>") );

      var btnEditar = $("<span>").attr({
                                  "id": "btnEditar" + Codigo + "",
                                  "class":"btn btn-warning btnEditar"
                                })
                                .html( $("<i>").addClass("fa fa-edit") )
                                ;

      var btnEliminar = $("<span>").attr({
                                  "id": "btnEliminar" + Codigo + "",
                                  "class":"btn btn-danger btnEliminar"
                                })
                                .html( $("<i>").addClass("fa fa-remove") )
                                ;

      btnEditar.click(EditarRegistro);
      btnEliminar.click(EliminarRegistro);

      $("#tbl td:last").append(btnEditar);
      $("#tbl td:last").append(btnEliminar);
      MaxId += 1;
    }
    $("#mdl").modal("hide");
  });


  $("#btnEliminarReg").click(function() {
    $("#tr" + IdReg).remove();
    $("#warning").modal("hide");
  });

//===================================================================
/////////////////////////////////////////////////////////////////////
//===================================================================
});
    

function cargarDatos()
{

  $.ajax({
    url: 'data/estudiantes.json',
    type: 'POST',
    dataType: 'json',
    data: {},
    beforeSend: function() {
        $("#tbl").hide();
        $("#divCargando").html("Cargando datos...");
    },
    success: function(data) {      
        $.each(data, function(i,v){
            $("#tbl").append(   $("<tr>").attr("id","tr" + v.Codigo));
            $("#tbl tr:last").append( $("<td>").html(v.Codigo).addClass("Codigo") );
            $("#tbl tr:last").append( $("<td>").html(v.Nombres).addClass("Nombres") );
            $("#tbl tr:last").append( $("<td>").html(v.Apellidos).addClass("Apellidos") );
            $("#tbl tr:last").append( $("<td>").html(v.Nota).addClass("Nota") );
            $("#tbl tr:last").append( $("<td>") );

            var btnEditar = $("<span>").attr({
                                        "id": "btnEditar" + v.Codigo + "",
                                        "class":"btn btn-warning btnEditar"
                                      })
                                      .html( $("<i>").addClass("fa fa-edit") )
                                      ;

            var btnEliminar = $("<span>").attr({
                                        "id": "btnEliminar" + v.Codigo + "",
                                        "class":"btn btn-danger btnEliminar"
                                      })
                                      .html( $("<i>").addClass("fa fa-remove") )
                                      ;

            $("#tbl td:last").append(btnEditar);
            $("#tbl td:last").append(btnEliminar);
            MaxId += 1;
        });

        $("#tbl").show();
        $("#divCargando").hide();        
        $(".btnEditar").click(EditarRegistro);
        $(".btnEliminar").click(EliminarRegistro);
    },
    error: function(xhr, textStatus, errorThrown) {}
  });
}

//===================================================================
/////////////////////////////////////////////////////////////////////
//===================================================================
function EliminarRegistro(){
  $("#warning").modal("show");
  IdReg = $(this)
          .attr("id")
          .replace("btnEliminar", "")
          ;
}

//===================================================================
/////////////////////////////////////////////////////////////////////
//===================================================================
function EditarRegistro(){
  var id = $(this)
            .attr("id")
            .replace("btnEditar", "")
            ;
  var id = "#tr" + id;
  
  $("#h4Titulo").html("Editando registro:");

  $("#txtCodigo").val( $(id + " .Codigo").html());
  $("#txtNombres").val( $(id + " .Nombres").html());
  $("#txtApellidos").val( $(id + " .Apellidos").html());
  $("#txtNota").val( $(id + " .Nota").html());

  $("#accion").val("E");
  $("#mdl").modal("show");
}
//===================================================================
/////////////////////////////////////////////////////////////////////
//===================================================================