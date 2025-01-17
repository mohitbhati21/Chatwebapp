const socket = io('http://localhost:3000')
const messageForm = document.getElementById('send-container')
const messageContainer = document.getElementById('message-container')
const messageInput = document.getElementById('message-input')

const name = prompt('what is your name');
appendMessage('you Joined')
socket.emit('new-user', name);

socket.on('chat-message', data =>{
    //console.log(data)
    appendMessage(`${data.name}:${data.message}`)
})

//socket.on('chat-message', data =>{
    //console.log(data)
   // appendMessage(data)
//})
socket.on('user-connected', name =>{
    //console.log(data)
    appendMessage(`${name} connected`)
})
socket.on('user-disconnected', name => {
    //console.log(data)
    appendMessage(`${name} disconnected`)
})
messageForm.addEventListener('submit', e =>{
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`you: ${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value=''
})
function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText= message
    messageContainer.append(messageElement)
}