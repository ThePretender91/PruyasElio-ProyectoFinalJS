const peliculas =
[
    {
        id: 1,
        nombre: "One Piece Film Red",
        origen: "Japon",
        genero: "Animacion",
        direccion: "Goro Taniguchi",
        duracion: 115,
        calificacion: "+ 13",
        sinopsis: "Los Piratas de Sombrero de Paja van a un festival de música en la isla de Elegia a ver el concierto de Uta, una diva de enorme fama. Lo que iba a ser un concierto normal es interrumpido por una gran revelación por parte de Luffy: Uta es hija del Emperador Pirata Shanks.",
        estrellas: 4.7,
        formato:'',
        cantidad: 0,
        fecha: '',
        precio: 800,
        imagen:'img/onepiecefilmred.jpg'
    },

    {
        id: 2,
        nombre: "Halloween Ends",
        origen: "Estados Unidos",
        genero: "Terror",
        direccion: "David Gordon Green",
        duracion: 111,
        calificacion: "+ 16",
        sinopsis: "Cuatro años después de los sucesos de Halloween Kills: La Noche Aún No Termina, Laurie vive con su nieta Allyson (Andi Matichak) y está terminando de escribir su novela autobiográfica. Michael Myers no ha sido visto desde entonces. Laurie, después de permitir que el espectro de Michael determinara e impulsara su realidad durante décadas, ha decidido liberarse del miedo y la ira y aceptar la vida. Pero cuando un joven, Corey Cunningham (Rohan Campbell; The Hardy Boys, Un lugar para soñar), es acusado de matar a un niño que él cuidaba, se desencadena una serie de violencia y terror que obligará a Laurie a enfrentarse finalmente al mal que no puede controlar, de una vez por todas.",
        estrellas: 3.4,
        formato:'',
        cantidad: 0,
        fecha: '',
        precio: 700,
        imagen:'img/halloweenlanochefinal.jpg'
    },

    {
        id: 3,
        nombre: "Star Wars Episode VIII",
        origen: "Estados Unidos",
        genero: "Ciencia Ficcion",
        direccion: "Rian Johnson",
        duracion: 152,
        calificacion: "+ 13",
        sinopsis: "La joven chatarrera Rey procedente de Jakku, Finn el ex stormtrooper que escapa de las garras la Primer Orden y Poe, el piloto de la Resistencia se unen a las leyendas galácticas en una épica aventura en la que se develarán misterios milenarios de la Fuerza e impactantes revelaciones del pasado.",
        estrellas: 4.0,
        formato:'',
        cantidad: 0,
        fecha: '',
        precio: 600,
        imagen:'img/starwarsviii.jpg'
    },

    {
        id: 4,
        nombre: "Memento",
        origen: "Estados Unidos",
        genero: "Suspenso",
        direccion: "Christopher Nolan",
        duracion: 113,
        calificacion: "+ 13",
        sinopsis: "Un hombre que tiene su memoria dañada y no puede crear recuerdos a corto plazo, intentará rastrear al asesino de su esposa con la ayuda de una polaroid y tatuandose notas en su cuerpo.",
        estrellas: 5.0,
        formato:'',
        cantidad: 0,
        fecha: '',
        precio: 500,
        imagen:'img/memento.jpg'
    },

    {
        id: 5,
        nombre: "Minions: The Rise of Gru",
        origen: "Estados Unidos",
        genero: "Infantil",
        direccion: "Kyle Balda",
        duracion: 88,
        calificacion: "ATP",
        sinopsis: "Regresan los minions en una nueva aventura en la cual se encuentran con un joven Gru de tan solo 12 años cuyo único anhelo en la vida es convertirse en el villano más grande del mundo.",
        estrellas: 3.7,
        formato:'',
        cantidad: 0,
        fecha: '',
        precio: 300,
        imagen:'img/minions2.jpg'
    },

    {
        id: 6,
        nombre: "Free Guy",
        origen: "Japon",
        genero: "Animacion",
        direccion: "Shawn Levy",
        duracion: 120,
        calificacion: "+ 13",
        sinopsis: "Un cajero de banco solitario (Ryan Reynolds) descubre que en realidad es un personaje de fondo en Free City, un videojuego de mundos virtuales donde todos los días pasa exactamente lo mismo. Hasta que un día decide convertirse en el personaje principal del juego y alterar las reglas.",
        estrellas: 4.5,
        formato:'',
        cantidad: 0,
        fecha: '',
        precio: 400,
        imagen:'img/freeguy.jpg'
    }
]

//Carga opciones de peliculas
const cargarCarteleraSelect = (peliculas) => {
    const seleccionador = document.getElementById('pelicula');

    if (seleccionador!==null) {
        seleccionador.innerHTML = '';
        const option = document.createElement('option');
        option.textContent = 'Seleccione Pelicula...';
        option.value = 0;
        seleccionador.appendChild(option);
    
        peliculas.forEach(pelicula => {
            const option = document.createElement('option');
    
            option.textContent = pelicula.nombre;
            option.value = pelicula.precio;
            seleccionador.appendChild(option);
        });
    }
};

cargarCarteleraSelect(peliculas);