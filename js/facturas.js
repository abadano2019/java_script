let registrosFactura = [];
let colFacturas = [];
let nroCliente = 0;
let fechaVto = "";
let numeroFactura = 100000;

// Clase Factura, representa una factura emitida a un cliente con el detalle de compra
// atributos: tipo: indica si es contado o credito
//            nro: numero de factura
//            nroCliente: corresponde al nro de cliente registrado en el sistema
//            registros: es el detalle de compra de la factura, es un array de varios registros
//            vto: indica el vencimiento de la factura              
//
// metodos: getTipo(): devuele el tipo de factura
//          getNro(): devuelve el numero de factura
//          getNroCliente(): devuelve el numero de cliente
//          getRegistos(): devuelve array con los registros de la factura
//          getVto(): devuelve la fecha de vencimiento
//          verTotales(): metodo axiliar para ver el total de la factura sin iva
//          getTotal(): devuelve el total de la factura sin iva
//          getRegistrosImprimir(): genera un string para poder visualizar el detalle de la factura
//          totalMasIva(): devuelve el total iva incluido de la factura
class Factura {
    constructor(tipo, nro, nroCliente, registros, vto){
        this.tipo = tipo
        this.nro = nro;
        this.nroCliente = nroCliente;
        this.registros = registros;
        this.vto = vto;
    }
    getTipo(){
        return this.tipo;
    }
    getNro(){
        return this.nro;
    }
    getNroCliente(){
        return this.nroCliente;
    }
    getRegistros(){
        return this.registros;
    }
    getVto(){
        return this.vto;
    }
    VerTotales(){
            let registros = this.getRegistros();
            registros.forEach((x) => {console.log(x)});
    }
    getTotal(){
        let total = 0;
        let registros = this.getRegistros();
        let subtotales = registros.map((x) => {
            return x.getTotalRegistro();
        })
        total = subtotales.reduce((acumulador, elemento) => acumulador + elemento, 0);
        return total;
    }
    getRegistrosImprimir(){
        let str = "";
        this.registros.forEach((item) => {
            str = str + "Codigo: " + item.getCodigo() + " Cantidad: " + item.getCantidad() + " Precio Unitario: " + item.getPrecioUnitario() + "\n"
        })
        return str
    }
    totalMasIVA(){
        return this.getTotal()*1.22;
    }
    imprimirFactura(){
        let str = "";
        fechaEmision = Date.now();
        let fechaHoy= new Date(fechaEmision);
        fechaVto = new Date(2022,9,4);
        const nroFact = this.getNro();
        const tipoFact = this.getTipo();
        const nroCli = this.getNroCliente();
        const registros = this.getRegistrosImprimir();
        const totalFact = roundToTwo(this.getTotal());
        const totalFactMasIVA = roundToTwo(this.totalMasIVA());

        str = "F A C T U R A    I N G R E S A D A:" + "\n" + "\n" +
            "Tipo de factura: " + tipoFact + "\n" +
            "Fecha factura: " + fechaHoy.toLocaleDateString() + "\n" + 
            "Numero de cliente: " + nroCli + "\n" +
            "Numero de factura: " + nroFact + "\n" + "\n" + 
            "Detalle: " + "\n" + registros + "\n" +
            "Total: $ " + totalFact + "\n" + 
            "Total mas IVA $ " + totalFactMasIVA;
        
        return str;
    
    }
}

// Clase Facturas, representa una colección de facturas emitidas 
// atributos: colFacturas: array de facturas
//
// metodos: getColFacturas(): devuelve el array con las facturas cargadas
//          agregarFactura(factura): agrega un objeto del tipo factura a la colección de facturas 
//                                   recibe un objeto del tipo factura
//          estaVacio(): devuelve true si la colección está vacia
//          eliminarFactura(nroFactura): elimina una factura de la colección, recibe un numero de factura 
//          mostrarFacturas(): devuelve un string con los datos de las facturas de la colección para ser mostrados 
//          mostrarNrosFacturas(): devuelve un string con los tipos de factura y los numeros de factura para ser 
//                                 mostrados
//          buscarFactura(nroFactura): devuelve un objeto del tipo factura, recibe un numero de factura para la busqueda
class Facturas{
    constructor(colFacturas){
        this.colFacturas = colFacturas
    }
    getColFacturas(){
        return this.colFacturas;
    }
    agregarFactura(factura){
        colFacturas.push(factura);
    }
    estaVacio(){
        let vacio = false;
        if(this.getColFacturas().length === 0){
            vacio = true;
        }
        return vacio;
    }
    eliminarFactura(nroFactura){
        colFacturas = this.getColFacturas();
        const indices = colFacturas.map((item) => {
            return item.getNro();
        })
        const indice = indices.indexOf(nroFactura);
        if (indice != -1){
            this.colFacturas.splice(indice,1);
        }
        return indice;
    }
    mostrarFacturas(){
        const colFacturas = this.getColFacturas();
        let str = "";
        colFacturas.forEach((item) => {
            str = str + "Tipo factura: " + item.getTipo() + 
                        " Numero factura: " + item.getNro() + 
                        " Numero Cliente: " + item.getNroCliente() + 
                        " Fecha vencimiento: " + item.getVto() + "\n" + 
                        " Detalle: " + "\n" + item.getRegistrosImprimir() + "\n" + "\n"
        })
        return str
    }
    mostrarNrosFacturas(){
        const colFacturas = this.getColFacturas();
        let str = "";
        colFacturas.forEach((item) => {
            str = str + "Tipo factura: " + item.getTipo() + 
                        " Numero factura: " + item.getNro() + "\n";
        })
        return str
    }
    buscarFactura(nroFactura){
        colFacturas = this.getColFacturas();
        const Factura = colFacturas.find((factura) => factura.nro == nroFactura);
        return Factura;
    }
}

