import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chat from './views/Chat/Chat';
import Login from './views/Login/Login';

function Rotas() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default Rotas;
