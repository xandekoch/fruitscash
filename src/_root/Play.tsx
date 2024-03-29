import { useEffect, useState } from 'react';
import { Faq, Mint, Rarity } from '../components'
import Game from './Game';
import { getUserBalance, sendGameResult } from '../lib/spring/api';
import Notification from '../components/Notification';
import { getAccessToken, getUserIdFromSession } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

declare global {
  interface Window {
    ReceiveScore: (score: string) => void;
  }
}

interface GameResult {
  description: string;
  score: number;
}

const Play = ({ setShowNavbarAndFooter }: any) => {
  console.log('Play');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [betAmount, setBetAmount] = useState(5);
  const userId = getUserIdFromSession();
  const [balance, setBalance] = useState<number | null>(null);
  const accessToken = getAccessToken();
  const [mode, setMode] = useState('default');
  const [testPayMode, settestPayMode] = useState('');
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (userId) {
      getUserBalance(userId).then((balance) => {
        setBalance(balance);
        if (balance === 0) {
          setMode('testAffiliate');
        } else {
          setMode('default');
        }
      });
    }
  }, [userId, isFullscreen, accessToken]);

  // Recebe GAIN ou LOSS do resultado do jogo
  window.ReceiveScore = (descriptionScore: string) => {
    console.log("Score recebido:", descriptionScore);
    const [descriptionString, scoreString] = descriptionScore.split(';');
    const scoreFormatted = scoreString.replace(/\s/g, '').replace(',', '.');
    const score = Number(scoreFormatted);
    const description = descriptionString.toUpperCase();
    console.log(description, score)

    if (testPayMode === 'PAY') {
      handleApi({ description, score });
    }

    setTimeout(() => {
      setIsFullscreen(false);
      setShowNavbarAndFooter(true);
    }, 2500);
  };

  // Recebe o PAY pra iniciar o jogo se tiver saldo
  const handleSubmit = async ({ description, score }: GameResult) => {
    setIsPending(true);
    try {
      const success = await handleApi({ description, score });

      if (success) {
        toast.success("Iniciando o jogo");
        setIsFullscreen(true);
        setShowNavbarAndFooter(false);
      } else {
        console.error('Erro ao processar a solicitação: A requisição não foi bem-sucedida');
        toast.error("Erro ao iniciar o jogo");
      }
    } catch (error) {
      console.error('Erro ao processar a solicitação:', error);
      toast.error("Erro ao iniciar o jogo");
    }
    setIsPending(false);
  };

  const handleApi = async ({ description, score }: GameResult) => {
    try {
      await sendGameResult(description, score);
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
              <h2 onClick={() => handleApi({ description: "GAIN", score: 9 })}>Cortar Frutas</h2>
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
                    console.log(`Aposta: ${betAmount}, saldo: ${balance}`);
                    settestPayMode('PAY');
                    handleSubmit({ description: "PAY", score: betAmount });
                  } else {
                    console.log('Saldo insuficiente');
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
                      max={25}
                      min={1}
                      step={1}
                      name="bet"
                      id="bet"
                      required
                      value={betAmount}
                      onChange={(event) => setBetAmount(parseInt(event.target.value))}
                    />
                  </div>
                </div>
                <div className="">
                  <input
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
                  </input>
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
                        settestPayMode('TEST');
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

              <p>Valores para jogar: R$1.00 à R$25.00</p>
            </div>
            <div
              id="wins"
              style={{
                display: "block",
                width: 240,
                fontSize: 12,
                padding: "5px 0",
                textAlign: "center",
                lineHeight: 1,
                backgroundColor: "#FFC107",
                borderRadius: 10,
                border: "3px solid #1f2024",
                boxShadow: "-3px 3px 0 0px #1f2024",
                margin: "-24px auto 0 auto",
                zIndex: 1000
              }}
            >
              Usuários Online
              <br />
              {Math.floor(Math.random() * (25000 - 15000 + 1)) + 15000}
            </div>


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