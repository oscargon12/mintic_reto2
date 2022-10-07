//URL oracle
let templateUrl = 'https://g30a00238f82593-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client';

//Limpiar formulario
function limpiar_formulario(){
		let campoTextoID = document.getElementById("codigo");
		let campoTextoNombre = document.getElementById("clientName");
		let campoTextoEmail = document.getElementById("email");
		let campoTextoAge = document.getElementById("age");
		
		campoTextoID.value = "";
		campoTextoNombre.value = "";
		campoTextoEmail.value = "";
		campoTextoAge.value = "";
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
			table = "<div> <table border='1' class='w-100'> <tr class='bg-dark text-light'> <th>Id</th> <th>Nombre</th> <th>Email</th> <th>Edad</th> <th>Acciones</th> </tr> </tr>"
			rows = ""
			for (i = 0; i < json.items.length; i++){
				rows += "<tr>";
				rows += '<td class="py-1"> <small>' + json.items[i].id + '</small> </td>'	
                rows += '<td class="py-1"> <small>' + json.items[i].name + '</small> </td>'	
                rows += '<td class="py-1"> <small>' + json.items[i].email + '</small> </td>'	
                rows += '<td class="py-1"> <small>' + json.items[i].age + '</small> </td>'	
				rows += "<td class='d-flex justify-content-center py-1'> <button type='button' class='btn btn-outline-danger px-1 py-0' onclick='borrar_registro("+json.items[i].id+")'> <i class='bi bi-trash-fill'> </i> </button>";//se agrega el boton y este tiene la funcion borrar registro:
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
	let campoTextoID = document.getElementById("codigo");
	console.log(campoTextoID.value);

	$.ajax({
		url: 'https://g30a00238f82593-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/client/client/:id' + campoTextoID.value,
		type: 'GET',
		dataType: 'json',
		success: function(json){
			tabla = "<center><table border='1'>";
			filas = "";
			if (json.items.length > 0){
				console.log(json);
				$("#resultado").empty();
				filas += "<tr><th>ID:<td>" + json.items[0].id
				filas += "<tr><th>Marca<td>" + json.items[0].brand
				filas += "<tr><th>Modelo<td>" + json.items[0].model
				filas += "<tr><th>Categoria<td>" + json.items[0].category
				filas += "<tr><th>Nombre<td>" + json.items[0].name
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


//Funcion (POST) Registrar o Guardar toda la informacion en la tabla Gastos
function guardarInformacion(){
	
    $.ajax({
        url: templateUrl,
		
		data:{
			name: $("#clientName").val(),
			email: $("#email").val(),			
			age: $("#age").val(),
		},
		
		type: 'POST',
		
		dataType: 'json',
		
				
        success:function(json){		
        },
		
		error: function(xhr, status){
			if(xhr.status == 200){
				console.log("registro guardado con exito");
			}
			else{
				console.log("Favor revise que los datos esten correctos");
			}
		},
		
		complete: function(xhr, status){
			alert('La peticion al servidor ha sido procesada con exito,' + xhr.status);
			limpiar_formulario();
			getAll();
			
		},	
    });
}

//Funcion (DELETE) Borrar o Eliminar registro de la tabla Gastos
function borrar_registro(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
	
	
	if (confirm("Está seguro de eliminar el registro:  " + idElemento + "  ??")){
	
		$.ajax({
			url: templateUrl,
			type:"DELETE",
			data:dataToSend,
			contentType:"application/JSON",
			datatype:"JSON",
			
			success:function(respuesta){
				$("#resultado").empty();
				limpiar_formulario();
				getAll();
				alert("El registro se ha Eliminado correctamente.")
				
			}
		});
	}
}