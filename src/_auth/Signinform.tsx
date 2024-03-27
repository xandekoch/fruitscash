import React, { useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { login } from '../lib/spring/api';
import { useNavigate } from 'react-router-dom';

const SigninForm = () => {
  console.log('SigninForm')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { authenticate } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Realiza o login
      const session = await login(email, password);

      // Verifica se a sessão foi obtida com sucesso
      if (session) {
        // Autentica o usuário localmente
        authenticate(session);

        // Redireciona para a página principal
        navigate('/');
      } else {
        // Exibe uma mensagem de erro ao usuário
        console.error('Erro ao realizar o login');
      }
    } catch (error) {
      // Exibe uma mensagem de erro ao usuário
      console.error('Erro ao realizar o login:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div>
        <section id="hero" className="hero-section dark wf-section">
          <div className="minting-container w-container">
            <h2>LOGIN</h2>
            <a href="/sign-up">
              <p>
                Não possui conta? Clique aqui <br />
              </p>
            </a>
            <form
              id="f-user-login"
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="_token"
              />
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
                    data-name="password"
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
              <a href="recover-password">
                <p>
                  Esqueceu sua senha? Clique aqui <br />
                </p>
              </a>
              <div className="">
                <button className="primary-button w-button">Entrar</button>
                <br />
                <br />
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}

export default SigninForm