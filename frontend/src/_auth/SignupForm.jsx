import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader.jsx';
import { register, login } from '../lib/node/authApi.js';
import AdvPayment from '../components/AdvPayment';
import ReactGA from 'react-ga4';

const schema = z.object({
  email: z.string().email('Email inválido').max(256, 'Máximo de 256 caracteres'),
  password: z.string().min(6, 'Mínimo 6 caracteres').max(256, 'Máximo de 256 caracteres')
});

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();
  const code = localStorage.getItem('code') || '';

  const { register: formRegister, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsPending(true);

    ReactGA.event({
      category: 'Form',
      action: 'Register',
      label: 'Register Form'
    });

    try {
      if (code) {
        await register({ ...data, code });
      } else {
        await register(data);
      }
      const session = await login(data);

      if (session) {
        authenticate(session);
        navigate('/');
        toast.success('Cadastro realizado com sucesso');
      } else {
        console.error('Erro ao realizar o login');
        toast.error('Erro ao realizar o cadastro');
      }
      console.log('Usuário cadastrado e autenticado:', session);
    } catch (error) {
      console.error('Erro ao cadastrar e autenticar:', error);

      // Verificar se o erro contém "duplicate key error"
      if (error.message.includes('duplicate key error')) {
        toast.error('Email já cadastrado. Por favor, use outro email.');
      } else {
        toast.error(error.message || 'Erro ao realizar o cadastro');
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <section id="hero" className="hero-section dark wf-section">
        <div className="minting-container w-container">
          <img
            src="/assets/cadastro/asset.png"
            width={240}
            alt="Roboto #6340"
            className="mint-card-image"
          />
          <h2>CADASTRO</h2>
          <p>
            É rapidinho, menos de 1 minuto. <br />
            Vai perder a oportunidade de faturar com o jogo da frutinha?
            <br />
          </p>
          <div id="form-errors"></div>
          <form
            id="formCadastro"
            method="POST"
            acceptCharset="UTF-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="properties">
              <h4 className="rarity-heading">E-mail</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="email"
                  className={`large-input-field w-input ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  maxLength={256}
                  placeholder="seuemail@gmail.com"
                  id="email"
                  {...formRegister('email')}
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
                  {...formRegister('password')}
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
            <p>
              Já tem uma conta?
              <Link to="/sign-in"> Login</Link>
            </p>
            <div className="">
              <button type="submit" className="primary-button w-button" disabled={isPending}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: "10px", alignItems: "center" }}>
                  {isPending && <Loader />}
                  Criar Conta
                </div>
              </button>
              <br />
              <p className="medium-paragraph _3-2vw-margin">
                Ao registrar você concorda com os
                <a href="/terms"> termos de serviço</a> e que
                possui pelo menos 18 anos.
              </p>
            </div>
          </form>
        </div>
      </section>
      <AdvPayment />
    </div>
  );
};

export default SignupForm;
