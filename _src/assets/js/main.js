'use strict';

const searchContainer = document.querySelector('.search__container');
const title = document.querySelector('.search__container--title');
const input = document.querySelector('.search__container--input');
const button = document.querySelector('.search__container--button');
const resultsContainer = document.querySelector('.results__container');
const list = document.querySelector('.results__container--list');

const url = 'http://api.tvmaze.com/search/shows?q='

/* Por cada show contenido en el resultado de búsqueda debemos pintar una tarjeta donde mostramos una imagen de la serie y el título. */

function getShows() {
    const userSearch = input.value;
    fetch(`${url}${userSearch}`)
    .then(response => response.json())
    .then(data => {
        for (const item of data) {
            const newItem = document.createElement('li');
            newItem.classList.add('results__item');
            const subtitle = document.createElement('h2');
            subtitle.classList.add('item__subtitle');
            const newName = document.createTextNode(item.show.name);
            console.log(newName);
        }
    })
}




button.addEventListener('click', getShows);
