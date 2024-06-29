import { useEffect, useState } from "react";
import {  useAuth } from "../context/AuthProvider";
import { backendConfig } from "../lib/node/config";
import { getAffiliateData } from "../lib/node/userApi";

const Affiliate = () => {
  const { user: { userId } } = useAuth();
  const baseUrl = backendConfig.frontendUrl;
  const [affiliateData, setAffiliateData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
        const affiliateData = await getAffiliateData();
        setAffiliateData(affiliateData);
    };

    fetchData();
}, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Link copiado!');
      })
      .catch((error) => {
        console.error('Erro ao copiar texto:', error);
        alert('Erro ao copiar link. Por favor, tente novamente.');
      });
  };
  
  const handleCopyLink = () => {
    const affiliateLink = `${baseUrl}/sign-up?code=${userId}`;
    copyToClipboard(affiliateLink);
  };
  return (
    <>
      <section id="hero" className="hero-section dark wf-section">
        <div className="minting-container w-container">
          <img
            src="/assets/affiliate/affiliate.gif"
            loading="lazy"
            width={240}
            alt="Roboto #6340"
            className="mint-card-image"
          />
          <h2>Divulgue &amp; Ganhe</h2>
          <p>
            Este é o resumo de seu resultado divulgando. <br />
          </p>
          <p>
            Seu link de divulgação é: <br />
            {baseUrl}/sign-up?code={userId}
          </p>
          <br />
          <button onClick={handleCopyLink} className="primary-button dark w-button">
      Copiar link de afiliado
    </button>
          <br />
          <br />
          <div className="properties">
            <h3 className="rarity-heading">Extrato</h3>
            <div className="rarity-row roboto-type">
              <div className="rarity-number full">
                Contabilização pode levar algumas horas.
              </div>
            </div>
            <div className="rarity-row roboto-type">
              <div className="rarity-number full">Saldo Total: </div>
              <div className="padded">R$ {affiliateData.cpaBalance + affiliateData.revShareBalance}</div>
            </div>
            <div className="w-layout-grid grid">
              <div>
                <div className="rarity-row blue">
                  <div className="rarity-number">CPA</div>
                  <div>R$ {affiliateData.cpaBalance}</div>
                </div>
                <div className="rarity-row">
                  <div className="rarity-number">Revenue Share</div>
                  <div>R$ {affiliateData.revShareBalance}</div>
                </div>
              </div>
              <div>
                <div className="rarity-row blue">
                  <div className="rarity-number">Cadastros ativos</div>
                  <div>{affiliateData.referredUsers} cadastros</div>
                </div>
                <div className="rarity-row">
                  <div className="rarity-number">% CPA</div>
                  <div>10%</div>
                </div>
                <div className="rarity-row blue">
                  <div className="rarity-number">% Revenue Share</div>
                  <div>10%</div>
                </div>
              </div>
            </div>
            <div className="grid-box">
              <a
                href="payout-affiliate"
                className="primary-button w-button"
              >
                Sacar saldo disponível
              </a>
              <a
                href={`${backendConfig.affiliateSupportContactLink}`}
                target="_blank"
                className="primary-button dark w-button"
              >
                Suporte para afiliados
              </a>
            </div>
            <br />
            {/* <div className="grid-box">
              <a
                href="#hero"
                className="primary-button dark w-button"
              >
                Telegram
              </a>
            </div> */}
          </div>
        </div>
      </section>

      <div id="about" className="comic-book white wf-section">
        <div className="minting-container left w-container">
          <div className="w-layout-grid grid-2">
            <img
              src="/assets/affiliate/work.png"
              loading="lazy"
              width={240}
              alt="Roboto #6340"
              className="mint-card-image v2"
            />
            <div>
              <h2>Como funciona o sistema de afiliados?</h2>
              <h3>Divulgue para público e fature</h3>
              <p>
                O sistema de afiliados é construído para páginas, influenciadores,
                gestores de tráfego e profissionais do marketing digital. Você pode
                faturar muito mais divulgando a plataforma para o seu público.
              </p>
              <h3>Criativos</h3>
              <p>
                Nossa equipe possui uma gama de criativos prontos para divulgação,
                contate o suporte para afiliados e obtenha os criativos para a
                divulgação.
              </p>
              <h3>Saques para a conta bancária</h3>
              <p>
                Nossos saques ocorrem 24 horas por dia e 7 dias por semana. Basta
                solicitar via chave PIX no seu painel e em até 1 hora o dinheiro já
                estará na sua conta.
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Affiliate