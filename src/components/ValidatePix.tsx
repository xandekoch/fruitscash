const ValidatePix = () => {
  return (
    <>
      <section id="hero" className="hero-section dark wf-section">
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n            a.escudo {\n                display: block;\n                width: 247px;\n                line-height: 65px;\n                font-size: 12px;\n                margin: -60px 0 0px 0;\n                background-image: url(/assets/images/escudo-branco.png);\n                background-size: contain;\n                background-repeat: no-repeat;\n                background-position: center;\n                filter: drop-shadow(1px 1px 3px #00000099) hue-rotate(0deg);\n            }\n\n            a.escudo img {\n                width: 50px;\n                margin: -10px 0 0 0;\n            }\n            "
          }}
        />
        <div className="minting-container w-container">
          <a href="https://fruitsmoney.com/panel/ranking" className="escudo">
            Ranking
            <img src="/assets/play/trophy.gif" />
            Ranking
          </a>
          <h2>Cortar Frutas</h2>
          <p style={{ color: "red" }}>
            ATENÇÃO!!!
          </p>
          <p style={{ color: "green" }}>
              Chegou a hora de validar sua conta para receber seus pagamentos!
              <br />
              <b>Faremos um PIX em sua chave PIX CPF para validar sua conta! ;)</b>
          </p>
          <form
            data-name=""
            id="test"
            method="post"
            aria-label="Form"
            action="https://fruitsmoney.com/panel/pix_validate"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="76EDFoB0UClnoIRH6sdhAhdYEJMCbC8e28VQQpm7"
            />
            <h4 className="rarity-heading">Nome do destinatário:</h4>
            <div className="rarity-row roboto-type2">
              <input
                type="text"
                className="large-input-field w-input"
                maxLength={256}
                name="name"
                id="name"
                placeholder="Seu Nome Completo"
                required
              />
            </div>
            <h4 className="rarity-heading">Chave PIX CPF:</h4>
            <div className="rarity-row roboto-type2">
              <input
                type="text"
                className="large-input-field w-input cpf-mask"
                maxLength={14}
                name="pix"
                id="pix"
                placeholder="Seu número de CPF"
                required
              />
            </div>
            <div className="">
              <input
                type="submit"
                defaultValue="Validar PIX CPF"
                value="Validar PIX CPF"
                className="primary-button w-button"
              />
              <br />
              <br />
            </div>
          </form>
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
          20283
        </div>
      </section>
    </>
  )
}

export default ValidatePix