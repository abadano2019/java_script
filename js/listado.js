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

function sumaDetalle(registros,suma){
    let total = 0;
    let iva = 0;
    let totalIva = 0;
    
    registros.forEach((item) => {
        total = total + item.getCantidad()*item.getPrecioUnitario()
    })

    iva = total * 0.22;
    totalIva = total + iva;
    suma.innerHTML= `TOTAL:&nbsp;&nbsp;$${total}`;
}

// Función para agregar lineas al detalle de la factura, toma los datos nro.producto, cantidad y 
// precio unitario y agrega la linea al detalle de la factura  
// input: tbodyDetalle: corresponde al body del detalle de la factura para agregar lineas
//        filaDetalle: corresponde a la fila de datos que se agregaran al detalle de la factura
//
// output: no tiene, agrega linea al body del detalle de factura
function renderCarrito(tbodyDetalle, filaDetalle, suma){
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

    sumaDetalle(filaDetalle, suma);
}

function borrarRegistrosFactura(tbody, total){
    tbody.innerHTML = "";
    total.innerHTML = `TOTAL:&nbsp;&nbsp;$0`;
    
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
// función para guardar una colección de facturas en el local storage
// input: colFacturas: colección de facturas
//
// output: n/a
function guardarFacturasLocalStorage(colFacturas){
    localStorage.setItem("facturas", JSON.stringify(colFacturas));
}

// función para listar facturas, toma del local storage una colección de facturas y despliega 
// por pantalla todas las facturas que tiene almacenadas
function listarFacturas(){
    let detalle = localStorage.getItem('facturas');
    arrayDetalle = JSON.parse(detalle);
    arrayDetalle = arrayDetalle.colFacturas;
    
    let registros = "";
    let content = "";
    let total = 0;
    arrayDetalle.forEach(item => {
        let div = document.createElement("div");
        content =
         `  <h3>Tipo de Factura: ${item.tipo}</h3>
            <h3>Numero Cliente: ${item.nroCliente} </h3>
            <h3>Numero factura: ${item.nro}</h3>
            <h3>Vto Factura: ${item.vto}</h3>
         `  
            detalle = item.registros;
            //nroRenglon, codigo, cantidad, precioUnitario)
            registros = "";
            total = 0;
            detalle.forEach((reg) => {
                registros = registros + 
                            ` <h3>Item Nro.: ${reg.nroRenglon}</h3>
                              <h3>Codigo Producto: ${reg.codigo}</3>
                              <h3>Cantidad: ${reg.cantidad}</3>
                              <h3>Precio Unitario: ${reg.precioUnitario}</3>
                            `
                total = total + reg.cantidad*reg.precioUnitario;
            })
        div.innerHTML = content + registros + "<h3>Total factura: "+ total+" </3>"+"<br></br><br></br>";
        document.body.append(div);
        })
    
    
    }



    
    
