'use strcit'

const searchList = [
    'counter-strike',
    'dota',
    'fortnite',
    'overwatch',
    'pubg',
    'rainbow six',
    'valorant',
    'apex legends',
]

function onInit() {
    onSearch(true)
    loadSearchHistory()
}

function onSearch(randomSearch = false) {

    var searchValue
    if (randomSearch) {
        searchValue = searchList[Math.floor(Math.random() * searchList.length)]
    } else {
        searchValue = document.querySelector('#search-input').value
    }

    var searchHistory = loadFromStorage(searchValue + 'YT_DB')

    if (searchHistory) {
        renderYTResults(searchHistory)
        renderWikiResults(loadFromStorage(searchValue + 'WIKI_DB'))

        return
    }

    searchYoutube(searchValue)
        .then(res => {
            renderYTResults(res)
            saveToStorage(searchValue + 'YT_DB', res)
            loadSearchHistory()

            return res
        })
        .catch(err => {
            console.error('Error fetching Youtube data:', err)
        })

    searchWiki(searchValue)
        .then(res => {
            renderWikiResults(res)
            saveToStorage(searchValue + 'WIKI_DB', res)
            loadSearchHistory()

            return res
        })
        .catch(err => {
            console.error('Error fetching Wiki data:', err)
        })
}

function renderYTResults(res) {
    const ytContainer = document.querySelector('.video-list')
    const videoPlayer = document.querySelector('.video-player') 

    ytContainer.innerHTML = ''

    if (res.length > 0) {
        const firstVideoId = res[0].id.videoId
        const firstVideoUrl = `https://www.youtube.com/embed/${firstVideoId}`
        if (videoPlayer) {
            videoPlayer.src = firstVideoUrl
        } else {
            console.error('Video player iframe not found')
        }
    }

    res.forEach(item => {
        const videoId = item.id.videoId
        const videoUrl = `https://www.youtube.com/embed/${videoId}` 
        const videoTitle = item.snippet.title
        const thumbnailUrl = item.snippet.thumbnails.default.url

        // Create a container for each video
        const videoItem = document.createElement('div')
        videoItem.classList.add('video-item') // Add a class for styling

        // Add the thumbnail
        const thumbnail = document.createElement('img')
        thumbnail.src = thumbnailUrl
        thumbnail.alt = videoTitle
        thumbnail.classList.add('video-thumbnail') // Add a class for styling

        // Add the title
        const title = document.createElement('span') // Use a span instead of a link
        title.textContent = videoTitle
        title.classList.add('video-title') // Add a class for styling
        title.style.cursor = 'pointer' // Make it look clickable

        // Add a click event to update the iframe's src
        title.addEventListener('click', () => {
            if (videoPlayer) {
                videoPlayer.src = videoUrl // Update the iframe's src
            } else {
                console.error('Video player iframe not found')
            }
        })

        // Append thumbnail and title to the video item
        videoItem.appendChild(thumbnail)
        videoItem.appendChild(title)

        // Append the video item to the container
        ytContainer.appendChild(videoItem)
    })
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

function loadSearchHistory() {
    const searchHistory = getSearchHistory()
    const searchHistoryContainer = document.querySelector('.search-history')

    searchHistoryContainer.innerHTML = ''

    searchHistory.forEach(item => {
        const searchItem = document.createElement('div')
        searchItem.classList.add('search-item')
        searchItem.textContent = item
        searchItem.addEventListener('click', () => {
            document.querySelector('#search-input').value = item
            onSearch()
        })
        searchHistoryContainer.appendChild(searchItem)
    })
}

function onClearHistory() {
    const modal = document.getElementById('confirm-modal')
    modal.classList.remove('hidden')
}

function onConfirmClearHistory() {
    localStorage.clear() 
    const searchHistoryContainer = document.querySelector('.search-history')
    searchHistoryContainer.innerHTML = ''

    const modal = document.getElementById('confirm-modal')
    modal.classList.add('hidden')
}

function onCancelClearHistory() {
    const modal = document.getElementById('confirm-modal')
    modal.classList.add('hidden')
}

function onOpenThemeModal() {
    const modal = document.getElementById('theme-modal')
    modal.classList.remove('hidden')
}

function onConfirmThemeChange() {
    const colorPicker = document.getElementById('theme-color-picker')
    const selectedColor = colorPicker.value

    document.body.style.backgroundColor = selectedColor

    const modal = document.getElementById('theme-modal')
    modal.classList.add('hidden')
}

function onCancelThemeChange() {
    const modal = document.getElementById('theme-modal')
    modal.classList.add('hidden')
}