let registrosFactura = [];
let colFacturas = [];
let nroCliente = 0;
let fechaVto = "";
let salir = false;
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
    constructor(codigo, cantidad, precioUnitario){
        this.codigo = codigo;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.totalRegistro = this.getTotalRegistro();
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
const vaciarArray = (array) =>{
    
    while(array.length !=0){
        array.pop();
    }
}

// Función para realizar la carga de los registros o detalle de la factura, por cada uno de los datos a  
// ingresar, se controla que sean datos numericos en caso de no ingresar un numero, se continua pidiendo el valor
// con el botón cancelar se sale de la ventana y del menu.
// input: sin datos de entrada
//
// output: sin datos de salida, se actualiza variable global salir, se crea registros de factura
//         y se agregan al array registrosFacturas (variable global)
const cargaRegistrosFactura = () =>{
    let codigo = 0;
    let cantidad = 0;
    let precioUnitario = 0;
    let continuar = 0;

    while(registrosFactura.length !=0){
        registrosFactura.pop();
    }
    
    do{
        (!salir) ? codigo = parseInt(validarDato("Ingrese codigo de producto: ")) : "";
        (!salir) ? cantidad = parseInt(validarDato("Ingrese cantidad: ")) : "";
        (!salir) ? precioUnitario = parseInt(validarDato("Ingrese precio unitario: ")): "";

        nuevoRegistro = new RegistroFactura(codigo,cantidad,precioUnitario);
        registrosFactura.push(nuevoRegistro);

        (!salir) ? continuar = validarDato("Desea ingresar otro registro: (1 para continuar / cualquier otra tecla para salir)"):"";

    }while ((continuar === "1") & (!salir))
}

let ColFacturas = new Facturas(colFacturas); 
let otraFactura = "1";
// bucle para poder cargar facturas a la colección de facturas, con el numero 1 se sigue cargando facturas y con 
// cualquier otra tecla se sale
while ((otraFactura === "1") & (!salir)){

    nroCliente = validarDato("Ingrese numero de Cliente: ");
    cargaRegistrosFactura();

    if (!salir)  {
        fechaEmision = Date.now();
        let fechaHoy= new Date(fechaEmision);
        fechaVto = new Date(2022,9,4);
        let nuevaFactura = new Factura("CONTADO",numeroFactura,nroCliente,registrosFactura,fechaVto);
        ColFacturas.agregarFactura(nuevaFactura);

        alert(nuevaFactura.imprimirFactura());

        otraFactura = prompt("¿Desea ingresar otra Factura? /// (1 confirma / cualquier otra tecla termina)");
        numeroFactura++;
    }
    else
    {
        alert("Exit");
    }
}

// variables utilizadas para la busqueda y eliminación de facturas
let nroFactura;
let resultado_factura;
let otraOper="1";

// Iteracción para poder borrar facturas, se muestra los numeros de facturas cargados en la colección, se solicita
// numero de factura a borrar, con el 1 se continua borrando otras facturas con cualauier otra tecla se sale
(!salir) ? alert("ELIMINACION DE FACTURAS"):"";
while ((otraOper === "1") & (!salir)){
    
    if (ColFacturas.estaVacio())
    {
        alert("No existen facturas ingresadas en el sistema");
        salir = true;
    }
    else
    {
        alert("Numeros de Facturas ingresados:" + "\n" + "\n" + ColFacturas.mostrarNrosFacturas());
        nroFactura = parseInt(validarDato("Ingrese nro de factrua a borrar: "));
    }

    resultado_factura = ColFacturas.buscarFactura(nroFactura);
    if (!salir)
    {
        if (resultado_factura === undefined){
            alert("No existe nro de factura !!!!!!")
        }
        else
        {
            ColFacturas.eliminarFactura(nroFactura);
            alert("Detalle de Factura eliminada: " +"\n"+"\n" +resultado_factura.imprimirFactura());
        }
        otraOper = prompt("¿Desea realizar otra eliminación: ? /// (1 confirma / cualquier otra tecla termina)");
    }
    else
    {
        alert("Exit");
    }
}

otraOper = "1";
// Iteracción para poder realizar busquede de datos de facturas, se solicita nro de factura, se muestran los 
// numeros de facturas disponibles y tipo de facturas disponibles, con el 1 se sigue realizando la busqueda 
// de nuevas facturas con cualquier otra tecla se sale 
(!salir) ? alert("BUSQUEDA DE FACTURAS"):"";
while ((otraOper === "1") & (!salir)){
    
    if (ColFacturas.estaVacio())
    {
        alert("No existen facturas ingresadas en el sistema");
        salir = true;
    }
    else
    {
        alert("Numeros de Facturas ingresados:" + "\n" + "\n" + ColFacturas.mostrarNrosFacturas());

    }
        
    nroFactura = parseInt(validarDato("Ingrese nro de factura a buscar: "));
    if(!salir){
        resultado_factura = ColFacturas.buscarFactura(nroFactura);

        if (resultado_factura === undefined){
            alert("No existe nro de factura !!!!!!")
        }
        else
        {
            alert("Factura encontrada: " + resultado_factura.imprimirFactura());
        }   
        otraOper = prompt("¿Desea realizar otra busqueda: ? /// (1 confirma / cualquier otra tecla termina)");
    }
    else
    {
        alert("Exit");
    }
}
