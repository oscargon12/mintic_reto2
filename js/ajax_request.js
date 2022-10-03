//variables de textfield
let idField = document.querySelector('#id');
let brandField = document.querySelector('#brand');
let modelField = document.querySelector('#model');
let categoryField = document.querySelector('#category');
let nameField = document.querySelector('#name');
let resultTable = document.querySelector('#result')

//URL oracle
let templatUrl = 'https://g30a00238f82593-bdreto1.adb.us-ashburn-1.oraclecloudapps.com/ords/admin/open-api-catalog/costume/';

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
        url: templatUrl,
        type: "GET",
        dataType: "json",

            error: function(xhr, status){
                alert('Ha ocurrido un problema, intentalo nuevamente, ' + xhr.status);
            },
            complete: function(xhr,status){
                alert('Resultado de comprobación -- cod, estado: ' + xhr.status);
            },
        
            success: function(json){
                $('#result').empty();
                table = ' <table> <tr> <th>id</th> <th>Marca</th> <th>Modelo</th> <th>Categoria</th> <th>Nombre</th> </tr> ' 
                total = 0;
                rows = "";

                for(i = 0;i < json.items.length; i++ ){
                    rows += '<tr>';
                    rows += '<td>' + json.items[i].id + '</td>'
                    rows += '<td>' + json.items[i].brand + '</td>'
                    rows += '<td>' + json.items[i].model + '</td>'
                    rows += '<td>' + json.items[i].category + '</td>'
                    rows += '<td>' + json.items[i].name + '</td>'
                    rows += '<td> <button onclick="clearItem('+json.items[i].id+')" >Borrar</button>';

                    total += json.items[i].valor;
                    rows += '</tr>';
                }

                rows += '</table>'
                $('#result').append(table + rows + '<tr><th colspan="2"> TOTAL: <td>$')
            }
    })
}