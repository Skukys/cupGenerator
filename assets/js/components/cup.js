import {GLTFLoader} from "../vendor/GLTFLoader.js"

export class Cup {

    container = null
    scene = null
    camera = null
    renderer = null
    model = null
    texture = null
    bg = null
    path = 'assets/img/models/baseTexture'
    hand = null
    pauseButton = false
    rotationY = 0.03
    nowModel = null
    models = {
        '1': {
            x: 0,
            y: 0,
            cameraZ: 9,
            hand: null
        },
        '2': {
            x: -5,
            y: 1,
            cameraZ: 15,
            img: '2image',
            hand: null
        },
        '3': {
            x: 0,
            y: 0,
            cameraZ: 11,
            img: '3image',
            hand: '3hand'
        },
        '4': {
            x: -1.4,
            y: 3.1,
            cameraZ: 10,
            img: '4image',
            hand: '4hand'
        },
    }
    miniature = false

    constructor(selector, model = null, path = null, miniature = false) {
        this.nowModel = model
        if (path) this.path = path
        this.init(selector)
        this.miniature = miniature
    }

    init(selector) {
        this.setBase(selector)
    }

    setBase(container) {
        this.container = document.querySelector(container)
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color("rgb(245, 245, 245)")

        this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000)

        this.renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true})
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
        this.container.appendChild(this.renderer.domElement)

        this.generate()
    }

    generate(path = 'assets/img/models/baseTexture') {

        let onWindowResize = () => {
            this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight
            this.camera.updateProjectionMatrix()
            this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
        }
        window.addEventListener('resize', onWindowResize, false)


        let textureLoader = new THREE.TextureLoader()
        this.texture = textureLoader.load(`${this.path}.png`)
        this.texture.flipY = false

        let bgTexture

        if (this.nowModel && this.nowModel !== '1') {
            const bgloader = new THREE.TextureLoader()
            bgTexture = bgloader.load(`assets/img/base/${this.models[this.nowModel].img}.png`)
            this.scene.background = bgTexture
            this.bg = true

        }
        if (this.nowModel === '1') {
            this.scene.background = new THREE.Color("rgb(167,167,167)")
        }


        let correctBg = () => {
            const canvasAspect = this.container.clientWidth / this.container.clientHeight
            const imageAspect = bgTexture.image ? bgTexture.image.width / bgTexture.image.height : 1
            const aspect = imageAspect / canvasAspect

            bgTexture.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0
            bgTexture.repeat.x = aspect > 1 ? 1 / aspect : 1

            bgTexture.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2
            bgTexture.repeat.y = aspect > 1 ? 1 : aspect
            return {aspect}
        }


        let mesh
        if (this.nowModel) {
            if (this.models[this.nowModel].hand) {
                const handLoader = new THREE.TextureLoader()
                const texture = handLoader.load(`assets/img/base/${this.models[this.nowModel].hand}.png`, tex => {
                    tex.needsUpdate = true
                    mesh.scale.set(1.0, tex.image.height / tex.image.width, 1.0)
                })
                const material = new THREE.MeshPhongMaterial({
                    color: 'white',
                    map: texture,
                    alphaTest: 0,
                    transparent: true,
                    side: THREE.DoubleSide,
                })
                if(this.nowModel === '3'){
                    mesh = new THREE.Mesh(new THREE.PlaneGeometry(17, 17), material)
                    this.scene.add(mesh)
                    mesh.position.z = 4
                    mesh.position.y = 2.55
                    mesh.position.x = 0.55
                } else {
                    mesh = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), material)
                    this.scene.add(mesh)
                    mesh.position.z = 4
                    mesh.position.y = 4
                    mesh.position.x = -0.8
                }
            }
        }


        const loader = new GLTFLoader()
        loader.load('assets/img/models/cup.glb', (gltf) => {
            this.model = gltf.scene
            this.model.traverse((o) => {
                if (o.isMesh) {
                    o.material.map = this.texture
                }
            })
            this.scene.add(this.model)
            this.model.rotation.x = 0.1

            if (this.nowModel) {
                this.model.position.x = this.models[this.nowModel].x
                this.model.position.y = this.models[this.nowModel].y
            }
        })

        let resizeRendererToDisplaySize = (renderer) => {
            const canvas = renderer.domElement
            const width = canvas.clientWidth
            const height = canvas.clientHeight
            const needResize = canvas.width !== width || canvas.height !== height
            if (needResize) {
                renderer.setSize(width, height, false)
            }
            return needResize
        }

        let light = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5)
        let light2 = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5)
        let light3 = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5)
        let light4 = new THREE.HemisphereLight(0xffffff, 0x000000, 0.5)
        light.position.set(10, 15, 0)
        light2.position.set(-10, -15, 0)
        light3.position.set(10, -15, 0)
        light4.position.set(-10, 15, 0)
        this.scene.add(light)
        this.scene.add(light2)
        this.scene.add(light3)
        this.scene.add(light4)
        this.camera.position.z = this.nowModel ? this.models[this.nowModel].cameraZ : 9
        this.camera.position.y = 2.5
        this.camera.position.x = 0.5

        let render = (time) => {
            time *= 0.001;

            if (resizeRendererToDisplaySize(this.renderer)) {
                const canvas = this.renderer.domElement
                this.camera.aspect = canvas.clientWidth / canvas.clientHeight
                this.camera.updateProjectionMatrix()
            }

            if(this.bg){
                correctBg()
            }

            this.renderer.render(this.scene, this.camera)


            if (this.model && !this.miniature) {
                if (!this.pauseButton) {
                    this.model.rotation.y += this.rotationY
                }
            }

            requestAnimationFrame(render);
        }

        requestAnimationFrame(render);
    }

    left() {
        this.pauseButton = false
        this.rotationY = -0.03
    }

    right() {
        this.pauseButton = false
        this.rotationY = 0.03
    }

    pause() {
        this.pauseButton = true
    }

    play() {
        this.pauseButton = false
    }
}