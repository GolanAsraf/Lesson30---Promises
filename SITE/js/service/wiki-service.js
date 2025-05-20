'use strict'

function searchWiki(value) {
    const WIKI_API_URL = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${value}&format=json&origin=*`;
    return axios.get(WIKI_API_URL)
        .then(response => {
            return response.data.query.search;
        })
        .catch(err => {
            console.error('Error fetching Wiki data:', err);
        });
}