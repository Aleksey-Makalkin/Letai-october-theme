let url = ''
if (getCookie('my-utm')) {
    url = getCookie('my-utm')
} else {
    setCookie('my-utm', window.location.href)
    url = window.location.href
}

const menuBtn = document.querySelector('.menu-btn')
const closeMenuBtn = document.querySelector('.menu-popup__close')
const menu = document.querySelector('.menu-popup')

menuBtn.onclick = () => menu.classList.add('menu-popup_active')
closeMenuBtn.onclick = () => menu.classList.remove('menu-popup_active')

document.querySelector('.main__header-button').onclick = () => {
    document.querySelector('#car-park').scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    })
}

document.querySelector('.footer__logo-img').onclick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

document.querySelector('.header__navigation-item__cars').onclick = () => {
    document.querySelector('#car-park').scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    })
}

document.querySelector('.header__navigation-item__partner').onclick = () => {
    document.querySelector('.partner-other-container').style.zIndex = '600'
    document.querySelector('.partner-other-container').style.opacity = '1'
}

document.querySelector('.menu-popup__rest-item_partner').onclick = () => {
    document.querySelector('.partner-other-container').style.zIndex = '600'
    document.querySelector('.partner-other-container').style.opacity = '1'
}

document.querySelectorAll('.popup-car__image').forEach(el => {
    if (el.getAttribute('src') === '/storage/app/media/') {
        el.src = '/storage/app/media/car-images/default-wait-img.jpg'
    }
})

// Проверка статуса машины
document.querySelectorAll('.car-container__status.status_1').forEach(el => el.textContent = 'Занят')

// Маска для телефона
const customOptions = {
    onKeyPress: function(val, e, field, options) {

        if (val.replace(/\D/g, '').length===2)
        {
            val = val.replace('8','')
            field.val(val)
        }
        field.mask("+7 (999) 999-99-99", options)
    },
    placeholder: "+7 (___) ___-__-__"
}
$(".popup-car-form__input-phone").mask("+7 (999) 999-99-99", customOptions)


let popupCarElement = ''
document.querySelectorAll('.car-container__item').forEach((el, i) => {
    el.onclick = () => {
        popupCarElement = document.querySelectorAll('.popup-car')[i]
        popupCarElement.style.display = 'block'
        document.querySelector('.body__container').style.height =
            popupCarElement.scrollHeight - 100 + 'px'
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        })
        activeListenerElement(popupCarElement)
        window.location.href = `#${el.querySelector('.car-item-unique-number-and-name').textContent.trim().split(' ').join('_')}`
    }
})

const carData = JSON.parse(document.getElementById('car-data').textContent)
document.getElementById('car-data').remove()
const carItemsArr = document.querySelectorAll('.car-container__item')

