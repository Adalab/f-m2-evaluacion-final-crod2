'use strict';

const searchContainer = document.querySelector('.container');
const title = document.querySelector('.search__container--title');
const input = document.querySelector('.search__container--input');
const button = document.querySelector('.search__container--button');
const resultsContainer = document.querySelector('.results__container');
const list = document.querySelector('.results__container--list');
const url = 'http://api.tvmaze.com/search/shows?q=';
let favShows = [];
const favList = document.querySelector('.favs__container--list');

function getShows() {
    const userSearch = input.value;
    list.innerHTML = '';
    fetch(`${url}${userSearch}`)
        .then(response => response.json())
        .then(data => {
            for (const item of data) {
                const newItem = document.createElement('li');
                newItem.classList.add('results__item');
                newItem.addEventListener('click', favs);
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

function favs(event) {
    event.currentTarget.classList.toggle('favourites');
    const title = event.currentTarget.querySelector('h2').innerHTML;
    const img = event.currentTarget.querySelector('img').src;
    if (event.currentTarget.classList.contains('favourites')) {
        favShows.push({
            name: title,
            image: img
        })
    } else {
        favShows.pop({
            name: title,
            image: img
        })
    }
   
    favList.innerHTML = '';
    for (const show of favShows) {
        const newShow = document.createElement('li');
        const favSubtitle = document.createElement('h3');
        const favName = document.createTextNode(show.name);
        const favImg = document.createElement('img');
        favImg.src = show.image;
        favSubtitle.appendChild(favName);
        newShow.appendChild(favSubtitle);
        newShow.appendChild(favImg);
        favList.appendChild(newShow);
    }
    savedData();
}
const savedData = () => {
    localStorage.setItem('saved__data', JSON.stringify(favShows));
}
const getData = () => {
    if (localStorage.getItem('saved__data') !== null) {
        favShows = JSON.parse(localStorage.getItem('saved__data'));
        for (const savedItem of favShows) {
            const newItem = document.createElement('li');
            const itemSubtitle = document.createElement('h3');
            const itemName = document.createTextNode(savedItem.name);
            const itemImg = document.createElement('img');
            itemImg.src = savedItem.image;
            itemSubtitle.appendChild(itemName);
            newItem.appendChild(itemSubtitle);
            newItem.appendChild(itemImg);
            favList.appendChild(newItem);
        }

    }
}
getData();
button.addEventListener('click', getShows);