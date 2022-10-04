//variables de textfield
let idField = document.querySelector('#id');
let brandField = document.querySelector('#brand');
let modelField = document.querySelector('#model');
let categoryField = document.querySelector('#category');
let nameField = document.querySelector('#name');
let resultTable = document.querySelector('#result')

//URL oracle
let templateUrl = 'https://g30a00238f82593-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/costume/costume';

//Limpiar formulario
function clearForm(){
    if(confirm("Está seguro que desea limpiar el formulario?")){

        idField.value = "";
        brandField.value = "";
        modelField.value = "";
        categoryField.value = "";
        nameField.value = "";
    }
}

//Get a todos los registros
function getAll(){
    $.ajax({
        url: templateUrl,
        type:"GET",
        datatype:"json",
		
		error: function(xhr, status){
			alert('ha ocurrido un problema, intentalo nuevamente, ' + xhr.status);
		},
		
		complete: function(xhr, status){
			alert('Resultado de comprobacion -- cod. estado: ' + xhr.status);
		},	
		
        success:function(json){
            //console.log(respuesta);
            //crearRespuestaGastos(respuesta.items)
			
			$("#result").empty();
			table = "<div> <table border='1' class='w-100'> <tr class='bg-dark text-light'> <th>Id</th> <th>Marca</th> <th>modelo</th> <th>Id Categoria</th> <th>Nombre</th> <th>Acciones</th> </tr> </tr>"
			rows = ""
			for (i = 0; i < json.items.length; i++){
				rows += "<tr>";
				rows += '<td class="py-1"> <small>' + json.items[i].id + '</small> </td>'	
                rows += '<td class="py-1"> <small>' + json.items[i].brand + '</small> </td>'	
                rows += '<td class="py-1"> <small>' + json.items[i].model + '</small> </td>'	
                rows += '<td class="py-1"> <small>' + json.items[i].category + '</small> </td>'	
                rows += '<td class="py-1"> <small>' + json.items[i].name +  '</small> </td>'
				rows += "<td class='d-flex justify-content-center py-1'> <button type='button' class='btn btn-outline-danger px-1 py-0' onclick='borrar_registro("+json.items[i].id+")'> <i class='bi bi-trash-fill'> </i> </button>";//se agrega el boton y este tiene la funcion borrar registro:
				//rows += "<td> <button onclick='borrar_registro("+json.items[i].id+")'>Borrar</button>";//se agrega el boton y este tiene la funcion borrar registro:
				rows += "</tr>";
			}
			rows += "</table>"
			$("#result").append(table + rows + "</div>")
			console.log(json)
        }
    });
}

//Validar campo Id
function validarCampo(campoTexto){
	if(campoTexto.val() != ""){
		return true;
	}
	else{
		return false;
	}
}

//Get by Id
function consultaID(id){
	if(!validarCampo($("#id"))){
		alert("Debe ingresar ID valido a buscar"+id.attr("id"));
	}
	else{

		$.ajax({
			url: templateUrl + id.val(),
			type: 'GET',
			dataType: 'json',
			success: function(json){
				tabla = "<center><table border='1'>";
				filas = "";
				if (json.items.length > 0){
					console.log(json);
					$("#resultado").empty();
					filas += "<tr><th>ID:<td>" + json.items[0].id
					filas += "<tr><th>NOMBRE:<td>" + json.items[0].brand
					filas += "<tr><th>FECHA:<td>" + json.items[0].model
					filas += "<tr><th>VALOR:<td>" + json.items[0].category
					filas += "<tr><th>DESCRIPCION:<td>" + json.items[0].name
					//filas += "<tr><th>USUARIO:<td>" + json.items[0].nombre_usuario
					$("#resultado").append(tabla + filas + "</center>")
					
				}
				else{
					alert("El registro con ID: "+ id.val() + "No existe")
				}
				
			},

			error: function(xhr, status){
				alert('ha ocurrido un problema, Error: ' + xhr.status);
			},
			
			complete: function(xhr, status){
				alert('La peticion ha sido realizada,' + xhr.status);
				
			}		

		});
	}
}