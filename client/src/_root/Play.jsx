import { useEffect, useState } from 'react';
import { getAccessToken, useAuth } from '../context/AuthProvider';
import Game from './Game';
import { createBet, updateBet } from '../lib/node/betApi';
import { Faq, Mint, Rarity } from '../components'
import Loader from '../components/Loader';
import Notification from '../components/Notification';
import { toast } from 'react-toastify';
import { getBalance } from '../lib/node/userApi';
import OnlineUsers from '../components/OnlineUsers';

const Play = ({ setShowNavbarAndFooter }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [betAmount, setBetAmount] = useState(5);
  const { user: { userId, isInfluencer } } = useAuth();
  const [balance, setBalance] = useState(1);
  const accessToken = getAccessToken();
  const [mode, setMode] = useState('default');
  const [testPayMode, setTestPayMode] = useState('');
  const [betId, setBetId] = useState('')
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (userId) {
      setTimeout(async () => {
        await getBalance().then((response) => {
          setBalance(response.balance + response.bonusBalance);
          if (balance === 0 || isInfluencer) {
            setMode('testAffiliate');
          } else {
            setMode('default');
          }
        });
      }, 1000);
    }
  }, [userId, isFullscreen, accessToken]);


  // Recebe GAIN ou LOSS do resultado do jogo
  window.ReceiveScore = (descriptionScore) => {
    const [descriptionString, scoreString] = descriptionScore.split(';');
    const scoreFormatted = scoreString.replace(/\s/g, '').replace(',', '.');
    const score = Number(scoreFormatted);
    const description = descriptionString.toUpperCase();

    if (testPayMode === 'PAY' && description === 'GAIN') {
      handleApi({ score });
    } else if (description === 'GAIN') {
      toast.success(`Você poderia ter ganho R$${score}`)
    }

    setTimeout(() => {
      setIsFullscreen(false);
      setShowNavbarAndFooter(true);
    }, 2500);
  };

  // Recebe o PAY pra iniciar o jogo se tiver saldo
  const handleSubmit = async ({ betAmount }) => {
    setIsPending(true);
    try {
      const response = await createBet(betAmount);
      setBetId(response.bet._id)

      if (response) {
        setIsFullscreen(true);
        setShowNavbarAndFooter(false);
      } else {
        toast.error("Erro ao iniciar o jogo");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Erro ao iniciar o jogo");
    }
    setIsPending(false);
  };

  const handleApi = async ({ score }) => {
    try {
      await updateBet(betId, score);
      return true;
    } catch (error) {
      return false;
    };
  }

  const handleFreeTrial = () => {
    setIsFullscreen(true);
    setShowNavbarAndFooter(false);
  }

  return (
    <>
      {isFullscreen ? (
        <div className="fullscreen-overlay" style={{ background: "black" }}>
          <Game betAmount={betAmount} mode={mode} />
        </div>
      ) : (
        <>
          {/* Seu conteúdo existente */}
          <div
            style={{
              position: "absolute",
              top: 100,
              width: "100%",
              lineHeight: 1.6,
              color: "#fff",
              zIndex: 10,
              textAlign: "center"
            }}
          >
            SALDO: R$<b className="saldo"> {balance} </b>
          </div>

          <section id="hero" className="hero-section dark wf-section">
            <style
              dangerouslySetInnerHTML={{
                __html:
                  "\n            a.escudo {\n                display: block;\n                width: 247px;\n                line-height: 65px;\n                font-size: 12px;\n                margin: -60px 0 0px 0;\n                background-image: url(/assets/images/escudo-branco.png);\n                background-size: contain;\n                background-repeat: no-repeat;\n                background-position: center;\n                filter: drop-shadow(1px 1px 3px #00000099) hue-rotate(0deg);\n            }\n\n            a.escudo img {\n                width: 50px;\n                margin: -10px 0 0 0;\n            }\n            "
              }}
            />
            <div className="minting-container w-container">
              <a className="escudo">
                <img src="/assets/play/trophy.gif" />
              </a>
              <h2 onClick={async () => { await createBet(9) }}>Cortar Frutas</h2>
              <p>
                Cada fruta tem um valor pré determinado, ao corta-la você coleta seu
                valor, e é melhor não deixar ela cair, #ficadica!
              </p>
              <form
                id="play"
                method="post"
                aria-label="Form"
                onSubmit={(e) => {
                  e.preventDefault();

                  if (balance !== null && betAmount <= balance) {
                    setTestPayMode('PAY');
                    handleSubmit({ betAmount });
                  } else {
                    toast.error("Saldo insuficiente");
                  }
                }}
              >
                <div className="properties">
                  <h4 className="rarity-heading">Valor de entrada</h4>
                  <div className="rarity-row roboto-type2">
                    <input
                      type="number"
                      className="large-input-field w-input"
                      max={100}
                      min={1}
                      name="bet"
                      id="bet"
                      required
                      value={betAmount}
                      onChange={(event) => setBetAmount(parseInt(event.target.value))}
                    />
                  </div>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="primary-button w-button"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div style={{ display: 'flex', flexDirection: 'row', gap: "10px", alignItems: "center" }}>
                        <Loader />
                        Cortar
                      </div>
                    ) : (
                      "Cortar"
                    )}
                  </button>
                  <br />
                  <br />
                </div>
              </form>

              {balance === 0 && (
                <form
                  data-name=""
                  id="test"
                  method="post"
                  aria-label="Form"
                >
                  <p>Teste gratuitamente!</p>
                  <div className="">
                    <input
                      onClick={() => {
                        setTestPayMode('TEST');
                        handleFreeTrial();
                      }}
                      type="submit"
                      value="Testar"
                      className="primary-button w-button"
                    />
                    <br />
                    <br />
                  </div>
                </form>
              )}

              <p>Valores para jogar: R$1.00 à R$100.00</p>
            </div>
            <OnlineUsers />
          </section>

          <Notification />
          <Mint />
          <Rarity />
          <Faq />
        </>
      )}
    </>
  )
}

export default Play;