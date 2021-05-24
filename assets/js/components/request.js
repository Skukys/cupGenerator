export async function request(method, endpoint, data = {}, formData = false){
    let fetchData = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (formData) {
        let form = new FormData()
        form.append('file', data.file)
        form.append('img', data.img)
        fetchData['body'] = form
        delete fetchData.headers
    } else fetchData['body'] = JSON.stringify(data)

    let res = await fetch('http://cupGenerator/' + endpoint, fetchData)
    return await res.json()
}