carItemsArr.forEach((carEl, index) => {
    const uniqueName = carEl.querySelector('.car-item-unique-number-and-name').textContent.trim()
    carData.forEach(dataEl => {
        if (dataEl.custom_fields_values &&
            dataEl.custom_fields_values.find(el => el.field_code === 'CAR') &&
            dataEl.custom_fields_values.find(el => el.field_code === 'CAR').values[0] &&
            dataEl.custom_fields_values.find(el => el.field_code === 'CAR').values[0].value) {
            if (dataEl.custom_fields_values.find(el => el.field_code === 'CAR').values[0].value === uniqueName) {

                // Проверка на статут машины (в аренде)
                if (dataEl.status_id === 37624834) {

                    carEl.querySelector('.car-container__status').classList.remove('car-container__status_true')
                    carEl.querySelector('.car-container__status').classList.add('car-container__status_false')
                    carEl.querySelector('.car-container__status').textContent = 'Занят'

                    const popupCarEl = document.querySelectorAll('.popup-car')[index]
                    popupCarEl.querySelector('.popup-car__status').classList.remove('popup-car__status_true')
                    popupCarEl.querySelector('.popup-car__status').classList.add('popup-car__status_false')
                    popupCarEl.querySelector('.popup-car__status').textContent = 'Занят'

                    if (dataEl.custom_fields_values.find(el => el.field_id === 86191) &&
                        dataEl.custom_fields_values.find(el => el.field_id === 86191).values[0] &&
                        dataEl.custom_fields_values.find(el => el.field_id === 86191).values[0].value &&
                        carEl.querySelector('.car-container__price')) {

                        carEl.querySelector('.car-container__price').remove()
                        const timer = document.createElement('div')
                        timer.classList.add('car-container__timer')
                        let seconds = dataEl.custom_fields_values.find(el => el.field_id === 86191).values[0].value
                            - ~~(new Date().getTime() / 1000)
                        let newSeconds = seconds
                        const days = ~~(seconds / (3600*24))
                        seconds  -= days*3600*24
                        const hrs   = ~~(seconds / 3600)
                        seconds  -= hrs*3600
                        const mnts = ~~(seconds / 60)

                        timer.innerHTML =
                            `Освободится через: <br>
                            ${days} ${declOfNum(days, ['день', 'дня', 'дней'])},
                            ${hrs} ${declOfNum(hrs, ['час', 'часа', 'часов'])},
                            ${mnts} ${declOfNum(mnts, ['минуту', 'минуты', 'минут'])}`
                        if (days <= 0)
                            if (hrs <= 0)
                                if (mnts <= 0)
                                    timer.innerHTML = 'Скоро освободиться'

                        carEl.querySelector('.car-container__header').appendChild(timer)
                        setInterval(() => {
                            newSeconds--
                            let saveSeconds = newSeconds
                            const days = ~~(saveSeconds / (3600*24))
                            saveSeconds  -= days*3600*24
                            const hrs   = ~~(saveSeconds / 3600)
                            saveSeconds  -= hrs*3600
                            const mnts = ~~(saveSeconds / 60)
                            carEl.querySelector('.car-container__timer').innerHTML = `Освободится через: <br>
                            ${days} ${declOfNum(days, ['день', 'дня', 'дней'])},
                            ${hrs} ${declOfNum(hrs, ['час', 'часа', 'часов'])},
                            ${mnts} ${declOfNum(mnts, ['минуту', 'минуты', 'минут'])}`
                            if (days <= 0)
                                if (hrs <= 0)
                                    if (mnts <= 0)
                                        timer.innerHTML = 'Скоро освободиться'
                        }, 1000)

                    }

                }

            }
        }
    })
})



// ===========
let isFormWait = true
const form = document.querySelectorAll('.popup-car-form')
form.forEach(el => {
    el.addEventListener('submit', evt => {
        evt.preventDefault()
        if (el.querySelector('.popup-car-form__input-phone').value.length !== 18) alertFalseMobilePhone()
        else {
            if (!el.querySelector('.personal-information-checkbox').checked) alertFalsePersonalData()
            else {
                if (isFormWait) {
                    isFormWait = false
                    setTimeout(() => isFormWait = true, 15000)

                    const formData  = new FormData()
                    el.querySelector('.popup-car-form__container').querySelectorAll('input').forEach(input => {
                        formData.append(input.name, input.value)
                    })
                    const dateOneVal = el.querySelector('.popup-car-form__input_date-one').value.split('/')
                    const dateTwoVal = el.querySelector('.popup-car-form__input_date-two').value.split('/')
                    let days =
                        (new Date(dateTwoVal[0], dateTwoVal[1], dateTwoVal[2]).getTime() -
                            new Date(dateOneVal[0], dateOneVal[1], dateOneVal[2]).getTime()) / 1000
                        / 60 / 60 / 24
                    if (days < 0 || !days) days = 0
                    const costAll = [ ... el.parentNode.parentNode.parentNode.querySelectorAll('.price-table__td-cost')]
                        .map(el => +el.textContent.trim().split(' ')[0])
                    let totalCost = 0
                    if (days >= 1) totalCost = days * costAll[0]
                    if (days >= 2) totalCost = days * costAll[1]
                    if (days >= 7) totalCost = days * costAll[2]
                    if (days >= 10) totalCost = days * costAll[3]
                    if (days >= 15) totalCost = days * costAll[4]
                    formData.append('total-cost', totalCost.toString())
                    formData.append('url', url)
                    formData.append('google-id', getCookie('_gid'))
                    formData.append('yandex-id', getCookie('_ym_uid'))

                    for (let val of formData.entries()) {
                        console.log(val)
                    }

                    fetch('https://letai.pro/amoapi/send', {
                        method: 'POST',
                        body: formData
                    }).then(function(response){
                        if (response.status >= 400) {
                            alertFalse()
                        } else {
                            alertTrue()
                            if (isMob()) dataLayer.push({'event':'mob_order', 'eventCategory':'mob', 'eventAction':'mob_order'});
                            else dataLayer.push({'event':'desktop_order', 'eventCategory':'desktop', 'eventAction':'desktop_order'});
                        }
                    }).catch(function(error){
                        alertFalse()
                    })
                } else {
                    alertWait()
                }
            }
        }
    })
})

