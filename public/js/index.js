const socket  = io()
const infoDiv = document.getElementById("info")


async function plotInfo(info){
    const template = await fetch('./views/show.ejs')
    const text = await template.text()
    const functionTemplate = ejs.render(text, {info})
    infoDiv.innerHTML = functionTemplate
}

async function main () {
    // Recuperar la información del servidor
    const resp = await fetch('/info/data')
    const info = await resp.json()
    await plotInfo(info)
    setTimeout(() => {
        socket.emit("addMessage",{text:"hola!",email:"pepe@gmail.com"})
    }, 3000);
}
main()

// Socket tests

socket.on("messages", messages=>{
    console.log(messages)
})

