import { sendDeposit } from '../lib/spring/api';
import { getUserIdFromSession } from '../context/AuthProvider';
import { useState } from 'react';
import Notification from '../components/Notification';

const Deposit = () => {
  console.log('Deposit');

  const [valuedeposit, setValuedeposit] = useState('');

  const handleDepositClick = (amount: string) => {
    setValuedeposit(amount);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cpf = formData.get('cpf') as string;
    const fullName = formData.get('name') as string;
    const wdValue = parseFloat((formData.get('valuedeposit') as string).replace(',', '.'));
    const userId = getUserIdFromSession();

    try {
      if (userId) {
        await sendDeposit({ cpf, fullName, wdValue, userModelId: userId });
        console.log('Depósito enviado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao enviar o depósito:', error);
    }
  };

  return (
    <>
      <section id="hero" className="hero-section dark wf-section">
        <div className="minting-container w-container">
          <img
            src="/assets/deposit/deposit.gif"
            width={240}
            alt="Roboto #6340"
            className="mint-card-image"
          />
          <h2>Depósito</h2>
          <p>PIX: depósitos instantâneos com uma pitada de diversão e muita praticidade.</p>
          <form id="f-eWallet-payout" onSubmit={handleSubmit} method="post">
            <div className="properties">
              <h4 className="rarity-heading">Nome</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="text"
                  className="large-input-field w-input"
                  maxLength={256}
                  name="name"
                  id="name"
                  placeholder="Seu Nome completo"
                  required
                />
              </div>
              <h4 className="rarity-heading">CPF</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="text"
                  className="large-input-field w-input cpf-mask"
                  maxLength={14}
                  name="cpf"
                  id="cpf"
                  placeholder="Seu número de CPF"
                  required
                />
              </div>
              <h4 className="rarity-heading">Valor para depósito</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="text"
                  className="large-input-field w-input money-mask"
                  maxLength={256}
                  name="valuedeposit"
                  id="valuedeposit"
                  placeholder="Depósito mínimo de R$20,00"
                  value={valuedeposit}
                  onChange={(e) => setValuedeposit(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="">
            <button
                type="button"
                className="button nav w-button"
                style={{ width: "45%" }}
                onClick={() => handleDepositClick("20")}
              >
                DEPOSITAR R$20
                <br />
                <span style={{ color: "yellow" }}>(Ganhe + R$20)</span>
              </button>
              <button
                type="button"
                className="button nav w-button"
                style={{ width: "45%" }}
                onClick={() => handleDepositClick("30")}
              >
                DEPOSITAR R$30
                <br />
                <span style={{ color: "yellow" }}>(Ganhe + R$30)</span>
              </button>
              <br />
              <br />
              <button
                type="button"
                className="button nav w-button"
                style={{ width: "45%" }}
                onClick={() => handleDepositClick("50")}
              >
                DEPOSITAR R$50
                <br />
                <span style={{ color: "yellow" }}>(Ganhe + R$50)</span>
              </button>
              <button
                type="button"
                className="button nav w-button"
                style={{ width: "45%" }}
                onClick={() => handleDepositClick("100")}
              >
                DEPOSITAR R$100
                <br />
                <span style={{ color: "yellow" }}>(Ganhe + R$100)</span>
              </button>
              <br />
              <br />
              <input
                id="pixgenerator"
                type="submit"
                defaultValue="Depositar via PIX"
                className="primary-button w-button"
              />
              <br />
              <br />
              <p>
                Ao depositar você concorda com os
                <a href="/terms"> termos de serviço</a>.
              </p>
            </div>
          </form>
        </div>
      </section>

      <div id="about" className="comic-book white wf-section">
        <div className="minting-container left w-container">
          <div className="w-layout-grid grid-2">
            <img
              src="/assets/deposit/money.png"
              width={240}
              alt="Roboto #6340"
              className="mint-card-image v2"
            />
            <div>
              <h2>Indique um amigo e ganhe R$ no PIX</h2>
              <h3>Como funciona?</h3>
              <p>
                Convide seus amigos que ainda não estão na plataforma. Você receberá
                R$ por cada amigo que se inscrever e fizer um depósito. Não há limite
                para quantos amigos você pode convidar. Isso significa que também não
                há limite para quanto você pode ganhar!
              </p>
              <h3>Como recebo o dinheiro?</h3>
              <p>
                O saldo é adicionado diretamente ao seu saldo no painel abaixo, com o
                qual você pode sacar via PIX.
              </p>
              <h3>Upgrade</h3>
              <p>
                No primeiro amigo que você indicar, você terá acesso ao modo ULTIMATE
                da nossa plataforma. Você poderá apostar valores maiores e ter mais
                chances de ganhar jogando.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </>
  )
}

export default Deposit