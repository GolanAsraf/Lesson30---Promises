'use strcit'

const YT_KEY = 'AIzaSyDyPZ9sQ1jEwTfiD-RW0qKtswtTbaPvN4k'

// https://www.googleapis.com/youtube/v3/search?part=snippet&videoEm
// beddable=true&type=video&key=${YT_KEY}&q=${value}


function searchYoutube(value) {
    const YOUTUBE_API_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`
    return axios.get(YOUTUBE_API_URL)
        .then(response => {
            return response.data.items
        })
        .catch(err => {
            console.error('Error fetching Youtube data:', err)
        });
}
