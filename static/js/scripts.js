"use strict";

const websock = new WebSocket("ws://localhost:8000/websock")

function addMessage(event) {
    let input = document.getElementById("message_id")
    let pastId = document.querySelector('li:last-child');
    websock.send(JSON.stringify({"id": pastId.id, "data": input.value}));
    input.value = '';
    event.preventDefault();
}

websock.onmessage = (event) => {
    let [id, data] = [JSON.parse(event.data).id, JSON.parse(event.data).data];
    let messagesList = document.getElementById('messages_list');
    let newMessage = document.createElement('li');
    newMessage.setAttribute('id', id);
    newMessage.setAttribute('class', 'list-group-item');
    let content = document.createTextNode(`${id}: ${data}`);
    newMessage.appendChild(content);
    messagesList.appendChild(newMessage);
}