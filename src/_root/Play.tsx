import React from 'react'
import { Faq, HeroHome, Mint, Rarity } from '../components'
import ValidatePix from '../components/ValidatePix'

const Play = () => {
  return (
    <>
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
        SALDO: R$<b className="saldo"> 0,00 </b>
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
            <img src="/public/assets/play/trophy.gif" />
          </a>
          <h2>Cortar Frutas</h2>
          <p>
            Cada fruta tem um valor pré determinado, ao corta-la você coleta seu
            valor, e é melhor não deixar ela cair, #ficadica!
          </p>
          <form
            data-name=""
            id="play"
            method="post"
            aria-label="Form"
            action="https://fruitsmoney.com/panel/bet"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="rs0NjEuqkXGgeEJ89DZxdaa10YB4YwIUji93IrLd"
            />
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
                  required=""
                  defaultValue={5}
                />
              </div>
            </div>
            <div className="">
              <input
                type="submit"
                defaultValue="Cortar"
                value="Cortar"
                className="primary-button w-button"
              />
              <br />
              <br />
            </div>
          </form>
          <p>Você tem 1 tentativas!</p>
          <form
            data-name=""
            id="test"
            method="post"
            aria-label="Form"
            action="https://fruitsmoney.com/panel/gratis"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="rs0NjEuqkXGgeEJ89DZxdaa10YB4YwIUji93IrLd"
            />
            <div className="">
              <input
                type="submit"
                defaultValue="Testar"
                value="Testar"
                className="primary-button w-button"
              />
              <br />
              <br />
            </div>
          </form>

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
          20425
        </div>
      </section>


      <Mint />
      <Rarity />
      <Faq />
    </>
  )
}

export default Play