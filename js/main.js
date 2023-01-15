//Almacena la transaccion
const transaccion = [];

const contenedorbutaca = document.querySelector('.contenedor-sala');
const butacas = document.querySelectorAll('.fila .butaca:not(.ocupado');
const peliculaSeleccionada = document.getElementById('pelicula');
const formatoSeleccionado = document.getElementById('formato');
const fechaSeleccionada = document.getElementById('fecha');
const horarioSeleccionado = document.getElementById('horario');
const botonCheckout = document.getElementById('checkout');
const contenedorCheckout = document.querySelector('.contenedor-checkout');
const alertPlaceholder = document.getElementById('alertaSeleccionButacas');

let precioPelicula = parseInt(peliculaSeleccionada.value);
let verificacionButacas = 0;
let formatoPelicula = '';
let fechaPelicula = '';
let horarioPelicula = '';

verificarStorage();

//Actualiza cantidad y total
function actualizarSeleccion() {
    const seleccionButacas = document.querySelectorAll('.fila .butaca.seleccionado');

    const indiceButacas = [...seleccionButacas].map((butaca) => [...butacas].indexOf(butaca));

    localStorage.setItem('indiceButacas', JSON.stringify(indiceButacas));

    verificacionButacas = seleccionButacas.length;

    if(verificacionButacas > 0) {
        document.getElementById('alertaSeleccionButacas').innerHTML = '';
    }     
}

function verificarStorage() {
    const butacasSeleccionadas = JSON.parse(localStorage.getItem('indiceButacas'));

    if (butacasSeleccionadas !== null && butacasSeleccionadas.length > 0) {
        butacas.forEach((butaca,index) => {
            if (butacasSeleccionadas.indexOf(index) > -1) {
                butaca.classList.add('seleccionado')
            }
        });
    }

    const indicePeliculaSeleccionada = localStorage.getItem('indiceSeleccionPelicula');

    if (indicePeliculaSeleccionada !== null) {
        peliculaSeleccionada.selectedIndex = indicePeliculaSeleccionada;

        precioPelicula = localStorage.getItem('precioSeleccionPelicula');
    }

    const indiceFormatoSeleccionado = localStorage.getItem('indiceSeleccionFormato');

    if (indiceFormatoSeleccionado !== null) {
        formatoSeleccionado.selectedIndex = indiceFormatoSeleccionado;
        
        formatoPelicula = localStorage.getItem('valorSeleccionFormato');
    }

    const indiceFechaSeleccionada = localStorage.getItem('indiceSeleccionFecha');

    if (indiceFechaSeleccionada !== null) {
        fechaSeleccionada.selectedIndex = indiceFechaSeleccionada;

        fechaPelicula = localStorage.getItem('valorSeleccionFecha');
    }

    const indiceHorarioSeleccionado = localStorage.getItem('indiceSeleccionHorario');

    if (indiceHorarioSeleccionado !== null) {
        horarioSeleccionado.selectedIndex = indiceHorarioSeleccionado;

        horarioPelicula = localStorage.getItem('valorSeleccionHorario');
    }
}

