let usuario = ""; // variable para registrar usuario
let contrasena = ""; // variable para registrar password
let existe_usuario = false; // variable para validar si el usuario existe en la base de datos
let intentos = 1; // variable para registrar cantidad de intentos ya sea de ingreso de usuario valido o de su contraseña
let salir = false; // variable utilizada para marcar si se desea salir de la aplicación

alert("BIENVENIDO AL SISTEMA CENTRAL DE FACTURACIÓN" +"\n" + 
      "(Solo habilitado para usuarios registrados)" + "\n"+"\n" + 
      "OPCIONES: Para salir del programa presione la tecla 0 (cero)");

// bucle que solicita el usuario, valida si el usuario ingresado está registrado, en caso contrario 
// se devuelve un mansaje de usuario no valido, en caso de ingresar el 0 (cero) termina la aplicación
while ((!existe_usuario) & (intentos <= 3) & (usuario != "0")){

    usuario = prompt("Ingrese Usuario: ");
    switch (usuario){
        case "0": // valor para salir del sistema
            salir = true;
            break;
        case "ARIEL":
            existe_usuario = true;
            alert("Usuario registrado");
            break;
        case "JUAN":
            existe_usuario = true;
            alert("Usuario registrado");
            break;
        default:
            alert("USUARIO no registrado");
    }
    intentos = intentos + 1;
}

// En caso de que se hayan utilizados todos los intentos por ingresar el usuario y sigue sin existir en la base
// se devuelve un mensaje para comunicarse con el administrador del dominio
if ((!existe_usuario) & (!salir)){
    salir = true;
    alert("Comuniquese con el administrador de dominio");
}

// seteo de variables para el bucle de la contraseña
intentos = 1;
let contrasena_correcta = false;

// bucle que solicita la contraseña tomando en cuenta el usuario ya validado, valida si la contraseña corresonde al usuario,
// en caso contrario se devuelve un mansaje de contraseña incorrecta, en caso de ingresar el 0 (cero) termina la aplicación
while ((!contrasena_correcta) & (intentos <= 3) & (!salir)){
    contrasena = prompt("USUARIO: " + usuario + "\n" + "\n" + "Ingrese Contraseña: ");
    switch (contrasena){
        case "0":
            intentos = 4;
            brake;
        case "H1234":
            if (usuario ==="ARIEL"){
                contrasena_correcta = true;
                alert(`Bienvenido ${usuario}`);
            }
            break;
        case "L1122":
            if (usuario ==="JUAN"){
                contrasena_correcta = true;
                alert(`Bienvenido ${usuario}`);
            }
            break;
        default:
            if (intentos < 3){
                alert("contraseña incorrecta, vuelva a intentar");
            }
    }
    intentos = intentos + 1;
}

// luego de tras intentos, si la contraseña es incorrecta, se emite un mensaje para que el usuario se
// comunique con el administrador del dominio.
// En caso de haber ingresado la contraseña correcta dentro de los tres intentos se mustra el menú del 
// sistema de facturación
if (!salir){
    if (!contrasena_correcta){
        alert("Usted a superado la cantidad maxima de intentos, contactese con el administrador del dominio")
    }
    else
    {
        alert("Bienvenido al sistema de Facturación cental:" + "\n" + 
            "Menu: " + "\n" + "\n" +
            "1) Facturación Contado" + "\n" +
            "2) Facturación Crédito" + "\n" + 
            "3) Emisión de recibos" + "\n" +
            "4) Emisión de notas de crédito")
            window.location.href = "http://127.0.0.1:5500/menu.html";
    }
}


