import React, { useState } from 'react';
import { createAccount, login } from '../lib/spring/api';
import AdvPayment from '../components/AdvPayment';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

const SignupForm = () => {
  console.log('SignupForm');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    try {
      await createAccount(email, password);
      const session = await login(email, password);

      // Verifica se a sessão foi obtida com sucesso
      if (session) {
        // Autentica o usuário localmente
        authenticate(session);

        // Redireciona para a página de login
        navigate('/');
        toast.success('Cadastro realizado com sucesso');
      } else {
        // Exibe uma mensagem de erro ao usuário
        console.error('Erro ao realizar o login');
        toast.error('Erro ao realizar o cadastro');
      }
      console.log('Usuário cadastrado e autenticado:', session);
    } catch (error) {
      console.error('Erro ao cadastrar e autenticar:', error);
      toast.error('Erro ao realizar o cadastro');
    }
    setIsPending(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
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
              onSubmit={handleSubmit}
            >
              <div className="properties">
                <h4 className="rarity-heading">E-mail</h4>
                <div className="rarity-row roboto-type2">
                  <input
                    type="email"
                    className="large-input-field w-input"
                    maxLength={256}
                    name="email"
                    placeholder="seuemail@gmail.com"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <h4 className="rarity-heading">Senha</h4>
                <div className="rarity-row roboto-type2">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="large-input-field w-input"
                    maxLength={256}
                    name="password"
                    placeholder="Uma senha segura"
                    id="myInput"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <br />
                <input
                  type="checkbox"
                  onClick={togglePasswordVisibility}
                />{" "}
                Mostrar senha
              </div>
              <p>
                Já tem uma conta?
                <Link to="/sign-in"> Login</Link>
              </p>
              <div className="">
                <button type="submit" className="primary-button w-button"
                  disabled={isPending}>
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
    </>
  );
};

export default SignupForm;