const alerta = (message) => {
    alertPlaceholder.innerHTML = '';

    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
      `<div class="alert alert-warning alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('')
  
    alertPlaceholder.append(wrapper)
  }

//Listeners
peliculaSeleccionada.addEventListener('change', (e) => {
    precioPelicula = parseInt(e.target.value);

    if (e.target.selectedIndex !== 0) {
        document.getElementById('alertaSeleccionButacas').innerHTML = '';
    }

    localStorage.setItem('indiceSeleccionPelicula', e.target.selectedIndex);
    localStorage.setItem('precioSeleccionPelicula', e.target.value);

    actualizarSeleccion();
});

formatoSeleccionado.addEventListener('change', (e) => {
    formatoPelicula = e.target.value;

    if (e.target.selectedIndex !== 0) {
        document.getElementById('alertaSeleccionButacas').innerHTML = '';
    }

    localStorage.setItem('indiceSeleccionFormato', e.target.selectedIndex);
    localStorage.setItem('valorSeleccionFormato', e.target.value);
});

fechaSeleccionada.addEventListener('change', (e) => {
    fechaPelicula = e.target.value;

    if (e.target.selectedIndex !== 0) {
        document.getElementById('alertaSeleccionButacas').innerHTML = '';
    }

    localStorage.setItem('indiceSeleccionFecha', e.target.selectedIndex);
    localStorage.setItem('valorSeleccionFecha', e.target.value);
});

horarioSeleccionado.addEventListener('change', (e) => {
    horarioPelicula = e.target.value;

    if (e.target.selectedIndex !== 0) {
        document.getElementById('alertaSeleccionButacas').innerHTML = '';
    }

    localStorage.setItem('indiceSeleccionHorario', e.target.selectedIndex);
    localStorage.setItem('valorSeleccionHorario', e.target.value);
});

contenedorbutaca.addEventListener('click', (e) => {
    if (e.target.classList.contains('butaca') && !e.target.classList.contains('ocupado')) {
        e.target.classList.toggle('seleccionado');
    }
    actualizarSeleccion();
});

botonCheckout.addEventListener('click', (e) => {
    if(verificacionButacas > 0) {
        const pelicula = peliculas.find(pelicula => pelicula.id === peliculaSeleccionada.selectedIndex);

        agregarTransaccion(pelicula, formatoPelicula, verificacionButacas, fechaPelicula, horarioPelicula);

        mostarDatosCheckout();

        contenedorCheckout.classList.toggle('checkout-active');
    } else if (peliculaSeleccionada.selectedIndex === 0) {
        alerta('Debe seleccionar alguna pelicula');
    } else if (formatoSeleccionado.selectedIndex === 0) {
        alerta('Debe seleccionar algun formato');
    } else if (fechaSeleccionada.selectedIndex === 0) {
        alerta('Debe seleccionar algun dia');
    } else if (horarioSeleccionado.selectedIndex === 0) {
        alerta('Debe seleccionar alguna funcion');
    } else {
        alerta('Debe seleccionar alguna butaca');
    }
});

const mostarDatosCheckout = () => {
    const contenedor = document.getElementById('contenedor-transaccion');

    transaccion.forEach(transaccion => {
    contenedor.innerHTML = `
        <div class="contenedor-informacion">
            <div>
                <p>Pelicula</p>
                <p id="nombrePelicula">${transaccion.nombre}</p>
                <p>Formato: <span id="formatoPelicula">${transaccion.formato}</span></p>
                <p>Fecha: <span id="fechaHoraPelicula">${transaccion.fecha}</span></p>
                <p>Cantidad Entradas: <span id="cantidadEntradas">${transaccion.cantidad}</span></p>
                <p>Precio por Entrada: $<span id="precioEntrada">${transaccion.precio}</span></p>
            </div>
            <img src=${transaccion.imagen} width="200" alt="${transaccion.nombre}">
        </div>
        <p><small>Ingrese codigo de descuento: </small><input id="codigoDescuento" type="text"></p>
        <p><small>Si desea continuar, presione "Aceptar".</small></p>
        <p><small>Si desea realizar alguna modificacion, presione en "Cancelar"</small></p>
        <div class="contenedor-botones-checkout">
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary" type="button" id="aceptarCheckout">Aceptar</button>
                <button class="btn btn-secondary" type="button" id="cancelarCheckout">Cancelar</button>
            </div>
        </div>`
    }); 
    document.getElementById('cancelarCheckout').addEventListener('click', (e) => {
        contenedorCheckout.classList.toggle('checkout-active');
    });

    document.getElementById('aceptarCheckout').addEventListener('click', (e) => {
        const codigoDescuento = document.getElementById('codigoDescuento');
        const precioParcial = transaccion.reduce((acc, elemento) => acc + (elemento.precio * elemento.cantidad), 0);
        
        const precioTotal = verificarDescuento(precioParcial, codigoDescuento.value);

        contenedorCheckout.classList.toggle('checkout-active');
        Swal.fire({
            title: 'Calculando Transaccion',
            html: 'Verificando y aplicando descuentos',
            timer: 3000,
            timerProgressBar: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            didOpen: () => {
                Swal.showLoading()
            },
        }).then((result) => {
            mostrarTransaccionFinalizada(precioTotal);
        })
    });
};

const mostrarTransaccionFinalizada = (precio) => {
    const contenedor = document.getElementById('contenedor-transaccion');
    contenedorCheckout.classList.toggle('checkout-active');

    transaccion.forEach(transaccion => {
    contenedor.innerHTML = `
        <div class="contenedor-informacion">
            <div>
                <p>Pelicula</p>
                <p id="nombrePelicula">${transaccion.nombre}</p>
                <p>Formato: <span id="formatoPelicula">${transaccion.formato}</span></p>
                <p>Fecha: <span id="fechaHoraPelicula">${transaccion.fecha}</span></p>
                <p>Cantidad Entradas: <span id="cantidadEntradas">${transaccion.cantidad}</span></p>
                <p>Precio por Entrada: $<span id="precioEntrada">${transaccion.precio}</span></p>
            </div>
            <img src=${transaccion.imagen} width="200" alt="${transaccion.nombre}">
        </div>
        <p><small>El total de la transaccion es: </small><span>$${precio}</span></p>
        <p><small>Gracias por su compra.</small></p>
        <div class="contenedor-botones-checkout">
            <div class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary" type="button" id="finalizarCompra">Finalizar</button>
            </div>
        </div>`
    });

    document.getElementById('finalizarCompra').addEventListener('click', (e) => {
        contenedorCheckout.classList.toggle('checkout-active');

        Toastify({
            text: "Transaccion Finaliza con Exito.",
            duration: 3000,
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to left, #00b09b, #96c93d)",
            },
          }).showToast();

        //Los datos de la transaccion se eliminan al terminar la misma
        transaccion.length = 0;
        //Tambien es posible de ser necesario que eliminen los datos de localstorage al terminar la operacion
        //localStorage.clear();
        //Recarga la pagina al terminar para iniciar el proceso desde cero nuevamente
        //window.location.reload();
    });
}

const verificarDescuento = (precio, codigoDescuento) => {
    let precioDescuento = 0;

    const fechaFlag = transaccion.some ((pelicula) => pelicula.fecha.includes('LUNES') || pelicula.fecha.includes('MIERCOLES') || pelicula.fecha.includes('VIERNES'));

    fechaFlag && (precioDescuento = precio * 0.85);

    if ((codigoDescuento.trim().toUpperCase()) === 'CODER'){
        precioDescuento === 0 ? precioDescuento = precio * 0.50 : precioDescuento = precioDescuento * 0.50;
    } else if (precioDescuento === 0) {
        return(precio);
    }

    return(precioDescuento);
};

const agregarTransaccion = (pelicula, formato, cantidad, fecha, horario) => {
    pelicula.cantidad = cantidad;
    pelicula.fecha = fecha + '. ' + horario;
    pelicula.formato = formato;
    
    transaccion.push(pelicula)
};

actualizarSeleccion();