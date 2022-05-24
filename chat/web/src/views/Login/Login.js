import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticate } from '../../requests/SessaoRequest';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  async function logar() {
    const body = { Usuario: usuario, Senha: senha };

    const response = await authenticate(body);

    if (response.success) {
      localStorage.setItem('token', response.data.Token);
      navigate('/chat');
    } else {
      toast.error(response.data);
    }
  }

  return (
    <div class="flex justify-center items-center h-screen">
      <form class="bg-zinc-900 p-8 rounded-xl shadow-lg md:w-1/3">
        <div class="mb-4">
          <label class="block font-bold mb-2" for="username">
            Usuário
          </label>
          <input
            class="w-full py-2 px-3 bg-zinc-800 placeholder-zinc-500 text-sm border-zinc-500 rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            id="username"
            type="text"
            placeholder="Digite seu usuário"
          ></input>
        </div>
        <div class="mb-6">
          <label class="block font-bold mb-2" for="password">
            Senha
          </label>
          <input
            class="w-full py-2 px-3 bg-zinc-800 placeholder-zinc-500 text-sm border-zinc-500 rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            id="password"
            type="password"
            placeholder="Digite sua senha"
            onKeyDown={(e) => {
              e.key === 'Enter' && logar();
            }}
          ></input>
        </div>
        <div class="flex items-center justify-center">
          <button
            class="flex-1 p-2 font-bold rounded-md border-transparent bg-brand-500 hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 hover:focus:ring-brand-300 transition-colors"
            onClick={logar}
            type="button"
          >
            Entrar
          </button>
        </div>
      </form>

      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default Login;
