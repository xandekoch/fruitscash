import React, { useState } from 'react';
import { createAccount } from '../lib/spring/api';

const SigninForm = () => {
  console.log('Signin')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Chame a função createAccount com o email e a senha
    createAccount(email, password);
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
              action="https://fruitsmoney.com/panel/login"
              onsubmit="if (!window.__cfRLUnblockHandlers) return false; return false;"
            >
              <input
                type="hidden"
                name="_token"
                defaultValue="x3wykOsoe9lZjsjmVQjklByoXeg2NJnNE0kwmSR3"
              />
              <div className="properties">
                <h4 className="rarity-heading">E-mail</h4>
                <div className="rarity-row roboto-type2">
                  <input
                    type="e-mail"
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
                    type="password"
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
                  onclick="if (!window.__cfRLUnblockHandlers) return false; myFunction()"
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