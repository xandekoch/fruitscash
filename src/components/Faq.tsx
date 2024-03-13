import React, { useEffect } from 'react';

const Faq = () => {
  useEffect(() => {
    const handleScroll = () => {
      const images = document.querySelectorAll('.faq-img');
      
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= window.innerHeight;
        img.style.opacity = isInViewport ? '1' : '0'; // Altera a opacidade baseado na visibilidade
        img.style.transition = 'opacity 0.8s ease'; // Adiciona a transição suave
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Verifica o estado inicial ao carregar a página

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div id="faq" className="faq-section">
        <div className="faq-container w-container">
          <h2>faq</h2>
          <div className="question first">
            <img
              src="/public/assets/home/60f8d0c642c4405fe15e5ee0_80s Pop.svg"
              loading="lazy"
              width={110}
              alt=""
            />
            <h3>Como funciona?</h3>
            <div>
              FruitsMoney é o mais novo jogo divertido e lucrativo da galera! Lembra
              daquele joguinho de cortar as frutas que todo mundo era viciado? Ele
              voltou e agora dá para ganhar dinheiro com cada frutinha cortada, mas
              cuidado com as bombas para você garantir o seu prêmio. É super simples,
              corte as frutas e a cada fruta cortada você ganhará dinheiro na hora.{" "}
            </div>
          </div>
          <div className="question">
            <img
              src="/public/assets/home/60fa0061a0450e3b6f52e12f_Body.svg"
              loading="lazy"
              width={90}
              alt=""
            />
            <h3>Como posso jogar?</h3>
            <div className="w-richtext">
              <p>
                Você precisa fazer um depósito inicial na plataforma para começar a
                jogar e faturar. Lembrando que você indicando amigos, você ganhará
                dinheiro de verdade na sua conta bancária.
              </p>
            </div>
          </div>
          <div className="question">
            <img
              src="/public/assets/home/61070a430f976c13396eee00_Gradient Shades.svg"
              loading="lazy"
              width={120}
              alt=""
            />
            <h3>
              Como posso sacar? <br />
            </h3>
            <p>
              O saque é instantâneo. Utilizamos a sua chave PIX como CPF para enviar o
              pagamento, é na hora e no PIX. 7 dias por semana e 24 horas por dia.{" "}
              <br />
            </p>
          </div>
          <div className="question">
            <img
              src="/public/assets/home/60fa004b7690e70dded91f9a_light.svg"
              loading="lazy"
              width={80}
              alt=""
            />
            <h3>É tipo foguetinho?</h3>
            <div>
              <b>Não</b>! O jogo da frutinha é totalmente diferente, basta apenas
              estar atento para cortar as frutas certas. Não existe sua sorte em jogo,
              basta ter foco e cortar as frutas corretamente.
            </div>
          </div>
          <div className="question">
            <img
              src="/public/assets/home/60f8d0c69b41fe00d53e8807_Helmet.svg"
              loading="lazy"
              width={90}
              alt=""
            />
            <h3>Existem eventos?</h3>
            <div className="w-richtext">
              <ul role="list">
                <li>
                  <strong>Jogatina</strong>. A cada fruta que você acerta, você ouve o
                  som satisfatório do corte e, em seguida, vê o dinheiro sendo
                  adicionado à sua conta virtual. Quanto mais frutas você cortar, mais
                  dinheiro você ganha. Mas cuidado! Há bombas escondidas entre as
                  frutas.
                </li>
                <li>
                  <strong>Torneios</strong>. Além disso, você pode competir com outros
                  jogadores em torneios e desafios diários para ver quem consegue a
                  maior pontuação e fatura mais dinheiro. A emoção da competição e a
                  chance de ganhar grandes prêmios adicionam uma camada extra de
                  adrenalina ao jogo.
                </li>
                <li>
                  <strong>Desafios</strong>. À medida que você progride no jogo,
                  desafios emocionantes surgem. Você será desafiado a cortar uma
                  quantidade específica de frutas em um determinado tempo, ou até
                  mesmo enfrentar frutas especiais que valem mais dinheiro. Os combos
                  também são uma maneira de aumentar seus ganhos, pois ao cortar
                  várias frutas consecutivas, você receberá bônus multiplicadores.
                </li>
              </ul>
              <p>
                Clique <a href="https://fruitsmoney.com/#">aqui</a> e acesse nosso
                grupo no Telegram para participar de eventos exclusivos.{" "}
              </p>
            </div>
          </div>
          <div className="question">
            <img
              src="/public/assets/home/60f8d0c6aa527d780201899a_Ear.svg"
              loading="lazy"
              width={72}
              alt=""
            />
            <h3>O que são as bombinhas?</h3>
            <div>
              Quando nosso mestre ninja lanças as frutas na tábua, existem algumas
              bombinhas que podem ser lançadas junto as frutas. Caso você corte alguma
              bombinha, você perde a partida.
            </div>
          </div>
          <div className="question last">
            <img
              src="/public/assets/home/60f8d0c657c9a88fe4b40335_Exploded Head.svg"
              loading="lazy"
              width={72}
              alt=""
            />
            <h3>Dá para ganhar mais?</h3>
            <div className="w-richtext">
              <p>
                Chame um amigo para jogar e após o depósito e a primeira partida será
                creditado em sua conta R$14 para sacar a qualquer momento.{" "}
              </p>
              <ol role="list">
                <li>
                  O saldo é adicionado diretamente ao seu saldo em dinheiro, com o
                  qual você pode jogar ou sacar.{" "}
                </li>
                <li>
                  Seu amigo deve se inscrever através do seu link de convite pessoal.{" "}
                </li>
                <li>
                  Seu amigo deve ter depositado pelo menos R$25.00 BRL para receber o
                  prêmio do convite.
                </li>
                <li>
                  Você não pode criar novas contas na FruitsMoney e se inscrever
                  através do seu próprio link para receber a recompensa. O programa
                  Indique um Amigo é feito para nossos jogadores convidarem amigos
                  para a plataforma FruitsMoney. Qualquer outro uso deste programa é
                  estritamente proibido.{" "}
                </li>
              </ol>
              <p>‍</p>
            </div>
          </div>
        </div>
        <div className="faq-left">
          <img
            src="/public/assets/home/60f988c7c856f076b39f8fa4_head 04.svg"
            loading="eager"
            width="238.5"
            alt=""
            className="faq-img"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c9402afc1dd3f629fe_head 26.svg"
            loading="eager"
            width={234}
            alt=""
            className="faq-img _1"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c9bc584ead82ad8416_head 29.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _2"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c913f0ba744c9aa13e_head 27.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _3"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c9d3d37e14794eca22_head 25.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _1"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c98b7854f0327f5394_head 24.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _2"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c82f5c199c4d2f6b9f_head 05.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _3"
            style={{ opacity: 0 }}
          />
        </div>
        <div className="faq-right">
          <img
            src="/public/assets/home/60f988c88b7854b5127f5393_head 23.svg"
            loading="eager"
            width="238.5"
            alt=""
            className="faq-img"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c8bf76d754b9c48573_head 12.svg"
            loading="eager"
            width={234}
            alt=""
            className="faq-img _1"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c8f2b58f55b60d858f_head 21.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _2"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c8e83a994a38909bc4_head 22.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _3"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c8a97a7c125d72046d_head 20.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _1"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c8fbbbfe5fc68169e0_head 14.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _2"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c88b7854b35e7f5390_head 18.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _3"
            style={{ opacity: 0 }}
          />
        </div>
        <div className="faq-bottom">
          <img
            src="/public/assets/home/60f988c8ba5339712b3317c0_head 16.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _3"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c86e8603bce1c16a98_head 17.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c889b7b12755035f2f_head 19.svg"
            loading="lazy"
            width={234}
            alt=""
            className="faq-img _1"
            style={{ opacity: 0 }}
          />
        </div>
        <div className="faq-top">
          <img
            src="/public/assets/home/60f988c8a97a7ccf6f72046a_head 11.svg"
            loading="eager"
            width={234}
            alt=""
            className="faq-img _3"
            style={{ opacity: 0 }}
          />
          <img
            src="/public/assets/home/60f988c7fbbbfed6f88169df_head 02.svg"
            loading="eager"
            width={234}
            alt=""
            className="faq-img"
            style={{ opacity: 0 }}
          />
          <img
            data-cfsrc="https://fruitsmoney.com/assets/images/60f8dbc385822360571c62e0_icon-256w.png"
            loading="eager"
            width={234}
            alt=""
            className="faq-img _1"
            src="https://fruitsmoney.com/assets/images/60f8dbc385822360571c62e0_icon-256w.png"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </>
  )
}

export default Faq