/*import '../html/views/index.html';
import '../html/views/services.html';*/
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/main.scss';
import $ from 'jquery';
import './slick.min.js';
import mixitup from 'mixitup';

function activateDropDownOnMobile() {
    const triangleIcons = document.querySelectorAll('.triangle-icon')

    if (triangleIcons.length === 0) return
    triangleIcons.forEach(icon => {
        const subMenu = icon.parentNode.querySelector('.nav-item-submenu')
        icon.addEventListener('click', () => {
                icon.classList.toggle('expand')
                subMenu.classList.toggle('expand')
        })
    })
}

function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
        .test(navigator.userAgent)
}

function setRouteMap() {
    const routeLink = document.getElementById('map_route')
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            routeLink.setAttribute('href', ` https://yandex.ru/maps/?rtext=${position.coords.latitude},${position.coords.longitude}~57.003145,40.944474&rtt=auto`)
        })
    } else {
        routeLink.setAttribute('href', `https://yandex.ru/maps/?pt=40.944474,57.003145&z=18&l=map`)
    }
}

function activateFooterMenu() {

    if (!isMobile()) return
    setRouteMap()
    const menuWrap = document.querySelector('.footer_menu_wrap')
    const toggleMenuIcon = menuWrap.querySelector('.footer_menu_toggle')
    const iconsMenuArr = menuWrap.querySelectorAll('.footer_menu_icon')

    if (!menuWrap && !toggleMenuIcon && !iconsMenuArr) return;
    menuWrap.style.display = 'flex'
    toggleMenuIcon.addEventListener('click', () => {
        menuWrap.classList.toggle('collapsed')
        iconsMenuArr.forEach((icon, idx) => {
            if (idx === 1) return
            icon.classList.toggle('bounce')
        })
    })

}

function toggleClassForSearchInput(hiddenBlocks, searchBlock, searchInput) {

    hiddenBlocks.forEach(block => {
        if (block.classList.contains('d-none')) {
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

function toggleClassForGifBlock(block) {
    const img = block.querySelector('.img')
    const video = block.querySelector('.gif')

    if (img && video) {
        img.classList.add('d-none')
        video.classList.remove('d-none')
    }
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
        searchCloseIcon.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
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
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000
    })

    $('.slider-specialists').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    })
}

function activateGifs() {
    const videoBlocks = document.querySelectorAll('.section-services-card_img_wrap')
    if (videoBlocks) {
        videoBlocks.forEach(block => {
            block.addEventListener('mouseover', function () {
                toggleClassForGifBlock(this)
            })
            block.addEventListener('mouseout', function () {
                const img = this.querySelector('.img')
                const video = this.querySelector('.gif')
                if (img && video) {
                    img.classList.remove('d-none')
                    video.classList.add('d-none')
                }
            })
        })
    }
}

function activateServicesDropDown() {
    const buttonAllServices = document.querySelectorAll('.section-services-card_btn')
    if (buttonAllServices) {
        buttonAllServices.forEach(btn => {
            btn.addEventListener('click', function (event) {
                event.preventDefault()
                const wrapBlockServices = this.parentElement.querySelector('.section-services-card_service_wrap')
                wrapBlockServices.classList.toggle('show')
                this.innerText = this.innerText === 'Показать ещё' ? 'Свернуть' : 'Показать ещё';
            })
        })
    }
}

function togglePopups() {
    const popupLinks = document.querySelectorAll('.popup-link')
    const body = document.querySelector('body')
    const lockPadding = document.querySelectorAll('.lock-padding')
    const popupCloseIcon = document.querySelectorAll('.popup-close')

    let unlock = true

    const timeout = 800

    if (popupLinks.length > 0) {
        popupLinks.forEach(popupLink => {
            popupLink.addEventListener('click', (event) => {
                const popupID = popupLink.getAttribute('aria-details')
                const popup = document.querySelector('#' + popupID)
                popupOpen(popup)
                event.preventDefault()
            })
        })
    }

    if (popupCloseIcon.length > 0) {
        popupCloseIcon.forEach(closeIcon => {
            closeIcon.addEventListener('click', (event) => {
                popupClose(closeIcon.closest('.popup'))
                event.preventDefault()
            })
        })
    }

    function popupOpen(currentPopup) {
        if (currentPopup && unlock) {
            bodyLock()
            currentPopup.classList.add('open')
            currentPopup.addEventListener('click', (event) => {
                if (!event.target.closest('.popup-content')) {
                    popupClose(event.target.closest('.popup'))
                }
            })
        }
    }

    function popupClose(popupActive) {
        if (unlock) {
            popupActive.classList.remove('open')
            bodyUnlock()
        }
    }

    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'

        if (lockPadding.length > 0) {
            lockPadding.forEach(el => {
                el.style.paddingRight = lockPaddingValue
            })
        }
        body.style.paddingRight = lockPaddingValue
        body.classList.add('lock')

        unlock = false
        setTimeout(() => {
            unlock = true
        }, timeout)
    }

    function bodyUnlock() {
        setTimeout(() => {
            lockPadding.forEach(el => {
                el.style.paddingRight = '0px'
            })
            body.style.paddingRight = '0px'
            body.classList.remove('lock')
        }, timeout)

        unlock = false
        setTimeout(() => {
            unlock = true
        }, timeout)
    }
}

function activateBurgerMenu() {
    const iconMenu = document.querySelector('.menu_icon')

    if (iconMenu) {
        const menuBody = document.querySelector('.menu_body')
        const menuBodyHeader = document.querySelector('.menu_body_header')

        iconMenu.addEventListener('click', () => {
            const headerHeight = document.querySelector('header').offsetHeight - window.scrollY
            if (menuBody && menuBodyHeader && headerHeight) {
                menuBody.style.top = headerHeight + 'px'
                menuBodyHeader.style.top = headerHeight + 'px'
                iconMenu.classList.toggle('active')
                document.body.classList.toggle('lock')
                menuBody.classList.toggle('active')
                menuBodyHeader.classList.toggle('active')
            }
        })
    }
}

function activateMixinUp() {
    const container = document.querySelector('#Container')
    if (container) {
        let mixer = mixitup(container)
    }
}

function activatePersonalAccordion() {
    const arrAccord = document.querySelectorAll('.section-services-price-block_wrap.accordion')

    function toggleImg(src) {
        return src.endsWith('plus_accordion.png') ? src.split('plus_accordion.png')[0] + 'minus-accordion.png' : src.split('minus-accordion.png')[0] + 'plus_accordion.png'
    }

    if (arrAccord) {
        arrAccord.forEach(element => {
            element.addEventListener('click', () => {
                const img = element.querySelector('img')
                const parent = element.parentElement
                if (parent) {
                    const info = parent.querySelector('.section-services-price-block_info')
                    if (info) {
                        if (img) {
                            img.src = toggleImg(img.src)
                            info.classList.toggle('open')
                        }
                    }
                }
            })
        })
    }

}

document.addEventListener('DOMContentLoaded', () => {
    activateFooterMenu()
    activateSearchInput()
    activateSlick()
    activateGifs()
    activateServicesDropDown()
    togglePopups()
    activateBurgerMenu()
    activateMixinUp()
    activatePersonalAccordion()
    activateDropDownOnMobile()
})