import React, { useState } from 'react';
import { recoverPassword } from '../lib/spring/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    try {
      const response = await recoverPassword(email);

      if (response.ok) {
        toast.success('Solicitação de recuperação de senha enviada com sucesso!');
      } else {
        toast.error('Erro ao enviar solicitação de recuperação de senha');
      }
    } catch (error) {
      console.error('Erro ao enviar solicitação de recuperação de senha:', error);
      toast.error('Erro ao enviar solicitação de recuperação de senha');
    }
    setIsPending(false);
};


  return (
    <>
      <section id="hero" className="hero-section dark wf-section">
        <div className="minting-container w-container">
          <h2>RECUPERAR SENHA</h2>
          <a href="sign-up">
            <p>Não possui conta? Clique aqui</p>
          </a>
          <form
            className="login__form"
            id="f-user-recovery"
            onSubmit={handleSubmit}
          >
            <div className="properties">
              <h4 className="rarity-heading">E-mail</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="email"
                  className="large-input-field w-input"
                  maxLength={256}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@gmail.com"
                  id="email"
                  data-gtm-form-interact-field-id={0}
                  required
                />
              </div>
            </div>
            <a href="sign-in">
              <p>Lembrou sua senha? Clique aqui</p>
            </a>
            <div className="">
              <button type="submit" className="primary-button w-button">
                <div style={{ display: 'flex', flexDirection: 'row', gap: "10px", alignItems: "center" }}>
                  {isPending && <Loader />}
                  Recuperar Senha
                </div>
              </button>
              <br />
              <br />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default RecoverPassword;
