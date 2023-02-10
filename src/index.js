import './css/styles.css';
import NewsApiService from './components/fetchCountries';
import Notiflix from 'notiflix';

const newsApiService = new NewsApiService();
const debounce = require('lodash.debounce');

Notiflix.Notify.init({
    width: '500px',
    position: 'center-top',
    distance: '30px',
    fontSize: '18px',
    cssAnimationStyle: 'from-top',
    closeButton: true,
})

const DEBOUNCE_DELAY = 1000;

const refs = {
  searchLine: document.querySelector('input'),
  countryList: document.querySelector('.country-list'),
  countryConteiner: document.querySelector('.country-info'),
};

const { searchLine, countryList, countryConteiner } = refs;

searchLine.addEventListener(
  'input',
  debounce(onSearchLineInput, DEBOUNCE_DELAY)
);

function onSearchLineInput(event) {
  newsApiService.searchСountry = event.target.value.trim();

  if (newsApiService.searchСountry !== '') {
    clearCardContainer();
    newsApiService
      .fetchCountries()
      .then(appendCardCountry)
      .catch(error => fetchError(error));
  }
}

function appendCardCountry(data) {
  if (data.length === 1) {
    const markupCard = data
      .flatMap(
        ({ name, capital, population, flags, languages }) =>
          ` <h1>
            <img src='${flags.svg}' alt='${flags.alt}' width='100' />
            ${name.official}
            </h1>
            <p><span>Capital: </span>${capital}</p>
            <p><span>Population: </span>${population}</p> 
            <p><span>Languages: </span>${Object.values(languages).join(', ')}</p>`
      )
      .join('');
    countryConteiner.insertAdjacentHTML('beforeend', markupCard);
  } else if (data.length >= 2 && data.length <= 10) {
    const markupList = data
      .flatMap(
        ({ name, flags }) =>
          `<li>
          <img src='${flags.svg}' alt='${flags.alt}' width='100' />
          <h1>${name.official}</h1>
        </li>`
      )
      .join('');
    countryList.insertAdjacentHTML('beforeend', markupList);
  } else {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
}

function clearCardContainer() {
  countryConteiner.innerHTML = '';
  countryList.innerHTML = '';
}

function fetchError(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
