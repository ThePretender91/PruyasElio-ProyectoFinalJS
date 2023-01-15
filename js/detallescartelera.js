const apiKey = 'ce4f360e';

const contenedorCartelera = document.getElementById('contenedor-cartelera');


const cargarPostersCartelera = (peliculas) => {
    peliculas.forEach(pelicula => {
        contenedorCartelera.innerHTML = contenedorCartelera.innerHTML + `
        <div id = '${pelicula.nombre}' class="contenedor-poster-pelicula col">
            <img  id = '${pelicula.nombre}' src="../${pelicula.imagen}" alt="${pelicula.nombre}" width= "400px" height= "600px">
            <p  id = '${pelicula.nombre}' class="cartelera-nombre-pelicula">${pelicula.nombre}</p>
        </div>`
    });
};

cargarPostersCartelera(peliculas);

contenedorCartelera.addEventListener('click', (e) => {
const nombreCarteleraPelicula = e.target.id;

if (nombreCarteleraPelicula !== 'contenedor-cartelera') {
    buscarInfoAPI(nombreCarteleraPelicula,apiKey);
}
});

const buscarInfoAPI = async (nombre, apikey) => {
    try {
        const response = await fetch(`http://www.omdbapi.com/?t=${nombre}&apikey=${apikey}`);
        const info = await response.json();

        mostrarDetallesSeleccion(info);        
    } catch (error) {
        console.log(error)
    }
}

const mostrarDetallesSeleccion  = (infoPelicula) => {
    const contenedorInfoPelicula = document.getElementById('contenedor-info');

    contenedorInfoPelicula.innerHTML = `
    <div class="info">
        <img src=${infoPelicula.Poster} alt=${infoPelicula.Title} width="500px" height="700px" >
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
    </div>`
};