// Clase RegistrosFactura, representa los registros o detalle de una factura emitida a un cliente
// atributos: codigo: indica el codigo del producto vendido
//            cantidad: indica la cantidad vendida del producto
//            precioUnitario: indica el precio por unidad del producto vendido
//            totalRegistro: corresponde al subtotal del registro, sin iva, cantidad por precio unitario
//
// metodos: getTipo(): devuele el tipo de factura
//          getNro(): devuelve el numero de factura
//          getNroCliente(): devuelve el numero de cliente
//          calculoTotalRegistro(): realiza el calculo de cantidad por precio unitario de un articulo
//          getTotalRegistro(): devuelve el total del registro 
class RegistroFactura {
    constructor(nroRenglon, codigo, cantidad, precioUnitario){
        this.nroRenglon = nroRenglon;
        this.codigo = codigo;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.totalRegistro = this.getTotalRegistro();
    }
    getNroRenglon(){
        return this.nroRenglon;
    }
    getCodigo(){
        return this.codigo;
    }
    getCantidad(){
        return this.cantidad;
    }
    getPrecioUnitario(){
        return this.precioUnitario;
    }
    calculoTotalRegistro(){
        return this.cantidad * this.precioUnitario;
    }
    getTotalRegistro(){
        return this.calculoTotalRegistro();
    }    
}

// Función para validar si un valor es null
// input: str: variable con el valor a verificar
//
// output: true en caso de que el valor sea null y false en caso contrario
const es_NULL = (str) =>{
    resultado = false
    if (str == null){
        resultado = true;
    }
    return resultado;
}
// Función para realizar redondeo de centesimos
// input: num: numero con decimales a reondear
//
// output: numero con decimales redondeados hasta 2 lugares
const roundToTwo = (num) => {
    return +(Math.round(num + "e+2")  + "e-2");
}
// Función para realizar validaciones sobre los datos ingresados por pantalla, mientras el dato que 
// ingresa no sea un numero, se continua pidiendo el valor, con el botón cancelar se sale de la ventana 
// y del menu.
// input: str: corresponde al dato ingresado
//
// output: devuelve el dato ingresado y se actualiza la variable global salir
const validarDato = (str) =>{
    do {
        dato = prompt(str);
        if(es_NULL(dato)){
            salir = true;
        }
    }while ((isNaN(parseInt(dato))) & (!salir))

    return dato;
}

// Función para realizar el vaciado de un array 
// input: array: corresponde a un array con datos a ser borrados
//
// output: devuelve el array vacio
const vaciarArray = (array) =>{
    
    while(array.length !=0){
        array.pop();
    }
}

// Función para agregar lineas al detalle de la factura, toma los datos nro.producto, cantidad y 
// precio unitario y agrega la linea al detalle de la factura  
// input: tbodyDetalle: corresponde al body del detalle de la factura para agregar lineas
//        filaDetalle: corresponde a la fila de datos que se agregaran al detalle de la factura
//
// output: no tiene, agrega linea al body del detalle de factura
function renderCarrito(tbodyDetalle, filaDetalle){
    tbodyDetalle.innerHTML = "";
    if (!filaDetalle.length >= 1) {return null}
    filaDetalle.map((item) => {
        const tr = document.createElement('tr');
        /*tr.classList.add('ItemCarrito')*/
        const Content =
         `  <th scope="row">${item.nroRenglon}</th>
            <td class="table__productos">
                <p>${item.codigo}</p>
            </td>
            <td class="table__precios">
                <p>${item.cantidad}</p>
            </td>
            <td class="table__cantidades">
                <p>${item.precioUnitario}</p>
            </td>
        `
        console.log(Content)
        tr.innerHTML = "";
        tr.innerHTML = Content;
        tbodyDetalle.append(tr);
    })
}

