import { useState } from 'react';
import io from 'socket.io-client';
import './app.css';

const socket = io.connect('http://localhost:8080');

function App() {
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState('');

  console.log('username', username);
  console.log('roomID', roomID);

  const joinRoom = () => {
    console.log('joinRoom');

    if(username !== '' && roomID !== '') {
      socket.emit('join_room', roomID)
    }
  };

  return (
    <>
      <div className='main__container'>
        <h1>Join Chat</h1>
        <input
          type='text'
          placeholder='John...'
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Room ID...'
          onChange={(event) => {
            setRoomID(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join A Room</button>
      </div>
    </>
  );
}

export default App;
