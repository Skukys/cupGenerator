import templates from "./templates.js"
import {Cup} from './cup.js'
import {request} from "./request.js"
import {Form} from "./form.js"

export class Generator {

    container = null
    texture = null
    img = null
    urls = []
    form = null
    loader = document.querySelector('.generator__loader')

    constructor() {
        this.container = document.querySelector('.generator')
        this.generateImageName()
        this.setTemplate('cup')
    }

    generateImageName() {
        this.img = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    setTemplate(name) {
        this.container.innerHTML = templates[name]
        if (name === 'cup') new Cup('.generator__cup')
        if (name === 'result') {
            this.container.classList.add('result')
        }
        this.addEvent()
    }

    startCropper(name) {
        this.setTemplate(name)

        let imageView = document.querySelector('.generator__view')
        imageView.innerHTML = `<img id="image" src="${this.pathImage}">`

        const image = document.querySelector('#image')

        const cropper = new Cropper(image, {
            aspectRatio: 16 / 9,
            preview: '.preview'
        });


        let left, right, zoomIn, zoomOut
        left = document.querySelector('.generator__button.left')
        right = document.querySelector('.generator__button.right')
        zoomIn = document.querySelector('.generator__button.in')
        zoomOut = document.querySelector('.generator__button.out')

        this.createEvents({cropper, left, right, zoomIn, zoomOut})

        let result = document.querySelector('.generator__button.result')
        result.addEventListener('click', () => {
            this.saveTexture(cropper, image.getAttribute('src'))
        })
    }

    async saveTexture(cropper, path) {
        this.showLoader()
        let data = cropper.getData()
        let preview = document.querySelector('.preview.second.active')
        if (preview) data['two'] = true
        data['path'] = path
        data['img'] = this.img
        let res = await request('POST', 'texture', data)
        this.setTemplate('result')
        this.texture = res.path
        this.generateResultsImage()
        this.closeLoader()
    }

    generateResultsImage() {
        this.urls = []
        let models = [
            '.result-images__image.first',
            '.result-images__image.second',
            '.result-images__image.third',
            '.result-images__image.four',
        ]
        models.forEach((item, index) => {
            index++
            let cup = new Cup(item, `${index}`, this.texture, true)

            setTimeout(() => {
                let container = document.querySelector(item)
                let canvas = container.getElementsByTagName('canvas')[0]
                let context = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true})
                let url = canvas.toDataURL()
                container.innerHTML = `<img src="${url}">`
                this.urls.push(url)
            },1500 )
        })
        setTimeout(() => {
            this.openResultTexture(null, true)
        }, 1)
        this.addEvent()
    }

    openResultTexture(btn, start = false) {
        if (start) {
            let cup = new Cup('.result-image__image', '1', this.texture)
            this.generateCupEvents(cup)
        } else {
            document.querySelector('.result-image__image').innerHTML = ''
            let cup = new Cup('.result-image__image', btn.getAttribute('data-model'), this.texture)
            this.generateCupEvents(cup)
        }
    }

    async generateCupEvents(cup) {

        let left = document.querySelector('.generator__button.arrowLeft'),
            right = document.querySelector('.generator__button.arrowRight'),
            pause = document.querySelector('.generator__button.pause'),
            play = document.querySelector('.generator__button.play')
        left.addEventListener('click', () => {
            cup.left()
        })
        right.addEventListener('click', () => {
            cup.right()
        })
        pause.addEventListener('click', () => {
            cup.pause()
        })
        play.addEventListener('click', () => {
            cup.play()
        })
    }

    changeButtonsEvent(btn) {
        let preview = document.querySelector('.preview.second')
        let firstButton = document.querySelector('.generator__button.only')
        let twoButton = document.querySelector('.generator__button.two')

        if (btn.getAttribute('data-type') === 'only') {
            preview.classList.remove('active')
            firstButton.classList.add('active')
            twoButton.classList.remove('active')
        } else {
            preview.classList.add('active')
            firstButton.classList.remove('active')
            twoButton.classList.add('active')
        }
    }

    createEvents(data) {
        data.left.addEventListener('click', () => data.cropper.rotate(45))
        data.right.addEventListener('click', () => data.cropper.rotate(-45))
        data.zoomIn.addEventListener('click', () => data.cropper.zoom(-0.1))
        data.zoomOut.addEventListener('click', () => data.cropper.zoom(0.1))
    }

    setPage(btn) {
        let name = btn.getAttribute('data-name')
        let input = document.querySelector('#fileInput')
        input.click()
        input.addEventListener('change', async () => {
            let type = input.files[0].type
            if ((type == 'image/jpeg' || type == 'image/png' || type == 'image/gif') && (input.files[0].size < 10485760)) {
                let res = await request('POST', 'upload', {file: input.files[0], img: this.img}, true)
                this.pathImage = res.path
                this.startCropper(name)
                input.value = ''
            }
        })
    }

    startPage() {
        this.setTemplate('cup')
        this.deletePhotos(false, true)
    }

    twoPage(){
        this.setTemplate('setting')
        this.startCropper('setting')
        this.deletePhotos(true)
    }

    async addEvent() {
        let buttons = document.querySelectorAll('[data-click]')
        buttons.forEach(item => {
            item.addEventListener('click', () => {
                this[item.getAttribute('data-click')](item)
            })
        })

        window.addEventListener('unload', async () => {
            await this.deletePhotos()
        })
    }

    async deletePhotos(texture = false, image = false){
        if(texture){
            await request('POST', 'delete', {img: this.img, texture: true})
        } else if(image) {
            await request('POST', 'delete', {img: this.img, image: true})
        } else {
            await request('POST', 'delete', {img: this.img})
        }
    }

    openEmailForm(){
        this.setTemplate('email')
        this.deletePhotos()
        this.form = new Form()
        this.form.createEvent()
        this.form.urls = this.urls
        let imageContainer = document.querySelector('.email__photos')
        this.urls.forEach(item => {
            imageContainer.innerHTML += `
                 <div class="email__photo"><img src="${item}" alt=""></div>
            `
        })
    }

    showLoader(){
        this.loader.classList.add('active')
    }
    closeLoader(){
        this.loader.classList.remove('active')
    }
}