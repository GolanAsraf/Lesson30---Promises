'use strcit'

function onInit() {
    console.log('Main Controller')
}

function onSearch() {
    const searchValue = document.querySelector('#search-input').value

    searchYoutube(searchValue)
        .then(res => {
            renderYTResults(res)
            return res
        })
        .catch(err => {
            console.error('Error fetching Youtube data:', err)
        })

    searchWiki(searchValue)
        .then(res => {
            renderWikiResults(res)
            return res
        })
        .catch(err => {
            console.error('Error fetching Wiki data:', err)
        })
}

function renderYTResults(res) {
    const ytContainer = document.querySelector('.video-list');
    const videoPlayer = document.querySelector('.video-player');
    
    ytContainer.innerHTML = '';

    res.forEach(item => {
        const videoId = item.id.videoId;
        const videoUrl = `https://www.youtube.com/embed/${videoId}`; // Embed URL for iframe
        const videoTitle = item.snippet.title;
        const thumbnailUrl = item.snippet.thumbnails.default.url;

        // Create a container for each video
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item'); // Add a class for styling

        // Add the thumbnail
        const thumbnail = document.createElement('img');
        thumbnail.src = thumbnailUrl;
        thumbnail.alt = videoTitle;
        thumbnail.classList.add('video-thumbnail'); // Add a class for styling

        // Add the title
        const title = document.createElement('span'); // Use a span instead of a link
        title.textContent = videoTitle;
        title.classList.add('video-title'); // Add a class for styling
        title.style.cursor = 'pointer'; // Make it look clickable

        // Add a click event to update the iframe's src
        title.addEventListener('click', () => {
            if (videoPlayer) {
                videoPlayer.src = videoUrl; // Update the iframe's src
            } else {
                console.error('Video player iframe not found');
            }
        });

        // Append thumbnail and title to the video item
        videoItem.appendChild(thumbnail);
        videoItem.appendChild(title);

        // Append the video item to the container
        ytContainer.appendChild(videoItem);
    });
}

function renderWikiResults(res) {
    const wikiContainer = document.querySelector('.wiki-container')

    wikiContainer.innerHTML = ''

    res.forEach(item => {
        const pageId = item.pageid
        const pageUrl = `https://en.wikipedia.org/?curid=${pageId}`
        wikiContainer.innerHTML += `<a href="${pageUrl}" target="_blank"><h3>${item.title}</h3><p>${item.snippet}</p></a>`
    })
}