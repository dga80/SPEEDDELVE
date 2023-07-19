
//Variabes
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar carrito"
    listaCursos.addEventListener('click', agregarCurso)
    //Elimina curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=> {
        articulosCarrito = [];
        limpiarHTML();
    })
}

//Funciones

function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML();
    }
}
function agregarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosSeleccionados(cursoSeleccionado);
    }

}
function leerDatosSeleccionados(curso){
    console.log(curso)

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        nombre: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1,
    }

//Revisa si un elemento ya existe en el carrito

const existe = articulosCarrito.some(curso=> curso.id === infoCurso.id)

if (existe){
    articulosCarrito.map(curso=>{
        if(curso.id === infoCurso.id){
            curso.cantidad++;
        }
    })
} else {
    articulosCarrito = [...articulosCarrito, infoCurso];

}

    console.log(articulosCarrito)
    carritoHTML();
}

//Muestra el carrito en el html
function carritoHTML(){
// limpiar html
    limpiarHTML();
    
    articulosCarrito.forEach(curso=>{
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${curso.nombre}</td>
            <td>${curso.precio}</td>
            <td>${curso.cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${curso.id}"> X </a>

        `;
        //agrega
        contenedorCarrito.appendChild(row);
    })
}
function limpiarHTML(){
    contenedorCarrito.innerHTML = '';
}
