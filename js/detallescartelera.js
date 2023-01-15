const apiKey = 'ce4f360e';

const contenedorCartelera = document.getElementById('contenedor-cartelera');
const contenedorInfoPelicula = document.getElementById('contenedor-info');


const cargarPostersCartelera = (peliculas) => {
    contenedorInfoPelicula.innerHTML = '';
    contenedorInfoPelicula.classList.toggle('contenedor');

    peliculas.forEach(pelicula => {
        contenedorCartelera.innerHTML = contenedorCartelera.innerHTML + `
        <div id = '${pelicula.nombre}' class="contenedor-poster-pelicula col">
            <img  id = '${pelicula.nombre}' src="../${pelicula.imagen}" alt="${pelicula.nombre}" width= "400px" height= "600px">
            <p  id = '${pelicula.nombre}' class="cartelera-nombre-pelicula">${pelicula.nombre}</p>
        </div>`
    });
};

const buscarInfoAPI = async (nombre, apikey) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${nombre}&apikey=${apikey}`);
        const info = await response.json();

        mostrarDetallesSeleccion(info);        
    } catch (error) {
        console.log(error)
    }
}

const mostrarDetallesSeleccion  = (infoPelicula) => {
    contenedorCartelera.innerHTML = '';
    contenedorInfoPelicula.classList.add('contenedor');

    contenedorInfoPelicula.innerHTML = `
    <div class="info">
        <img src=${infoPelicula.Poster} alt=${infoPelicula.Title}>
    </div>
    <div class="info">
        <h2>${infoPelicula.Title}</h2>
        <p>Año: ${infoPelicula.Year}</p>
        <p>Clasificacion: ${infoPelicula.Rated}</p>
        <p>Fecha Estreno: ${infoPelicula.Released}</p>
        <p>Duracion: ${infoPelicula.Runtime}</p>
        <p>Genero: ${infoPelicula.Genre}</p>
        <p>Director: ${infoPelicula.Director}</p>
        <p>Escritores: ${infoPelicula.Writer}</p>
        <p>Actores: ${infoPelicula.Actors}</p>
        <p>Pais: ${infoPelicula.Country}</p>
        <p>Estrellas: ${infoPelicula.Ratings[0].Value} </p>
        
        <div class="botones-cartelera">
            <div id="contenedorBotonesCartelera" class="d-grid gap-2 d-md-block">
                <button class="btn btn-primary" type="button" id="irAComprar">Comprar Entradas</button>
                <button class="btn btn-secondary" type="button" id="volverCartelera">Volver</button>
            </div>
        </div>
    </div>`
    
    document.getElementById('contenedorBotonesCartelera').addEventListener('click', (e) => {
        const seleccion = e.target.id;

        if (seleccion === 'volverCartelera') {                      
            cargarPostersCartelera(peliculas);
            contenedorInfoPelicula.classList.remove('contenedor');
        } else if (seleccion === 'irAComprar') {
            location.href = '../index.html';
        }
    });
};

contenedorCartelera.addEventListener('click', (e) => {
const nombreCarteleraPelicula = e.target.id;

if (nombreCarteleraPelicula !== 'contenedor-cartelera') {
    buscarInfoAPI(nombreCarteleraPelicula,apiKey);
}
});

cargarPostersCartelera(peliculas);