const ClickButton = document.querySelectorAll('.button') // se toman todos los botones con la clase .button
const tbody = document.querySelector('.tbody')
let carrito = [];

// se agrega a todos los botones el evento click para ejecutar la fucnión addToCarritoItem
ClickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})

// Función que agrega un item al carrito, sobre el evento click del botón cliqueado, se busca la tarjeta con la clase
// .card más cercana, luego se toman el texto de los componentes del titulo de la tarjeta, precio y la url de la 
// imagen del producto, se crea un nuevo item y se agraga carrito por intermedio de la fución addItemCarrito
// input: e: evento ejecutado
//
// output: n/a
function addToCarritoItem(e){
    const button = e.target; // elemento cliqueado
    const item = button.closest('.card');
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrecio = item.querySelector('.precio').textContent;
    const itemImg = item.querySelector('.card-img-top').src;

    // creación de nuevo item para el carrito
    const newItem = {
        nro: carrito.length + 1,
        title: itemTitle,
        precio: itemPrecio,
        img: itemImg,
        cantidad: 1
    }
    addItemCarrito(newItem);
}

// funcion para agregar elemento al carrito
// inptu: newItem: producto para agregar al carrito
//
// output: n/a
function addItemCarrito(newItem){

    // Alerta para indicar que le producto fue agregado al carrito
    alertaMensajeDelay("Producto agregado al carrito !!!!",2000);
    
    // Si le producto ya existe en el carrito se suma una unidad a la cantidad
    const InputElement = tbody.getElementsByClassName('input__elemento') 
    for(let i= 0; i<carrito.length; i++){
        if (carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad++;
            const inputValue = InputElement[i];
            inputValue.value++
            CarritoTotal();
            return null;
        }
    }
    // de lo contrario, el producto se agrega al carrito
    carrito.push(newItem);
    renderCarrito();
}

// función para dibujar carrito
function renderCarrito(){
    tbody.innerHTML = '';
    
    if (!carrito.length >= 1) {return null}
    carrito.map(item => {
        const tr = document.createElement('tr');
        // se agrega la clase item_Carrito al elemento creado para luego poder referenciarlo
        // no se utiliza para otorgar estilo
        tr.classList.add('item_Carrito')
        const Content =
         `
            <th scope="row">${item.nro}</th>
            <td class="table__productos">
                <img src=${item.img} alt="imagen de platillo 1">
                <h6 class ="title">${item.title}</h6>
            </td>
            <td class="table__precios">
                <p>${item.precio}</p>
            </td>
            <td class="table__cantidades">
                <input type="number" min="1" value=${item.cantidad} class="input__elemento">
                <button class="delete btn btn-danger">X</button>
            </td>
        `
        tr.innerHTML = Content;
        tbody.append(tr);
        // evento para borrar elemento del carrito
        tr.querySelector(".delete").addEventListener('click',removeItemCarrito);
        // evento para aumentar o disminuir la cantidad desde el carrito
        tr.querySelector(".input__elemento").addEventListener('change', cambioCantidadElemento);
    })
    CarritoTotal();
}

// fución para generar la suma total del carrito
function CarritoTotal(){
    let total = 0
    const itemCartTotal = document.querySelector('.itemCartTotal')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace("$",''))
        total = total + precio*item.cantidad;
        
    })

    itemCartTotal.innerHTML = `Total $${total}`;
    addLocalStorageUsuario();
}

// función para actualizar numero de fila del carrito luego de que un producto es borrado
function actualizarNrosProductosCarrito(){
    for(let i = 0; i<carrito.length;i++ ){
        carrito[i].nro = i + 1;
    }
}

// función para remover productos del carrito
function removeItemCarrito(e){
    const buttonDelete = e.target;
    const tr = buttonDelete.closest(".item_Carrito");
    const title = tr.querySelector('.title').textContent;
    
    Swal.fire({
        title: "ATENCION",
        text: "Confirma que desea borrar el producto del carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                for(let i=0; i<carrito.length; i++){
                    if(carrito[i].title.trim()===title.trim()){
                        carrito.splice(i,1);
                    }
                }
                tr.remove();
                actualizarNrosProductosCarrito();
                renderCarrito()
                CarritoTotal();   
                Swal.fire(
                    'Operación ejecutada !!!!',
                    "Producto eliminado !!!!",
                    'success',
                )
            }
        })
}


// función para cambiar la cantidad de cada producto desde el carrito
function cambioCantidadElemento(e){
    const cambioCantidad = e.target;
    const tr = cambioCantidad.closest(".item_Carrito");
    const title = tr.querySelector('.title').textContent;
    
    carrito.forEach(item => {
        if(item.title.trim()===title.trim()){
            cambioCantidad.value < 1 ? (cambioCantidad.value = 1) : cambioCantidad.value;
            item.cantidad = cambioCantidad.value;
            CarritoTotal();
        }
    })
}

// función para guardar carrito en el local storage
function addLocalStorage(){
    window.localStorage.setItem("carrito", JSON.stringify(carrito))
}

// función para guardar el carrito de un usuario en el local storage
function addLocalStorageUsuario(){
    let user = localStorage.getItem("usuario_activo"); 
    window.localStorage.setItem("carrito"+user, JSON.stringify(carrito))
}

// función para obtener carrito en el local storage
function getCarrito_LocalStorage(){
    const storage = JSON.parse(localStorage.getItem("carrito"));
    return storage;
}

// funcion para obtener el carrito de un usuario desde el local storage
function getCarrito_LocalStorageUsuario(){
    let user = localStorage.getItem("usuario_activo"); 
    const storage = JSON.parse(localStorage.getItem("carrito"+user));
    return storage;
}

// funcion para obtener carrito desde el local stogare
window.onload = function(){
    let user = localStorage.getItem("usuario_activo");
    const storage = JSON.parse(localStorage.getItem("carrito"+user));
    if(storage){
      carrito = storage;
    }
    renderCarrito();
}

// función para borrar el carrito
const borrarCarrito = () =>{
    let user = localStorage.getItem("usuario_activo");
    let carritoStorage = getCarrito_LocalStorageUsuario();
    carrito = carritoStorage;
    const tope = carrito.length
    for(let i = tope; i> 0; i--){
        carrito.pop(carrito[i]);
    }
    window.localStorage.setItem("carrito"+user, JSON.stringify(carrito))
}

// función para generar pedido
const generarPedido = () =>{
    const pedidosStorage = localStorage.getItem("pedidos");
    console.log(pedidosStorage)
    let pedidos = [];
    if (!(pedidosStorage === null)){
        const pedidosJSON = JSON.parse(pedidosStorage);
        pedidos = pedidosJSON;
    }
    
    const usuario = localStorage.getItem("usuario_activo");
    const carrito = getCarrito_LocalStorageUsuario();
    const today = new Date();
    const fecha = today.toLocaleDateString('es-UY');
    newPedido = new Pedido(usuario,carrito,fecha);
    pedidos.push(newPedido);
    localStorage.setItem("pedidos",JSON.stringify(pedidos));
    borrarCarrito();
    renderCarrito();
    CarritoTotal();
    alertaMensajeAnimado("Pedido generado !!!!")
}

