// función que ejecuta la función cargarStockProductos
function stock(){
    let colProductos = cargarStockProductos();
    guardarProductos(colProductos);
    alert("Stock de productos cargados")
}

// función que despliega los productos con los stock en la consola
// inptu: n/a
//
// output: un array con los productos
function verStock(){
    let colProductos = obtenerProductos();
    if (colProductos == null){
        console.log("No existen productos cargados")
        return null
    }
    console.log(colProductos);
    return colProductos; 
}

// función que muestra por consola todas las variables del local storage
function VerLocalStorage(){
    console.log("USUARIO: " + localStorage.usuario_activo);
    console.log("STOCK: " + localStorage.stock);
    console.log("CARRITO: " + localStorage.carrito);
    console.log("PEDIDOS: " + localStorage.pedidos);
    console.log("FACTURAS: " + localStorage.facturas);
}

// función que borra el local storage
function borrarLocalStorage(){
  localStorage.clear();
  alert("Local Storage borrado !!!!")
}

// función para modificar el stock de un producto
// input: codProducto: codigo de producto
//        cantidad: cantidad a ser modificada del producto
// output: n/a
function modificarStock(codProducto, cantidad){

    let colProductos = obtenerProductos()
    if(colProductos == null){
        alert("No hay stock cargado !!!");
        return null;
    }
    else
    { 
        let producto = "";
        for(let i=0; i<colProductos.length;i++)
        {
            if(colProductos[i].codigo == codProducto){
                producto = colProductos[i];
                break;
            }
        }

        if (producto == ""){
        
            alert("producto no existe !!!");
            return null;
        }
        if (cantidad > 0){
            producto.stock = producto.stock + cantidad;
            alert("Stock modificado");
        }
        else
        {
            if (producto.stock + cantidad < 0){
                alert("cantidad ingresada es incorrecta !!! stock en negativo")
                return null;
            }
            else
            {   
                producto.stock = producto.stock + cantidad;
                alert("Stock modificado");
            }
    }
        let colProductosModificada = new Productos(colProductos);
        guardarProductos(colProductosModificada);
    }
}

// función que solicita por pantalla el codigo de producto y cantidad para luego
// ejecutar la función modificarStock
function modificacionStockPorProducto(){
    let codProducto = parseInt(prompt("Ingrese codigo de producto: "))
    let cantidad = parseInt(prompt("ingrese cantidad: "))

    modificarStock(codProducto,cantidad)
}