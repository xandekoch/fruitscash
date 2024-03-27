import { getUserIdFromSession } from "../context/AuthProvider";
import { backendConfig } from "../lib/spring/config";

const Affiliate = () => {
  console.log('Affiliate')
  const userId = getUserIdFromSession();
  const url = backendConfig.backendUrl;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Texto copiado para a área de transferência:', text);
        alert('Link copiado para a área de transferência!');
      })
      .catch((error) => {
        console.error('Erro ao copiar texto:', error);
        alert('Erro ao copiar link. Por favor, tente novamente.');
      });
  };
  
  const handleCopyLink = () => {
    const affiliateLink = `https://${url}/user/register?code=${userId}`;
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
            https://{url}/user/register?code={userId}
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
              <div className="rarity-number full">Saldo disponível: </div>
              <div className="padded">0,00</div>
            </div>
            <div className="w-layout-grid grid">
              <div>
                <div className="rarity-row blue">
                  <div className="rarity-number">Cadastro ativo</div>
                  <div>R$0,00</div>
                </div>
                <div className="rarity-row">
                  <div className="rarity-number">Recorrência</div>
                  <div>R$0,00</div>
                </div>
              </div>
              <div>
                <div className="rarity-row blue">
                  <div className="rarity-number">Cadastros ativos</div>
                  <div>0 cadastros</div>
                </div>
                <div className="rarity-row">
                  <div className="rarity-number">Valor por ativo</div>
                  <div>R$ 18.00</div>
                </div>
                <div className="rarity-row blue">
                  <div className="rarity-number">% de Recorrência</div>
                  <div>10.00%</div>
                </div>
              </div>
            </div>
            <div className="grid-box">
              <a
                href="https://fruitsmoney.com/panel/e-wallet/payout"
                className="primary-button w-button"
              >
                Sacar saldo disponível
              </a>
              <a
                href="https://wa.me/5511954895084?text=Preciso%20de%20ajuda%20no%20FruitsMoney!"
                target="_blank"
                className="primary-button dark w-button"
              >
                Suporte para afiliados
              </a>
            </div>
            <br />
            <div className="grid-box">
              <a
                href="https://fruitsmoney.com/panel/affiliate#"
                className="primary-button dark w-button"
              >
                Telegram
              </a>
            </div>
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