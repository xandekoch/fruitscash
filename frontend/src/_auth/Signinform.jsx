import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader.jsx';
import { login } from '../lib/node/authApi.js';

const schema = z.object({
  email: z.string().email('Email inválido').max(256, 'Máximo de 256 caracteres'),
  password: z.string().min(6, 'Mínimo 6 caracteres').max(256, 'Máximo de 256 caracteres')
});

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsPending(true);

    try {
      const session = await login(data);

      if (session) {
        authenticate(session);
        toast.success('Login realizado com sucesso');
        navigate('/');
      } else {
        console.error('Erro ao realizar o login');
        toast.error('Erro ao realizar o login');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <section id="hero" className="hero-section dark wf-section">
        <div className="minting-container w-container">
          <h2>LOGIN</h2>
          <a href="/sign-up">
            <p>
              Não possui conta? Clique aqui <br />
            </p>
          </a>
          <form id="f-user-login" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="_token" />
            <div className="properties">
              <h4 className="rarity-heading">E-mail</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="email"
                  className={`large-input-field w-input ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  maxLength={256}
                  placeholder="seuemail@gmail.com"
                  id="email"
                  {...register('email')}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <h4 className="rarity-heading">Senha</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`large-input-field w-input ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  maxLength={256}
                  placeholder="Uma senha segura"
                  id="myInput"
                  {...register('password')}
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>
              <br />
              <input
                type="checkbox"
                onClick={() => setShowPassword(!showPassword)}
              />{" "}
              Mostrar senha
            </div>
            <a href="recover-password">
              <p>
                Esqueceu sua senha? Clique aqui <br />
              </p>
            </a>
            <div className="">
              <button className="primary-button w-button" disabled={isPending}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: "10px", alignItems: "center" }}>
                  {isPending && <Loader />}
                  Entrar
                </div>
              </button>
              <br />
              <br />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SigninForm;