// История браузера
window.onpopstate = function() {
    if (window.location.hash !== '' && window.location.hash !== '#') {
        const nameCar = decodeURI(window.location.hash.split('#')[1]).split('_').join(' ')
        const item = [ ... document.querySelectorAll('.car-item-unique-number-and-name')].filter(el => {
            return el.textContent.trim() === nameCar
        })[0]
        item.parentNode.click()
    } else {
        document.querySelectorAll('.popup-car').forEach(el => el.style.display = 'none')
    }
}

setTimeout(() => {
    if (window.location.hash !== '' && window.location.hash !== '#') {
        const nameCar = decodeURI(window.location.hash.split('#')[1]).split('_').join(' ')
        const item = [ ... document.querySelectorAll('.car-item-unique-number-and-name')].filter(el => {
            return el.textContent.trim() === nameCar
        })[0]
        item.parentNode.click()
    } else {
        document.querySelectorAll('.popup-car').forEach(el => el.style.display = 'none')
    }

    window.scrollTo({
        top: 0,
        behavior: 'auto'
    })
}, 0)

// =======


// Окно успеха
function alertTrue() {
    errorPopupGenerator('Мы получили Вашу заявку. Перезвоним Вам в течение 10 минут!', '#eeffdf')
}

// Окно неудачи
function alertFalse() {
    errorPopupGenerator('Произошла ошибка, повторите попытку.', '#ffcac2')
}

// Окно неудачи номер телефона не заполнен
function alertFalseMobilePhone() {
    errorPopupGenerator('Укажите правильно номер телефона!', '#ffcac2')
}

// Окно неудачи не поставил галочку 'Согласен на обработку данных'
function alertFalsePersonalData() {
    errorPopupGenerator('Необходимо ваше согласие на обработку персональных данных!', '#ffcac2')
}

// Окно ожидания
function alertWait() {
    errorPopupGenerator('Слишком часто! Пожалуйста, подождите.', '#fff0c8')
}

function errorPopupGenerator(text, color = '#f5f5f5') {
    const errorPopup = document.createElement('div')
    errorPopup.classList.add('error-popup')
    errorPopup.style.backgroundColor = color
    errorPopup.textContent = text
    setTimeout(() => {
        errorPopup.style.opacity = 0
    }, 2500)
    setTimeout(() => {
        errorPopup.remove()
    }, 4000)
    document.querySelector('.error-popup-container').appendChild(errorPopup)
}

// Определение окончания слова
function declOfNum(number, words) {
    return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}

// Определяем устройство, ПК или моб.
function isMob() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {

        return true

    } else return false
}


// Cookie GET
function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

// Cookie SET
function setCookie(name, value, props) {

    props = props || {}

    var exp = props.expires

    if (typeof exp == "number" && exp) {

        var d = new Date()

        d.setTime(d.getTime() + exp*1000)

        exp = props.expires = d

    }

    if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

    value = encodeURIComponent(value)

    var updatedCookie = name + "=" + value

    for(var propName in props){

        updatedCookie += "; " + propName

        var propValue = props[propName]

        if(propValue !== true){ updatedCookie += "=" + propValue }
    }

    document.cookie = updatedCookie

}