'use strict';

const searchContainer = document.querySelector('.search__container');
const title = document.querySelector('.search__container--title');
const input = document.querySelector('.search__container--input');
const button = document.querySelector('.search__container--button');
const resultsContainer = document.querySelector('.results__container');
const list = document.querySelector('.results__container--list');

const url = 'http://api.tvmaze.com/search/shows?q='
const favShows = [];
const favList = document.querySelector('.favs__container--list');
const savedData = JSON.parse(localStorage.getItem('saved__data'));

function getShows() {
    const userSearch = input.value;
    list.innerHTML = '';
    fetch(`${url}${userSearch}`)
    .then(response => response.json())
    .then(data => {
        for (const item of data) {
            const newItem = document.createElement('li');
            newItem.classList.add('results__item');
            newItem.addEventListener('click', changeColor);
            const subtitle = document.createElement('h2');
            subtitle.classList.add('item__subtitle');
            const newName = document.createTextNode(item.show.name);
            const img = document.createElement('img');
            img.classList.add('item__img');
            if (item.show.image === null) {
                img.src = 'https://via.placeholder.com/210x295/';
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

function changeColor() {
    if (event.currentTarget.classList.contains('favourites')) {
        event.currentTarget.classList.remove('favourites');
    } else {
        event.currentTarget.classList.add('favourites');
    }
    favs(event.currentTarget);
}

function favs(triggerElement) {
    const title = triggerElement.querySelector('h2').innerHTML;
    const img = triggerElement.querySelector('img').src;
    favShows.push({
        name: title,
        image: img
    })
    favList.innerHTML = '';
    for (const show of favShows) {
    const newShow = document.createElement('li');
    const favSubtitle = document.createElement('h4');
    const favName = document.createTextNode(show.name);
    const favImg = document.createElement('img');
    favImg.src = show.image;
    favSubtitle.appendChild(favName);
    newShow.appendChild(favSubtitle);
    newShow.appendChild(favImg);
    favList.appendChild(newShow); 
    }
    localStorage.getItem('saved__data', JSON.stringify(favShows));
}

button.addEventListener('click', getShows);
