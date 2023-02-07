import io from 'socket.io-client'
import './app.css'

const socket = io.connect('http://localhost:8080')

function App() {
  return (
    <>
    <div className='main__container'>
      <h1>Join Chat</h1>
      <input type='text' placeholder='John...' />
      <input type='text' placeholder='Room ID...' />
      <button></button>
    </div>
    </>
  );
}

export default App;