// Función que representa base de datos de empresas disponibles para facturar 
// input: nroCliente: corresponde al numero de empresa a realizar facturación
//
// output: nombre de empresa en caso de existir, string vacio en caso de no existir
function baseEmpresas(nroCliente)
{   
    let empresa = "";
    switch (nroCliente) {
        case 1001:
            empresa = "LA CASA DE LAS TELAS S.A.";
            break;
        case 1002:
            empresa = "LA FONTANA S.A.";
            break;
        default:
            empresa = "";
    }
    return empresa;
}

// Variables de fecha y usuario que se muestran en el head de la pagina
// El usuario corresponde al usuario que se logueo en la pagina login
// la fecha y hora corresponde al del momento de la facturación
// se usa local storage para pasar el usuario que realizó login
fechaEmision = Date.now();
let fechaHoy= new Date(fechaEmision);
let usuario_activo = localStorage.getItem('usuario_activo');
let contenedor_usuario = document.getElementById('usuario');
contenedor_usuario.innerHTML = `<h3> Usuario: ${usuario_activo}</h3> 
                                <h3> Fecha: ${fechaHoy}`;


let codigo = 0;
let cantidad = 0;
let precioUnitario = 0;

// Componentes tomados de la pagina Contado.html
let numeroCliente = document.getElementById("nroCliente");
let nroProducto = document.getElementById("nroProducto");
let cantidadProducto = document.getElementById("cantidad");
let precioUnitarioProd = document.getElementById("precioUnitario");
let div_nro_cliente = document.getElementById("div_nro_cliente");
let tbodyDetalle = document.getElementById('tbodyDetalle');

let ColFacturas = new Facturas(colFacturas); 

// validación de los datos del formulario correspondiente a la carga de las lineas de la 
// factura
let frm = document.getElementById("formulario");
frm.addEventListener('submit',(e) =>{
    e.preventDefault();
    // validación de datos, deben ser numericos 
    if((isNaN(parseInt(numeroCliente.value))) || 
       (isNaN(parseInt(nroProducto.value))) ||
       (isNaN(parseInt(precioUnitarioProd.value))) ||
       (isNaN(parseInt(cantidadProducto.value))))
    {
        // en caso de no ser valores numericos, se emite mensaje y se borran todos los inputs
        alert("ingrese un valor numerico !!!!");
        numeroCliente.value = "";
        nroProducto.value = "";
        precioUnitarioProd.value = ""
        cantidadProducto.value = ""
    }
    else
    {   
        // si los valores son numericos, se valida que el nro de producto y la cantidad no sean cero
        if((parseInt(nroProducto.value) === 0) || (parseInt(cantidadProducto.value) === 0))
        {
            alert("Nro.de producto o cantidad no pueden ser 0 !!!!")
        }
        else
        {   
            // en caso de que no sean 0, se busca en nombre de la empresa, en caso de no existir
            // se borran todos los campos y se esperan nuevos valores
            nroCliente = parseInt(numeroCliente.value)
            codigo = parseInt(nroProducto.value);
            precioUnitario = parseInt(precioUnitarioProd.value);
            cantidad = parseInt(cantidadProducto.value);
            const nombreEmpresa = baseEmpresas(nroCliente); 
            if(nombreEmpresa === ""){
                alert("No existe empresa !!!!");
                numeroCliente.value = "";
                nroProducto.value = "";
                precioUnitarioProd.value = "";
                cantidadProducto.value = "";
            }
            else
            {   
                // Si la empresa existe, se cambia el contenido del contenedor de nro de cliente por el nro y el nombre
                // se agrega la linea al array correspondiente, y se agrega al detalle de la factura (body html)
                div_nro_cliente.innerHTML =  "<label>NUMERO CLIENTE: "+nroCliente+" EMPRESA: " + nombreEmpresa + "</label>";
                indice = registrosFactura.length; 
                nuevoRegistro = new RegistroFactura(indice+1,codigo,cantidad,precioUnitario);
                registrosFactura.push(nuevoRegistro);
                renderCarrito(tbodyDetalle, registrosFactura)
                precioUnitarioProd.value = "";
                cantidadProducto.value = "";
                nroProducto.value = "";
            }
        }
        
    }
})

