import React, { useState } from 'react';
import { createAccount } from '../lib/spring/api';
import AdvPayment from '../components/AdvPayment';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  console.log('Signup')
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
            <img
              src="/public/assets/cadastro/asset.png"
              loading="lazy"
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
              {/* <input
          name="_token"
          type="hidden"
          defaultValue="Wh2CTNAHZ4IBT3hF3QAUYtsnfWmJuyzuH7EaeGWv"
        /> */}
              {/* <input id="sponsor" name="sponsor" type="hidden" defaultValue={41234} /> */}
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
                />{" "}
                Mostrar senha
              </div>
              <p>
                Já tem uma conta?
                <Link to="/sign-in"> Login</Link>
              </p>
              <div className="">
                <button type="submit" className="primary-button w-button">
                  <i className="fa fa-check fa-fw" />
                  Criar Conta
                </button>
                <br />
                <p className="medium-paragraph _3-2vw-margin">
                  Ao registrar você concorda com os
                  <a href="https://fruitsmoney.com/terms">termos de serviço</a> e que
                  possui pelo menos 18 anos.
                </p>
              </div>
            </form>
          </div>
        </section>
        <AdvPayment />
      </div>
    </>
  )
}

export default SignupForm