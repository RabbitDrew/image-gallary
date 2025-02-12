import { elCreator } from "./element_creator.js";
import { elRender } from "./element_render.js";
import {renderImages} from "./render_images.js"
import { createModalWindow } from "./modal.js";


const page = document.querySelector('.page')
const main = document.querySelector('.page-main')




const input = document.querySelector('.search-input')
const btnSearch = document.querySelector('.btn-search__wrapper')
const imgBlock = document.querySelector('.images__wrapper');



let  numPage = document.querySelector('.page_number')
const btnLeft = document.querySelector('.left__wrapper')
const btnRight = document.querySelector('.right__wrapper')

const rondomStartImages = ['summer','autumn', 'winter', 'spring', 'fireplace and cozy home', 'space', 'earth']

let request
let url
let currentPage = 1
let totalPages

const setSizeOfPage = function () {
    const getWindowSize = window.innerHeight;
    const getPageSize = page.scrollHeight;
    console.log(getWindowSize, getPageSize)
   if (getPageSize > getWindowSize) {
    page.style.height = getPageSize + 'px'; 
    }else {
    page.style.height = getWindowSize + 'px'; 
    }
}

const shuffleWords = (arrOfWords) => {
    for (let i = arrOfWords.length-1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arrOfWords[i],arrOfWords[j]]=[arrOfWords[j],arrOfWords[i]]
    }
    return arrOfWords[0]
    }
    
const getRequestToSearch = () => { 
    let result 
    if (input.value !=="") {
        result = input.value
    }else {
        result = request
    }
    return result
}

const getData = function (url) {
    fetch(url)
    .then((res) => res.json())
    .then((data)=> {
      
        totalPages = data.total_pages
        const sourceData = data.results
        renderImages(imgBlock, elCreator, elRender, sourceData)
        createModalWindow(main, elCreator, elRender)
        setTimeout(setSizeOfPage, 100)

         console.log(data)
        //console.log(totalPages)
        //console.log(sourceData);

    })
}

const initStartImages = function () {
request = shuffleWords(rondomStartImages)
url = `https://api.unsplash.com/search/photos?query=${request}&client_id=3PWtDhDYdgtvdJ55l8Vor88ttqozhEM7dU3Ur9JrqmU`
getData (url)
}
initStartImages ()

const pageCounter = function (curPage, totalPages, left, right) {
    if (left && curPage > 1) {
        curPage -= 1; 
    } else if (right && curPage < totalPages) {
        curPage += 1; 
    }

    console.log(curPage, totalPages);
    return curPage; 
}


const searchHandler = function () {
    imgBlock.innerHTML = ''
    request = getRequestToSearch()
    currentPage = 1
    url = `https://api.unsplash.com/search/photos?query=${request}&client_id=3PWtDhDYdgtvdJ55l8Vor88ttqozhEM7dU3Ur9JrqmU&page=${currentPage}`
    getData (url)
    numPage.textContent = currentPage
}


const changePage = function (left, right) {
    imgBlock.innerHTML = ''
    currentPage = pageCounter(currentPage, totalPages, left, right);
    url = `https://api.unsplash.com/search/photos?query=${request}&client_id=3PWtDhDYdgtvdJ55l8Vor88ttqozhEM7dU3Ur9JrqmU&page=${currentPage}`
    getData (url)
    numPage.textContent = currentPage
}

input.addEventListener ('keydown', (event)=> {
    if (event.key === 'Enter') {
        searchHandler ()
    }
})

btnSearch.addEventListener('click', () => {
        searchHandler ()
})



btnLeft.addEventListener('click', () => {
    changePage (true, false)
});

btnRight.addEventListener('click', () => {
    changePage (false, true)
});


window.addEventListener('resize', () => {
    setSizeOfPage();
});

const  modalSection = document.querySelector('.main-modal')

document.addEventListener('click', (event) => {
    if (event.target === modalSection) {
        console.log('modalWin')
    }
})