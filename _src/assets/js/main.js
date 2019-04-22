'use strict';

const searchContainer = document.querySelector('.search__container');
const title = document.querySelector('.search__container--title');
const input = document.querySelector('.search__container--input');
const button = document.querySelector('.search__container--button');
const resultsContainer = document.querySelector('.results__container');
const list = document.querySelector('.results__container--list');
const url = 'http://api.tvmaze.com/search/shows?q='

/* Al hacer clic sobre el botón de 'Buscar', nuestra aplicación debe conectarse al API abierto de TVMaze para búsqueda de series.*/

function getShows() {
    const userSearch = input.value;
    fetch(`${url}${userSearch}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }
        )
}

/* Para construir la URL de búsqueda necesitaremos recoger el texto que ha introducido el usuario en el campo de búsqueda. */

/* Por cada show contenido en el resultado de búsqueda debemos pintar una tarjeta donde mostramos una imagen de la serie y el título. */

button.addEventListener('click', getShows);
