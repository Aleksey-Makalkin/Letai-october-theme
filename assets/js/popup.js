// element ---> то самое окно, в котором мы сейчас находимся

function activeListenerElement(element) {
    element.querySelector('.popup-car-button-scroll-form').onclick = () => {
        element.querySelector('.popup-submit-application__title').scrollIntoView({
            block: 'start',
            behavior: 'smooth'
        })
    }

    // ПРоверка статуса машины
    document.querySelectorAll('.popup-car__status.status_1').forEach(el => el.textContent = 'Занят')

    element.querySelectorAll('.popup-car__back').forEach(el => {
        el.onclick = () => {
            element.style.display = 'none'
            document.querySelector('.body__container').style.height = 'auto'
            window.scrollTo({
                top: 0,
                behavior: 'auto'
            })
            window.location.href = '#'
        }
    })

    element.querySelectorAll('.personal-information-txt-click').forEach(el => {
        el.onclick = () => element.querySelector('.personal-information-checkbox').click()
    })

    const popupCarSlider = element.querySelector('.popup-car__slider')
    const popupImgLeftBtn = element.querySelector('.popup-car__slider-left-btn')
    const popupImgRightBtn = element.querySelector('.popup-car__slider-right-btn')
    const popupImgFirst = element.querySelector('.popup-car__image')
    let count = 0
    const dots = element.querySelectorAll('.popup-car__slider-dot')
    popupImgLeftBtn.onclick = () => {
        if (count > 0) {
            count--
            popupImgFirst.style.marginLeft = -count * popupImgFirst.clientWidth + 'px'
            dots.forEach(el => {
                el.classList.remove('popup-car__slider-dot_active')
            })
            dots[count].classList.add('popup-car__slider-dot_active')
        } else {
            count = 3
            popupImgFirst.style.marginLeft = -count * popupImgFirst.clientWidth + 'px'
            dots.forEach(el => {
                el.classList.remove('popup-car__slider-dot_active')
            })
            dots[count].classList.add('popup-car__slider-dot_active')
        }
    }
    popupImgRightBtn.onclick = () => {
        if (count < 3) {
            count++
            popupImgFirst.style.marginLeft = -count * popupImgFirst.clientWidth + 'px'
            dots.forEach(el => {
                el.classList.remove('popup-car__slider-dot_active')
            })
            dots[count].classList.add('popup-car__slider-dot_active')
        } else {
            count = 0
            popupImgFirst.style.marginLeft = -count * popupImgFirst.clientWidth + 'px'
            dots.forEach(el => {
                el.classList.remove('popup-car__slider-dot_active')
            })
            dots[count].classList.add('popup-car__slider-dot_active')
        }
    }

    const sliderImgContainer = element.querySelector('.popup-car__images-container')
    function imgContaineMouseMove(ev) {
        if (ev.clientX < window.innerWidth / 2) {
            popupImgLeftBtn.style.opacity = '0.8'
            popupImgRightBtn.style.opacity = '0'
        } else {
            popupImgLeftBtn.style.opacity = '0'
            popupImgRightBtn.style.opacity = '0.8'
        }
    }
    function containerLeave() {
        popupImgLeftBtn.style.opacity = '0'
        popupImgRightBtn.style.opacity = '0'
    }
    sliderImgContainer.onmousemove = imgContaineMouseMove
    popupImgLeftBtn.onmousemove = imgContaineMouseMove
    popupImgRightBtn.onmousemove = imgContaineMouseMove
    sliderImgContainer.onmouseleave = containerLeave
    popupImgLeftBtn.onmouseleave = containerLeave
    popupImgRightBtn.onmouseleave = containerLeave

    // Swipe slider
    let isTouchSLider = false
    let xPos = false
    let yPos = false
    popupCarSlider.ontouchmove = (ev) => {
        if (!isTouchSLider) {
            isTouchSLider = true
            xPos = ev.touches[0].clientX
            yPos = ev.touches[0].clientY
        }
    }
    popupCarSlider.ontouchend = (ev) => {
        if (xPos && yPos) {
            if ((ev.changedTouches[0].clientY - yPos) < 40 && (ev.changedTouches[0].clientY - yPos) > -40) {
                if ((ev.changedTouches[0].clientX - xPos) > 35) {
                    popupImgLeftBtn.click()
                }
                if ((ev.changedTouches[0].clientX - xPos) < -35) {
                    popupImgRightBtn.click()
                }
            }
        }
        isTouchSLider = false
        xPos = false
        yPos = false
    }

    const popupSlider = element.querySelector('.popup-car__slider')
    popupSlider.style.height = (popupSlider.clientWidth / 2) + 'px'
    let saveWidth = window.innerWidth
    window.addEventListener('resize', () => {
        if (window.innerWidth !== saveWidth) {
            saveWidth = window.innerWidth
            popupSlider.style.height = (popupSlider.clientWidth / 1.8) + 'px'
            popupImgFirst.style.marginLeft = '0px'
            document.querySelector('.body__container').style.height =
                element.scrollHeight - 100 + 'px'
        }
    })
}