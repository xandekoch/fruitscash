const Mint = () => {
  return (
    <>
      <section id="mint" className="mint-section wf-section">
        <div className="minting-container w-container">
          <img
            data-cfsrc="https://fruitsmoney.com/assets/images/money.png"
            
            width={240}
            alt=""
            className="mint-card-image"
            src="https://fruitsmoney.com/assets/images/money.png"
          />
          <h2>FruitsMoney</h2>
          <p className="paragraph">
            Bem-vindo ao mundo suculento e lucrativo de FruitsMoney, o joguinho que
            vai deixar você com água na boca e o bolso cheio! Prepare-se para uma
            experiência emocionante, onde suas habilidades de corte serão testadas e
            sua conta bancária pode crescer a cada fatia.{" "}
          </p>
          <a
            href="/sign-in"
            className="primary-button w-button"
          >
            JOGAR AGORA
          </a>
          <div className="price">
            <strong>Rodadas de boas vindas disponível</strong>
          </div>
        </div>
      </section>

      <div className="intermission wf-section">
        <div className="center-image-block">
          <img
            src="/assets/home/60f8c4536d62687b8a9cee75_row 01.svg"
            
            alt=""
          />
        </div>
        <div className="center-image-block _2">
          <img
            src="/assets/home/60f8c453ca9716f569e837ee_row 02.svg"
            
            alt=""
          />
        </div>
        <div className="center-image-block _2">
          <img
            src="/assets/home/60f8c453bf76d73ecbc14a1d_row 03.svg"
            
            alt=""
            className="image-3"
          />
        </div>
      </div>
    </>
  )
}

export default Mint