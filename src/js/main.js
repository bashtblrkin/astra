import '../index.html';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/main.scss';
import $ from 'jquery';
import './slick.min.js';

function toggleClassForSearchInput(hiddenBlocks, searchBlock, searchInput) {

    hiddenBlocks.forEach(block => {
        if ( block.classList.contains('d-none')) {
            setTimeout(() => block.classList.remove('d-none'), 300)
        } else {
            block.classList.add('d-none')
        }
    })

    if (searchBlock.classList.contains('visually-hidden')) {
        searchBlock.classList.remove('visually-hidden')
    } else {
        setTimeout(() => searchBlock.classList.add('visually-hidden'), 300)
    }

    searchInput.classList.toggle('open')
}

function activateSearchInput() {
    const hiddenBlocks = document.querySelectorAll('.nav-hidden-block')
    const searchIcon = document.querySelector('.nav-search')
    const searchBlock = document.querySelector('.nav-search-block')
    const searchCloseIcon = document.querySelector('#search-close')
    const searchInput = document.querySelector('.nav-input')

    if (searchIcon) {
        searchIcon.addEventListener('click', () => {
            if (hiddenBlocks && searchBlock && searchInput) {
                toggleClassForSearchInput(hiddenBlocks, searchBlock, searchInput)
            }
        })
    }

    if (searchCloseIcon) {
        searchCloseIcon.addEventListener('click', () => {
            if (hiddenBlocks && searchBlock) {
                toggleClassForSearchInput(hiddenBlocks, searchBlock, searchInput)
            }
        })
    }
}

function activateSlick() {
    $('.slider-main').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    })
}

document.addEventListener('DOMContentLoaded', () => {
    activateSearchInput()
    activateSlick()
})