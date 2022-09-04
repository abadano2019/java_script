let registrosFactura = [];
let nroCliente = 0;
let fechaVto = "";
let salir = false;

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
    
    do{
        (!salir) ? codigo = parseInt(validarDato("Ingrese codigo de producto: ")) : "";
        (!salir) ? cantidad = parseInt(validarDato("Ingrese cantidad: ")) : "";
        (!salir) ? precioUnitario = parseInt(validarDato("Ingrese precio unitario: ")): "";

        nuevoRegistro = new RegistroFactura(codigo,cantidad,precioUnitario);
        registrosFactura.push(nuevoRegistro);

        (!salir) ? continuar = validarDato("Desea ingresar otro registro: (1 para continuar / cualquier otra tecla para salir)"):"";

    }while ((continuar === "1") & (!salir))
}

nroCliente = validarDato("Ingrese numero de Cliente: ");
cargaRegistrosFactura();

// En caso de no tener la solicitud de salir de programa se crean otras variables para luego dar de alta la factura
// se muestra por pantalla los datos cargados
if (!salir)  {
    fechaEmision = Date.now();
    let fechaHoy= new Date(fechaEmision);
    fechaVto = new Date(2022,9,4);
    let nuevaFactura = new Factura("CONTADO",100001,nroCliente,registrosFactura,fechaVto);

    nroFact = nuevaFactura.getNro();
    tipoFact = nuevaFactura.getTipo();
    nroCli = nuevaFactura.getNroCliente();
    registros = nuevaFactura.getRegistrosImprimir();
    totalFact = roundToTwo(nuevaFactura.getTotal());
    totalFactMasIVA = roundToTwo(nuevaFactura.totalMasIVA());

    alert("F A C T U R A    I N G R E S A D A:" + "\n" + "\n" +
        "Tipo de factura: " + tipoFact + "\n" +
        "Fecha factura: " + fechaHoy.toLocaleDateString() + "\n" + 
        "Numero de cliente: " + nroCli + "\n" +
        "Numero de factura: " + nroFact + "\n" + "\n" + 
        "Detalle: " + "\n" + registros + "\n" +
        "Total: $ " + totalFact + "\n" + 
        "Total mas IVA $ " + totalFactMasIVA);
}
else
{
    alert("Exit");
}