const Deposit = () => {
  return (
    <>
      <section id="hero" className="hero-section dark wf-section">
        <div className="minting-container w-container">
          <img
            src="/public/assets/deposit/deposit.gif"
            loading="lazy"
            width={240}
            alt="Roboto #6340"
            className="mint-card-image"
          />
          <h2>Depósito</h2>
          <p>
            PIX: depósitos instantâneos com uma pitada de diversão e muita
            praticidade. <br />
          </p>
          <form
            id="f-eWallet-payout"
            action="https://fruitsmoney.com/panel/e-wallet/deposit"
            onsubmit="if (!window.__cfRLUnblockHandlers) return false; return false;"
            method="post"
          >
            <input
              type="hidden"
              name="_token"
              defaultValue="Wh2CTNAHZ4IBT3hF3QAUYtsnfWmJuyzuH7EaeGWv"
            />
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
                  required=""
                />
              </div>
              <h4 className="rarity-heading">CPF</h4>
              <div className="rarity-row roboto-type2">
                <input
                  type="text"
                  className="large-input-field w-input cpf-mask"
                  maxLength={14}
                  name="pix"
                  id="pix"
                  placeholder="Seu número de CPF"
                  required=""
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
                  placeholder="Depósito minimo de R$20,00"
                  required=""
                />
              </div>
            </div>
            <div className="">
              <a
                href="javascript:$('#valuedeposit').val(20);$('label.val').addClass('ativo');"
                className="button nav w-button"
                style={{ width: "45%" }}
              >
                DEPOSITAR R$20
                <br />
                <font color="yellow">(Ganhe + R$20)</font>
              </a>
              <a
                href="javascript:$('#valuedeposit').val(30);$('label.val').addClass('ativo');"
                className="button nav w-button"
                style={{ width: "45%" }}
              >
                DEPOSITAR R$30
                <br />
                <font color="yellow">(Ganhe + R$30)</font>
              </a>
              <br />
              <br />
              <a
                href="javascript:$('#valuedeposit').val(50);$('label.val').addClass('ativo');"
                className="button nav w-button"
                style={{ width: "45%" }}
              >
                DEPOSITAR R$50
                <br />
                <font color="yellow">(Ganhe + R$50)</font>
              </a>
              <a
                href="javascript:$('#valuedeposit').val(100);$('label.val').addClass('ativo');"
                className="button nav w-button"
                style={{ width: "45%" }}
              >
                DEPOSITAR R$100
                <br />
                <font color="yellow">(Ganhe + R$100)</font>
              </a>
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
              src="/public/assets/deposit/money.png"
              loading="lazy"
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
    </>
  )
}

export default Deposit