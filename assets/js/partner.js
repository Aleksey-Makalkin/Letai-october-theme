document.querySelector('.partner__back').onclick = () => {
    document.querySelector('.partner-other-container').style.zIndex = '-600'
    document.querySelector('.partner-other-container').style.opacity = '0'
}

document.querySelector('.partner-bg').onclick = () => {
    document.querySelector('.partner-other-container').style.zIndex = '-600'
    document.querySelector('.partner-other-container').style.opacity = '0'
}

const partner = document.querySelector('.partner')
function partnerCenter() {
    if (window.innerHeight - partner.scrollHeight > 0) {
        partner.style.top = (window.innerHeight - partner.scrollHeight) / 2 + 'px'
    }
}
window.addEventListener('load', partnerCenter)
window.addEventListener('resize', partnerCenter)

// Маска для телефона
$(".partner__input_phone").mask("+7 (999) 999-99-99", customOptions)


const partnerForm = document.querySelector('.partner__form')
let partnerWait = true

partnerForm.addEventListener('submit', (ev) => {
    ev.preventDefault()

    const data = new FormData()
    partnerForm.querySelectorAll('.partner__input').forEach(input => {
        data.append(input.name, input.value)
    })

    if (data.get('phone') && data.get('car')) {
        if (data.get('phone').length !== 18) alertFalseMobilePhone()
        else {
            if (partnerWait) {
                partnerWait = false
                setTimeout(() => partnerWait = true, 15000)

                console.log(`phone: ${data.get('phone')} \ncar: ${data.get('car')} \nurl: https://letai.pro/amoapi/partner`)

                fetch('https://letai.pro/amoapi/partner', {
                    method: 'POST',
                    body: data
                }).then(function (response) {
                    if (response.status >= 400) {
                        alertFalse()
                    } else {
                        alertTrue()
                        if (isMob()) dataLayer.push({
                            'event': 'mob_partner',
                            'eventCategory': 'mob',
                            'eventAction': 'mob_partner'
                        });
                        else dataLayer.push({
                            'event': 'desktop_partner',
                            'eventCategory': 'desktop',
                            'eventAction': 'desktop_partner'
                        });
                    }
                }).catch(function (error) {
                    alertFalse()
                })
            } else alertWait()
        }
    } else errorPartnerAllInput()
})


function errorPartnerAllInput() {
    errorPopupGenerator('Все поля должны быть заполненны!', '#ffcac2')
}