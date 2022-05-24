import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import uuid from 'uuid/v4';

const myId = uuid();
const socket = io('http://localhost:8080');
socket.on('connect', () =>
  console.log('|IO| Conectado - Uma nova conexão foi estabelecida'),
);

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const video = 'https://www.youtube.com/embed/CsWalGO23yQ';

  useEffect(() => {
    const handleNewMessage = (newMessage) =>
      setMessages([...messages, newMessage]);
    socket.on('chat.message', handleNewMessage);
    return () => socket.off('chat.message', handleNewMessage);
  }, [messages]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit('chat.message', {
        id: myId,
        message,
        video,
      });
      setMessage('');
    }
  };

  const handleInputChange = (event) => setMessage(event.target.value);

  return (
    <main className="flex flex-col h-screen w-screen justify-between">
      <ul className="m-0 p-4">
        {messages.map((m, index) => (
          <li
            className={`${
              m.id === myId ? 'list-none text-right' : 'list-none text-left'
            }`}
            key={index}
          >
            <span
              className={`${
                m.id === myId
                  ? 'border-2 border-solid border-brand-300 rounded-xl inline-block list-none mb-4 py-3 px-3 text-right bg-brand-500'
                  : 'border-2 border-solid border-zinc-500 rounded-xl inline-block list-none mb-4 py-3 px-3 text-right bg-zinc-600'
              }`}
            >
              {m.message === '/video' ? (
                <iframe
                  src={m.video}
                  width="560"
                  height="315"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                m.message
              )}
            </span>
          </li>
        ))}
      </ul>
      <form className="bg-zinc-900 p-4" onSubmit={handleFormSubmit}>
        <input
          className="border-2 border-solid border-zinc-600 placeholder-zinc-400 bg-zinc-700 rounded-xl text-xl py-1 px-6 w-full focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
          onChange={handleInputChange}
          placeholder="Digite uma nova mensagem aqui"
          type="text"
          value={message}
        />
      </form>
    </main>
  );
};

export default Chat;
