'use strict';

const websock = new WebSocket(`wss://${window.location.host}/websock`)

function addMessage(event) {
    event.preventDefault();
    const input = document.querySelector('#message_id')
    const lastId = document.querySelector('li:last-child').getAttribute('data-element');
    websock.send(JSON.stringify({'data-element': lastId, 'data': input.value}));
    input.value = '';
}

websock.onmessage = (event) => {
    const [id, data] = [JSON.parse(event.data)['data-element'], JSON.parse(event.data).data];
    const messagesList = document.querySelector('#messages_list');
    const newMessage = document.createElement('li');
    newMessage.setAttribute('data-element', id);
    newMessage.classList.add('list-group-item');
    let content = document.createTextNode(`${id}: ${data}`);
    newMessage.appendChild(content);
    messagesList.appendChild(newMessage);
}