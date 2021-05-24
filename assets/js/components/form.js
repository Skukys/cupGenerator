import {request} from "./request.js"

export class Form{

    urls = null

    constructor() {

        this.checkbox()
        this.maskPhone()
    }

    checkbox(){
        let input = document.querySelector('#checkbox')
        let inputDiv = document.querySelector('#checkboxDiv')
        let label = document.querySelector('.email__label-checkbox')

        label.addEventListener('click', (el) => {
            el.preventDefault()
            inputDiv.classList.toggle('active')
            input.toggleAttribute('checked')
        })
    }
    maskPhone(){
        let phone = document.querySelector('#phoneInput')
        phone.addEventListener('keydown', (e) => {
            e.preventDefault()
            let value = phone.value.length
            if(/\d/.test(e.key)){
                if(value === 6 || value === 10)
                    phone.value += ' '
                if(value === 15) return
                phone.value += e.key
            }
            if(/Backspace/.test(e.key)) {
                value-=1
                if(value < 3) return
                phone.value = phone.value.slice(0, value)
            }
        })
    }

    async submit(){
        let validate = this.validate()
        if(validate) {
            let res = await request('POST', 'email', validate)
        }
    }

    validate(){
        let email = document.querySelector('#emailInput'),
            phone = document.querySelector('#phoneInput'),
            name = document.querySelector('#nameInput'),
            check = document.querySelector('#checkbox')

        let validEmail = document.querySelector('.email__validate.email'),
            validName = document.querySelector('.email__validate.name'),
            validPhone = document.querySelector('.email__validate.phone'),
            validCheckbox = document.querySelector('.email__validate.checkbox')

        let validate = true

        if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)){
            validEmail.classList.add('active')
            validate = false
        } else {
            validEmail.classList.remove('active')
            validate = true
        }

        if(name.value.length < 1){
            validName.classList.add('active')
            validate = false
        } else{
            validName.classList.remove('active')
            validate = true
        }

        if(phone.value.length < 15){
            validPhone.classList.add('active')
            validate = false
        } else{
            validPhone.classList.remove('active')
            validate = true
        }

        if(!check.hasAttribute('checked')){
            validCheckbox.classList.add('active')
            validate = false
        } else{
            validCheckbox.classList.remove('active')
            validate = true
        }

        if(!validate) return
        return {
            email: email.value,
            phone: email.name,
            name: email.name,
            urls: this.urls,
        }
    }

    createEvent(){
        let btn = document.querySelector('.generator__button.email')
        btn.addEventListener('click', e => {
            e.preventDefault()
            this.submit()
        })
    }

}
