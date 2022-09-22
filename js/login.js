// Variables
let usuario = ""; // variable para registrar usuario
let contrasena = ""; // variable para registrar password
let existe_usuario = false; // variable para validar si el usuario existe en la base de datos
let intentos = 0; // variable para registrar cantidad de intentos ya sea de ingreso de usuario valido o de su contraseña
let salir = false; // variable utilizada para marcar si se desea salir de la aplicación
let codigo_salida = 0; // variable utilizada para la validación del usuario y contraseña

// luego de tres intentos, si la contraseña es incorrecta, se emite un mensaje para que el usuario se
// comunique con el administrador del dominio por haber superado el máximo permitido.
// En caso de haber ingresado la contraseña correcta dentro de los tres intentos se mustra el menú del 
// sistema de facturación

let usuarioLogin = document.getElementById("id_usuario")
let passwordLogin = document.getElementById("id_password")
let frmLogin = document.getElementById("id_formLogin");

frmLogin.addEventListener('submit',(e) =>{
    e.preventDefault();
    
    let codigo_salida = validar_usuario(usuarioLogin.value, passwordLogin.value);
    console.log("codigoSalida",codigo_salida)

    console.log("usuario",usuarioLogin.value)
    console.log("password",passwordLogin.value)

    if ((codigo_salida === 1) || (codigo_salida === 2)) {
        localStorage.setItem("usuario_activo",usuarioLogin.value)
        if(consulta_nivel_usuario(usuarioLogin.value) === 1){
            window.location.href = "http://127.0.0.1:5501/pages/menu.html"
        }
        else
        {
            window.location.href = "http://127.0.0.1:5501/pages/carrito.html"
        }
    }
    if (codigo_salida === 0){
        alert("Usuario / Contraseña incorrectos");
        intentos++
    }
    
    if (intentos === 3){
        intentos = 0;
        alert("Intentos excedidos, vuelva a intentar");
        window.location.href = "http://127.0.0.1:5501/index.html"
    }
    
})
