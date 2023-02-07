import React, { useEffect, useState } from 'react';
import './chat.css';

function Chat({ socket, username, roomID }) {
  const [currentMessage, setCurrentMessage] = useState('');

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        roomID: roomID,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit('send_message', messageData)
    }
  };

  useEffect(() => {
    console.log('socket');
    socket.on('recieved_message', (data) => {
        console.log('socket data', data);
    })
  }, [socket])

  return (
    <div className='chat__container'>
      <div className='chat__header'>
        <h4>Live Chat</h4>
      </div>

      <div className='chat__body'></div>
      <div className='chat__footer'>
        <input
          type='text'
          placeholder='Howdy...'
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
