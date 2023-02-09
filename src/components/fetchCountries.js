export default class NewsApiService {
    constructor() {
        this.searchСountry = '';
    }
    
    fetchCountries(searchСountry) {
        return fetch(`https://restcountries.com/v3.1/name/${this.searchСountry}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json()
            })
            .then(data => {
                console.log(data)
                return data;
            })
    }

}


