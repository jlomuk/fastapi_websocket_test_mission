'use strict';

const websock = new WebSocket(`wss://${window.location.host}/websock`)

function addMessage(event) {
    event.preventDefault();
    const input = document.querySelector('#message_id')
    if (input.value.trim() !== '') {
        websock.send(JSON.stringify({'data': input.value}));
        input.value = '';
    }
}

websock.onmessage = (event) => {
    const [id, data] = [JSON.parse(event.data)['data-element'], JSON.parse(event.data).data];
    const messagesList = document.querySelector('#messages_list');
    messagesList.insertAdjacentHTML('beforeend', `<li class="list-group-item">${id}: ${data}</li>`)
}