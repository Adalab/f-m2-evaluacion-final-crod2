'use strict';

const searchContainer = document.querySelector('.search__container');
const title = document.querySelector('.search__container--title');
const input = document.querySelector('.search__container--input');
const button = document.querySelector('.search__container--button');
const resultsContainer = document.querySelector('.results__container');
const list = document.querySelector('.results__container--list');

const url = 'http://api.tvmaze.com/search/shows?q='

function getShows() {
    const userSearch = input.value;
    fetch(`${url}${userSearch}`)
    .then(response => response.json())
    .then(data => {
        for (const item of data) {
            console.log(item);
            const newItem = document.createElement('li');
            newItem.classList.add('results__item');
            const subtitle = document.createElement('h2');
            subtitle.classList.add('item__subtitle');
            const newName = document.createTextNode(item.show.name);
            const img = document.createElement('img');
            img.classList.add('item__img');
            if (data.image === null) {
                img.src = 'https://via.placeholder.com/250x250/';
            } else {
                img.src = item.show.image.medium;
            }
            subtitle.appendChild(newName);
            newItem.appendChild(subtitle);
            newItem.appendChild(img);
            list.appendChild(newItem);
        }
    })
}

button.addEventListener('click', getShows);
