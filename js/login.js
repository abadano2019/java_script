// Variables
let usuario = ""; // variable para registrar usuario
let contrasena = ""; // variable para registrar password
let existe_usuario = false; // variable para validar si el usuario existe en la base de datos
let intentos = 1; // variable para registrar cantidad de intentos ya sea de ingreso de usuario valido o de su contraseña
let salir = false; // variable utilizada para marcar si se desea salir de la aplicación
let codigo_salida = 0; // variable utilizada para la validación del usuario y contraseña

//Mensaje de bienvenida e instrucción de como salir del sistema
alert("BIENVENIDO AL SISTEMA CENTRAL DE FACTURACIÓN" +"\n" + 
      "(Solo habilitado para usuarios registrados)" + "\n"+"\n" + 
      "OPCIONES: Para salir del programa presione la tecla 0 (cero) o boton CANCELAR");

// Función para validar usurio y contraseña, recibe ambos parametros y valida contra la base de datos
// input: usuario: usuario a validar contra base de datos
//        contrasena: contraseña a validar contra base de datos
//
// output: codigo = 1: usuario y contraseña ingresados son correctos
//         codigo = 0: usuario y contraseña ingresados no son correctos
const validar_usuario = (usuario, contrasena) => {

    let usu_pass = ""; // concatenación de los contenidos de las variables para validar contra la base
    usu_pass = usuario + contrasena;

    switch (usu_pass) {
        case "ARIELH1234":
            codigo = 1;
            break;
        case "JUANL1122":
            codigo = 1;
            break;
        default:
            codigo = 0;
    }
    return codigo;
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

// Ciclo de programa principal, donde se ingresan las valores de usuario y contraseña
while ((!existe_usuario) & (intentos <= 3) & (!salir)){

        usuario = prompt("Ingrese Usuario: ");
        contrasena = prompt("ingrese Contraseña: ");
        
        // en caso de que el usuario y la contraseña ingesadas sean un 0 o null por presionar el botón cancel
        // se sale de la aplicación.
        if (((usuario || contrasena) === "0") || (es_NULL(usuario) || es_NULL(contrasena))) {
            salir = true;
            alert("Exit: Gracias por utilizar el sistema de facturación");
            window.location.href = "http://127.0.0.1:5500/index.html";
        }
        else
        {        
            // validación de usuario y contraseña
            codigo_salida = validar_usuario(usuario, contrasena);
        
            // chequeo de resultados 
            if (codigo_salida === 1){
                existe_usuario = true;
            }
            if (codigo_salida === 0){
                alert("Usuario / Contraseña incorrectos");
            }
        }
             
        intentos = intentos + 1;
}
    
// luego de tres intentos, si la contraseña es incorrecta, se emite un mensaje para que el usuario se
// comunique con el administrador del dominio por haber superado el máximo permitido.
// En caso de haber ingresado la contraseña correcta dentro de los tres intentos se mustra el menú del 
// sistema de facturación
if (!salir){
    if (!existe_usuario){
        alert("Usted a superado la cantidad maxima de intentos, contactese con el administrador del dominio")
        window.location.href = "http://127.0.0.1:5500/index.html";
    }
    else
    {
        alert("Bienvenido "+ usuario +" al sistema de Facturación cental:" + "\n" + 
            "Menu: " + "\n" + "\n" +
            "1) Facturación Contado" + "\n" +
            "2) Facturación Crédito" + "\n" + 
            "3) Emisión de recibos" + "\n" +
            "4) Emisión de notas de crédito")
            window.location.href = "http://127.0.0.1:5500/pages/menu.html";
    }
   
}